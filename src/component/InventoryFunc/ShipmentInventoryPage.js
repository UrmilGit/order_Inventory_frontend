import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import AppNavbar from '../Navbar/AppNavbar';
import { useNavigate } from 'react-router-dom';

function ShipmentInventoryPage() {
    const [shipmentInventoryData, setShipmentInventoryData] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8085/api/v1/inventory/shipment');
                setShipmentInventoryData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const tableHeaderStyle = {
        backgroundColor: '#38598b',
        color: 'white',
        padding: '10px',
    };

    const tableCellStyle = {
        border: '1px solid #ccc',
        padding: '10px',
    };

    const handleBack = () => {
        navigate('/inventory');
    };

    return (
        <div style={{ backgroundColor: "#e7eaf6" }}>
            <AppNavbar />
            <div className="container">
                <h2 style={{ textAlign: 'center' }}>Shipment Details</h2>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th style={tableHeaderStyle}>Shipment ID</th>
                            <th style={tableHeaderStyle}>Store ID</th>
                            <th style={tableHeaderStyle}>Customer ID</th>
                            <th style={tableHeaderStyle}>Store Name</th>
                            <th style={tableHeaderStyle}>Physical Address</th>
                            <th style={tableHeaderStyle}>Customer Name</th>
                            <th style={tableHeaderStyle}>Customer Email</th>
                            <th style={tableHeaderStyle}>Delivery Address</th>
                            <th style={tableHeaderStyle}>Shipment Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {shipmentInventoryData.map((item, index) => (
                            <tr key={index}>
                                <td style={tableCellStyle}>{item.shipment.shipmentId}</td>
                                <td style={tableCellStyle}>{item.shipment.store.storeId}</td>
                                <td style={tableCellStyle}>{item.shipment.customer.customerId}</td>
                                <td style={tableCellStyle}>{item.shipment.store.storeName}</td>
                                <td style={tableCellStyle}>{item.shipment.store.physicalAddress}</td>
                                <td style={tableCellStyle}>{item.shipment.customer.fullName}</td>
                                <td style={tableCellStyle}>{item.shipment.customer.emailAddress}</td>
                                <td style={tableCellStyle}>{item.shipment.deliveryAddress}</td>
                                <td style={tableCellStyle}>{item.shipment.shipmentStatus}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <h2 style={{ textAlign: 'center' }}>Inventory Details</h2>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th style={tableHeaderStyle}>Inventory ID</th>
                            <th style={tableHeaderStyle}>Product ID</th>
                            <th style={tableHeaderStyle}>Product Name</th>
                            <th style={tableHeaderStyle}>Unit Price</th>
                            <th style={tableHeaderStyle}>Colour</th>
                            <th style={tableHeaderStyle}>Brand</th>
                            <th style={tableHeaderStyle}>Size</th>
                            <th style={tableHeaderStyle}>Rating</th>
                            <th style={tableHeaderStyle}>Product Inventory</th>
                        </tr>
                    </thead>
                    <tbody>
                        {shipmentInventoryData.map((item, index) => (
                            <tr key={index}>
                                <td style={tableCellStyle}>{item.inventory.inventoryId}</td>
                                <td style={tableCellStyle}>{item.inventory.product.productId}</td>
                                <td style={tableCellStyle}>{item.inventory.product.productName}</td>
                                <td style={tableCellStyle}>{item.inventory.product.unitPrice}</td>
                                <td style={tableCellStyle}>{item.inventory.product.colour}</td>
                                <td style={tableCellStyle}>{item.inventory.product.brand}</td>
                                <td style={tableCellStyle}>{item.inventory.product.size}</td>
                                <td style={tableCellStyle}>{item.inventory.product.rating}</td>
                                <td style={tableCellStyle}>{item.inventory.productInventory}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <div style={{ textAlign: 'center' }}>
                    <button onClick={handleBack} className="btn btn-primary" style={{ marginRight: '10px', backgroundColor: '#38598b', marginTop: '20px' }}>Back to Inventory</button>
                </div>
            </div>
        </div>
    );
}

export default ShipmentInventoryPage;




