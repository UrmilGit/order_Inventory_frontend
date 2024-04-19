import React from 'react';
import { Button, Card, Container } from 'react-bootstrap';
import Products from '../images/products.jpg';
function ProductCard() {
  const handleClick = () => {
    window.location.href = '/products';
  }
  return (
    <div className="products">
      <Card style={{ width: '34rem', height: '34rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <Card.Img variant="top" src={Products} height="500px" />
        <Card.Body style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Card.Title>Products</Card.Title>
          <Button style={{ backgroundColor: '#38598b', borderColor: '#38598b', alignSelf: 'center' }} onClick={handleClick}>Click to View</Button>
        </Card.Body>
      </Card>
    </div>
  );
};
export default ProductCard