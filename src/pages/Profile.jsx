import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Profile = () => {
  const user = useSelector((state) => state.auth.user);
  const isAdmin = user && user.isAdmin;

  return (
    <div>
      <h1>perfil</h1>
      {isAdmin && (
        <div>
          <Link to="/admin">Perfil Administrador</Link>
        </div>
      )}
    </div>
  );
};

export default Profile;
