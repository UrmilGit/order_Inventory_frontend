import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { FaGift } from "react-icons/fa";
import '../css files/ProductPage.css';
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AppNavbar from '../Navbar/AppNavbar';

const ProductsPage = () => {
  const [product, setProduct] = useState({ productId: 0, productName: '', unitPrice: '', colour: '', brand: '', size: '', rating: '' });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateInput = () => {
    let errors = {};
    const nameRegex = /^[A-Za-z\s\-'.]+$/; // Allow alphabets, spaces, hyphens, apostrophes, and dots
    const numberRegex = /^\d+$/;

    if (!product.productName || !nameRegex.test(product.productName)) {
      errors.productName = "Invalid input: Please enter a valid name";
    }
    if (!product.colour || !nameRegex.test(product.colour)) {
      errors.colour = "Invalid input: Please enter a valid colour";
    }
    if (!product.brand || !nameRegex.test(product.brand)) {
      errors.brand = "Invalid input: Please enter a valid brand";
    }
    if (!product.unitPrice || !numberRegex.test(product.unitPrice)) {
      errors.unitPrice = "Invalid input: Please enter a valid price";
    }
    if (!product.rating || !numberRegex.test(product.rating)) {
      errors.rating = "Invalid input: Please enter a valid rating";
    }

    return errors;
  };

  const changeHandler = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateInput();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      try {
        const response = await axios.post('http://localhost:8085/api/v1/products/add', product);
        console.log("Product added successfully:", response.data);
        navigate('/all/products');
      } catch (error) {
        console.error("Error adding product:", error);
        alert("Error adding product. Please try again later.");
      }
    }
  };

  const handleClick = () => {
    window.location.href = '/all/products';
  };

  const handleGetNameClick = () => {
    console.log("Get Products By Name button clicked");
    navigate('/getProductsByName');
  };

  const handleGetPriceClick = () => {
    console.log("Get Products By Price Range button clicked");
    navigate('/getProductsByPrice');
  };

  const handleGetBrandClick = () => {
    console.log("Get Products By Brand button clicked");
    navigate('/getProductsByBrand');
  };

  const handleGetFieldClick = () => {
    console.log("Get Products By Field button clicked");
    navigate('/getProductsByField');
  };


  return (
    <div style={{ backgroundColor: '#e7eaf6' }}>
      <AppNavbar />
      <Container className="py-4">
        <Row>
          <Col md={6}>
            <div className="customer-form">
              <motion.h2
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <FaGift style={{ color: 'black' }} /> Products
              </motion.h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="productName">
                  <Form.Label style={{ color: 'black' }}>Product Name*</Form.Label>
                  <Form.Control type="text" placeholder="Enter name" name='productName' value={product.productName} onChange={changeHandler} required style={{ color: 'black' }} />
                  {errors.productName && <Form.Text className="text-danger">{errors.productName}</Form.Text>}
                </Form.Group>
                <Form.Group controlId="unitPrice">
                  <Form.Label style={{ color: 'black' }}>Unit Price*</Form.Label>
                  <Form.Control type="text" placeholder="Enter price" name='unitPrice' value={product.unitPrice} onChange={(c) => changeHandler(c)} required style={{ color: 'black' }} />
                  {errors.unitPrice && <Form.Text className="text-danger">{errors.unitPrice}</Form.Text>}
                </Form.Group>
                <Form.Group controlId="productColour">
                  <Form.Label style={{ color: 'black' }}>Product Colour*</Form.Label>
                  <Form.Control type="text" placeholder="Enter product colour" name='colour' value={product.colour} onChange={(c) => changeHandler(c)} required style={{ color: 'black' }} />
                  {errors.colour && <Form.Text className="text-danger">{errors.colour}</Form.Text>}
                </Form.Group>
                <Form.Group controlId="productBrand">
                  <Form.Label style={{ color: 'black' }}>Product Brand*</Form.Label>
                  <Form.Control type="text" placeholder="Enter brand" name='brand' value={product.brand} onChange={(c) => changeHandler(c)} required style={{ color: 'black' }} />
                  {errors.brand && <Form.Text className="text-danger">{errors.brand}</Form.Text>}
                </Form.Group>
                <Form.Group controlId="size">
                  <Form.Label style={{ color: 'black' }}>Product size*</Form.Label>
                  <Form.Control type="text" placeholder="Enter size" name='size' value={product.size} onChange={(c) => changeHandler(c)} required style={{ color: 'black' }} />
                </Form.Group>
                <Form.Group controlId="rating">
                  <Form.Label style={{ color: 'black' }}>Product rating</Form.Label>
                  <Form.Control type="text" placeholder="Enter rating" name='rating' value={product.rating} onChange={(c) => changeHandler(c)} style={{ color: 'black' }} />
                  {errors.rating && <Form.Text className="text-danger">{errors.rating}</Form.Text>}
                </Form.Group>
                <Button variant="primary" className="mb-3" type="submit" style={{ backgroundColor: '#38598b', borderColor: '#38598b', color: 'black', marginTop: '15px' }}>
                  Add
                </Button>
              </Form>
            </div>
          </Col>

          <Col md={6}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="customer-filter"
            >
              <Button variant="success" className="mb-3" style={{ backgroundColor: '#38598b', borderColor: '#38598b', color: 'white' }} onClick={handleClick}>View All Products</Button>
              <Button variant="primary" className="mb-3" style={{ backgroundColor: '#38598b', borderColor: '#38598b', color: 'white' }} onClick={handleGetNameClick}>View Products By Name</Button>
              <Button variant="primary" className="mb-3" style={{ backgroundColor: '#38598b', borderColor: '#38598b', color: 'white' }} onClick={handleGetPriceClick}>View Products By Price Range</Button>
              <Button variant="primary" className="mb-3" style={{ backgroundColor: '#38598b', borderColor: '#38598b', color: 'white' }} onClick={handleGetBrandClick}>View Products By Brand</Button>
              <Button variant="primary" className="mb-3" style={{ backgroundColor: '#38598b', borderColor: '#38598b', color: 'white' }} onClick={handleGetFieldClick}>View Products By Field</Button>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ProductsPage;

