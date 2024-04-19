import React from 'react';
import { Navbar, Nav, Container, Button, Dropdown, DropdownButton } from 'react-bootstrap'; 

const OrderDetailsNavbar = () => {
    const handleHomeClick = () => {
        window.location.href='/';
    };

    const handleLogoutClick = () => {
        window.location.href='/login';
    };

    return (
        <Navbar style={{ backgroundColor:'#38598b', padding:'5px 10px', height:'50px' }} expand="lg">
            <Container>
                <Navbar.Brand href="/" style={{ color: 'white' }}>Dashboard</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                    <DropdownButton title="Filter" variant="primary" style={{ marginLeft: '10px' }}>
                            <Dropdown.Item href="/order-count">Fetch order count by status</Dropdown.Item>
                            <Dropdown.Item href="/order-storename">Fetch order details by store name</Dropdown.Item>
                            <Dropdown.Item href="/order-id">Fetch order details by its order ID</Dropdown.Item>
                            <Dropdown.Item href="/order-customerid">Fetch order details by its customer ID</Dropdown.Item>
                            <Dropdown.Item href="/order-status">Fetch order details by specific status</Dropdown.Item>
                            <Dropdown.Item href="/order-date">Fetch orders placed within the specified date range</Dropdown.Item>
                            <Dropdown.Item href="/order-email">Fetch orders associated with a specific customer's email</Dropdown.Item>
                            <Dropdown.Item href="/delete-order">Delete Order</Dropdown.Item>
                        </DropdownButton>
                        <Button onClick={handleHomeClick} variant="light" style={{ color: 'black', marginLeft: '800px' }}>Home</Button>
                        <Button onClick={handleLogoutClick} variant="danger" style={{ marginLeft:'10px' }}>Logout</Button>
                        
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};
 
export default OrderDetailsNavbar;
