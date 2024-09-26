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
  deleteDoc
} from "firebase/firestore";

class PlayerAPI {
  static db = firestore;

  constructor({firstname, lastname, number, imageUrl, profileSettings}) {
    this.firstname = firstname
    this.lastname = lastname
    this.number = number
    this.imageUrl = imageUrl
    this.profileSettings = profileSettings
  }

  static async createPlayer(player) {
    const playersRef = collection(this.db, "players");

    const isValid = this.isPlayerCredsValid(player)

    if (!isValid) {
      return null
    }    

    const newPlayer = await addDoc(playersRef, player);
    return newPlayer;
  }

  static isPlayerCredsValid(player) {

    const imageUrlRegex = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/g

    if (!player.lastname) {
      return false;
    }

    if (player.imageUrl && !player.imageUrl.match(imageUrlRegex)) {
      return false;
    }
    
    return true
  }

  static async updatePlayer(id, player) {
    const playerRef = doc(this.db, "players", id)

    const isValid = this.isPlayerCredsValid(player)

    if (!isValid) {
      return null
    }    

    const updatedPlayer = await setDoc(playerRef, player)
    return updatedPlayer

    
  }

  static async deletePlayer(id) {
    const playerRef = doc(this.db, "players", id)
    const deletedPlayer = await deleteDoc(playerRef, {isDeleted: true})
    return deletedPlayer
  }

  static async countPlayers() {
    const playerCount = doc(this.db, "counters", "players");
    return await getDoc(playerCount);
  }

  // DO NOT USE
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

  // DO NOT USE
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

  static async getPlayerByName(name) {
    const nameFormatted = name.charAt(0).toUpperCase() + name.slice(1);
    const playersRef = collection(this.db, "players");
    const q = query(
      playersRef,
      orderBy("lastname"),
      where("lastname", "==", nameFormatted),
      where("lastname", "<=", nameFormatted),
      where("lastname", ">=", nameFormatted)
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot;
  }

  static displayName(player, fullname = false) {

    const { firstname, lastname, profileSettings } = player;

    if (fullname) {
      return `${lastname}, ${firstname}`;
    }

    if( profileSettings?.isFullNameVisible ) {
      return `${lastname}, ${firstname}`;
    }

    // return `${lastname}, ${firstname.charAt(0)}`;

    if(firstname) {
      return `${lastname}, ${firstname.charAt(0)}`;
    } else {
      return `${lastname}`;
    }
    
  }
  
}

export default PlayerAPI;
