import { storage } from "@/lib/firebase/firebase";

const imagesRef = storage.ref().child("images");

export async function uploadImage(file) {
  const fileRef = imagesRef.child(file.name);
  const snapshot = await fileRef.put(file);
  const downloadURL = await snapshot.ref.getDownloadURL();
  return downloadURL;
}

export async function getImageUrl(fileName) {
  return await imagesRef.child(fileName).getDownloadURL();
}

export async function deleteImageByURL(downloadURL){
  const imageRef = storage.refFromURL(downloadURL);
  return await imageRef.delete();
}