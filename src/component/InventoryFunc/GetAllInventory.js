
import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import AppNavbar from '../Navbar/AppNavbar';
import { useNavigate } from 'react-router-dom';

const GetAllInventory = () => {
  const [inventoryData, setInventoryData] = useState([]);
  const navigate = useNavigate()
  
  useEffect(() => {
    // Fetch data from the API
    fetch('http://localhost:8085/api/v1/inventory/')
      .then(response => response.json())
      .then(data => setInventoryData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleBack = () => {
    navigate('/inventory');
  };

  return (
    <div>
      <AppNavbar />
      <div className="inventory-page" style={{ backgroundColor: '#e7eaf6', textAlign: 'center', minHeight: '100vh', paddingBottom: '50px' }}>
        <Carousel
          showThumbs={false}
          showArrows={true}
          showStatus={false}
          infiniteLoop={true}
          autoPlay={false}
        >
          {inventoryData.map((item) => (
            <div key={item.inventoryId} className="inventory-item" style={{ backgroundColor: '#a2a8d3' }}>
              <h2 className="inventory-id" style={{ fontWeight: 'bold', backgroundColor: "#38598b", color: "white" }}>Inventory ID: {item.inventoryId}</h2>
              <div className="left-section">
                <div className="section">
                  <div className="section-heading" style={{ backgroundColor: "#38598b", color: "white" }}>Store</div>
                  <div className="store-details">
                    <p style={{ color: 'black' }}>Store ID: {item.store.storeId}</p>
                    <p style={{ color: 'black' }}>Store Name: {item.store.storeName}</p>
                    <p style={{ color: 'black' }}>Web Address: {item.store.webAddress || 'N/A'}</p>
                    <p style={{ color: 'black' }}>Physical Address: {item.store.physicalAddress || 'N/A'}</p>
                  </div>
                </div>
                <div className="section">
                  <div className="section-heading" style={{ backgroundColor: "#38598b", color: "white" }}>Product Inventory</div>
                  <div className="inventory-details">
                    <p style={{ color: 'black' }}>{item.productInventory}</p>
                  </div>
                </div>
              </div>
              <div className="right-section">
                <div className="section">
                  <div className="section-heading" style={{ backgroundColor: "#38598b", color: "white" }}>Product</div>
                  <div className="product-details">
                    <p style={{ color: 'black' }}>Product ID: {item.product.productId}</p>
                    <p style={{ color: 'black' }}>Product Name: {item.product.productName}</p>
                    <p style={{ color: 'black' }}>Unit Price: ${item.product.unitPrice.toFixed(2)}</p>
                    <p style={{ color: 'black' }}>Colour: {item.product.colour}</p>
                    <p style={{ color: 'black' }}>Brand: {item.product.brand}</p>
                    <p style={{ color: 'black' }}>Size: {item.product.size}</p>
                    <p style={{ color: 'black' }}>Rating: {item.product.rating}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
        <div style={{ textAlign: 'center' }}>
          <button onClick={handleBack} className="btn btn-primary" style={{ marginRight: '10px', backgroundColor: '#38598b', marginTop: '20px' }}>Back to Inventory</button>
        </div>
        <style>{`
        .inventory-page {
          font-family: 'Roboto', sans-serif;
          padding: 20px;
          background-color: #f4f4f4;
        }
        .page-title {
          text-align: center;
          font-size: 28px;
          margin-bottom: 30px;
          color: #333;
        }
        .inventory-item {
          border-radius: 5px;
          margin-bottom: 50px; /* Add margin bottom for spacing */
          padding: 20px;
          background-color: #fff;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          position: relative;
          overflow: hidden;
        }
        .inventory-id {
          text-align: center;
          margin-top: 0;
          font-size: 24px;
          color: #333;
        }
        .left-section,
        .right-section {
          width: calc(50% - 10px);
          display: inline-block;
          vertical-align: top;
        }
        .right-section {
          margin-left: 20px;
        }
        .section {
          margin-bottom: 15px;
          border: 1px solid #ccc;
          border-radius: 5px;
          padding: 10px;
          background-color: #f9f9f9;
        }
        .section-heading {
          font-weight: bold;
          margin-bottom: 10px;
        }
        p {
          margin: 5px 0;
          font-size: 16px;
          color: #777;
        }
      `}</style>
      </div>
    </div>
  );
};

export default GetAllInventory;



