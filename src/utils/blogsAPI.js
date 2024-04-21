import { firestore, FieldValue, auth } from "@/lib/firebase/firebase";
import { uploadImage } from "./imagesAPI";
import { incrementBlog, decrementBlog } from "./countersAPI";

export const createBlog = async (blogData) => {
  const timestamps = {
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
    createdBy: auth.currentUser.uid,
  };

  return await uploadImage(blogData.thumbnail)
    .then(async (res) => {
      blogData.thumbnail = res;
      return await incrementBlog().then(async () => {
        return await firestore
          .collection("blogs")
          .add({ ...blogData, ...timestamps });
      });
    })
    .catch((error) => {
      alert("Failed to upload image");
      throw new Error(error);
    });
};

export const getBlogsByPage = async (
  limit,
  lastSnapShot = null,
  orderBy = "createdAt"
) => {
  if (lastSnapShot !== null) {
    return await firestore
      .collection("blogs")
      .orderBy(orderBy, "desc")
      .startAfter(lastSnapShot)
      .limit(limit)
      .get();
  }

  return await firestore
    .collection("blogs")
    .orderBy(orderBy, "desc")
    .limit(limit)
    .get();
};

export const getBlogs = async () => {
  return await firestore.collection("blogs").get();
};

export const getBlogById = async (id) => {
  return await firestore.collection("blogs").doc(id).get();
};

export const updateBlog = async (id, blogData) => {
  // blogData.updatedAt = FieldValue.serverTimestamp();

  //

  const data = {
    updatedAt: FieldValue.serverTimestamp(),
    updatedBy: auth.currentUser.uid,
    ...blogData,
  };

  if (data.thumbnail instanceof File) {
    return await uploadImage(blogData.thumbnail)
      .then(async (res) => {
        blogData.thumbnail = res;
        return await firestore
          .collection("blogs")
          .doc(id)
          .update(blogData, { merge: true });
      })
      .catch((error) => {
        alert("Error uploading Image");
        throw new Error(error);
      });
  } else {
    return await firestore
      .collection("blogs")
      .doc(id)
      .update(data, { merge: true });
  }
};

export const deleteBlog = async (id) => {
  return await decrementBlog().then(async () => {
    return await firestore.collection("blogs").doc(id).delete();
  });
};

export const markBlogAsDraft = async (id) => {
  return await firestore.collection("blogs").doc(id).update(
    {
      status: "draft",
    },
    { merge: true }
  );
};

export const markBlogAsPublished = async (id) => {
  return await firestore
    .collection("blogs")
    .doc(id)
    .update({ status: "published" }, { merge: true });
};
