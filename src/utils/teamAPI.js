import { firestore } from "@/lib/firebase/firebase";
import { uploadImage, getImageUrl } from "./imagesAPI";
import { decrementTeam, incrementTeam } from "./countersAPI";

// GET FUNCTIONS
export async function getTeamById(id) {
  return await firestore.collection("teams").doc(id).get();
}

export async function getAllTeams() {
  return await firestore.collection("teams").get();
}

export async function getTeamsByPage(page, limit, orderBy = "teamName") {
  let lastDoc = null;

  if (page > 0) {
    const snapshot = await firestore
      .collection("teams")
      .orderBy(orderBy, "asc")
      .limit(page * limit)
      .get();

    lastDoc = snapshot.docs[snapshot.docs.length - 1];
  }

  let query = firestore
    .collection("teams")
    .orderBy(orderBy, "asc")
    .limit(limit);

  if (lastDoc) {
    query = query.startAfter(lastDoc);
  }

  return await query.get();
}

export async function getTeamByName(name){
  // name = name.replace(/\b\w/g, l => l.toUpperCase()); 

  return await firestore.collection("teams")
    .where("teamName", ">=", name)
    .where("teamName", "<=", name + "\uf8ff")
    .limit(10)
    .get();
  
}

export async function getTeamsByLastRef(lastDoc, limit=10, orderBy='teamName') {
  let query;
  if(lastDoc === null) {
    query = firestore.collection("teams").orderBy(orderBy, "asc").limit(limit);
  }else {
    query = firestore.collection("teams").orderBy(orderBy, "asc").startAfter(lastDoc).limit(limit);
  }

  return await query.get();
  
}

export async function getGamesByTeamId(id) {
  return await firestore.collection("teams").doc(id).collection("gameRecords").get();
}

// POST FUNCTIONS
export async function createTeam(team) {

  // Check if teamName, teamAbbr, and teamLogo are not empty
  // if(!team.teamName || !team.teamAbbr || !team.teamLogo) {
  //   throw new Error("Please fill out all fields");
  // }

  if(!team.teamLogo) {
    const increment = await incrementTeam().catch((err) => {
      console.error(err);
      console.log("Error incrementing team counter");
    });

    return await firestore
      .collection("teams")
      .doc()
      .set({ ...team, wins: 0, losses: 0 });
  }
  
  
  return await uploadImage(team.teamLogo)
    .then((res) => {
      incrementTeam().catch((err) => {
        console.error(err);
        console.log("Error incrementing team counter");
      });
      return firestore
        .collection("teams")
        .doc()
        .set({ ...team, teamLogo: res, wins: 0, losses: 0 });
    })
    .catch((err) => {
      console.log(err);
      throw new Error("Error uploading image");
    });
}

// PUT FUNCTIONS
export async function updateTeam(id, team) {

  if (team.teamLogo instanceof File){
    const teamLogo = await uploadImage(team.teamLogo)
    const updatedTeam = {...team, teamLogo}
    return await firestore.collection('teams').doc(id).update(updatedTeam, { merge: true });
  }
  
  return await firestore.collection("teams").doc(id).update(team, { merge: true });
}

// DELETE FUNCTIONS
export async function deleteTeam(id) {
  return await firestore.collection("teams").doc(id).delete().then(()=>{
    decrementTeam().catch((err) => {
      console.error(err);
      console.log("Error decrementing team counter");
    });
  })
}



// OTHER FUNCTIONS

export async function getPlayers(ids){
  // if teamId is array of teamIds
  
  return await Promise.all( 
    ids.map( async (id) => {
      return await firestore.collection("players")
      .doc(id)
      .get()
    })
  )

}