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
} from "firebase/firestore";

class PlayerAPI {
  static db = firestore;

  constructor() {}

  static async createPlayer(player) {}

  static async updatePlayer(id, player) {}

  static async deletePlayer(id) {}

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
    const playersRef = collection(this.db, "players");
    const q = query(
      playersRef,
      orderBy("lastname"),
      where("lastname", "==", name),
      where("lastname", "<=", name),
      where("lastname", ">=", name)
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot;
  }
}

export default PlayerAPI;
