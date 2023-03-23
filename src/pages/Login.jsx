import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { login } from "../redux/actions/login";
import { registerWithGoogle } from "../redux/actions/register";
import { AiOutlineGoogle } from "react-icons/ai";

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
    navigate("/");
  };

  const handleGoogleSignIn = () => {
    dispatch(registerWithGoogle());
    navigate("/");
  };

  return (
    <>
      <Container>
        <div className="form-container">
          <h1>Iniciar sesión</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Login</button>
            <div className="line"></div>
          </form>
          <button onClick={handleGoogleSignIn} className="btn-google">
            <AiOutlineGoogle />
            Iniciar sesión con Google
          </button>
        </div>
      </Container>
    </>
  );
};

const Container = styled.div`
  width: 100vw;
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .form-container {
    width: 560px;
    height: 600px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #dcdcdc;
    border-radius: 16px;
    position: relative;
    padding: 11px 27px;

    h1 {
      position: absolute;
      left: 5%;
      top: 5%;
      font-size: 33px;
      text-transform: uppercase;
      font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS",
        sans-serif;
    }

    form {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-top: 5rem;
      text-align: left;
      width: 90%;
      gap: 1rem;
      label {
        font-size: 21px;
        text-transform: uppercase;
        text-align: left;
        font-weight: 600;
        width: 100%;
      }
      input {
        width: 100%;
        font-size: 21px;
        padding: 11px 4px;
        border: 2px solid #dcdcdc;
        border-radius: 8px;
        outline: 1px solid #296df4;
        :focus {
          outline: 2px solid #296df4;
        }
      }
      button {
        background: #296df4;
        color: #fff;
        width: 100%;
        font-size: 21px;
        border-radius: 8px;
        padding: 11px 35px;
        margin-top: 1rem;
        border: none;
        outline: none;
        cursor: pointer;
      }
      .line {
        height: 2px;
        width: 100%;
        background-color: #777777;
        margin: 20px 0;
      }
    }
  }
  .btn-google {
    margin-top: 2rem;
    background: #f00;
    color: #fff;
    font-size: 21px;
    padding: 11px 21px;
    border-radius: 8px;
    border: none;
    outline: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    width: 90%;
    align-items: center;
    gap: 20px;
    transition: 500ms;
    :hover {
      background: #cd3232;
    }
  }
`;

export default Login;
