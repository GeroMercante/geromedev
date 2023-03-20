import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { CreadoComponent, UsersComponents } from "./components/";
import { AiOutlineUserSwitch } from "react-icons/ai";
import { IoCreateSharp } from "react-icons/io5";

const Admin = () => {
  const [creator, setCreator] = useState(false);
  const [users, setUsers] = useState(false);

  const handleCreator = (e) => {
    e.preventDefault();
    setCreator(true);
    setUsers(false);
  };

  const handleUsers = (e) => {
    e.preventDefault();
    setUsers(true);
    setCreator(false);
  };

  return (
    <>
      <Container>
        <div className="input-contain">
          <h3 onClick={handleCreator}>
            <IoCreateSharp className="logo-admin" />
          </h3>
          <h3 onClick={handleUsers}>
            <AiOutlineUserSwitch className="logo-admin" />
          </h3>
        </div>
        <div className="container">
          {creator && <CreadoComponent />}
          {users && <UsersComponents />}
        </div>
      </Container>
    </>
  );
};

const Container = styled.div`
  height: auto;
  width: 100vw;
  min-height: 550px;

  .input-contain {
    position: fixed;
    left: -20px;
    margin-top: 2rem;
    background: #296df4;
    backdrop-filter: blur(1px);
    height: 250px;
    width: 120px;
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .logo-admin {
      font-size: 25px;
      color: #fff;
      padding: 15px;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 2px solid #fff;
      border-radius: 50%;
      cursor: pointer;
      :hover {
        color: #8dace0;
        border: 2px solid #8dace0;
      }
    }
  }

  .container {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export default Admin;
