import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Col, Container, Row } from 'react-bootstrap';
import AppNavbar from '../Navbar/AppNavbar';
import { Form, useNavigate } from 'react-router-dom';


const CountOfCustomersPage = () => {
    const [counts, setCounts] = useState([]);
    const navigate=useNavigate()

    const fetchCustomerCounts = async () => {
        try {
            const response = await axios.get('http://localhost:8085/api/v1/customers/shipment/status');
            setCounts(response.data);
        } catch (error) {
            console.error('Error fetching customer counts:', error);
        }
    };

    useEffect(() => {
        fetchCustomerCounts();
    }, []);


    const handleBack = () => {
        navigate('/customers');
    };

    return (
        <div style={{ backgroundColor: '#e7eaf6', minHeight: '100vh', paddingBottom: '50px' }}>
            <AppNavbar />
            <div style={{ height: '20px' }} />
            <Container>
                <Row className="justify-content-md-center">
                    <Col xs={12} md={6}>
                        <Container style={{ backgroundColor: '#a2a8d3', color: 'white', padding: '20px', borderRadius: '10px', textAlign: 'center' }}>
                            <div style={{ marginTop: '50px', marginBottom: '50px' }}>
                                <Button style={{ marginBottom: '20px', backgroundColor: '#38598b', borderColor: '#38598b', color: 'white' }}>Count of Customers</Button>
                                <ul style={{ listStyleType: 'none', padding: 0 }}>
                                    {counts.map(({ shipmentStatus, count }) => (
                                        <li key={shipmentStatus} style={{ marginBottom: '10px' }}>
                                            <span style={{ fontWeight: 'bold', color: 'black' }}>{shipmentStatus}:</span> <span style={{ fontWeight: 'bold', color: 'black' }}>{count}</span>
                                        </li>
                                    ))}
                                </ul>

                            </div>
                        </Container>
                    </Col>
                </Row>
                <div style={{ textAlign: 'center' }}>
                    <button onClick={handleBack} className="btn btn-primary" style={{ marginRight: '10px', backgroundColor:'#38598b', marginTop: '20px' }}>Back to Customers</button>
                </div>
            </Container>
        </div>
    );
};

export default CountOfCustomersPage;
