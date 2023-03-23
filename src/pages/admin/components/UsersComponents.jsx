import React, { useEffect, useState } from "react";
import { db } from "../../../firebase/firebase";

const UsersComponents = () => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const obtenerusuarios = async () => {
      const usuariosRef = db.collection("usuarios");
      const snapshot = await usuariosRef.get();
      const nuevosUsuarios = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsuarios(nuevosUsuarios);
    };
    obtenerusuarios();
  }, []);

  const ordenarAscendente = () => {
    const nuevosUsuarios = [...usuarios].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    setUsuarios(nuevosUsuarios);
  };

  const ordenarDescendente = () => {
    const nuevosUsuarios = [...usuarios].sort((a, b) =>
      b.name.localeCompare(a.name)
    );
    setUsuarios(nuevosUsuarios);
  };

  console.log(usuarios);

  return (
    <div>
      <h1>Vista de usuarios</h1>
      <div>
        <button onClick={ordenarAscendente}>Ordenar A-Z</button>
        <button onClick={ordenarDescendente}>Ordenar Z-A</button>
      </div>
      {usuarios.map((usuario) => (
        <div key={usuario.id}>
          <div className="logo">
            <p>{usuario.name}</p>
            <p>{usuario.email}</p>
            <img src={usuario.imageURL} alt={usuario.titulo} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default UsersComponents;
