import { firestore, FieldValue } from "@/lib/firebase/firebase";


export async function incrementPlayer() {
  const res =  await firestore
    .collection("counters")
    .doc("players")
    .update({ size: FieldValue.increment(1) });
}

export async function decrementPlayer() {
  return await firestore
    .collection("counters")
    .doc("players")
    .update({ size: FieldValue.increment(-1) });
}

export async function getPlayerCount() {
  const doc = await firestore.collection("counters").doc("players").get();
  return doc.data().size;
}