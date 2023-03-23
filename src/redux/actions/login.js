import { auth, db } from "../../firebase/firebase";
import { LOGIN, LOGIN_FAIL, LOGOUT, LOGOUT_FAIL } from "../types";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore"; // Importamos doc y getDoc desde firebase/firestore
import { toast } from "react-toastify";

export const login = (email, password) => async (dispatch) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    const docRef = doc(db, "usuarios", user.uid);
    const docSnap = await getDoc(docRef);
    const isAdmin = docSnap.get("isAdmin"); // Obtenemos el valor de isAdmin del documento
    dispatch({
      type: LOGIN,
      payload: {
        uid: user.uid,
        email: user.email,
        isAdmin: isAdmin, // Agregamos isAdmin como una propiedad del objeto payload
        displayName: user.displayName,
      },
    });
    localStorage.setItem(
      "auth",
      JSON.stringify({
        uid: user.uid,
        email: user.email,
        isAdmin: isAdmin, // Agregamos isAdmin al objeto que se guarda en localStorage
        displayName: user.displayName,
      })
    );
    toast.success("Has iniciado sesión");
  } catch (error) {
    console.error(error);
    dispatch({
      type: LOGIN_FAIL,
    });
    toast.error("Error al iniciar sesión");
  }
};

export const logout = () => async (dispatch) => {
  try {
    localStorage.removeItem("auth");
    await signOut(auth);
    dispatch({
      type: LOGOUT,
    });
    toast.success("Has cerrado sesión");
  } catch (error) {
    console.error(error);
    dispatch({
      type: LOGOUT_FAIL,
    });
    toast.error("Error al cerrar sesión");
  }
};
