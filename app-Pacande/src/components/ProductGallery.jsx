// src/components/ProductGallery.js
import React from 'react';
import ProductCard from './ProductCard';
import 'uikit/dist/css/uikit.min.css';

const ProductGallery = ({ products, showSizes }) => {
  return (
    <div className="uk-grid uk-child-width-1-3@m uk-child-width-1-2@s uk-grid-match" data-uk-grid>
      {products.map((product, index) => (
        <div key={index}>
          <ProductCard 
            title={product.title} 
            price={product.price} 
            originalPrice={product.originalPrice} // Asegúrate de pasar esto también
            image={product.image} 
            showSizes={showSizes} 
            sizes={product.sizes} // Asegúrate de pasar las tallas
            discount={product.discount} // Asegúrate de pasar el descuento
          />
        </div>
      ))}
    </div>
  );
};

export default ProductGallery;
