import React from 'react';
import { useState } from 'react';
import { Container, Table } from 'react-bootstrap';
import AppNavbar from '../Navbar/AppNavbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const GetProductCustomerStoreByOrderId = () => {
  const [orderId, setOrderId] = useState('');
  const [product, setProduct] = useState({});
  const [customer, setCustomer] = useState({});
  const [store, setStore] = useState({});
  const [error, setError] = useState(null);
  const [dataFetched, setDataFetched] = useState(false);
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:8085/api/v1/inventory/orderid/${orderId}`);
      setProduct(response.data.product);
      setCustomer(response.data.customer);
      setStore(response.data.store);
      setError(null);
      setDataFetched(true);
    } catch (error) {
      setError('Error fetching details. Please check the order ID.');
      console.error('Error fetching details:', error);
      setDataFetched(false);
    }
  };

  const handleBack = () => {
    navigate('/inventory');
  };


  return (
    <div style={{ backgroundColor: '#e7eaf6', textAlign: 'center', minHeight: '100vh', paddingBottom: '50px' }}>
      <AppNavbar />
      <div style={{ height: '20px' }} />
      <Container>
        <h2 style={{ marginBottom: '20px' }}>Product, Customer & Store Details</h2>
        <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
          <label htmlFor="orderId" style={{ marginRight: '10px' }}>Enter Order ID:</label>
          <input
            type="text"
            id="orderId"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            required
            style={{ marginRight: '10px', padding: '5px' }}
          />
          <button type="submit" style={{ padding: '5px 10px', backgroundColor: '#38598b', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Submit</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {dataFetched && (
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <div style={{ width: '30%' }}>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th colSpan="2" style={{ textAlign: 'center', ...tableHeaderStyle }}>Product Details</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(product).map(([key, value]) => (
                    <tr key={key}>
                      <td style={{ fontWeight: 'bold', ...tableCellStyle }}>{key}</td>
                      <td style={tableCellStyle}>{value}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
            <div style={{ width: '30%' }}>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th colSpan="2" style={{ textAlign: 'center', ...tableHeaderStyle }}>Customer Details</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(customer).map(([key, value]) => (
                    <tr key={key}>
                      <td style={{ fontWeight: 'bold', ...tableCellStyle }}>{key}</td>
                      <td style={tableCellStyle}>{value}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
            <div style={{ width: '30%' }}>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th colSpan="2" style={{ textAlign: 'center', ...tableHeaderStyle }}>Store Details</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(store).map(([key, value]) => (
                    <tr key={key}>
                      <td style={{ fontWeight: 'bold', ...tableCellStyle }}>{key}</td>
                      <td style={tableCellStyle}>{value}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        )}
        <div style={{ textAlign: 'center' }}>
          <button onClick={handleBack} className="btn btn-primary" style={{ marginRight: '10px', backgroundColor: '#38598b', marginTop: '20px' }}>Back to Inventory</button>
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
  backgroundColor: "#e7eaf6"
};

export default GetProductCustomerStoreByOrderId;
