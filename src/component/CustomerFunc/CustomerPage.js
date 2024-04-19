import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Dropdown } from 'react-bootstrap';
import '../css files/CustomerPage.css';
import { BsFillPeopleFill } from "react-icons/bs";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AppNavbar from '../Navbar/AppNavbar';

const CustomerPage = () => {
    const [customer, setCustomer] = useState({ customerId: '', fullName: '', emailAddress: '' })
    const navigate = useNavigate();
    const changeHandler = (c) => {
        setCustomer({ ...customer, [c.target.name]: c.target.value })
    }
    const emailValid = (email) => {
        const regEx = /[a-zA-Z0-9.%+-]+[a-z0-9]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;
        if (!regEx.test(email)) {
            return false;
        }
        else {
            return true;
        }
    }
    const nameValid = (name) => {
        const regEx = /^[a-zA-Z,'.\-\s]+$/g;
        if (!regEx.test(name)) {
            return false;
        }
        else {
            return true;
        }
    }
    const handleSubmit = async (e) => {
        console.log(customer);
        try {
            if (!customer.fullName || !customer.emailAddress) {
                throw new Error("Name and email are required fields. Please fill them out.");
            }
            else if (emailValid(customer.emailAddress) === false) {
                throw new Error("Email is Invalid.");
            }
            else if (nameValid(customer.fullName) === false) {
                throw new Error("Name is Invalid.");
            }
            const response = await axios.post('http://localhost:8085/api/v1/customers/', customer)
            navigate('/all')
        } catch (error) {
            console.error('Error:', error.message);
            alert(error.message);
        }
    }
    const handleClick = () => {
        window.location.href = '/all';
    }

    return (
        <div className="background-image">
            <AppNavbar />
            <Container className="py-4">
                <Row>
                    <Col md={6}>
                        <div className="customer-form">
                            <h2><BsFillPeopleFill /> Customer</h2>
                            <Form>
                                <Form.Group controlId="customerFullName">
                                    <Form.Label>Full Name*</Form.Label>
                                    <Form.Control type="text" placeholder="Enter full name" name='fullName' value={customer.cname} onChange={(c) => changeHandler(c)} required />
                                </Form.Group>

                                <Form.Group controlId="customerEmail">
                                    <Form.Label>Email*</Form.Label>
                                    <Form.Control type="email" placeholder="Enter email" name='emailAddress' value={customer.email} onChange={(c) => changeHandler(c)} required />
                                </Form.Group>
                                <div className=' customer-form button'>
                                    <Button style={{ backgroundColor: '#38598b', borderColor: '#38598b', color: 'white' }} className="mb-3" onClick={() => handleSubmit()}>
                                        Add
                                    </Button>
                                </div>
                            </Form>
                        </div>
                    </Col>
                    <Col md={6}>
                        <div className="customer-filter">
                            <Button style={{ backgroundColor: '#38598b', borderColor: '#38598b', color: 'white' }} className="ml-auto" onClick={handleClick}>
                                View All Customers
                            </Button>
                            <Dropdown>
                                <Dropdown.Toggle style={{ backgroundColor: '#38598b', borderColor: '#38598b', color: 'white' }} className="mb-3" id="dropdown-basic">
                                    Filters for Customer
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item href="/count">Customers Count by Status</Dropdown.Item>
                                    <Dropdown.Item href="/details">Order Details</Dropdown.Item>
                                    <Dropdown.Item href="/shipment">Shipment History</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default CustomerPage;



