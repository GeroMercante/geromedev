import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import {
  About,
  Admin,
  Contact,
  Error404,
  Home,
  Login,
  Novedades,
  Perfil,
  Register,
  Service,
} from "../pages";
import PrivateRoute from "./privateRoute";
import AdminRoute from "./adminRoute";

const AppRoutes = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/*" element={<Error404 />} />
        <Route index path="/" element={<Home />} />
        <Route path="/sobre-nosotros" element={<About />} />
        <Route path="/contacto" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Register />} />
        <Route path="/servicios" element={<Service />} />
        <Route path="/novedades" element={<Novedades />} />
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
