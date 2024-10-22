import { firestore } from "@/lib/firebase/firebase";
import { collection, getDocs, limit, query, updateDoc } from "firebase/firestore";

export default async function WriteFullname() {

  const playersRef = collection(firestore, "players")

  const q = query(playersRef)
  
  const players = await getDocs(q)

  players.docs.forEach( async (doc) => {
    const data = {
      id: doc.id,
      ...doc.data()
    }
    let fullname;
    if(data.firstname) {
      fullname = `${data.firstname.toLowerCase()} ${data.lastname.toLowerCase()}`
    } else {
      fullname = data.lastname.toLowerCase()
    }

    try {
      await updateDoc(doc.ref, {fullname: fullname} , {merge: true})
    } catch (error) {
      console.error(`Error updating document: ${doc.lastname}`, error)
    } finally {
      console.log(`Document updated: ${doc.lastname}`)
    }

  })
  
}