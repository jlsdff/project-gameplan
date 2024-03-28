import { firestore } from "@/lib/firebase/firebase";
import { uploadImage, getImageUrl } from "./imagesAPI";

// GET FUNCTIONS
export async function getTeamById(id) {
  return firestore.collection("teams").doc(id).get();
}

export async function getAllTeams() {
  return firestore.collection("teams").get();
}

export async function getTeamsByPage(page, limit, orderBy = "teamName"){
  let lastDoc = null

  if(page > 0){
    const snapshot = await firestore
      .collection("teams")
      .orderBy(orderBy, "asc")
      .limit(page * limit)
      .get()

    lastDoc = snapshot.docs[snapshot.docs.length - 1]
  }

  let query = firestore
    .collection("teams")
    .orderBy(orderBy, "asc")
    .limit(limit)

  if(lastDoc){
    query = query.startAfter(lastDoc)
  }

  return await query.get()
  
}

// POST FUNCTIONS
export async function createTeam(team) {
  
  return await uploadImage(team.teamLogo)
  .then((res) => {
    console.log({...team, teamLogo: res.ref.fullPath})
    return firestore.collection("teams").doc().set({...team, teamLogo: res.ref.fullPath});
  });
}

// PUT FUNCTIONS
export async function updateTeam(id, team) {
  return firestore.collection("teams").doc(id).update(team, { merge: true });
}

// DELETE FUNCTIONS
export async function deleteTeam(id) {
  return firestore.collection("teams").doc(id).delete();
}

// OTHER FUNCTIONS
