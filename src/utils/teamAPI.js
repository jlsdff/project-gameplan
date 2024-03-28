import { firestore } from "@/lib/firebase/firebase";
import { uploadImage, getImageUrl } from "./imagesAPI";

// GET FUNCTIONS
export async function getTeamById(id) {
  return firestore.collection("teams").doc(id).get();
}

export async function getAllTeams() {
  return firestore.collection("teams").get();
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
