import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  registerWithGoogle,
  registerWithEmail,
} from "../redux/actions/register";
import styled from "styled-components";
import { AiOutlineGoogle } from "react-icons/ai";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

import BgLeft from "../assets/bg-left.png";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");

  const handleGoogleSignIn = () => {
    dispatch(registerWithGoogle());
    toast.success("Has iniciado sesión");
    navigate("/");
  };

  const handleEmailSignUp = (e) => {
    e.preventDefault();
    dispatch(registerWithEmail({ name: displayName, email, password }));
    toast.success("Has iniciado sesión");
    navigate("/");
  };

  return (
    <Container>
      <SectionDS></SectionDS>
      <BoxModal>
        <h3>Crear nueva cuenta</h3>
        <form onSubmit={handleEmailSignUp}>
          <label htmlFor="name">Nombre y apellido</label>
          <input
            type="text"
            id="name"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="btn-submit">
            Registrarse
          </button>
        </form>
        <button onClick={handleGoogleSignIn} className="btn-google">
          <AiOutlineGoogle />
          Iniciar sesión con Google
        </button>
        <h5>
          ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link>
        </h5>
      </BoxModal>
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  height: 90vh;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  background: #f3f3f3;
`;

const SectionDS = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${BgLeft});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const BoxModal = styled.div`
  width: 100%;
  height: 100%;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;

  h3 {
    font-size: 35px;
    font-weight: bold;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
  }

  h5 {
    font-size: 17px;
    a {
      text-decoration: none;
      color: #296df4;
      border-bottom: 1px solid #296df4;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    text-align: left;
    label {
      margin: 0;
      padding: 0;
      font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS",
        sans-serif;
      font-size: 17px;
    }
    input {
      width: 83%;
      border: none;
      margin-bottom: 2rem;
      outline: none;
      border-bottom: 1px solid #000;
      font-size: 21px;
      padding: 7px 21px;
      :focus {
        border-bottom: 2px solid #000;
      }
    }

    .btn-submit {
      width: 100%;
      background: #296df4;
      color: #fff;
      font-size: 21px;
      padding: 11px 23px;
      border-radius: 16px;
      border: none;
      outline: none;
      cursor: pointer;
      transition: 500ms;

      :hover {
        background: #2439f9;
      }
    }
  }
  .btn-google {
    margin-top: 2rem;
    background: #f00;
    color: #fff;
    font-size: 21px;
    padding: 11px 21px;
    border-radius: 16px;
    border: none;
    outline: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    transition: 500ms;
    :hover {
      background: #cd3232;
    }
  }
`;

export default Register;
