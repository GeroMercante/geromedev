import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { getNovedades } from "../firebase/firebaseFunctions";

const Novedades = () => {
  const user = useSelector((state) => state.auth.user);

  const [novedades, setNovedades] = useState([]);

  useEffect(() => {
    async function fetchNovedades() {
      const novedadesData = await getNovedades();
      setNovedades(novedadesData);
    }
    fetchNovedades();
  }, []);

  console.log(novedades);

  return (
    <>
      {!user ? (
        <IniciaSesion>
          <h1>Debes iniciar sesión para ver las novedades</h1>
          <div className="register-guide">
            <Link to="/login">
              <h3>Inicia sesión</h3>{" "}
            </Link>
            <p>- ó -</p>{" "}
            <Link to="/registro">
              <h3>Registrate gratis</h3>
            </Link>
          </div>
        </IniciaSesion>
      ) : (
        <Container>
          {novedades.map((novedad) => (
            <div key={novedad.id} className="novedad">
              <div className="banner">
                <h3>{novedad.titulo}</h3>
                <img src={novedad.imageURL} alt="" />
                <p className="paragraph">{novedad.fecha}...</p>
                <Category category={novedad.categoria}>
                  {novedad.categoria}
                </Category>
              </div>
              <p className="description">{novedad.descripcion}</p>
            </div>
          ))}
        </Container>
      )}
    </>
  );
};

const IniciaSesion = styled.div`
  width: 100vw;
  height: 60vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  margin: 0;
  padding: 0;

  h1 {
    text-transform: uppercase;
    font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS",
      sans-serif;
  }

  .register-guide {
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    gap: 20px;
    margin: 0;
    padding: 0;
    a {
      text-decoration: none;
    }
    h3 {
      color: #2247dd;
      :hover {
        border-bottom: 1px solid #2247dd;
      }
    }
    p {
      font-size: 21px;
    }
  }
`;

const Container = styled.div`
  width: 100vw;
  height: auto;
  margin: 50px 0;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
  gap: 20px 40px;
  position: relative;

  .novedad {
    .banner {
      position: relative;
      img {
        width: 600px;
        position: relative;
        height: 350px;
        border-radius: 8px;
        object-fit: cover;
      }
      h3 {
        bottom: 0;
        color: #fff;
        z-index: 10;
        font-size: 27px;
        text-shadow: 1px 1px #000;
        position: absolute;
        margin-left: 11px;
        bottom: -10px;
      }
      .paragraph {
        bottom: 0;
        color: #fff;
        z-index: 10;
        font-size: 27px;
        text-shadow: 1px 1px 1px #000;
        position: absolute;
        right: 0;
        top: -30px;
      }
    }
  }
  .description {
    width: 500px;
  }
`;

const Category = styled.p`
  background-color: ${({ category }) => {
    switch (category) {
      case "Consultoría":
        return "yellow";
      case "Tecnología":
        return "lightblue";
      case "Diseño":
        return "burlywood";
      case "Desarrollo":
        return "green";
      case "Marketing":
        return "red";
      default:
        return "gray";
    }
  }};
  position: absolute;
  color: white;
  width: fit-content;
  right: 0;
  bottom: 2%;
  padding: 5px;
  height: fit-content;
  border-radius: 5px;
  margin: 5px;
`;

export default Novedades;
