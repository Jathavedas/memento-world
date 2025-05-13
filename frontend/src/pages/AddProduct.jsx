import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importing useNavigate
import axios from 'axios';


const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    stock: '',
    length: '',
    breadth: '',
    height: '',
    type: '', 
    image: null,
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Hook to navigate programmatically

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', formData.name);
    data.append('price', formData.price);
    data.append('stock', formData.stock);
    data.append('length', formData.length);
    data.append('breadth', formData.breadth);
    data.append('height', formData.height);
    data.append('type', formData.type); 
    data.append('image', formData.image);

    try {
      const res = await axios.fetch("https://memento-world.vercel.app/add_products", {
        method: "POST",
        body: data,
      });

      if (!res.ok) throw new Error("Upload failed");

      const result = await res.json();
      setMessage("✅ Product added successfully!");
      setFormData({
        name: '',
        price: '',
        stock: '',
        length: '',
        breadth: '',
        height: '',
        type: '', 
        image: null,
      });
    } catch (error) {
      console.error(error);
      setMessage("❌ Failed to add product");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Add Product</h2>
      {message && <p style={styles.message}>{message}</p>}
      <form onSubmit={handleSubmit} encType="multipart/form-data" style={styles.form}>
        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Product Name" required style={styles.input} /><br />
        <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price" required style={styles.input} /><br />
        <input type="number" name="stock" value={formData.stock} onChange={handleChange} placeholder="Stock" required style={styles.input} /><br />
        <input type="number" name="length" value={formData.length} onChange={handleChange} placeholder="Length (cm)" required style={styles.input} /><br />
        <input type="number" name="breadth" value={formData.breadth} onChange={handleChange} placeholder="Breadth (cm)" required style={styles.input} /><br />
        <input type="number" name="height" value={formData.height} onChange={handleChange} placeholder="Height (cm)" required style={styles.input} /><br />
        
        {/* Dropdown for type */}
        <select name="type" value={formData.type} onChange={handleChange} required style={styles.input}>
          <option value="">Select Type</option>
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
          <option value="nil">Nil</option>
        </select><br />

        <input type="file" name="image" accept="image/*" onChange={handleChange} required style={styles.input} /><br /><br />
        <button type="submit" style={styles.submitButton}>Add Product</button>
      </form>

      {/* Go Back Button */}
      <button 
        onClick={() => navigate('/')} 
        style={styles.goBackButton}>
        Go Back
      </button>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: 'auto',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    marginTop: '30px',
  },
  title: {
    textAlign: 'center',
    color: '#333',
    fontSize: '24px',
    marginBottom: '20px',
  },
  message: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: '15px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  input: {
    padding: '12px',
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
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    transition: '0.3s',
  },
  goBackButton: {
    marginTop: '20px',
    padding: '10px 15px',
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    transition: '0.3s',
  },
};

export default AddProduct;
