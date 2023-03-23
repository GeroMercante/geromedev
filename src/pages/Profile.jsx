import { doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import { getCurrentUserData } from "../context/userContext";
import { db, storage } from "../firebase/firebase";
import Loader from "./admin/components/utils/Loader";
import { MdCloudUpload } from "react-icons/md";

function Profile() {
  const user = useSelector((state) => state.auth.user);
  const isAdmin = user && user.isAdmin;
  const [userData, setUserData] = useState({});
  const [error, setError] = useState(null);
  const [imageAsset, setImageAsset] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdatingPhoto, setIsUpdatingPhoto] = useState(false);

  // Formulario
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [texto, setTexto] = useState("");
  const [telefono, setTelefono] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí podrías agregar la lógica para enviar el formulario
  };

  useEffect(() => {
    // Aquí obtienes los datos del usuario actual, incluyendo la foto de perfil
    getCurrentUserData().then((data) => {
      setUserData(data);
      setImageAsset(data.photoURL);
    });
  }, []);

  useEffect(() => {
    // Aquí obtienes los datos del usuario actual, incluyendo el nombre y correo electrónico
    getCurrentUserData().then((data) => {
      setNombre(data.displayName); // Asignamos el nombre del usuario al estado correspondiente
      setEmail(data.email); // Asignamos el correo electrónico del usuario al estado correspondiente
    });
  }, []);

  const handleImageUpload = (e) => {
    setIsLoading(true);
    const imageFile = e.target.files[0];
    const storageRef = ref(storage, `Images/${Date.now()}-${imageFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const uploadProgress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {
        console.log(error);
        toast.error("Error al subir imagen: intenta de nuevo 🙇‍♀️!");
        setIsLoading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageAsset(downloadURL);
          toast.success("Imagen cargada con éxito 😊!");

          // Actualizamos la foto de perfil en Firebase
          const currentUserRef = doc(db, "usuarios", userData.id);
          updateDoc(currentUserRef, { photoURL: downloadURL })
            .then(() => {
              toast.success("Foto de perfil actualizada con éxito!");
              setIsLoading(false);
              setIsUpdatingPhoto(false); // Cambia el valor de isUpdatingPhoto a false después de actualizar la foto de perfil
            })
            .catch((error) => {
              console.error(error);
              toast.error(
                "Error al actualizar foto de perfil: intenta de nuevo 🙇‍♀️!"
              );
              setIsLoading(false);
            });
        });
      }
    );
  };

  const handleUpdatePhoto = () => {
    setIsUpdatingPhoto(true);
  };

  const handleCancelUpdate = () => {
    setIsUpdatingPhoto(false);
    setImageAsset(userData.photoURL);
  };

  return (
    <Container>
      {isAdmin && (
        <Link to="/admin" className="btn-admin">
          Perfil Administrador
        </Link>
      )}
      <div className="left-container">
        <h2 className="profile-name">Perfil de {userData.displayName}</h2>
        {error && <div>Error: {error}</div>}
        {imageAsset && !isUpdatingPhoto && (
          <>
            <img
              src={imageAsset}
              alt="Foto de perfil"
              className="image-profile"
            />
            <button onClick={handleUpdatePhoto} className="btn-upload">
              Actualizar foto de perfil
            </button>
          </>
        )}
        {isUpdatingPhoto ? (
          <div>
            <label className="label-upload">
              <div className="div-upload">
                <MdCloudUpload className="logo-upload" />
                <p className="text-upload">Subir foto de perfil</p>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="none-upload"
              />
              {isLoading ? (
                <Loader />
              ) : (
                <>
                  <button onClick={handleCancelUpdate} className="cancel">
                    Cancelar
                  </button>
                </>
              )}
            </label>
          </div>
        ) : null}
        <h2>Correo eléctronico {userData.email}</h2>
      </div>
      <ContainerForm>
        <FormWrapper>
          <Form onSubmit={handleSubmit}>
            <FormTitle>Contactate fácil, rápido y seguro</FormTitle>
            <FormGroup>
              <InputLabel htmlFor="nombre">Nombre</InputLabel>
              <Input
                type="text"
                id="nombre"
                value={nombre}
                required
                minLength={4}
                maxLength={20}
              />
            </FormGroup>
            <FormGroup>
              <InputLabel htmlFor="email">Email</InputLabel>
              <Input type="email" id="email" value={email} required />
            </FormGroup>
            <FormGroup>
              <InputLabel htmlFor="texto">Texto</InputLabel>
              <TextArea
                id="texto"
                value={texto}
                onChange={(e) => setTexto(e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <InputLabel htmlFor="telefono">Celular (opcional)</InputLabel>
              <Input
                type="tel"
                id="telefono"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
              />
            </FormGroup>
            <Button type="submit">Enviar mensaje</Button>
          </Form>
        </FormWrapper>
      </ContainerForm>
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  .btn-admin {
    position: absolute;
    color: #fff;
    background: #296df4;
    font-size: 18px;
    padding: 7px 17px;
    border-radius: 16px;
    margin-top: 1rem;
    text-decoration: none;
    margin-bottom: 1rem;
    cursor: pointer;
    bottom: -50px;
    right: 5%;
    outline: none;
    border: none;
    :hover {
      background: #1a07fc;
    }
  }

  .profile-name {
    font-size: 40px;
    color: #296df4;
    left: 5%;
    font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
      "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
  }
  .left-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 85%;
    .image-profile {
      width: 250px;
      border: 2px solid #296df4;
    }

    .btn-upload {
      color: #fff;
      background: #296df4;
      font-size: 18px;
      padding: 7px 17px;
      border-radius: 16px;
      margin-top: 1rem;
      margin-bottom: 1rem;
      cursor: pointer;
      outline: none;
      border: none;
      :hover {
        background: #1a07fc;
      }
    }

    .label-upload {
      margin-top: 1rem;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      cursor: pointer;

      .div-upload {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 10px;
        font-size: 40px;
        color: #676666;

        :hover {
          color: #3e3e3e;
        }
        .text-upload {
          font-size: 21px;
        }
      }

      .none-upload {
        width: 0;
        height: 0;
      }
    }

    .cancel {
      color: #fff;
      background-color: #f00;
      outline: none;
      display: flex;
      justify-content: center;
      align-items: center;
      border: none;
      font-size: 18px;
      cursor: pointer;
      padding: 8px 20px;
      border-radius: 16px;
    }
  }
`;

const ContainerForm = styled.div``;

const FormWrapper = styled.div`
  margin-top: 4rem;
  margin-bottom: 4rem;
`;

const FormTitle = styled.h2`
  margin-top: 0;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 500px;
  margin: 0 auto;
  background-color: #fff;
  color: #000;
  padding: 20px;
  border-radius: 8px;
  border: 3px solid #296df4;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
  width: 90%;
`;

const InputLabel = styled.label`
  display: block;
  margin-bottom: 5px;
`;

const Input = styled.input`
  border: none;
  outline: 1px solid #296df4;
  border-radius: 5px;
  padding: 10px;
  width: 100%;
  font-size: 16px;
  color: #000;
  background-color: #fff;
`;

const TextArea = styled.textarea`
  border: none;
  border-radius: 5px;
  padding: 10px;
  font-size: 16px;
  color: #000;
  outline: 1px solid #296df4;
  background-color: #fff;
  height: 150px;
  width: 100%;
`;

const Button = styled.button`
  border: none;
  border-radius: 5px;
  padding: 10px;
  font-size: 16px;
  color: #fff;
  width: 95%;
  background-color: #296df4;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #2252b6;
  }
`;

export default Profile;
