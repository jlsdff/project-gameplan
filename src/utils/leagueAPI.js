import { FieldValue, auth, firestore } from "@/lib/firebase/firebase";
import { incrementLeague, decrementLeague } from "./countersAPI";
import { uploadImage } from "./imagesAPI";

export const createLeague = async (data) => {
  data = {
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
    createdBy: auth.currentUser.uid,
    ...data,
  };
  const uploadedImage = await uploadImage(data.leagueImage)
    .then((res) => {
      return res;
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

export const getAllLeagues = async () => {
  return await firestore.collection("leagues").get();
};

export const getLeagueById = async (id) => {
  return await firestore.collection("leagues").doc(id).get();
};

export const getLeaguesByLikeTitle = async ( name ) => {
  name = name.replace(/\b\w/g, l => l.toUpperCase()); 

  return await firestore.collection("leagues")
    .where("title", ">=", name)
    .where("title", "<=", name + "\uf8ff")
    .limit(5)
    .get();
}

export const getLeagueSize = async () => {
  return await firestore
    .collection("counters")
    .doc("leagues")
    .get()
    .then((doc) => doc.data().size);
};

export const getLeaguesByPage = async (
  page,
  limit,
  lastSnapshot = null,
  orderBy = "title"
) => {
  if (lastSnapshot !== null) {
    return await firestore
      .collection("leagues")
      .orderBy(orderBy, "asc")
      .startAfter(lastSnapshot)
      .limit(limit)
      .get();
  }

  return await firestore
    .collection("leagues")
    .orderBy(orderBy, "asc")
    .limit(limit)
    .get();
};

export const updateLeague = async (id, data) => {
  data = {
    updatedAt: FieldValue.serverTimestamp(),
    updatedBy: auth.currentUser.uid,
    ...data,
  };

  if (data.leagueImage instanceof File) {
    const uploadedImage = await uploadImage(data.leagueImage)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.error(err);
      });

    if (!uploadedImage) {
      throw new Error("Failed to upload image");
    } else {
      data.leagueImage = uploadedImage;
    }
  }

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

export const setLeagueStatus = async (id, status) => {
  return await firestore
    .collection('leagues')
    .doc(id)
    .update({
      status: status,
      updatedAt: FieldValue.serverTimestamp(),
      updatedBy: auth.currentUser.uid,
    }, {merge: true})
}