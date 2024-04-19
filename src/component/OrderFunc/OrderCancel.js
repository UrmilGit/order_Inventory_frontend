import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import AppNavbar from '../Navbar/AppNavbar';
 
function OrderCancel() {
    const navigate = useNavigate();
    const { orderId } = useParams();
    const [orderStatus, setOrderStatus] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
 
    const getOrderById = async () => {
        try {
            const response = await axios.get(`http://localhost:8085/api/v1/orders/orderid/${orderId}`);
            setOrderStatus(response.data.orderStatus);
        } catch (error) {
            console.error('Error getting order details:', error);
        }
    };
 
    const handleCancelOrder = async () => {
        try {
            const response = await axios.put(`http://localhost:8085/api/v1/orders/cancel/${orderId}`);
            setSuccessMessage('The order is cancelled.');
        } catch (error) {
            console.error('Error cancelling order:', error);
        }
    };

    const handleBack = () => {
        navigate('/order'); // Navigate to the customer page when the back button is clicked
    };
 
    useEffect(() => {
        getOrderById();
    }, []);
 
    return (
        <div>
            <AppNavbar/>
            <h2 style={{ textAlign: 'center', marginTop: '20px', marginBottom: '20px' }}>CANCEL ORDER</h2>
        <div style={{ backgroundColor: '#fff', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
           
            <div style={{ width: '300px', padding: '20px', borderRadius: '5px', backgroundColor: '#e7eaf6', textAlign: 'center' }}>
                <p style={{ marginBottom: '20px' }}>Order Status: <span style={{ backgroundColor: '#fff', color: '#38598b', padding: '5px', borderRadius: '5px', border: '1px solid #38598b' }}>{orderStatus}</span></p>
                <button onClick={handleCancelOrder} style={{ width: '100%', padding: '10px', backgroundColor: '#38598b', color: '#fff', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>Cancel</button>
                {successMessage && <p style={{ marginTop: '20px', color: 'green' }}>{successMessage}</p>}
            </div>
            <div style={{ textAlign: 'center' }}>
                    <button onClick={handleBack} className="btn btn-primary" style={{ marginRight: '10px', backgroundColor:'#38598b' }}>Back to Orders</button>
                </div>
        </div>
        </div>
    );
}
 
export default OrderCancel;
 