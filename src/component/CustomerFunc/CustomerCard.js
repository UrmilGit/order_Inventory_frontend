import React from 'react';
import { Button, Card, Container } from 'react-bootstrap';
import Customer from '../images/Customer.jpg';
  function CustomerCard(){
    const handleClick = ()=>{
        window.location.href='/customers';
    }
    return (
      <div className="products">
      <Card style={{ width: '34rem', height: '34rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <Card.Img variant="top" src={Customer}  height="500px" />
        <Card.Body style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Card.Title>Customers</Card.Title> 
        <Button onClick={handleClick} style={{ backgroundColor: '#38598b', borderColor: '#38598b', alignSelf: 'center' }}>Click to View</Button>
        </Card.Body>
      </Card>
      </div>
    );
};
 
export default CustomerCard