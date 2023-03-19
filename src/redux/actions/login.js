import { auth, db } from "../../firebase/firebase";
import { LOGIN, LOGIN_FAIL, LOGOUT, LOGOUT_FAIL } from "../types";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

export const login = (email, password) => async (dispatch) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    const docRef = doc(db, "usuarios", user.uid);
    const docSnap = await getDoc(docRef);
    const isAdmin = docSnap.get("isAdmin");
    dispatch({
      type: LOGIN,
      payload: {
        uid: user.uid,
        email: user.email,
        isAdmin: isAdmin,
      },
    });
  } catch (error) {
    console.error(error);
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

export const logout = () => async (dispatch) => {
  try {
    await signOut(auth);
    dispatch({
      type: LOGOUT,
    });
  } catch (error) {
    console.error(error);
    dispatch({
      type: LOGOUT_FAIL,
    });
  }
};
