import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Disp from './pages/disp';
import ProductDetails from './pages/ProductDetails';
import AddProduct from './pages/AddProduct';

function App() {
  
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Disp />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/add-product" element={<AddProduct />} />
        </Routes>
    </Router>
    </>
  )
}

export default App
