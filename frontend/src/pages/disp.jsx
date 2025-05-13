import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaTrashAlt } from 'react-icons/fa'; // Importing delete icon

const Disp = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://memento-backend-y96t.onrender.com/api/disp/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  const handleDelete = (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      // API call to delete the product
      fetch(`https://memento-backend-y96t.onrender.com/api/
        products_delete/${productId}`, {
        method: 'DELETE',
      })
      .then((response) => response.json())
      .then((data) => {
        alert("Product deleted successfully!");
        // Remove deleted product from the state
        setProducts(products.filter(product => product._id !== productId));
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
      });
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ textAlign: 'center' }}>Product Gallery</h2>

      {/* Button to add new product */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <Link to="/add-product">
          <button
            style={{
              padding: '10px 20px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '16px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
            }}
          >
            Add New Product
          </button>
        </Link>
      </div>

      {loading ? (
        <p style={{ textAlign: 'center' }}>Loading...</p>
      ) : products.length > 0 ? (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '15px',
            marginTop: '20px',
          }}
        >
          {products.map((product) => (
            <div key={product._id} style={{ position: 'relative' }}>
              <Link to={`/product/${product._id}`} style={{ textDecoration: 'none' }}>
                <img
                  src={`https://memento-backend-y96t.onrender.com/${product.images[0]}`}
                  alt={product.name}
                  style={{
                    width: '100%',
                    height: '200px',
                    objectFit: 'contain', // Ensures the image fits within the container without being cropped
                    borderRadius: '10px',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
                    transition: 'transform 0.3s ease',
                  }}
                />
              </Link>
              {/* Delete button */}
              <button
                onClick={() => handleDelete(product._id)}
                style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  backgroundColor: 'rgba(255, 0, 0, 0.7)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50%',
                  padding: '10px',
                  cursor: 'pointer',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
                }}
              >
                <FaTrashAlt />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>No products found</p>
      )}
    </div>
  );
};

export default Disp;
