import { firestore  } from "@/lib/firebase/firebase";

export async function incrementPlayer() {
  return await firestore
    .collection("counters")
    .doc("players")
    .update({ size: firestore.FieldValue().increment(1)});
}

export async function decrementPlayer() {
  return await firestore
    .collection("counters")
    .doc("players")
    .update({ size: firestore.FieldValue().increment(-1)});
}