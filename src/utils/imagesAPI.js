import { storage } from "@/lib/firebase/firebase";

const imagesRef = storage.ref().child("images");

export async function uploadImage(file){
  return await imagesRef.child(file.name).put(file);
}

export async function getImageUrl(fileName){
  return await imagesRef.child(fileName).getDownloadURL();
}