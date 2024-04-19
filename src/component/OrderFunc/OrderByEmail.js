import React, { useState } from 'react';
import axios from 'axios';
import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AppNavbar from '../Navbar/AppNavbar';



const OrderByEmail = () => {
    const [email, setEmail] = useState('');
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(null);

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleBack = () => {
        navigate('/order'); // Navigate to the customer page when the back button is clicked
    };

    const fetchOrdersByEmail = async () => {
        try {
            const response = await axios.get(`http://localhost:8085/api/v1/orders/customer/email?email=${email}`);
            setOrders(response.data);
            setSubmitted(true);
        } catch (error) {
            console.error('Error fetching orders by email:', error);
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
                    <h1>Retrieve Orders by Customer's Email</h1>
                </div>
                <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                    <label htmlFor="statusInput" style={{ marginRight: '10px' }}>Enter Email Id:</label>
                    <input
                         type="email"
                         id="emailInput"
                         value={email}
                         onChange={handleEmailChange}
                         style={{ marginLeft: '10px' }}
                         required
                    />
                    <button onClick={fetchOrdersByEmail} className="btn btn-primary" style={{ marginLeft: '10px', backgroundColor:'#38598b' }}>Submit</button>
                </div>
                {error && <p style={{ color: 'red', display:"flex", justifyContent:"center" }}>Error: {error}</p>}
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

export default OrderByEmail;
