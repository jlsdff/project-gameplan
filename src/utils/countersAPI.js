import { firestore, FieldValue } from "@/lib/firebase/firebase";

// PLAYER COUNTER API
export async function incrementPlayer() {
  const res = await firestore
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

export async function resetPlayer() {
  return await firestore
    .collection("counters")
    .doc("players")
    .update({ size: 0 });
}

export async function getPlayerCount() {
  const doc = await firestore.collection("counters").doc("players").get();
  return doc.data().size;
}

// TEAM COUNTER API

export async function getTeamCount() {
  const doc = await firestore.collection("counters").doc("teams").get();
  return doc.data().size;
}

export async function resetTeam(){
  return await firestore
    .collection("counters")
    .doc("teams")
    .update({ size: 0 });
}

export async function incrementTeam() {
  return await firestore
    .collection("counters")
    .doc("teams")
    .update({ size: FieldValue.increment(1) });
}

export async function decrementTeam() {
  return await firestore
    .collection("counters")
    .doc("teams")
    .update({ size: FieldValue.increment(-1) });
}


// LEAGUE COUNTER API

export async function getLeagueCount() {
  const doc = await firestore.collection("counters").doc("leagues").get();
  return doc.data().size;
}

export async function resetLeague(){
  return await firestore
    .collection("counters")
    .doc("leagues")
    .update({ size: 0 });
}

export async function incrementLeague() {
  return await firestore
    .collection("counters")
    .doc("leagues")
    .update({ size: FieldValue.increment(1) });
}

export async function decrementLeague() {
  return await firestore
    .collection("counters")
    .doc("leagues")
    .update({ size: FieldValue.increment(-1) });
}

// BLOG COUNTER API

export async function getBlogCount() {
  const doc = await firestore.collection("counters").doc("blogs").get();
  return doc.data().size;
}

export async function incrementBlog(){
  return await firestore
    .collection("counters")
    .doc("blogs")
    .update({ size: FieldValue.increment(1) });
}
 
export async function decrementBlog(){
  return await firestore
    .collection('counters')
    .doc('blogs')
    .update({ size: FieldValue.increment(-1) });
}
