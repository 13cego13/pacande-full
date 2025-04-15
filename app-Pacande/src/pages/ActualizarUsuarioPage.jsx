import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Typography, CircularProgress, MenuItem, Select, InputLabel, FormControl, Container } from '@mui/material';

const ActualizarUsuarioPage = () => {
  const { id } = useParams();  // Extraemos el ID de los parámetros de la URL
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [rol, setRol] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const obtenerUsuario = async () => {
      try {
        console.log("ID del usuario:", id);
        const response = await axios.get(`http://localhost:5000/api/admin/usuarios/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setUsuario(response.data);
        setNombre(response.data.nombre);
        setCorreo(response.data.correo);
        setRol(response.data.rol);
      } catch (error) {
        console.error('Error al obtener el usuario:', error);
        alert('No se pudo obtener el usuario');
        navigate('/admin');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      obtenerUsuario();
    }
  }, [id, navigate]);

  // Función para manejar el submit del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = {
        nombre,
        correo,
        rol,
        ...(contraseña && { contraseña }),  // Solo agregamos la contraseña si está presente
      };

      const response = await axios.put(`http://localhost:5000/api/admin/usuarios/${id}`, updatedUser, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      toast.success('Usuario actualizado correctamente');
      setTimeout(() => { 
      navigate('/admin');
      }, 1000); // Redirige después de 2 segundos
    } catch (error) {
      console.error('Error al actualizar el usuario:', error);
      setError('Hubo un problema al actualizar el usuario');
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 18, mb: 12 }}> {/* Aumentamos el margen superior y añadimos margen inferior */}
      <Typography variant="h4" align="center" gutterBottom>
        Actualizar Usuario
      </Typography>

      {error && <Typography color="error">{error}</Typography>}

      <form onSubmit={handleSubmit}>
        <Box mb={2}>
          <TextField
            label="Nombre"
            variant="outlined"
            fullWidth
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </Box>

        <Box mb={2}>
          <TextField
            label="Correo"
            variant="outlined"
            fullWidth
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
          />
        </Box>

        <Box mb={2}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Rol</InputLabel>
            <Select
              label="Rol"
              value={rol}
              onChange={(e) => setRol(e.target.value)}
            >
              <MenuItem value="usuario">Usuario</MenuItem>
              <MenuItem value="admin">Administrador</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box mb={2}>
          <TextField
            label="Contraseña"
            type="password"
            variant="outlined"
            fullWidth
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
            helperText="Deja vacío si no deseas cambiar la contraseña"
          />
        </Box>

        <Box display="flex" justifyContent="center" mt={3}>
          <Button variant="contained" color="primary" type="submit">
            Actualizar Usuario
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default ActualizarUsuarioPage;
