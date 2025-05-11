import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editedProduct, setEditedProduct] = useState({});
  const [openDialog, setOpenDialog] = useState(false);  // Controla la visibilidad del modal
  const [productToDelete, setProductToDelete] = useState(null);  // Guarda el producto que se va a eliminar

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/login';
      return;
    }

    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    if (decodedToken.rol !== 'admin') {
      window.location.href = '/';
      return;
    }

    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products/products');
      setProducts(response.data.products);
    } catch (error) {
      console.error('Error al obtener productos:', error);
    }
  };

  const handleDeleteProduct = async () => {
    try {
      if (productToDelete) {
        await axios.delete(`http://localhost:5000/api/products/products/${productToDelete._id}`);
        fetchProducts();
        setOpenDialog(false);  // Cierra el modal después de eliminar
      }
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
    }
  };

  const handleDeleteClick = (product) => {
    setProductToDelete(product);  // Guarda el producto seleccionado para eliminar
    setOpenDialog(true);  // Abre el modal de confirmación
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);  // Cierra el modal sin eliminar
    setProductToDelete(null);  // Limpia el producto seleccionado
  };

  const handleEditClick = (index) => {
    setEditIndex(index);
    setEditedProduct({ ...products[index] });
  };
  
  const handleInputChange = (e) => {
  const { name, value } = e.target;
  console.log(`Cambio: ${name} = ${value}`);  // 👈 Agrega este log
  setEditedProduct((prevProduct) => ({
    ...prevProduct,
    [name]: value,
  }));
};
  
  const handleSaveEdit = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/products/products/${id}`, editedProduct);
      setEditIndex(null);
      fetchProducts();
    } catch (error) {
      console.error('Error al guardar los cambios:', error);
    }
  };

  

  return (
    <div className="container">
      <h1 className="title">📦 Administrar Productos</h1>

      <div className="add-button">
        <Link to="/create-product">
          <button className="btn primary">Agregar Producto</button>
        </Link>
      </div>

      <table className="product-table">
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Categoría</th>
            <th>Subategoría</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(
            products.reduce((acc, product) => {
              const { category = 'Sin categoría', subcategory = 'Sin subcategoría' } = product;
              if (!acc[category]) acc[category] = {};
              if (!acc[category][subcategory]) acc[category][subcategory] = [];
              acc[category][subcategory].push(product);
              return acc;
            }, {})
          ).map(([category, subcategories]) =>
            Object.entries(subcategories).map(([subcategory, items]) => (
              <React.Fragment key={`${category}-${subcategory}`}>
                <tr>
                  <td colSpan="6" className="category-header">
                    🗂️ <strong>{category}</strong> / {subcategory}
                  </td>
                </tr>
                {items.map((product) => {
                  const realIndex = products.findIndex(p => p._id === product._id);
                  return (
                    <tr key={product._id}>
                      <td>
                        {editIndex === realIndex ? (
                          <input
                            name="imageUrl"
                            value={editedProduct.imageUrl}
                            onChange={handleInputChange}
                            placeholder="URL de imagen"
                          />
                        ) : (
                          <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="product-image"
                          />
                        )}
                      </td>
                      {editIndex === realIndex ? (
                        <>
                          <td><input name="name" value={editedProduct.name} onChange={handleInputChange} /></td>
                          <td><input name="description" value={editedProduct.description} onChange={handleInputChange} /></td>
                          <td><input name="price" value={editedProduct.price} onChange={handleInputChange} /></td>
                          <td>
                            <select name="category" value={editedProduct.category} onChange={(e) => {
                              const selectedCategory = e.target.value;
                              setEditedProduct((prev) => ({
                                ...prev,
                                category: selectedCategory,
                                subcategory: '', // limpiar subcategoría
                              }));
                            }}>
                              <option value="">Selecciona una categoría</option>
                              <option value="Ropa">Ropa</option>
                              <option value="Tecnología">Tecnología</option>
                              <option value="Hogar">Hogar</option>
                              <option value="Deporte">Deporte</option>
                            </select>
                          </td>
                          <td>
                            <select
                              name="subcategory"
                              value={editedProduct.subcategory}
                              onChange={handleInputChange}
                            >
                              <option value="">Selecciona una subcategoría</option>
                              {editedProduct.category === 'Ropa' && ['Hombre', 'Mujer', 'Niños'].map((s) => (
                                <option key={s} value={s}>{s}</option>
                              ))}
                              {editedProduct.category === 'Tecnología' && ['Computadoras', 'Celulares', 'Accesorios'].map((s) => (
                                <option key={s} value={s}>{s}</option>
                              ))}
                              {editedProduct.category === 'Hogar' && ['Muebles', 'Decoración', 'Jardin'].map((s) => (
                                <option key={s} value={s}>{s}</option>
                              ))}
                              {editedProduct.category === 'Deporte' && ['Fútbol', 'Básquetbol', 'variedad'].map((s) => (
                                <option key={s} value={s}>{s}</option>
                              ))}
                            </select>
                          </td>

                        </>
                      ) : (
                        <>
                          <td>{product.name}</td>
                          <td>{product.description}</td>
                          <td>{product.price}</td>
                          <td>{product.category}</td>
                          <td>{product.subcategory}</td>
                        </>
                      )}
                      <td className="actions">
                        {editIndex === realIndex ? (
                          <button onClick={() => handleSaveEdit(product._id)} className="btn success">
                            Guardar
                          </button>
                        ) : (
                          <button onClick={() => handleEditClick(realIndex)} className="btn warning">
                            Editar
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteClick(product)}
                          className="btn danger"
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </React.Fragment>
            ))
          )}
        </tbody>
      </table>

      {/* Modal de Confirmación */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>¿Estás seguro de eliminar este producto?</DialogTitle>
        <DialogContent>
          <p>Este proceso no se puede deshacer.</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleDeleteProduct} color="secondary">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>

      <style>{`
        .container {
          width: 90%;
          margin: 200px auto;
          padding: 20px;
          background-color: #fff;
          border-radius: 12px;
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
        }

        .title {
          text-align: center;
          color: #2c3e50;
          font-size: 32px;
          margin-bottom: 20px;
        }

        .add-button {
          text-align: center;
          margin-bottom: 20px;
        }

        .btn {
          padding: 8px 14px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-weight: 500;
        }

        .btn.primary {
          background-color: #007bff;
          color: white;
        }

        .btn.success {
          background-color: #28a745;
          color: white;
        }

        .btn.warning {
          background-color: #ffc107;
          color: black;
        }

        .btn.danger {
          background-color: #dc3545;
          color: white;
        }

        .product-table {
          width: 100%;
          border-collapse: collapse;
        }

        .product-table th,
        .product-table td {
          padding: 12px;
          text-align: left;
          border-bottom: 1px solid #ddd;
        }

        .product-image {
          width: 60px;
          height: 60px;
          object-fit: cover;
          border-radius: 6px;
        }

        .category-header {
          background-color: #e9ecef;
          font-size: 18px;
          color: #495057;
          padding: 14px;
          border-top: 2px solid #ccc;
          border-bottom: 2px solid #ccc;
        }

        .actions {
          display: flex;
          gap: 10px;
        }

        /* Estilos del modal */
        .MuiDialogTitle-root {
          font-size: 20px;
        }

        .MuiDialogContent-root {
          font-size: 16px;
        }

        .MuiDialogActions-root button {
          padding: 8px 16px;
          font-weight: 500;
        }
      `}</style>
    </div>
  );
};

export default ProductPage;
