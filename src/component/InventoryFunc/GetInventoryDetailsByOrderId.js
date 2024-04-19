import React, { useState } from 'react';
import AppNavbar from '../Navbar/AppNavbar';
import { Container } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function GetInventoryDetailsByOrderId() {
  const [inventoryDetails, setInventoryDetails] = useState([]);
  const [orderId, setOrderId] = useState('');
  const navigate = useNavigate()
  const [error, setError] = useState(null);
  const [dataFetched, setDataFetched] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents the default form submission behavior
    try {
      const response = await axios.get(`http://localhost:8085/api/v1/inventory/${orderId}/details`);
      setInventoryDetails(response.data);
      setError(null);
      setDataFetched(true);
    } catch (error) {
      setError('Error fetching details. Please check the order ID.');
      console.error('Error fetching data:', error);
      setDataFetched(false);
    }
  };

  const handleBack = () => {
    navigate('/inventory');
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
    <div style={{ backgroundColor: '#e7eaf6', minHeight: '100vh', paddingBottom: '50px' }}>
      <AppNavbar />
      <Container style={{ paddingTop: '20px' }}>
        <h2 style={{ marginBottom: '20px', display: "flex", justifyContent: "center" }}>Inventory Details</h2>
        <form onSubmit={handleSubmit} style={{ marginBottom: '20px', display: "flex", justifyContent: "center" }}>
          <label htmlFor="orderId" style={{ marginRight: '10px' }}>Enter Order ID:</label>
          <input
            type="text"
            id="orderId"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            required
            style={{ marginRight: '10px', padding: '5px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
          <button type="submit" style={{ padding: '5px 10px', backgroundColor: '#38598b', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Submit</button>
        </form>
        {error && <p style={{ color: 'red', display: "flex", justifyContent: "center" }}>{error}</p>}
        {inventoryDetails.length > 0 && (
          <div>
            <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ddd' }}>
              <thead>
                <tr>
                  <th style={tableHeaderStyle}>Product ID</th>
                  <th style={tableHeaderStyle}>Product Name</th>
                  <th style={tableHeaderStyle}>Unit Price</th>
                  <th style={tableHeaderStyle}>Colour</th>
                  <th style={tableHeaderStyle}>Brand</th>
                  <th style={tableHeaderStyle}>Size</th>
                  <th style={tableHeaderStyle}>Rating</th>
                  <th style={tableHeaderStyle}>Store ID</th>
                  <th style={tableHeaderStyle}>Store Name</th>
                  <th style={tableHeaderStyle}>Physical Address</th>
                  <th style={tableHeaderStyle}>Shipment Status</th>
                  <th style={tableHeaderStyle}>Total</th>
                </tr>
              </thead>
              <tbody>
                {inventoryDetails.map((item, index) => (
                  <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#ffffff' }}>
                    <td style={tableCellStyle}>{item.product.productId}</td>
                    <td style={tableCellStyle}>{item.product.productName}</td>
                    <td style={tableCellStyle}>{item.product.unitPrice}</td>
                    <td style={tableCellStyle}>{item.product.colour}</td>
                    <td style={tableCellStyle}>{item.product.brand}</td>
                    <td style={tableCellStyle}>{item.product.size}</td>
                    <td style={tableCellStyle}>{item.product.rating}</td>
                    <td style={tableCellStyle}>{item.store.storeId}</td>
                    <td style={tableCellStyle}>{item.store.storeName}</td>
                    <td style={tableCellStyle}>{item.store.physicalAddress}</td>
                    <td style={tableCellStyle}>{item.shipmentStatus}</td>
                    <td style={tableCellStyle}>{item.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Container>
      <div style={{ textAlign: 'center' }}>
        <button onClick={handleBack} className="btn btn-primary" style={{ marginRight: '10px', backgroundColor: '#38598b', marginTop: '20px' }}>Back to Inventory</button>
      </div>

    </div>
  );
}

export default GetInventoryDetailsByOrderId;
