import { firestore } from "@/lib/firebase/firebase";

export const createBlog = async (blogData) => {
  return await firestore.collection("blogs").add(blogData);
};

export const getBlogs = async () => {
  return await firestore.collection("blogs").get();
}

export const getBlogById = async (id) => {
  return await firestore.collection("blogs").doc(id).get();
}

export const updateBlogs = async (id, blogData) => {
  return await firestore.collection("blogs").doc(id).update(blogData, {merge:true});
}

export const deleteBlog = async (id) => {
  return await firestore.collection("blogs").doc(id).delete();
}