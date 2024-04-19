import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Container, Table, Form, Navbar, Nav, Dropdown } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const GetAllCustomer = () => {
    const [customers, setCustomers] = useState([])
    const [flag, setFlag] = useState(false)
    const [searchName, setSearchName] = useState('')
    const [searchEmail, setSearchEmail] = useState('')
    const [showSearchNameBar, setShowSearchNameBar] = useState(false)
    const [showSearchEmailBar, setShowSearchEmailBar] = useState(false)
    const navigate = useNavigate();
    const getAllCustomers = async () => {
        const response = await axios.get('http://localhost:8085/api/v1/customers/')
        setCustomers(response.data);
    }

    const deleteCustomer = async (id) => {
        await axios.delete(`http://localhost:8085/api/v1/customers/${id}`)
        getAllCustomers()
        setFlag(!flag)
    }

    const editCustomer = (cid) => {
        navigate(`/update/customer/${cid}`);
    }

    const getCustomersByName = async () => {
        if (!searchName.trim()) {
            // If the search input is empty, fetch all customers
            getAllCustomers();
            setShowSearchNameBar(false); // Hide the search bar
            return;
        }
        const response = await axios.get(`http://localhost:8085/api/v1/customers/fullname/${searchName}`)
        setCustomers(response.data);
    }

    const getCustomersByEmail = async () => {
        if (!searchEmail.trim()) {
            // If the search input is empty, fetch all customers
            getAllCustomers();
            setShowSearchEmailBar(false); // Hide the search bar
            return;
        }
        const response = await axios.get(`http://localhost:8085/api/v1/customers/${searchEmail}`)
        setCustomers(response.data);
    }

    useEffect(() => {
        getAllCustomers();
    }, [flag])

    const handleShowSearchNameBar = () => {
        setShowSearchNameBar(!showSearchNameBar); // Toggle the visibility of the search bar
        setShowSearchEmailBar(false); // Hide the email search bar
        setSearchName(''); // Clear the search input value
    }

    const handleShowSearchEmailBar = () => {
        setShowSearchEmailBar(!showSearchEmailBar); // Toggle the visibility of the search bar
        setShowSearchNameBar(false); // Hide the name search bar
        setSearchEmail(''); // Clear the search input value
    }

    const handleHomeClick = () => {
        window.location.href = '/';
    }
    const handleLogoutClick = () => {
        window.location.href = '/login';
    }

    const handleBack = () => {
        navigate('/customers');
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

    return (
        <div style={{ backgroundColor: 'white' }}>
            <Navbar style={{ backgroundColor: '#38598b', padding: '5px 10px', height: '50px' }} expand="lg">
                <Container>
                    <Navbar.Brand style={{ color: 'white' }} href="/customers">Dashboard</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Dropdown>
                                <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                    Filter
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={handleShowSearchNameBar}>Get Customer by Name</Dropdown.Item>
                                    <Dropdown.Item onClick={handleShowSearchEmailBar}>Get Customer by Email</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Nav>
                        <Nav className="me-auto">
                            <Button onClick={handleHomeClick} style={{ color: 'black', marginLeft: '750px', backgroundColor: '#e7eaf6', borderColor: '#e7eaf6' }}>Home</Button>
                        </Nav>
                        <Nav>
                            <Button onClick={handleLogoutClick} variant="danger" className="ml-auto" style={{ marginLeft: '5px' }}>Logout</Button>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            {showSearchNameBar && (
                <Container style={{ marginTop: '20px', marginBottom: '20px' }}>
                    <Form.Group className="d-flex align-items-center">
                        <Form.Control
                            type="text"
                            placeholder="Enter customer name"
                            value={searchName}
                            onChange={(e) => setSearchName(e.target.value)}
                        />
                        <Button variant="primary" onClick={getCustomersByName}>Search</Button>
                    </Form.Group>
                </Container>
            )}
            {showSearchEmailBar && (
                <Container style={{ marginTop: '20px', marginBottom: '20px' }}>
                    <Form.Group className="d-flex align-items-center">
                        <Form.Control
                            type="text"
                            placeholder="Enter customer email(ex: xyz@gmail.com)"
                            value={searchEmail}
                            onChange={(e) => setSearchEmail(e.target.value)}
                        />
                        <Button variant="primary" onClick={getCustomersByEmail}>Search</Button>
                    </Form.Group>
                </Container>
            )}
            <Container style={{ marginTop: '20px' }}>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th style={tableHeaderStyle}>ID</th>
                            <th style={tableHeaderStyle}>NAME</th>
                            <th style={tableHeaderStyle}>EMAIL</th>
                            <th style={tableHeaderStyle}>DELETE</th>
                            <th style={tableHeaderStyle}>EDIT</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map(customer => {
                            return <tr key={customer.customerId}>
                                <td style={tableCellStyle}>{customer.customerId}</td>
                                <td style={tableCellStyle}>{customer.fullName}</td>
                                <td style={tableCellStyle}>{customer.emailAddress}</td>
                                <td style={tableCellStyle}><Button variant='danger' onClick={() => deleteCustomer(customer.customerId)}>Delete</Button></td>
                                <td style={tableCellStyle}><Button variant='warning' onClick={() => editCustomer(customer.customerId)}>Edit</Button></td>
                            </tr>
                        })}
                    </tbody>
                </Table>
                <div style={{ textAlign: 'center' }}>
                    <button onClick={handleBack} className="btn btn-primary" style={{ marginRight: '10px', backgroundColor: '#38598b', marginTop: '20px' }}>Back to Customers</button>
                </div>
            </Container>
        </div>
    )
}

export default GetAllCustomer;



