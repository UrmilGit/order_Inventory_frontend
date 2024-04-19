import React, { useState } from 'react';
import axios from 'axios';
import AppNavbar from '../Navbar/AppNavbar';
import { useNavigate } from 'react-router-dom';


// Navbar component
const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <div style={styles.navItem}>
        <a href="#" style={styles.navLink}>Dashboard</a>
      </div>
    </nav>
  );
};

const GetProductByField = () => {
  const [field, setField] = useState('');
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:8085/api/v1/products/sort/${field}`);
      setProducts(response.data);
    } catch (error) {
      setError(error.response ? error.response.data.message : error.message);
    }
  };

  const handleBack = () => {
    navigate('/products');
  };

  console.log(products, 'ii');
  return (
    <div style={{ backgroundColor: "#a2a8d3" }}>
      {/* Navbar */}
      <AppNavbar></AppNavbar>

      {/* Main content */}
      <div style={styles.container}>
        <h1 style={styles.heading}>Products Details</h1>
        <form onSubmit={handleSubmit} style={styles.form}>
          <label htmlFor="field" style={styles.label}>Enter Field Name:</label>
          <input
            type="text"
            id="field"
            value={field}
            onChange={(e) => setField(e.target.value)}
            style={{ marginRight: '10px', padding: '5px' }}
            required
          />
          <button type="submit" style={{ padding: '5px 10px', backgroundColor: '#38598b', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Get Products</button>
        </form>
        {products.length > 0 && (
          <div style={styles.results}>
            <h2 style={styles.subHeading}>Products Sorted by Field: {field}</h2>
            <ul style={styles.list}>
              {products.map(product => (
                <li key={product.productId} style={styles.listItem}>
                  - {product.productName}  {product[field.toLowerCase()]}
                </li>
              ))}
            </ul>
          </div>
        )}
        {error && <p style={styles.error}>Error: {error}</p>}
      </div>
      <div style={{ textAlign: 'center' }}>
        <button onClick={handleBack} className="btn btn-primary" style={{ marginRight: '10px', backgroundColor: '#38598b', marginTop: '20px' }}>Back to Products</button>
      </div>
    </div>
  );
};

const styles = {
  navbar: {
    backgroundColor: '#38598b',
    color: '#fff',
    padding: '10px 20px',
  },
  navItem: {
    marginRight: '20px',
  },
  navLink: {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '18px',
  },
  container: {
    maxWidth: '800px',
    margin: 'auto',
    padding: '20px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    fontSize: '28px',
    textAlign: 'center',
    marginBottom: '30px',
    color: '#333',
    textTransform: 'uppercase',
  },
  form: {
    marginBottom: '30px',
  },
  label: {
    display: 'block',
    marginBottom: '10px',
    fontWeight: 'bold',
    color: '#555',
  },
  input: {
    width: '100%',
    padding: '12px',
    marginBottom: '20px',
    border: '2px solid #ccc',
    borderRadius: '4px',
    boxSizing: 'border-box',
    fontSize: '16px',
  },
  button: {
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    padding: '14px 28px',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    fontSize: '16px',
  },
  results: {
    marginTop: '30px',
  },
  subHeading: {
    fontSize: '24px',
    marginBottom: '20px',
    color: '#007bff',
  },
  list: {
    listStyleType: 'none',
    padding: '0',
  },
  listItem: {
    padding: '10px 0',
    borderBottom: '1px solid #ccc',
    fontSize: '16px',
    color: '#444',
  },
  error: {
    color: 'red',
    marginTop: '20px',
    fontSize: '18px',
  },
};

export default GetProductByField;