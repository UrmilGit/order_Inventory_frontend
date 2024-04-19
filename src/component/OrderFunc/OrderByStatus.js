import React, { useState } from 'react';
import axios from 'axios';
import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AppNavbar from '../Navbar/AppNavbar';

const OrderByStatus = () => {
    const [status, setStatus] = useState('');
    const [orders, setOrders] = useState([]);
    const [submitted, setSubmitted] = useState(false); // Track if the form is submitted
    const navigate = useNavigate();
    const [error, setError]=useState(null);

    const handleStatusChange = (event) => {
        setStatus(event.target.value);
    };

    const handleBack = () => {
        navigate('/order'); // Navigate to the customer page when the back button is clicked
    };

    const fetchOrdersByStatus = async () => {
        try {
            setError(null);

            if (!status.trim()) {
                throw new Error('Status cannot be empty');
              }
         
              // Check if status contains only letters
              if (!/^[a-zA-Z]+$/.test(status.trim())) {
                throw new Error('Please enter a valid status (only letters allowed)');
              }

            const response = await axios.get(`http://localhost:8085/api/v1/orders/orders/status?status=${status}`);
            setOrders(response.data);
            setSubmitted(true); // Set submitted to true after fetching orders
        } catch (error) {
            setError(error.response ? error.response.data.message : error.message);
            console.error('Error fetching orders by status:', error);
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
                    <h1>Retrieve Orders by Status</h1>
                </div>
                <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                    <label htmlFor="statusInput" style={{ marginRight: '10px' }}>Enter Order Status:</label>
                    <input
                        type="text"
                        id="statusInput"
                        value={status}
                        onChange={handleStatusChange}
                        style={{ marginLeft: '10px' }}
                    />
                    <button onClick={fetchOrdersByStatus} className="btn btn-primary" style={{ marginLeft: '10px', backgroundColor:'#38598b' }}>Submit</button>
                </div>
                {error && <p style={{color:'red', display:'flex', justifyContent:'center'}}>Error: {error}</p>}
                {submitted && orders.length > 0 && (
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

export default OrderByStatus;
