import { toast } from "react-toastify";
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
          uid: result.user.uid,
          name: result.user.displayName,
          email: result.user.email,
          displayName: result.user.displayName,
        });
        userRef.get().then((doc) => {
          if (doc.exists) {
            const user = doc.data();
            dispatch({
              type: LOGIN,
              payload: {
                uid: result.user.uid,
                email: result.user.email,
                isAdmin: user.isAdmin, // Obtener isAdmin del documento de usuario
                displayName: result.user.displayName,
              },
            });
            localStorage.setItem(
              "auth",
              JSON.stringify({
                uid: result.user.uid,
                email: result.user.email,
                isAdmin: user.isAdmin, // Guardar isAdmin en localStorage
                displayName: result.user.displayName,
              })
            );
            toast.success("Has iniciado sesión");
          } else {
            console.log("No such document!");
          }
        });
      })
      .catch((e) => {
        console.log(e);
        toast.error("Error al registrarse");
      });
  };
};

export const registerWithEmail = ({ displayName, email, password }) => {
  return (dispatch) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        const uid = result.user.uid;
        const userRef = db.collection("usuarios").doc(uid);

        userRef.set({
          uid,
          email,
          isAdmin: false,
        });

        userRef.get().then((doc) => {
          if (doc.exists) {
            const user = doc.data();
            dispatch({
              type: LOGIN,
              payload: {
                uid: result.user.uid,
                email: result.user.email,
                isAdmin: user.isAdmin,
                displayName,
              },
            });
            localStorage.setItem(
              "auth",
              JSON.stringify({
                uid: result.user.uid,
                email: result.user.email,
                isAdmin: user.isAdmin,
                displayName,
              })
            );
            toast.success("Has iniciado sesión");
          } else {
            console.log("No such document!");
          }
        });
      })
      .catch((error) => {
        dispatch({
          type: LOGIN_FAIL,
          payload: error.message,
        });
        toast.error("Error al registrarse");
      });
  };
};
