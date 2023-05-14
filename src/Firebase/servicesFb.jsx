import { db } from "./index";
import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
  query,
  where,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";

export const addDocument = async (nameCollection, data) => {
  return await addDoc(collection(db, nameCollection), {
    ...data,
    createdAt: serverTimestamp(),
  });
};

function normalizeText(text) {
  if (!text) return false;
  return text.normalize("NFD").replace(/[\u0300-\u036f\s]/g, "");
}
export const checkUsernameExists = async (username) => {
  const querySnapshot = await getDocs(collection(db, "users"));
  const users = querySnapshot.docs.map((doc) => doc.data());
  return users.some((user) => {
    return normalizeText(user.displayName) === normalizeText(username);
  });
};

export const addFriend = async (userId, friendId) => {
  const querySnapshot = await getDocs(collection(db, "users"));
  querySnapshot.docs.map(async (doc) => {
    if (doc.data().id === userId) {
      await updateDoc(doc.ref, { friends: [...doc.data().friends, friendId] });
    }
  });
};

export const listenToFriends = (userId, callback) => {
  const q = query(collection(db, "users"), where("id", "==", userId));

  const unsubscribe = onSnapshot(q, (snapshot) => {
    snapshot.forEach((doc) => {
      if (doc.data().id === userId) {
        const friends = doc.data().friends || [];
        callback(friends);
      }
    });
  });
  return unsubscribe;
};

export const getFriendsFromId = async (friendsId) => {
  const q = query(collection(db, "users"), where("id", "in", friendsId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => doc.data());
};

export const register = async (data) => {
  try {
    const response = await fetch(
      "http://localhost/api-web-blog/user?action=register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const data = await response.json();
    return data.status;
  } catch (error) {
    console.error(error);
  }
};
