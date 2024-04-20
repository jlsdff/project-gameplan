import { firestore, FieldValue, auth } from "@/lib/firebase/firebase";
import { uploadImage } from "./imagesAPI";

export const createBlog = async (blogData) => {
  
  const timestamps = {
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
    createdBy: auth.currentUser.uid,
  }

  return await uploadImage(blogData.thumbnail)
    .then( async (res) => {
      blogData.thumbnail = res
      return await firestore.collection("blogs").add({...blogData, ...timestamps})
    })
    .catch( error => {
      alert("Failed to upload image")
      throw new Error(error)
    })
};

export const getBlogs = async () => {
  return await firestore.collection("blogs").get();
}

export const getBlogById = async (id) => {
  return await firestore.collection("blogs").doc(id).get();
}

export const updateBlog = async (id, blogData) => {
  return await uploadImage(blogData.thumbnail)
    .then(async (res) => {
      blogData.thumbnail = res
      return await firestore.collection("blogs").doc(id).update(blogData, {merge:true});
    })
    .catch( (error) => {
      alert("Error uploading Image")
      throw new Error(error)
    })
}

export const deleteBlog = async (id) => {
  return await firestore.collection("blogs").doc(id).delete();
}