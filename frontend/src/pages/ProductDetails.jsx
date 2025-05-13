import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Initialize the navigate function
  const [product, setProduct] = useState(null);
  const [isEditable, setIsEditable] = useState(false); // State to toggle editable mode
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    stock: '',
    length: '',
    breadth: '',
    height: '',
    type: '',
  });

  useEffect(() => {
    fetch(`https://memento-backend-u1f4.onrender.com/api/disp/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setFormData({
          name: data.name,
          price: data.price,
          stock: data.stock,
          length: data.size.length,
          breadth: data.size.breadth,
          height: data.size.height,
          type: data.type,
        });
      })
      .catch((err) => console.error("Error fetching product:", err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedProduct = { ...formData, size: { length: formData.length, breadth: formData.breadth, height: formData.height } };

    try {
      const res = await fetch(`https://memento-backend-u1f4.onrender.com/api/update_products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProduct),
      });

      if (!res.ok) throw new Error("Failed to update product");

      const result = await res.json();
      setProduct(result);
      setIsEditable(false);
    } catch (error) {
      console.error(error);
      alert('❌ Failed to update product');
    }
  };

  if (!product) {
    return <p style={{ textAlign: 'center' }}>Loading product details...</p>;
  }

  return (
    <div style={{ maxWidth: '1200px', margin: 'auto', padding: '20px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '20px' }}>

        {/* Images Section */}
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '10px' }}>
            {product.images.map((img, index) => (
              <img
                key={index}
                src={`https://memento-backend-u1f4.onrender.com/${img}`}
                alt={`${product.name} ${index + 1}`}
                style={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'cover',
                  borderRadius: '8px',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
                  transition: 'transform 0.3s ease',
                }}
                onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
              />
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div>
          <h2>{product.name}</h2>
          <p><strong>Price:</strong> ₹{product.price}</p>
          <p><strong>Stock:</strong> {product.stock}</p>
          <p>
            <strong>Size:</strong> {product.size.length} x {product.size.breadth} x {product.size.height} cm
          </p>
          <p><strong>Type:</strong> {product.type.charAt(0).toUpperCase() + product.type.slice(1)}</p>
          
          {/* Edit Button */}
          <button 
            onClick={() => setIsEditable(!isEditable)} 
            style={styles.editButton}
          >
            {isEditable ? 'Cancel' : 'Edit'}
          </button>

          {/* Editable Form */}
          {isEditable && (
            <form onSubmit={handleSubmit} style={styles.form}>
              <>Name</>
              <input
                type="text"
                name="name"
                id="product-name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Product Name"
                required
                style={styles.input}
              />
              <>Price</>
              <input
                type="number"
                name="price"
                id="product-price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Price"
                required
                style={styles.input}
              />
              <>Stock</>
              <input
                type="number"
                name="stock"
                id="product-stock"
                value={formData.stock}
                onChange={handleChange}
                placeholder="Stock"
                required
                style={styles.input}
              />
              <>Length</>
              <input
                type="number"
                name="length"
                id="product-length"
                value={formData.length}
                onChange={handleChange}
                placeholder="Length (cm)"
                required
                style={styles.input}
              />
              <>Breadth</>
              <input
                type="number"
                name="breadth"
                id="product-breadth"
                value={formData.breadth}
                onChange={handleChange}
                placeholder="Breadth (cm)"
                required
                style={styles.input}
              />
              <>Height</>
              <input
                type="number"
                name="height"
                id="product-height"
                value={formData.height}
                onChange={handleChange}
                placeholder="Height (cm)"
                required
                style={styles.input}
              />
              <>Type</>
              <select
                name="type"
                id="product-type"
                value={formData.type}
                onChange={handleChange}
                required
                style={styles.input}
              >
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
                <option value="nil">Nil</option>
              </select>
              <button type="submit" style={styles.submitButton}>Update Product</button>
            </form>
          )}

          {/* Go Back Button */}
          <button 
            onClick={() => navigate('/')} // Navigate to the root page or the products listing page
            style={styles.goBackButton}
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginTop: '20px',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    outline: 'none',
    transition: '0.3s',
  },
  submitButton: {
    padding: '12px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: '0.3s',
  },
  editButton: {
    padding: '10px 15px',
    backgroundColor: '#FF9800',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    transition: '0.3s',
  },
  goBackButton: {
    padding: '10px 15px',
    backgroundColor: '#2196F3',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    marginTop: '20px',
    transition: '0.3s',
  },
};

export default ProductDetails;
