import React, { useState } from 'react';
import axios from 'axios';
import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AppNavbar from '../Navbar/AppNavbar';

const OrderDateRange = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [orders, setOrders] = useState([]);
    const [startDateError, setStartDateError] = useState('');
    const [endDateError, setEndDateError] = useState('');
    const [showTable, setShowTable] = useState(false); // State to control table visibility
    const navigate = useNavigate();

    const handleStartDateChange = (e) => {
        setStartDate(e.target.value);
        setStartDateError('');
    };
 
    const handleEndDateChange = (e) => {
        setEndDate(e.target.value);
        setEndDateError('');
    };

    const handleFetchOrders = async () => {
        setStartDateError('');
        setEndDateError('');
 
        // Check if start and end dates are empty
        if (!startDate.trim() || !endDate.trim()) {
            setStartDateError('Date cannot be empty');
            setEndDateError('Date cannot be empty');
            return;
        }
 
        // Validate date format using regular expressions
        const dateFormat = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateFormat.test(startDate)) {
            setStartDateError('Please enter date in correct format "YYYY-MM-DD"');
            return;
        }
 
        if (!dateFormat.test(endDate)) {
            setEndDateError('Please enter date in correct format "YYYY-MM-DD"');
            return;
        }
        try {
            const response = await axios.get(`http://localhost:8085/api/v1/orders/dateRange?startDate=${startDate}&endDate=${endDate}`);
            const fetchedOrders = response.data;
            if (Array.isArray(fetchedOrders)) {
                setOrders(fetchedOrders);
                setShowTable(true); // Set showTable to true when orders are fetched successfully
            } else {
                console.error('Invalid data format returned from API:', fetchedOrders);
            }
        } catch (error) {
            console.error('Error fetching orders:', error);
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
        <div style={{ backgroundColor: '#e7eaf6', minHeight: '100vh' }}>
            <AppNavbar />
            <Container>
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <h1>Order Details by Date Range</h1>
                </div>
                <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                    <label htmlFor="startDate">Start Date (Timestamp):</label>
                    <input
                        type="text"
                        id="startDate"
                        value={startDate}
                        onChange={handleStartDateChange}
                        style={{ marginLeft: '10px', borderColor:startDateError?'red':'' }}
                    />
                    {startDateError && <p style={{color:'red'}}>{startDateError}</p>}
                    <label htmlFor="endDate" style={{ marginLeft: '20px' }}>End Date (Timestamp):</label>
                    <input
                        type="text"
                        id="endDate"
                        value={endDate}
                        onChange={handleEndDateChange}
                        style={{ marginLeft: '10px', borderColor:endDateError?'red':'' }}
                    />
                    {endDateError && <p style={{color:'red'}}>{endDateError}</p>}
                    <Button onClick={handleFetchOrders} style={{ backgroundColor: '#38598b', marginLeft: '20px' }}>
                        Submit
                    </Button>
                </div>
                {showTable && (
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
                    <button onClick={handleBack} className="btn btn-primary" style={{ marginLeft: '10px', backgroundColor: '#38598b' }}>Back to Orders</button>
                    {startDateError && endDateError && <p style={{color:'red', marginTop:'10px'}}>Please enter both dates in correct format "YYYY-MM-DD"</p>}
                </div>
            </Container>
        </div>
    );
};

export default OrderDateRange;
