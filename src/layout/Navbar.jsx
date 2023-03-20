import { Link } from "react-router-dom";
import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/actions/login";

// Icons
import { BiUser, BiLogIn, BiLogOut } from "react-icons/bi";
import { toast } from "react-toastify";

const Navbar = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Se ha cerra la sesión");
  };
  return (
    <NavbarContainer>
      <Correction></Correction>
      <HeaderNav>
        <motion.div
          className="btn-nav"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.8 }}
        >
          {user ? (
            <h3 onClick={handleLogout} className="btn-logout">
              <BiLogOut /> Cerrar sesión
            </h3>
          ) : (
            <Link to="/login">
              <h3>
                <BiLogIn />
                Login
              </h3>
            </Link>
          )}
        </motion.div>
        <div className="mid-nav">
          <ul>
            <li>
              <Link to="/">Inicio</Link>
            </li>
            <li>
              <Link to="/novedades">Novedades</Link>
            </li>
            <li>
              <Link to="/servicios">Servicios</Link>
            </li>
            <li>
              <Link to="/">
                <h1>W</h1>
              </Link>
            </li>
            <li>
              <Link to="/">Diseño</Link>
            </li>
            <li>
              <Link to="/sobre-nosotros">Sobre nosotros</Link>
            </li>
            <li>
              <Link to="/registro">Registrarse</Link>
            </li>
          </ul>
        </div>
        <motion.div
          className="btn-nav"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.8 }}
        >
          {user ? (
            <Link to="/perfil">
              <h3>
                <BiUser />
                Perfil
              </h3>
            </Link>
          ) : (
            <div>
              <h3 className="opacity">
                <BiUser />
                Perfil
              </h3>
            </div>
          )}
        </motion.div>
      </HeaderNav>
    </NavbarContainer>
  );
};

const NavbarContainer = styled.div`
  width: 98vw;
  position: relative;
  height: 100px;
  background: #296df4;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Correction = styled.div`
  background: #296df4;
  z-index: -1;
  height: 100%;
  position: absolute;
  top: 0;
  right: -350px;
  width: 100vw;
`;

const HeaderNav = styled.div`
  height: 100%;
  width: 90%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .btn-logout {
    cursor: pointer;
    display: flex;
    gap: 11px;
    font-size: 15px;
    font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
      "Lucida Sans", Arial, sans-serif;
    justify-content: center;
    color: #fff;
    border: 1px solid rgba(255, 255, 255, 0.5);
    padding: 11px 17px;
    border-radius: 66px;
    text-transform: uppercase;
  }

  .btn-nav {
    a {
      text-decoration: none;
    }
    .opacity {
      opacity: 0;
    }
    h3 {
      display: flex;
      gap: 11px;
      font-size: 15px;
      font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
        "Lucida Sans", Arial, sans-serif;
      justify-content: center;
      color: #fff;
      border: 1px solid rgba(255, 255, 255, 0.5);
      padding: 11px 17px;
      border-radius: 66px;
      text-transform: uppercase;
    }
  }

  .mid-nav {
    ul {
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      li {
        list-style: none;
        margin: 0 20px;
        h1 {
          margin: 0;
          font-size: 40px;
          color: #fff;
          padding: 11px 15px;
          border-radius: 50%;
          border: 3px solid rgba(255, 255, 255, 0.5);
          cursor: pointer;
        }
        a {
          text-decoration: none;
          color: #fff;
          font-size: 15px;
          text-transform: uppercase;
          transition: 150ms;
          :hover {
            border-bottom: 1px solid #fff;
          }
        }
      }
    }
  }
`;

export default Navbar;
