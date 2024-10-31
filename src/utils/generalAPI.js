import { firestore } from "@/lib/firebase/firebase"

export async function getByPath(path) {

  return await firestore.doc(path).get()
  
}