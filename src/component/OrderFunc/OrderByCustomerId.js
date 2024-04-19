import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import AppNavbar from '../Navbar/AppNavbar';


const OrderByCustomerId = () => {
  const [customerId, setCustomerId] = useState('');
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchOrdersByCustomerId = async () => {
    try {
      setError(null);

      if (!customerId.trim()) {
        throw new Error('Customer ID cannot be empty');
      }
 
      // Check if customerId contains only numbers
      if (!/^\d+$/.test(customerId.trim())) {
        throw new Error('Please enter a valid customer ID (only numbers allowed)');
      }

      const response = await axios.get(`http://localhost:8085/api/v1/orders/customerid/${customerId}`);
      setOrders(response.data);
    } catch (error) {
      setError(error.response ? error.response.data.message : error.message);
    }
  };

  const handleBack = () => {
    navigate('/order'); // Navigate to the customer page when the back button is clicked
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
      <h1>Orders By Customer ID</h1>
      </div>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <label htmlFor="customerId" style={{ marginRight: '10px' }}>Enter Customer ID:</label>
        <input
          type="text"
          id="customerId"
          value={customerId}
          onChange={(e) => setCustomerId(e.target.value)}
        />
        <button onClick={fetchOrdersByCustomerId} className="btn btn-primary" style={{ marginLeft: '10px', backgroundColor:'#38598b' }}>Submit</button>
      </div>
      {error && <p style={{color:'red', display:'flex', justifyContent:'center'}}>Error: {error}</p>}
      {orders.length > 0 && (
        <table style={{ borderCollapse: 'collapse', width: '100%', marginBottom: '20px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f2f2f2' }}>
              <th style={tableHeaderStyle}>Order ID</th>
              <th style={tableHeaderStyle}>Order Timestamp</th>
              <th style={tableHeaderStyle}>Customer</th>
              <th style={tableHeaderStyle}>Order Status</th>
              <th style={tableHeaderStyle}>Store</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.orderId} style={{ backgroundColor: '#f9f9f9' }}>
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

export default OrderByCustomerId;
