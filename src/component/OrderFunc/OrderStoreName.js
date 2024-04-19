import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import AppNavbar from '../Navbar/AppNavbar';

const OrderStoreName = () => {
  const [storeName, setStoreName] = useState('');
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [submitted, setSubmitted] = useState(false); // Track if the form is submitted
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/order'); // Navigate to the customer page when the back button is clicked
  };

  const fetchOrdersByStoreName = async () => {
    try {
      setError(null);
      if(!storeName.trim()){
        throw new Error('Store name cannot be empty')
      }

      if (!/^[a-zA-Z\s]*$/.test(storeName.trim())) {
        throw new Error('Please enter a valid store name');
      }
      
      const response = await axios.get(`http://localhost:8085/api/v1/orders/storename?storename=${storeName}`);
      setOrders(response.data);
      setSubmitted(true); // Set submitted to true after fetching orders
    } catch (error) {
      setError(error.response ? error.response.data.message : error.message);
    }
  };

  const tableHeaderStyle = {
    backgroundColor: '#38598b',
    color: 'white',
    padding: '10px',
  };

  const tableCellStyle = {
    backgroundColor:'#e7eaf6',
    border: '1px solid #ccc',
    padding: '10px',
  };

  return (
    <div style={{ backgroundColor:'#e7eaf6', minHeight: '100vh' }}>
      <AppNavbar/>
      <Container>
        <div style={{ textAlign: 'center', marginBottom: '20px', marginTop:'20px' }}>
          <h1>Order Details By Store Name</h1>
        </div>
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <label htmlFor="storeName" style={{ marginRight: '10px' }}>Enter Store Name:</label>
          <input
            type="text"
            id="storeName"
            value={storeName}
            onChange={(e) => setStoreName(e.target.value)}
          />
          <button onClick={fetchOrdersByStoreName} className="btn btn-primary" style={{ marginLeft: '10px', backgroundColor:'#38598b' }}>Submit</button>
        </div>
        {error && <p style={{ color: 'red', display:"flex", justifyContent:"center" }}>Error: {error}</p>}
        {submitted && orders.length > 0 && ( // Render the table only if the form is submitted and orders are fetched
          <table style={{ borderCollapse: 'collapse', width: '100%', marginBottom: '20px' }}>
            <thead>
              <tr>
                <th style={tableHeaderStyle}>Order ID</th>
                <th style={tableHeaderStyle}>Order Timestamp</th>
                <th style={tableHeaderStyle}>Customer Name</th>
                <th style={tableHeaderStyle}>Order Status</th>
                <th style={tableHeaderStyle}>Store</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.orderId}>
                  <td style={tableCellStyle}>{order.orderId}</td>
                  <td style={tableCellStyle}>{order.orderTimestamp}</td>
                  <td style={tableCellStyle}>{order.customer.fullName}</td>
                  <td style={tableCellStyle}>{order.orderStatus}</td>
                  <td style={tableCellStyle}>{order.store.storeName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <div style={{ textAlign: 'center' }}>
          <button onClick={handleBack} className="btn btn-primary" style={{ marginLeft: '10px', backgroundColor:'#38598b' }}>Back to Orders</button>
        </div>
      </Container>
    </div>
  );
};

export default OrderStoreName;
