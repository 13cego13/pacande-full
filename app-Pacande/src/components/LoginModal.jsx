import React, { useState } from 'react';
import styled from '@emotion/styled';
import { toast } from 'react-toastify';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import { registerUser, loginUser } from '../services/authService'; // Asegúrate que la ruta sea correcta

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(8px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000000;
`;

const ModalContent = styled.div`
  background-color: rgba(0, 0, 0, 0.8);
  padding: 2rem;
  width: 400px;
  border-radius: 20px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.8);
  position: relative;
  text-align: center;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #ffffff;
`;

const Title = styled.h2`
  color: #fff;
  margin-bottom: 1.5rem;
`;

const InputContainer = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;

  &:hover {
    input {
      border-color: #FF0000;
      color: #FF0000;
    }

    input::placeholder {
      color: #FF0000;
    }

    svg {
      color: #FF0000;
    }
  }
`;

const InputIcon = styled.div`
  position: absolute;
  left: 10px;
  color: #fff;
  transition: color 0.3s ease;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 0.75rem 0.75rem 2.5rem;
  border: 1px solid #fff;
  border-radius: 5px;
  outline: none;
  background-color: rgba(0, 0, 0, 0.5);
  color: #ffffff;
  transition: border-color 0.3s ease, color 0.3s ease;

  &::placeholder {
    color: #fff;
    transition: color 0.3s ease;
  }
`;

const Button = styled.button`
  width: 50%;
  padding: 0.75rem;
  color: #FFFFFF;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 1.5rem;
  background-color: rgba(0, 0, 0, 0.8);
  transition: background-color 0.3s ease;
  border: 1px solid #fff;

  &:hover {
    background-color: #CC0000;
  }
`;

const ToggleLink = styled.p`
  margin-top: 1rem;
  color: #FFFFFF;
  font-size: 0.9rem;

  a {
    color: #FF0000;
    text-decoration: none;
    font-weight: bold;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const LoginModal = ({ onClose }) => {
  const [showRegister, setShowRegister] = useState(false);
  const [nombreCompleto, setNombreCompleto] = useState('');
  const [correo, setCorreo] = useState('');  // Cambio de 'email' a 'correo'
  const [contraseña, setContraseña] = useState(''); // Cambio de 'password' a 'contraseña'

  const toggleForm = () => {
    setShowRegister(!showRegister);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (showRegister) {
        await registerUser({
          nombre: nombreCompleto,
          correo,  // Enviar 'correo' en lugar de 'email'
          contraseña,  // Enviar 'contraseña' en lugar de 'password'
        });
        toast.success('✅ Registro exitoso');
        setShowRegister(false); // Cambia al formulario de login
        setNombreCompleto('');
        setCorreo('');
        setContraseña('');
      } else {
        const data = await loginUser({
          correo,  // Enviar 'correo' en lugar de 'email'
          contraseña,  // Enviar 'contraseña' en lugar de 'password'
        });
        localStorage.setItem('token', data.token);
        localStorage.setItem('nombre', data.usuario.nombre);
        localStorage.setItem('rol', data.usuario.rol);
        toast.success('✅ Inicio de sesión exitoso');
        setTimeout(() => {
          onClose(); // Cierra el modal
          window.location.reload(); // Recarga después de 2 segundos
        }, 2000); // 🔄 Recarga la página
      }
    } catch (err) {
      toast.error(`❌ Error: ${err.message}`);
    }
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        {showRegister ? (
          <>
            <Title>Crear Cuenta</Title>
            <form onSubmit={handleSubmit}>
              <InputContainer>
                <InputIcon><FaUser /></InputIcon>
                <Input
                  type="text"
                  placeholder="Nombre Completo"
                  value={nombreCompleto}
                  onChange={(e) => setNombreCompleto(e.target.value)}
                  required
                />
              </InputContainer>
              <InputContainer>
                <InputIcon><FaEnvelope /></InputIcon>
                <Input
                  type="email"
                  placeholder="Correo Electrónico"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  required
                />
              </InputContainer>
              <InputContainer>
                <InputIcon><FaLock /></InputIcon>
                <Input
                  type="password"
                  placeholder="Contraseña"
                  value={contraseña}
                  onChange={(e) => setContraseña(e.target.value)}
                  required
                />
              </InputContainer>
              <Button type="submit">Registrarse</Button>
            </form>
            <ToggleLink>
              ¿Ya tienes cuenta? <a onClick={toggleForm}>Inicia sesión aquí</a>
            </ToggleLink>
          </>
        ) : (
          <>
            <Title>Iniciar Sesión</Title>
            <form onSubmit={handleSubmit}>
              <InputContainer>
                <InputIcon><FaEnvelope /></InputIcon>
                <Input
                  type="email"
                  placeholder="Correo Electrónico"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  required
                />
              </InputContainer>
              <InputContainer>
                <InputIcon><FaLock /></InputIcon>
                <Input
                  type="password"
                  placeholder="Contraseña"
                  value={contraseña}
                  onChange={(e) => setContraseña(e.target.value)}
                  required
                />
              </InputContainer>
              <Button type="submit">Iniciar Sesión</Button>
            </form>
            <ToggleLink>
              ¿No tienes cuenta? <a onClick={toggleForm}>Regístrate aquí</a>
            </ToggleLink>
          </>
        )}
      </ModalContent>
    </ModalOverlay>
  );
};

export default LoginModal;
