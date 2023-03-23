import React, { useState } from "react";
import styled from "styled-components";

const Contact = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [texto, setTexto] = useState("");
  const [telefono, setTelefono] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí podrías agregar la lógica para enviar el formulario
  };

  return (
    <FormWrapper>
      <Form onSubmit={handleSubmit}>
        <FormTitle>Contacto</FormTitle>
        <FormGroup>
          <InputLabel htmlFor="nombre">Nombre</InputLabel>
          <Input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
            minLength={4}
            maxLength={20}
          />
        </FormGroup>
        <FormGroup>
          <InputLabel htmlFor="email">Email</InputLabel>
          <Input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
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
          <InputLabel htmlFor="telefono">Teléfono</InputLabel>
          <Input
            type="tel"
            id="telefono"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
          />
        </FormGroup>
        <Button type="submit">Enviar</Button>
      </Form>
    </FormWrapper>
  );
};

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
export default Contact;
