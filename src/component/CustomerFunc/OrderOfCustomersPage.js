import React, { useState } from 'react';
import axios from 'axios';
import AppNavbar from '../Navbar/AppNavbar';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const OrderOfCustomersPage = () => {
    const [customerId, setCustomerId] = useState('');
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`http://localhost:8085/api/v1/customers/${customerId}/order`);
            setOrders(response.data.order);
            setError(null);
        } catch (error) {
            setError('Error fetching order details. Please check the customer ID.');
            console.error('Error fetching order details:', error);
        }
    };

    const handleBack = () => {
        navigate('/customers');
    };

    return (
        <div style={{ backgroundColor: '#e7eaf6', textAlign: 'center', minHeight: '100vh', paddingBottom: '50px' }}>
            <AppNavbar />
            <div style={{ height: '20px' }} />
            <Container>
                <h2 style={{ marginBottom: '20px' }}>Order Details</h2>
                <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
                    <label htmlFor="customerId" style={{ marginRight: '10px' }}>Enter Customer ID:</label>
                    <input
                        type="text"
                        id="customerId"
                        value={customerId}
                        onChange={(e) => setCustomerId(e.target.value)}
                        required
                        style={{ marginRight: '10px', padding: '5px' }}
                    />
                    <button type="submit" style={{ padding: '5px 10px', backgroundColor: '#38598b', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Submit</button>
                </form>
                {error && <p style={{ color: 'red', marginBottom: '20px' }}>{error}</p>}
                <div>
                    {orders.length > 0 ? (
                        <div style={{ marginTop: '20px' }}>
                            {/* <h3>Order Details</h3> */}
                            <table style={{ margin: '0 auto', borderCollapse: 'collapse', width: '90%' }}>
                                <thead>
                                    <tr>
                                        <th style={tableHeaderStyle}>Order ID</th>
                                        <th style={tableHeaderStyle}>Order Timestamp</th>
                                        <th style={tableHeaderStyle}>Order Status</th>
                                        <th style={tableHeaderStyle}>Store Name</th>
                                        <th style={tableHeaderStyle}>Physical Address</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map(order => (
                                        <tr key={order.orderId}>
                                            <td style={tableCellStyle}>{order.orderId}</td>
                                            <td style={tableCellStyle}>{order.orderTimestamp}</td>
                                            <td style={tableCellStyle}>{order.orderStatus}</td>
                                            <td style={tableCellStyle}>{order.store.storeName}</td>
                                            <td style={tableCellStyle}>{order.store.physicalAddress}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : null}
                </div>
                <div style={{ textAlign: 'center' }}>
                    <button onClick={handleBack} className="btn btn-primary" style={{ marginRight: '10px', backgroundColor: '#38598b', marginTop: '20px' }}>Back to Customers</button>
                </div>
            </Container>
        </div>
    );
};

const tableHeaderStyle = {
    backgroundColor: '#38598b',
    color: 'white',
    padding: '10px',
};

const tableCellStyle = {
    border: '1px solid #ccc',
    padding: '10px',
};

export default OrderOfCustomersPage;
