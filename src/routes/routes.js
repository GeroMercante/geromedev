import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import {
  Admin,
  Contact,
  Error404,
  Home,
  Login,
  Novedades,
  Perfil,
  Register,
  Service,
  Desarrollo,
} from "../pages";
import PrivateRoute from "./privateRoute";
import AdminRoute from "./adminRoute";
import { useDispatch } from "react-redux";
import { LOGIN } from "../redux/types";

const AppRoutes = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const storedAuth = JSON.parse(localStorage.getItem("auth"));
    if (storedAuth) {
      dispatch({
        type: LOGIN,
        payload: storedAuth,
      });
    }
  }, [dispatch]);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/*" element={<Error404 />} />
        <Route index path="/" element={<Home />} />
        <Route path="/contacto" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Register />} />
        <Route path="/servicios" element={<Service />} />
        <Route path="/novedades" element={<Novedades />} />
        <Route path="/desarrollo" element={<Desarrollo />} />
        {/* Rutas protegidas */}
        <Route path="/perfil" element={<PrivateRoute />}>
          <Route path="/perfil" element={<Perfil />} />
        </Route>
        {/* Admin */}
        <Route path="/admin" element={<AdminRoute />}>
          <Route path="/admin" element={<Admin />} />
        </Route>
      </Routes>
      <Footer />
    </Router>
  );
};

export default AppRoutes;
