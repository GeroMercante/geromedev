import React, { useEffect, useState } from "react";
import { getNovedades } from "../firebase/firebaseFunctions";

const Novedades = () => {
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
      {novedades.map((novedad) => (
        <div key={novedad.id} className="novedad">
          <h3>{novedad.titulo}</h3>
          <img src={novedad.imageURL} alt="" />
          <p>{novedad.fecha}</p>
          <p>{novedad.categoria}</p>
          <p>{novedad.descripcion}</p>
        </div>
      ))}
    </>
  );
};

export default Novedades;
