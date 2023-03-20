import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import { db } from "../../../firebase/firebase";
import { motion } from "framer-motion";
import { MdDelete } from "react-icons/md";

function DataContain() {
  const [novedades, setNovedades] = useState([]);

  useEffect(() => {
    const obtenerNovedades = async () => {
      const novedadesRef = db.collection("novedades");
      const snapshot = await novedadesRef.get();
      const nuevasNovedades = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNovedades(nuevasNovedades);
    };
    obtenerNovedades();
  }, []);

  const handleDeleteNovedad = async (novedadId) => {
    try {
      const novedadRef = db.collection("novedades").doc(novedadId);
      await novedadRef.delete();
      setNovedades(novedades.filter((n) => n.id !== novedadId));
      console.log("Novedad eliminada con éxito.");
      toast.success("Articulo eliminado con éxito");
    } catch (error) {
      console.error("Error al eliminar la novedad: ", error);
      toast.error("Error al eliminar articulo");
    }
  };

  return (
    <Container>
      {novedades.map((novedad) => (
        <div key={novedad.id}>
          <div className="logo">
            <h2>{novedad.titulo}</h2>
            <img src={novedad.imageURL} alt={novedad.titulo} />
            <motion.button
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.5 }}
              onClick={() => handleDeleteNovedad(novedad.id)}
              className="btn-delete"
            >
              <MdDelete />
            </motion.button>
          </div>
        </div>
      ))}
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-top: 2rem;
  align-items: center;
  position: relative;
  .logo {
    width: 800px;
    height: 80px;
    position: relative;
    margin: 10px 0;
    border: 1px solid #000;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 11px;
    border-radius: 8px;
    h2 {
      font-size: 20px;
      text-align: left;
      position: absolute;
      left: 2%;
    }
    img {
      width: 100px;
      height: 80px;
      object-fit: cover;
    }
    .btn-delete {
      color: #f00;
      padding: 11px;
      display: flex;
      justify-content: center;
      align-items: center;
      border: none;
      outline: none;
      font-size: 21px;
      background: transparent;
      border: 2px solid #000;
      border-radius: 50%;
      margin-left: 1rem;
      cursor: pointer;
    }
  }
`;

export default DataContain;
