import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';

const Container = styled.div`
  padding: 180px 20px 100px;
  max-width: 700px;
  margin: 0 auto;
  background-color: #f7f7f7;
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 30px;
  color: #000;
`;

const AccordionSection = styled.div`
  border: 1px solid #ccc;
  border-radius: 10px;
  margin-bottom: 20px;
  overflow: hidden;
`;

const AccordionHeader = styled.div`
  background-color: #000;
  color: white;
  padding: 15px 20px;
  cursor: pointer;
  font-weight: bold;
`;

const AccordionContent = styled.div`
  padding: 20px;
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  background-color: #fff;
`;

const Label = styled.label`
  display: block;
  margin-top: 15px;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1.5px solid #ccc;
  border-radius: 10px;
  margin-top: 5px;
  outline: none;

  &:focus {
    border-color: #FF0000;
  }
`;

const Button = styled.button`
  margin-top: 25px;
  width: 100%;
  padding: 12px;
  background-color: rgb(0, 0, 0);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #cc0000;
  }
`;

const PerfilPage = () => {
  const [perfil, setPerfil] = useState({ nombre: '', correo: '' });
  const [passwordActual, setPasswordActual] = useState('');
  const [passwordNueva, setPasswordNueva] = useState('');
  const [openSection, setOpenSection] = useState('perfil');

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchPerfil = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/auth/perfil', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        });

        if (!res.ok) throw new Error('Error al obtener el perfil');
        const data = await res.json();
        setPerfil(data || { nombre: '', correo: '' });  // Asegúrate de que 'data' no sea null
      } catch (err) {
        alert('No se pudo cargar el perfil');
      }
    };

    if (token) fetchPerfil();
  }, [token]);

  const handleGuardarPerfil = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/auth/actualizar', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ nombre: perfil.nombre, correo: perfil.correo }),
      });

      if (!res.ok) throw new Error('Error al actualizar perfil');
      alert('Datos actualizados con éxito');
    } catch (err) {
      alert('Hubo un problema al actualizar');
    }
  };

  const handleGuardarContraseña = async () => {
    if (!passwordActual || !passwordNueva) {
      alert('Por favor completa ambos campos');
      return;
    }

    // Agregar validación de contraseña (por ejemplo, longitud mínima)
    if (passwordNueva.length < 6) {
      alert('La nueva contraseña debe tener al menos 6 caracteres');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/auth/cambiar-contrasena', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          contrasenaActual: passwordActual,
          nuevaContrasena: passwordNueva,
        }),
      });

      if (!res.ok) throw new Error('Error al cambiar contraseña');
      alert('Contraseña actualizada correctamente');
      setPasswordActual('');
      setPasswordNueva('');
    } catch (err) {
      alert('Error al actualizar contraseña');
    }
  };

  return (
    <Container>
      <Title>Perfil de Usuario</Title>

      <AccordionSection>
        <AccordionHeader onClick={() => setOpenSection(openSection === 'perfil' ? '' : 'perfil')}>
          Editar nombre y correo
        </AccordionHeader>
        <AccordionContent isOpen={openSection === 'perfil'}>
          <Label>Nombre</Label>
          <Input value={perfil.nombre} onChange={(e) => setPerfil({ ...perfil, nombre: e.target.value })} />

          <Label>Correo</Label>
          <Input type="correo" value={perfil.correo} onChange={(e) => setPerfil({ ...perfil, correo: e.target.value })} />

          <Button onClick={handleGuardarPerfil}>Guardar Cambios</Button>
        </AccordionContent>
      </AccordionSection>

      <AccordionSection>
        <AccordionHeader onClick={() => setOpenSection(openSection === 'password' ? '' : 'password')}>
          Cambiar contraseña
        </AccordionHeader>
        <AccordionContent isOpen={openSection === 'password'}>
          <Label>Contraseña actual</Label>
          <Input type="password" value={passwordActual} onChange={(e) => setPasswordActual(e.target.value)} />

          <Label>Nueva contraseña</Label>
          <Input type="password" value={passwordNueva} onChange={(e) => setPasswordNueva(e.target.value)} />

          <Button onClick={handleGuardarContraseña}>Actualizar Contraseña</Button>
        </AccordionContent>
      </AccordionSection>
    </Container>
  );
};

export default PerfilPage;
