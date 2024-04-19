import React, { useState } from 'react';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import AppNavbar from '../Navbar/AppNavbar';
import { useNavigate } from 'react-router-dom';

const ShipmentHistoryPage = () => {
    const [customerId, setCustomerId] = useState('');
    const [shipments, setShipments] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`http://localhost:8085/api/v1/customers/${customerId}/shipment`);
            setShipments(response.data.shipment);
            setError(null);
        } catch (error) {
            setError('Error fetching shipment history. Please check the customer ID.');
            console.error('Error fetching shipment history:', error);
        }
    };

    const handleBack = () => {
        navigate('/customers');
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


    return (
        <div style={{ backgroundColor: '#e7eaf6', textAlign: 'center', minHeight: '100vh', paddingBottom: '50px' }}>
            <AppNavbar />
            <div style={{ height: '20px' }} />
            <Container>
                <h2 style={{ marginBottom: '20px' }}>Shipment History</h2>
                <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
                    <label htmlFor="customerId" style={{ marginRight: '10px' }}>Enter Customer ID:</label>{' '}
                    <input
                        type="text"
                        id="customerId"
                        value={customerId}
                        onChange={(e) => setCustomerId(e.target.value)}
                        required
                        style={{ marginRight: '10px', padding: '5px' }}
                    />{' '}
                    <button type="submit" style={{ padding: '5px 10px', backgroundColor: '#38598b', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Submit</button>
                </form>
                {error && <p style={{ color: 'red', marginBottom: '20px' }}>{error}</p>}
                {shipments.length > 0 && (
                    <div style={{ marginTop: '20px' }}>
                        {/* <h3>Shipment History</h3> */}
                        <table style={{ margin: '0 auto', borderCollapse: 'collapse', width: '90%' }}>
                            <thead>
                                <tr>
                                    <th style={tableHeaderStyle}>Shipment ID</th>
                                    <th style={tableHeaderStyle}>Store Name</th>
                                    <th style={tableHeaderStyle}>Delivery Address</th>
                                    <th style={tableHeaderStyle}>Shipment Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {shipments.map(shipment => (
                                    <tr key={shipment.shipmentId}>
                                        <td style={tableCellStyle}>{shipment.shipmentId}</td>
                                        <td style={tableCellStyle}>{shipment.store.storeName}</td>
                                        <td style={tableCellStyle}>{shipment.deliveryAddress}</td>
                                        <td style={tableCellStyle}>{shipment.shipmentStatus}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
                <div style={{ textAlign: 'center' }}>
                    <button onClick={handleBack} className="btn btn-primary" style={{ marginRight: '10px', backgroundColor: '#38598b', marginTop: '20px' }}>Back to Customers</button>
                </div>
            </Container>
        </div>
    );
};

export default ShipmentHistoryPage;
