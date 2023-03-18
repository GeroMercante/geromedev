import { Link } from "react-router-dom";
import React from "react";
import styled from "styled-components";

// Icons
import { BiUser, BiLogIn } from "react-icons/bi";

const Navbar = () => {
  return (
    <NavbarContainer>
      <HeaderNav>
        <div className="btn-nav">
          <Link to="/login">
            <h3>
              <BiLogIn />
              Login
            </h3>
          </Link>
        </div>
        <div className="mid-nav">
          <ul>
            <li>
              <Link to="/">Inicio</Link>
            </li>
            <li>
              <Link to="/sobre-nosotros">Sobre nosotros</Link>
            </li>
            <li>
              <Link to="/servicios">Servicios</Link>
            </li>
            <li>
              <h1>W</h1>
            </li>
            <li>
              <Link to="/">Marketing</Link>
            </li>
            <li>
              <Link to="/">Soluciones</Link>
            </li>
            <li>
              <Link to="/registro">Registrarse</Link>
            </li>
          </ul>
        </div>
        <div className="btn-nav">
          <Link to="/profile">
            <h3>
              <BiUser />
              Perfil
            </h3>
          </Link>
        </div>
      </HeaderNav>
    </NavbarContainer>
  );
};

const NavbarContainer = styled.div`
  width: 100vw;
  position: fixed;
  height: 100px;
  background: #296df4;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const HeaderNav = styled.div`
  height: 100%;
  width: 90%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .btn-nav {
    a {
      text-decoration: none;
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
        }
        a {
          text-decoration: none;
          color: #fff;
          font-size: 15px;
          text-transform: uppercase;
          transition: 150ms;
          :hover {
            border-bottom: 1px solid rgba(255, 255, 255, 0.5);
          }
        }
      }
    }
  }
`;

export default Navbar;
