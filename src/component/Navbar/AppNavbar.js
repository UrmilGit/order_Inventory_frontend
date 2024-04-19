import React from 'react';
import { Navbar, Nav, Container, NavDropdown, Button } from 'react-bootstrap'; // Import speedometer icon
import { MdDashboard } from "react-icons/md";

const AppNavbar = () => {
  const handleHomeClick = () => {
    window.location.href = '/';
  }
  const handleLogoutClick = () => {
    window.location.href = '/login';
  }
  return (
    <Navbar style={{ backgroundColor: '#38598b', padding: '5px 10px', height: '50px' }} expand="lg" >
      <Container >
        <Navbar.Brand href="/dashboard" style={{ color: 'white' }}><MdDashboard />WareTrack</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Button onClick={handleHomeClick} style={{ color: 'black', marginLeft: '900px', backgroundColor: '#e7eaf6', borderColor: '#e7eaf6' }}>Home</Button>
          </Nav>
          <Nav>
            <Button onClick={handleLogoutClick} variant="danger" className="ml-auto" style={{ marginLeft: '5px' }}>Logout</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
