import { firestore } from "@/lib/firebase/firebase";
import { incrementLeague, decrementLeague } from "./countersAPI";
import { uploadImage } from "./imagesAPI";

export const createLeague = async (data) => {
  const uploadedImage = await uploadImage(data.leagueImage)
    .then((res) => {
      return res
    })
    .catch((err) => {
      console.error(err);
    });

  if (!uploadedImage) {
    throw new Error("Failed to upload image");
  } else {
    data.leagueImage = uploadedImage;
    const incremented = await incrementLeague()
      .then(() => {
        return firestore.collection("leagues").add(data);
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to increment league counter");
        throw new Error("Failed to increment league counter");
      });
    return incremented;
  }
};

export const getAllLeague = async (id) => {
  return await firestore.collection("leagues").doc(id).get();
};

export const getLeagueById = async () => {
  return await firestore.collection("leagues").get();
};

export const updateLeague = async (id, data) => {
  return await firestore
    .collection("leagues")
    .doc(id)
    .update(data, { merge: true });
};

export const deleteLeague = async (id) => {
  const decremented = await decrementLeague()
    .then(() => {
      return firestore.collection("leagues").doc(id).delete();
    })
    .catch((err) => {
      console.error(err);
      alert("Failed to decrement league counter");
      throw new Error("Failed to decrement league counter");
    });

  return decremented;
};
