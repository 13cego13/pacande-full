import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  CircularProgress,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AdminPage = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
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

    const obtenerUsuarios = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admin/usuarios', {
          headers: { Authorization: `Bearer ${token}` }
        });

        // Filtrar los usuarios y administradores
        const usuariosList = response.data.filter(usuario => usuario.rol === 'Usuario');
        const adminsList = response.data.filter(usuario => usuario.rol === 'admin');

        setUsuarios(usuariosList);
        console.log('Usuarios del backend:', response.data);
        setAdmins(adminsList);
      } catch (error) {
        console.error('Error al obtener usuarios:', error);
      } finally {
        setLoading(false);
      }
    };

    obtenerUsuarios();
  }, [navigate]);

  const eliminarUsuario = async () => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/admin/eliminar-usuario/${userToDelete._id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      alert(response.data.mensaje);
      setUsuarios((prev) => prev.filter(usuario => usuario._id !== userToDelete._id));
      setAdmins((prev) => prev.filter(usuario => usuario._id !== userToDelete._id));  // Actualizar también los administradores
      setOpenDialog(false);
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      alert('Error al eliminar el usuario');
    }
  };

  const irAActualizar = (id) => {
    navigate(`/admin/actualizar-usuario/${id}`);
  };

  const handleDeleteClick = (usuario) => {
    setUserToDelete(usuario);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setUserToDelete(null);
  };

  return (
    <Box sx={styles.container}>
      <Typography variant="h4" align="center" gutterBottom sx={styles.title}>
        Panel de Administración de Usuarios
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {/* Tabla de Administradores */}
          <Typography variant="h5" gutterBottom sx={styles.subtitle}>
            Administradores
          </Typography>
          <TableContainer component={Paper} sx={styles.tableContainer}>
            <Table>
              <TableHead>
                <TableRow sx={styles.tableHeaderRow}>
                  <TableCell><strong>Nombre</strong></TableCell>
                  <TableCell><strong>Correo</strong></TableCell>
                  <TableCell><strong>Rol</strong></TableCell>
                  <TableCell><strong>Fecha de Creación</strong></TableCell>
                  <TableCell align="center"><strong>Acciones</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {admins.map((usuario) => (
                  <TableRow key={usuario._id} sx={styles.tableRow}>
                    <TableCell>{usuario.nombre}</TableCell>
                    <TableCell>{usuario.correo}</TableCell>
                    <TableCell>{usuario.rol}</TableCell>
                    <TableCell>
                      {usuario.createdAt && !isNaN(Date.parse(usuario.createdAt)) ? (
                        new Date(usuario.createdAt).toLocaleString('es-CO', {
                          timeZone: 'America/Bogota',
                          year: 'numeric',
                          month: '2-digit',
                          day: '2-digit',
                          hour: '2-digit',
                          minute: '2-digit'
                        })
                      ) : (
                        'Fecha no disponible'
                      )}
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        sx={styles.actionButton}
                        onClick={() => irAActualizar(usuario._id)}
                      >
                        Actualizar
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        size="small"
                        onClick={() => handleDeleteClick(usuario)}
                      >
                        Eliminar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Tabla de Usuarios */}
          <Typography variant="h5" gutterBottom sx={styles.subtitle}>
            Usuarios
          </Typography>
          <TableContainer component={Paper} sx={styles.tableContainer}>
            <Table>
              <TableHead>
                <TableRow sx={styles.tableHeaderRow}>
                  <TableCell><strong>Nombre</strong></TableCell>
                  <TableCell><strong>Correo</strong></TableCell>
                  <TableCell><strong>Rol</strong></TableCell>
                  <TableCell><strong>Fecha de Creación</strong></TableCell>
                  <TableCell align="center"><strong>Acciones</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {usuarios.map((usuario) => (
                  <TableRow key={usuario._id} sx={styles.tableRow}>
                    <TableCell>{usuario.nombre}</TableCell>
                    <TableCell>{usuario.correo}</TableCell>
                    <TableCell>{usuario.rol}</TableCell>
                    <TableCell>
                      {usuario.createdAt && !isNaN(Date.parse(usuario.createdAt)) ? (
                        new Date(usuario.createdAt).toLocaleString('es-CO', {
                          timeZone: 'America/Bogota',
                          year: 'numeric',
                          month: '2-digit',
                          day: '2-digit',
                          hour: '2-digit',
                          minute: '2-digit'
                        })
                      ) : (
                        'Fecha no disponible'
                      )}
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        sx={styles.actionButton}
                        onClick={() => irAActualizar(usuario._id)}
                      >
                        Actualizar
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        size="small"
                        onClick={() => handleDeleteClick(usuario)}
                      >
                        Eliminar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}

      {/* Modal de Confirmación */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>¿Estás seguro de eliminar este usuario?</DialogTitle>
        <DialogContent>
          <p>Este proceso no se puede deshacer.</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancelar
          </Button>
          <Button onClick={eliminarUsuario} color="secondary">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

const styles = {
  container: {
    width: '90%',
    margin: '200px auto',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
  title: {
    color: '#333',
    marginBottom: '20px',
  },
  subtitle: {
    color: '#555',
    marginBottom: '20px',
  },
  tableContainer: {
    mt: 4,
    borderRadius: '8px',
    boxShadow: '0 1px 6px rgba(0,0,0,0.1)',
  },
  tableHeaderRow: {
    backgroundColor: '#f5f5f5',
  },
  tableRow: {
    '&:nth-of-type(odd)': {
      backgroundColor: '#fafafa',
    },
  },
  actionButton: {
    marginRight: '8px',
  }
};

export default AdminPage;
