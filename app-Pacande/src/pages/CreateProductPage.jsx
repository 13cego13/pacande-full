import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateProductPage = () => {
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    subcategory: '',
    imageUrl: '',
  });

  const [message, setMessage] = useState('');
  const [subcategories, setSubcategories] = useState([]);
  const navigate = useNavigate();

  const categories = [
    { _id: '1', name: 'Ropa' },
    { _id: '2', name: 'Tecnología' },
    { _id: '3', name: 'Hogar' },
    { _id: '4', name: 'Deporte' },
  ];

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setNewProduct({ ...newProduct, category: selectedCategory, subcategory: '' });

    if (selectedCategory === 'Ropa') {
      setSubcategories(['Hombre', 'Mujer', 'Niños']);
    } else if (selectedCategory === 'Tecnología') {
      setSubcategories(['Computadoras', 'Celulares', 'Accesorios']);
    } else if (selectedCategory === 'Hogar') {
      setSubcategories(['Muebles', 'Decoración', 'Jardin']);
    } else if (selectedCategory === 'Deporte') {
      setSubcategories(['Fútbol', 'Básquetbol', 'variedad']);
    } else {
      setSubcategories([]);
    }
  };

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/products/products/create', newProduct);
      setMessage(response.data.message);
      setNewProduct({
        name: '',
        description: '',
        price: '',
        category: '',
        subcategory: '',
        imageUrl: '',
      });
      setTimeout(() => {
        navigate('/products');
      }, 2000);
    } catch (error) {
      setMessage('Error al crear el producto');
      console.error('Error al crear producto:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Agregar Nuevo Producto</h1>

      {message && <div style={styles.message}>{message}</div>}

      <form onSubmit={handleCreateProduct} style={styles.form}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            name="name"
            value={newProduct.name}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>
        <div>
          <label>Descripción:</label>
          <input
            type="text"
            name="description"
            value={newProduct.description}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>
        <div>
          <label>Precio:</label>
          <input
            type="number"
            name="price"
            value={newProduct.price}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>
        <div>
          <label>Categoría:</label>
          <select
            name="category"
            value={newProduct.category}
            onChange={handleCategoryChange}
            style={styles.input}
            required
          >
            <option value="">Selecciona una categoría</option>
            {categories.map((category) => (
              <option key={category._id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        {newProduct.category && (
          <div>
            <label>Subcategoría:</label>
            <select
              name="subcategory"
              value={newProduct.subcategory}
              onChange={handleChange}
              style={styles.input}
              required
            >
              <option value="">Selecciona una subcategoría</option>
              {subcategories.map((subcategory, index) => (
                <option key={index} value={subcategory}>
                  {subcategory}
                </option>
              ))}
            </select>
          </div>
        )}
        <div>
          <label>URL de la imagen:</label>
          <input
            type="text"
            name="imageUrl"
            value={newProduct.imageUrl}
            onChange={handleChange}
            style={styles.input}
          />
        </div>
        <button type="submit" style={styles.button}>Crear Producto</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    width: '80%',
    margin: '120px auto',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
  title: {
    textAlign: 'center',
    color: '#333',
  },
  input: {
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '16px',
    marginBottom: '10px',
    width: '100%',
  },
  button: {
    padding: '10px 15px',
    border: 'none',
    backgroundColor: '#007bff',
    color: '#fff',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '20px',
  },
  message: {
    marginBottom: '20px',
    padding: '10px',
    backgroundColor: '#f8d7da',
    color: '#721c24',
    borderRadius: '5px',
    textAlign: 'center',
  },
};

export default CreateProductPage;
