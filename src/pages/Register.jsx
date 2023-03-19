import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  registerWithGoogle,
  registerWithEmail,
} from "../redux/actions/register";
import styled from "styled-components";
import { AiOutlineGoogle } from "react-icons/ai";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

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
      <BoxModal>
        <h3>Registrarse</h3>
        <form onSubmit={handleEmailSignUp}>
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="Nombre y Apellido"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Correo electrónico"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
          />
          <button type="submit" className="btn-submit">
            Registrarse
          </button>
        </form>
        <button onClick={handleGoogleSignIn} className="btn-google">
          <AiOutlineGoogle />
          Iniciar sesión con Google
        </button>
      </BoxModal>
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f3f3f3;
`;

const BoxModal = styled.div`
  width: 50%;
  height: 70%;
  background: white;
  border-radius: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  box-shadow: 2px 3px 2px 3px rgba(0, 0, 0, 0.5);

  h3 {
    position: absolute;
    top: 5%;
    font-size: 40px;
    text-transform: uppercase;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1.3rem;
    input {
      width: 100%;
      border: none;
      outline: none;
      border-bottom: 1px solid #000;
      font-size: 21px;
      padding: 11px 22px;
      :focus {
        outline: 1px solid #000;
      }
    }

    .btn-submit {
      background: #296df4;
      color: #fff;
      font-size: 21px;
      padding: 11px 21px;
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
    position: absolute;
    bottom: 16%;
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
