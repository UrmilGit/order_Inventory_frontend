import React, { useState } from 'react';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import AppNavbar from '../Navbar/AppNavbar';
import { useNavigate } from 'react-router-dom';

const GetProductByBrand = () => {
    const [brand, setBrand] = useState('');
    const [error, setError] = useState(null);
    const [products, setProducts] = useState([]);
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`http://localhost:8085/api/v1/products/brand/${brand}`);
            setProducts(response.data);
            setError(null);
        } catch (error) {
            setError(error.response ? error.response.data.message : error.message);
        }
    };

    const handleBack = () => {
        navigate('/products');
    };

    console.log(products.productId, 'jhsbfj')
    return (
        <>
            <AppNavbar></AppNavbar>
            <div style={{ backgroundColor: '#e7eaf6', textAlign: 'center', minHeight: '100vh', paddingBottom: '50px' }}>
                <div style={{ height: '20px' }} />
                <Container>
                    <h2 style={{ marginBottom: '20px' }}>Product Details</h2>
                    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
                        <label htmlFor="productName" style={{ marginRight: '10px', fontWeight: 'bold' }}>Enter Brand Name:</label>
                        <input
                            type="text"
                            id="brand"
                            value={brand}
                            onChange={(e) => setBrand(e.target.value)}
                            required
                            style={{ marginRight: '10px', padding: '5px' }}

                        />
                        <button type="submit" style={{ padding: '5px 10px', backgroundColor: '#38598b', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Submit</button>
                    </form>
                    {error && <p style={{ color: 'red', marginBottom: '20px' }}>{error}</p>}

                    {products.length > 0 && (
                        <table style={{ margin: '0 auto', borderCollapse: 'collapse', width: '90%' }}>
                            <thead>
                                <tr>
                                    <th style={tableHeaderStyle}>ID</th>
                                    <th style={tableHeaderStyle}>NAME</th>
                                    <th style={tableHeaderStyle}>UNIT PRICE</th>
                                    <th style={tableHeaderStyle}>COLOR</th>
                                    <th style={tableHeaderStyle}>BRAND</th>
                                    <th style={tableHeaderStyle}>SIZE</th>
                                    <th style={tableHeaderStyle}>RATING</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map(product => (
                                    <tr key={product.productId}>
                                        <td style={tableCellStyle}>{product.productId}</td>
                                        <td style={tableCellStyle}>{product.productName}</td>
                                        <td style={tableCellStyle}>{product.unitPrice}</td>
                                        <td style={tableCellStyle}>{product.colour}</td>
                                        <td style={tableCellStyle}>{product.brand}</td>
                                        <td style={tableCellStyle}>{product.size}</td>
                                        <td style={tableCellStyle}>{product.rating}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                    <div style={{ textAlign: 'center' }}>
                        <button onClick={handleBack} className="btn btn-primary" style={{ marginRight: '10px', backgroundColor: '#38598b', marginTop: '20px' }}>Back to Products</button>
                    </div>
                </Container>
            </div>
        </>
    );
};

const tableHeaderStyle = {
    backgroundColor: '#38598b',
    color: 'white',
    padding: '10px',
};

const tableCellStyle = {
    backgroundColor: '#e7eaf6',
    border: '1px solid #ccc',
    padding: '10px',
};

export default GetProductByBrand;
