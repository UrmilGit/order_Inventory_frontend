import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import AppNavbar from '../Navbar/AppNavbar';


const OrderIdDetails = () => {
  const [orderId, setOrderId] = useState('');
  const [order, setOrder] = useState(null);
  const [error, setError] = useState(null);

  const navigate = useNavigate();


  const fetchOrderById = async () => {
    try {
      setError(null);

      if (!orderId.trim()) {
        throw new Error('Order ID cannot be empty');
      }
 
      // Check if orderId contains only numbers
      if (!/^\d+$/.test(orderId.trim())) {
        throw new Error('Please enter a valid order ID (only numbers allowed)');
      }
      
      const response = await axios.get(`http://localhost:8085/api/v1/orders/orderid/${orderId}`);
      setOrder(response.data);
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
      <h1>Order Details By ID</h1>
      </div>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <label htmlFor="orderId" style={{ marginRight: '10px' }}>Enter Order ID:</label>
        <input
          type="text"
          id="orderId"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          placeholder="Enter order ID"
        />
        <button onClick={fetchOrderById} className="btn btn-primary" style={{ marginLeft: '10px', backgroundColor:'#38598b' }}>Submit</button>
      </div>
      {error && <p style={{ color: 'red', display:"flex", justifyContent:"center" }}>Error: {error}</p>}
      {order && (
        <table style={{ borderCollapse: 'collapse', width: '100%', marginBottom: '20px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f2f2f2' }}>
              <th style={tableHeaderStyle}>Order ID</th>
              <th style={tableHeaderStyle}>Order Timestamp</th>
              <th style={tableHeaderStyle}>Customer Name</th>
              <th style={tableHeaderStyle}>Order Status</th>
              <th style={tableHeaderStyle}>Store</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ backgroundColor: '#f9f9f9' }}>
              <td style={tableCellStyle}>{order.orderId}</td>
              <td style={tableCellStyle}>{order.orderTimestamp}</td>
              <td style={tableCellStyle}>{order.customer.fullName}</td>
              <td style={tableCellStyle}>{order.orderStatus}</td>
              <td style={tableCellStyle}>{order.store.storeName}</td>
            </tr>
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

export default OrderIdDetails;
