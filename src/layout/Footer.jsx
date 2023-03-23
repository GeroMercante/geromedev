import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import {
  AiOutlineInstagram,
  AiOutlineGithub,
  AiOutlineFacebook,
  AiOutlineTwitter,
} from "react-icons/ai";

const Footer = () => {
  return (
    <FooterContain>
      <div className="end-footer">
        <h3>Español</h3>
      </div>
      <div className="main-footer">
        <div>
          {" "}
          <h2>GeromeDev.</h2>
        </div>
        <div className="sections">
          <ul>
            <li>
              <Link to="/">Inicio</Link>
            </li>
            <li>
              <Link to="/contacto">Contacto</Link>
            </li>
            <li>
              <Link to="/servicios">Servicios</Link>
            </li>
            <li>
              <Link>Politicas de privacidad</Link>
            </li>
          </ul>
        </div>
        <div className="socials">
          <AiOutlineGithub />
          <AiOutlineInstagram />
          <AiOutlineTwitter />
          <AiOutlineFacebook />
        </div>
      </div>
      <div className="end-footer-r">
        <h3>Todos los derechos reservados.</h3>
      </div>
    </FooterContain>
  );
};

const FooterContain = styled.div`
  /* margin-top: 30rem; */
  height: 35vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  background: #296df4;
  align-items: center;
  position: relative;

  .main-footer {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
    color: #fff;

    ul {
      display: flex;
      li {
        list-style: none;
        margin: 0 20px;
        a {
          text-decoration: none;
          color: #fff;
          font-size: 21px;
        }
      }
    }
    .socials {
      display: flex;
      gap: 1rem;
      font-size: 30px;
      color: #fff;
    }
  }

  .end-footer {
    position: absolute;
    left: 5%;
    bottom: 5%;
    h3 {
      color: #fff;
      font-size: 18px;
    }
  }

  .end-footer-r {
    position: absolute;
    right: 5%;
    bottom: 5%;
    h3 {
      color: #fff;
      font-size: 18px;
    }
  }
`;

export default Footer;
