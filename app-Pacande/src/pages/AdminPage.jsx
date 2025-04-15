import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, CircularProgress, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AdminPage = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true); // Estado para manejar la carga de datos
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    const decodedToken = JSON.parse(atob(token.split('.')[1]));

    if (decodedToken.rol !== 'admin') {
      navigate('/');
      return;
    }

    setIsAdmin(true);

    const obtenerUsuarios = async (id) => {
      try {
        const response = await axios.get('http://localhost:5000/api/admin/usuarios', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUsuarios(response.data);
      } catch (error) {
        console.error('Error al obtener usuarios:', error);
      } finally {
        setLoading(false);
      }
    };

    obtenerUsuarios();
  }, [navigate]);

  // Función para eliminar un usuario
  const eliminarUsuario = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/admin/eliminar-usuario/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      alert(response.data.mensaje);
      setUsuarios((prevUsuarios) => prevUsuarios.filter(usuario => usuario._id !== id)); // Eliminar el usuario de la lista local
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      alert('Error al eliminar el usuario');
    }
  };

  // Función para navegar a la página de actualización del usuario
  const irAActualizar = (id) => {
    navigate(`/admin/actualizar-usuario/${id}`); // Redirige a la página de actualización
  };

  return (
    isAdmin && (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Panel de Administración
        </Typography>

        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" mt={4}>
            <CircularProgress />
          </Box>
        ) : (
          <TableContainer component={Paper} sx={{ mt: 4 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Nombre</strong></TableCell>
                  <TableCell><strong>Correo</strong></TableCell>
                  <TableCell><strong>Rol</strong></TableCell>
                  <TableCell><strong>Fecha de Creación</strong></TableCell>
                  <TableCell align="center"><strong>Acciones</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {usuarios.map((usuario) => (
                  <TableRow key={usuario._id}>
                    <TableCell>{usuario.nombre}</TableCell>
                    <TableCell>{usuario.correo}</TableCell>
                    <TableCell>{usuario.rol}</TableCell>
                    <TableCell>{new Date(usuario.fechaCreacion).toLocaleDateString()}</TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        color="secondary"
                        size="small"
                        sx={{ mr: 1 }}
                        onClick={() => irAActualizar(usuario._id)} // Redirige a la página de actualización
                      >
                        Actualizar
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        size="small"
                        onClick={() => eliminarUsuario(usuario._id)}
                      >
                        Eliminar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Container>
    )
  );
};

export default AdminPage;
