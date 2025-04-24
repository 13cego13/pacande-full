import React from 'react';
import ProductCard from './ProductCard';
import 'uikit/dist/css/uikit.min.css';

const ProductGallery = ({ products, showSizes }) => {
  if (!products || products.length === 0) {
    return <p>No hay productos disponibles.</p>;
  }

  return (
    <div className="uk-grid uk-child-width-1-3@m uk-child-width-1-2@s uk-grid-match" data-uk-grid>
      {products.map((product) => (
        <div key={product._id}>
          <ProductCard
            _id={product._id}
            title={product.name} // Asegúrate de que el campo sea "name" en los datos
            price={product.price}
            image={product.image} // Asegúrate de que el campo sea "image" en los datos
            description={product.description}
            showSizes={showSizes}
            sizes={product.sizes || []} // Si no hay tamaños, pasa un array vacío
            discount={product.discount || null} // Si no hay descuento, pasa null
            category={product.category || ''}
            specifications={product.specifications || ''}
          />
        </div>
      ))}
    </div>
  );
};

export default ProductGallery;