import React from 'react';
import { Button, Card, Container } from 'react-bootstrap';
//import Orders from '../component/images/orders.avif';
import Orders from '../images/orders.avif';
function OrderCard(){
  const handleClick = () => {
    window.location.href = '/order';
  }
      return (
        <div className="products">
        <Card style={{ width: '34rem', height: '34rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Card.Img variant="top" src={Orders}  height="400px" />
          <Card.Body style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Card.Title>Orders</Card.Title>
            <Button  style={{ backgroundColor: '#38598b', borderColor: '#38598b', alignSelf: 'center' }} onClick={handleClick}>Click to View</Button>
          </Card.Body>
        </Card>
        </div>
      );
  };
  export default OrderCard