import { firebase, db, googleAuthProvider } from "../../firebase/firebase";
import { LOGIN, LOGIN_FAIL } from "../types";

export const registerWithGoogle = () => {
  return (dispatch) => {
    firebase
      .auth()
      .signInWithPopup(googleAuthProvider)
      .then((result) => {
        const uid = result.user.uid;
        const userRef = db.collection("usuarios").doc(uid);
        userRef.set({
          name: result.user.displayName,
          email: result.user.email,
          isAdmin: false,
        });
        dispatch({
          type: LOGIN,
          payload: result.user,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };
};

export const registerWithEmail = ({ name, email, password }) => {
  return (dispatch) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        const uid = result.user.uid;
        const userRef = db.collection("usuarios").doc(uid);

        userRef.set({
          name,
          email,
          isAdmin: false,
        });

        dispatch({
          type: LOGIN,
          payload: result.user,
        });
      })
      .catch((error) => {
        dispatch({
          type: LOGIN_FAIL,
          payload: error.message,
        });
      });
  };
};
