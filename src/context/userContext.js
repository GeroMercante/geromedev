import { auth, db } from "../firebase/firebase";

export const getCurrentUserData = async () => {
  const currentUser = auth.currentUser;
  const userData = {};

  if (currentUser) {
    const userDoc = await db.collection("usuarios").doc(currentUser.uid).get();
    userData.id = userDoc.id;
    userData.displayName = currentUser.displayName;
    userData.email = currentUser.email;
    userData.photoURL = userDoc.data().photoURL;
    userData.imageProfile = userDoc.data().imageProfile;
  }

  return userData;
};
