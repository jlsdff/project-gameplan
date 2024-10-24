import { firestore } from "@/lib/firebase/firebase";
import {
  collection,
  getDoc,
  getDocs,
  doc,
  query,
  limit,
  orderBy,
  startAt,
  startAfter,
  endAt,
  where,
  addDoc,
  setDoc,
  deleteDoc,
  writeBatch,
  increment,
  updateDoc,
  or,
  Timestamp,
} from "firebase/firestore";
import * as XLSX from "xlsx";
import _ from "underscore";
import _s from "underscore.string";

_.mixin(_s.exports());

class PlayerAPI {
  static db = firestore;

  constructor({ ...player }) {
    this.player = player;
  }

  static async createPlayer(player) {
    if (!this.isPlayerCredsValid(player)) {
      return null;
    }

    const batch = writeBatch(this.db);
    const playerRef = doc(collection(this.db, "players"));
    const playerCountRef = doc(this.db, "counters", "players");

    // Capitalize first letter of firstname and lastname
    const firstname = player.firstname
    ? player.firstname
        .trim()
        .split(" ")
        .map((word) => _.capitalize(word))
        .join(" ")
    : ""
    const lastname = player.lastname
    ? player.lastname
        .trim()
        .split(" ")
        .map((word) => _.capitalize(word))
        .join(" ")
    : ""
    const fullname = `${firstname.toLowerCase()} ${lastname.toLowerCase()}`;

    batch.set(playerRef, {
      ...player,
      firstname,
      lastname,
      fullname,
      createAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
    batch.update(playerCountRef, { count: increment(1) });

    await batch.commit();
  }

  static isPlayerCredsValid(player) {
    const imageUrlRegex = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/g;

    if (!player.lastname) {
      return false;
    }

    if (player.imageUrl && !player.imageUrl.match(imageUrlRegex)) {
      return false;
    }

    return true;
  }

  static async updatePlayer(id, player) {
    const playerRef = doc(this.db, "players", id);

    const isValid = this.isPlayerCredsValid(player);

    if (!isValid) {
      return null;
    }

    const updatedPlayer = await setDoc(playerRef, player);
    return updatedPlayer;
  }

  static async deletePlayer(id) {
    // Delete only if player doesnt have any games
    const playerRef = collection(this.db, `players/${id}/gameRecords`);
    const q = query(playerRef, "gameRecords", limit(1));
    const hasGames = await getDocs(q);
    console.log(hasGames.empty);

    if (!hasGames.empty) {
      console.error("Player has games. Cannot delete.");
      return null;
    }
    const decrementPlayer = updateDoc(
      doc(this.db, "counters", "players"),
      { size: increment(-1) },
      { merge: true }
    );
    const deletedDoc = await deleteDoc(doc(this.db, `players/${id}`));
    return { deletedDoc, decrementPlayer, message: "Player deleted" };
  }

  static async countPlayers() {
    const playerCount = doc(this.db, "counters", "players");
    return await getDoc(playerCount);
  }

  /**
   *
   * @param {page} page
   * @param {limitPerPage} limitPerPage
   * @deprecated
   * @returns
   */
  static async getPlayerByPage(page, limitPerPage) {
    const playersRef = collection(this.db, "players");

    let q = query(playersRef, orderBy("lastname"), limit(limitPerPage));

    if (page > 1) {
      const previousPageLastDoc = await this.getLastDocOfPreviousPage(
        page,
        limitPerPage
      );
      q = query(
        playersRef,
        orderBy("lastname"),
        startAfter(previousPageLastDoc),
        limit(limitPerPage)
      );
    }

    return await getDocs(q);
  }

  /**
   *
   * @param {page} page
   * @param {limitPerPage} limitPerPage
   * @deprecated
   * @returns
   */
  static async getLastDocOfPreviousPage(page, limitPerPage) {
    const playersRef = collection(this.db, "players");
    const q = query(
      playersRef,
      orderBy("lastname"),
      limit((page - 1) * limitPerPage)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs[querySnapshot.docs.length - 1];
  }

  static async getPlayerByDocumentSnap(docSnap, limitPerPage) {
    const playersRef = collection(this.db, "players");

    if (!docSnap) {
      const q = query(playersRef, orderBy("lastname"), limit(limitPerPage));
      const querySnapshot = await getDocs(q);
      return querySnapshot;
    }

    const q = query(
      playersRef,
      orderBy("lastname"),
      startAfter(docSnap),
      limit(limitPerPage)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot;
  }

  /**
   *
   * @param {name} name to be searched for
   * @returns a snapshot of the query
   */
  static async getPlayerByName(name) {
    const playerRef = collection(this.db, "players");

    const q = query(
      playerRef,
      or(
        where("lastname", "<=", `${name}\uf8ff`),
        where("lastname", ">=", `${name}`)
      ),
      limit(10) //for testing
    );

    return await getDocs(q);
  }

  static displayName(player, fullname = false) {
    const { firstname, lastname, profileSettings } = player;

    if (fullname) {
      return `${lastname}, ${firstname}`;
    }

    if (profileSettings?.isFullNameVisible) {
      return `${lastname}, ${firstname}`;
    }

    // return `${lastname}, ${firstname.charAt(0)}`;

    if (firstname) {
      return `${lastname}, ${firstname.charAt(0)}`;
    } else {
      return `${lastname}`;
    }
  }

  // GET GAME RECORDS OF PLAYER BY ID
  // @param id: string
  static async getGameRecords(id) {
    const playerDoc = doc(this.db, "players", id);
    const docs = await getDocs(collection(playerDoc, "gameRecords"));
    return docs;
  }

  static async averageStats(data) {}

  static downloadTemplate() {
    const aoa = [["number", "firstname", "lastname", "showFullName"]];

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(aoa);
    XLSX.utils.book_append_sheet(wb, ws, "Players");

    XLSX.writeFile(wb, "players_template.xlsx");
  }

  static async importPlayers(players) {
    const errors = [];

    await players.forEach((player) => {
      this.createPlayer({
        number: player.number,
        firstname: player.firstname
          ? player.firstname.toLowerCase().trim()
          : "",
        lastname: player.lastname ? player.lastname.toLowerCase().trim() : "",
        imageUrl: player.imageUrl ? player.imageUrl : null,
        profileSettings: {
          isFullNameVisible: player.showFullName === 1 ? true : false,
        },
      })
        .then((res) => {})
        .catch((err) => {
          errors.push({
            error: "Error creating player",
            player: player.__rowNum__,
          });
        });
    });

    return errors;
  }

  static verifySheet(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      // When the file is loaded
      reader.onload = (event) => {
        const arrayBuffer = event.target.result;

        try {
          // Read the file as array buffer
          const wb = XLSX.read(arrayBuffer, { type: "array" });

          // Get the Players sheet (case insensitive check)
          const ws = wb.Sheets["Players"] || wb.Sheets["players"];

          // Verify if sheet exists
          if (!ws) {
            return reject({
              message:
                "No Player Sheet Found. Please make sure the sheet name is 'Players' or 'players'",
              status: "error",
            });
          }

          // Extract the actual headers from the sheet
          const sheetData = XLSX.utils.sheet_to_json(ws, { header: 1 });
          const actualHeaders = sheetData[0]; // First row of the sheet

          // Define expected headers
          const expectedHeaders = [
            "number",
            "firstname",
            "lastname",
            "showFullName",
          ];

          // Verify if the headers match the expected ones
          const missingHeaders = expectedHeaders.filter(
            (header) => !actualHeaders.includes(header)
          );

          if (missingHeaders.length > 0) {
            return resolve({
              message: `Missing headers: ${missingHeaders.join(", ")}`,
              status: "error",
            });
          }

          return resolve({
            message: "Sheet Verified",
            wb: wb,
            status: "success",
          });
        } catch (error) {
          return reject({
            message: "Error processing the file",
            status: "error",
            error: error.message,
          });
        }
      };

      reader.onerror = () => {
        return reject({
          message: "Error reading the file",
          status: "error",
        });
      };

      // Read the file as an array buffer
      reader.readAsArrayBuffer(file);
    });
  }
}
export default PlayerAPI;
