import React, { useState, useEffect } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import AppNavbar from '../Navbar/AppNavbar';
import { useNavigate } from 'react-router-dom';


function CountOfSoldProducts() {
  const [shipmentStatus, setShipmentStatus] = useState('');
  const [soldProducts, setSoldProducts] = useState(0);
  const navigate = useNavigate()

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await fetch('http://localhost:8085/api/v1/inventory/shipment/soldproducts');
      const data = await response.json();
      setShipmentStatus(data.shipmentStatus);
      setSoldProducts(data.soldProducts);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const handleBack = () => {
    navigate('/inventory');
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
                <Button style={{ marginBottom: '20px', backgroundColor: '#38598b', borderColor: '#38598b', color: 'white' }}>Count of Sold Products</Button>
                <ul style={{ listStyleType: 'none', padding: 0 }}></ul>
                <div style={{ marginBottom: '10px', fontWeight: 'bold', color: 'black' }}>Shipment Status: {shipmentStatus}</div>
                <div style={{ marginBottom: '10px', fontWeight: 'bold', color: 'black' }}>Sold Products: {soldProducts}</div>
              </div>
            </Container>
          </Col>
        </Row>
      </Container>
      <div style={{ textAlign: 'center' }}>
        <button onClick={handleBack} className="btn btn-primary" style={{ marginRight: '10px', backgroundColor: '#38598b', marginTop: '20px' }}>Back to Inventory</button>
      </div>
    </div>
  );
}

export default CountOfSoldProducts;
