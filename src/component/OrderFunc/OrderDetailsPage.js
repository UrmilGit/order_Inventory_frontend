import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Button, Dropdown, DropdownButton } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import OrderDetailsNavbar from './OrderDetailsNavbar';
import AppNavbar from '../Navbar/AppNavbar';


const OrderDetailsPage = ({order}) => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [flag, setFlag]=useState(false)

    const handleBack = () => {
        navigate('/order'); // Navigate to the customer page when the back button is clicked
    };

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('http://localhost:8085/api/v1/orders/all'); // Adjust the endpoint based on your backend API
                setOrders(response.data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, []);

    const handleUpdateOrder = (orderId) => {
        navigate(`/order/edit/${orderId}`);
    };

    const handleCancelOrder = async (orderId) => {
        navigate(`/order-cancel/${orderId}`);
    };


    const handleDropdownSelect = (eventKey) => {
        if (eventKey === 'orderCountStatus') {
          navigate('/order-status'); // Navigate to OrderStatusPage
        } else {
          // Handle other dropdown options
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
        <div style={{backgroundColor:'#e7eaf6',minHeight: '100vh'}}>
          <AppNavbar/>
            <Container >
            <div style={{ textAlign: 'center', marginBottom: '20px',marginTop:'20px' }} > {/* Center align the heading */}
                    <h1>Order Management</h1>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-3" >
                </div>
                <table style={{ borderCollapse: 'collapse', width: '100%', marginBottom: '20px' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#f2f2f2' }}>
                            <th style={tableHeaderStyle}>Order ID</th>
                            <th style={tableHeaderStyle}>Order Timestamp</th>
                            <th style={tableHeaderStyle}>Customer</th>
                            <th style={tableHeaderStyle}>Order Status</th>
                            <th style={tableHeaderStyle}>Store</th>
                            <th style={tableHeaderStyle}>Edit</th>
                            <th style={tableHeaderStyle}>Cancel Order</th>
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
                                <td style={tableCellStyle}>
                                <td><Button variant='warning' onClick={() => handleUpdateOrder(order.orderId)}>Update</Button></td>
                                </td>
                                <td style={tableCellStyle}>
                                    <button onClick={() => handleCancelOrder(order.orderId)} className="btn" style={{ backgroundColor: '#6c757d', color: 'white' }}>Cancel</button>
                                </td>
                                

                            </tr>
                        ))}
                    </tbody>
                </table>
                <div style={{ textAlign: 'center' }}>
                    <button onClick={handleBack} className="btn btn-primary" style={{ marginRight: '10px', backgroundColor:'#38598b' }}>Back to Orders</button>
                </div>
            </Container>
        </div>
    );
};

export default OrderDetailsPage;
