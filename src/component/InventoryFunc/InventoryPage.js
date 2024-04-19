import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FaWarehouse } from "react-icons/fa";
import { motion } from "framer-motion"; // Import Framer Motion
import AppNavbar from '../Navbar/AppNavbar';


const InventoryPage = () => {
    const handleAllInventoryClick = () => {
        window.location.href = "/all/inventory";
    }
    const handleProductCustomerStoreClick = () => {
        window.location.href = "/get/pcs";
    }
    const handleInventoryShipmentClick = () => {
        window.location.href = "/inventory/shipment";
    }
    const handleSoldProductClick = () => {
        window.location.href = "/inventory/sold-products";
    }
    const handleInventoryDetailsClick = () => {
        window.location.href = "/get/inventory/details";
    }

    return (
        <div style={{ backgroundColor: '#e7eaf6', minHeight: '100vh', paddingBottom: '50px' }}>
            <AppNavbar />
            <Container className="py-4">
                <Row>

                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="customer-form"
                    >
                        <h2 style={{ color: 'black' }}>
                            <FaWarehouse style={{ color: 'black' }} /> Inventory
                        </h2>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="customer-filter"
                    >

                        <Button variant="success" className="ml-auto" style={{ backgroundColor: '#38598b', borderColor: '#38598b', color: 'white' }} onClick={handleAllInventoryClick}>View All Inventory</Button>
                        <Button variant="primary" className="mb-3 d-block" style={{ backgroundColor: '#38598b', borderColor: '#38598b', color: 'white' }} onClick={handleProductCustomerStoreClick}>Retreive Products/Customers/Stores</Button>
                        <Button variant="primary" className="mb-3 d-block" style={{ backgroundColor: '#38598b', borderColor: '#38598b', color: 'white' }} onClick={handleInventoryDetailsClick}>Retreive Product/Store/Shipment Status</Button>
                        {/* <Button variant="primary" className="mb-3 d-block" style={{ backgroundColor: '#38598b' ,borderColor: '#38598b',color:'white'}}>Get Product Order Status By Store ID</Button> */}
                        <Button variant="primary" className="mb-3 d-block" style={{ backgroundColor: '#38598b', borderColor: '#38598b', color: 'white' }} onClick={handleInventoryShipmentClick}>View Inventory & Shipment Details</Button>
                        <Button variant="primary" className="mb-3 d-block" style={{ backgroundColor: '#38598b', borderColor: '#38598b', color: 'white' }} onClick={handleSoldProductClick}>Count Of Sold Products</Button>
                    </motion.div>
                </Row>
            </Container>
        </div>
    );
};

export default InventoryPage;
