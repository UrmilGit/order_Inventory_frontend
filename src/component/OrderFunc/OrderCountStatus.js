import React, { useState } from 'react';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AppNavbar from '../Navbar/AppNavbar';
 
const OrderCountStatus = () => {
  const [orderStatus, setOrderStatus] = useState('');
  const [orderCount, setOrderCount] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleBack = () => {
    navigate('/order'); // Navigate to the customer page when the back button is clicked
};
  const handleClick = async () => {
    try {
      // Check if orderStatus is empty
      if (!orderStatus.trim()) {
        throw new Error('Order status cannot be empty');
      }

      if (!/^[a-zA-Z]+$/.test(orderStatus.trim())) {
        throw new Error('Please enter a valid status');
      }
 
      const response = await axios.get(`http://localhost:8085/api/v1/orders/status?orderstatus=${orderStatus}`);
     
      // Check if the response data is an array and not empty
      if (Array.isArray(response.data) && response.data.length > 0) {
        // Find the object with the matching order status
        const orderStatusCount = response.data.find(item => item.orderStatus === orderStatus.toUpperCase());
        // Update the orderCount state with the count value
        setOrderCount(orderStatusCount.count);
      } else {
        // No orders found for the provided status
        setOrderCount(0);
      }
    } catch (error) {
      // Handle errors
      setError(error.response ? error.response.data.message : error.message);
    }
  };
 
  return (
    <div style={{backgroundColor:'#e7eaf6',minHeight: '100vh'}}>
      <AppNavbar/>
      <Container>
        <div style={{ textAlign: 'center', marginBottom: '20px', marginTop:'20px' }}> {/* Center align the heading */}
          <h1>Order Count By Status</h1>
        </div>
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <label htmlFor="orderStatus" style={{ marginRight: '10px' }}>Enter Order Status: </label>
          <input
            type="text"
            id="orderStatus"
            value={orderStatus}
            onChange={(e) => setOrderStatus(e.target.value)}
          />
          <button onClick={handleClick} className="btn btn-primary" style={{ marginLeft: '10px', backgroundColor:'#38598b' }}>Submit</button>
        </div>
      
        {orderCount !== null && (
          <div>
            <h3 style={{ textAlign: 'center', marginBottom: '20px', marginTop:'20px' }}>Count of Orders with Status {orderStatus}: {orderCount}</h3>
          </div>
        )}
        {error && <p style={{ color: 'red', display:"flex", justifyContent:"center" }}>Error: {error}</p>}
      </Container>
      <div style={{ textAlign: 'center' }}>
                    <button onClick={handleBack} className="btn btn-primary" style={{ marginLeft: '10px', backgroundColor:'#38598b' }}>Back to Orders</button>
      </div>
    </div>
  );
};
 
export default OrderCountStatus;
