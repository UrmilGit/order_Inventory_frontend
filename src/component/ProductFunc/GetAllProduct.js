import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Container, Table } from 'react-bootstrap'
import AppNavbar from '../Navbar/AppNavbar';
import { Navigate, useNavigate } from 'react-router-dom'

const GetAllProduct = () => {
    const [products, setProducts] = useState([])
    const navigate = useNavigate();
    const getAllProducts = async () => {
        const response = await axios.get('http://localhost:8085/api/v1/products', products)
        setProducts(response.data);
    }
    const deleteProduct = async (id) => {
        await axios.delete(`http://localhost:8085/api/v1/products/${id}`)
        getAllProducts()
        console.log("delete");
    }
    useEffect(() => {
        getAllProducts();
    }, [])

    const handleBack = () => {
        navigate('/products');
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

    const editCustomer = (cid) => {
        navigate(`/update/product/${cid}`);
    }

    return (
        <>
            <AppNavbar />
            <Container style={{ marginTop: '30px' }} >
                <Table striped bordered hover >
                    <thead>
                        <tr>
                            <th style={tableHeaderStyle}>ID</th>
                            <th style={tableHeaderStyle}>NAME</th>
                            <th style={tableHeaderStyle}>UNIT PRICE</th>
                            <th style={tableHeaderStyle}>COLOUR</th>
                            <th style={tableHeaderStyle}>BRAND</th>
                            <th style={tableHeaderStyle}>SIZE</th>
                            <th style={tableHeaderStyle}>RATING</th>
                            <th style={tableHeaderStyle}>DELETE</th>
                            <th style={tableHeaderStyle}>EDIT</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(products => {
                            return <tr>
                                <td style={tableCellStyle}>{products.productId}</td>
                                <td style={tableCellStyle}>{products.productName}</td>
                                <td style={tableCellStyle}>{products.unitPrice}</td>
                                <td style={tableCellStyle}>{products.colour}</td>
                                <td style={tableCellStyle}>{products.brand}</td>
                                <td style={tableCellStyle}>{products.size}</td>
                                <td style={tableCellStyle}>{products.rating}</td>
                                <td style={tableCellStyle}><Button variant='danger' onClick={() => deleteProduct(products.productId)}>Delete</Button></td>
                                <td style={tableCellStyle}><Button variant='warning' onClick={() => editCustomer(products.productId)}>Edit</Button></td>
                            </tr>
                        })}
                    </tbody>
                </Table>
                <div style={{ textAlign: 'center' }}>
                    <button onClick={handleBack} className="btn btn-primary" style={{ marginRight: '10px', backgroundColor: '#38598b', marginTop: '20px' }}>Back to Products</button>
                </div>
            </Container>
        </>
    )
}

export default GetAllProduct