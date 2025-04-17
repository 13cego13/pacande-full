import React from 'react';
import ProductCard from './ProductCard'; // ✅ Esta es la correcta
import 'uikit/dist/css/uikit.min.css';

// Tu componente ProductGallery continúa aquí...

const ProductGallery = ({ products, showSizes }) => {
  return (
    <div className="uk-grid uk-child-width-1-3@m uk-child-width-1-2@s uk-grid-match" data-uk-grid>
      {products.map((product) => (
        <div key={product._id}> {/* Usa _id como clave en vez del índice */}
          <ProductCard 
            _id={product._id}  
            title={product.name} 
            price={product.price} 
            image={product.image}
            description={product.description}
            showSizes={showSizes}  
          />
        </div>
      ))}
    </div>
  );
};

export default ProductGallery;
