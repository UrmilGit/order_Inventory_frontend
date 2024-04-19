import React, { useState } from 'react';
import { Container, Row, Col, CarouselItem, Carousel } from 'react-bootstrap';
import AppNavbar from '../component/Navbar/AppNavbar';
import CustomerCard from '../component/CustomerFunc/CustomerCard';
import InventoryCard from '../component/InventoryFunc/InventoryCard';
import ProductCard from '../component/ProductFunc/ProductCard';
import OrderCard from '../component/OrderFunc/OrderCard';
import '../component/css files/dashboard.css';


const AllCardsPage = () => {
  const [slideIndex, setSlideIndex] = useState(0);


  return (

    <div style={{ backgroundColor: '#e7eaf6', minHeight: '100vh', color: 'white', position: 'relative' }}>
      <AppNavbar />
      <Container className='mt-4'>
        <Carousel prevIcon={<span className="carousel-arrow-right">&#8249;</span>} nextIcon={<span className="carousel-arrow-left">&#8250;</span>}>
          <Carousel.Item>
            <Row>

              <div className="card-wrapper" style={{ transform: `translateX(-${slideIndex * 100}%)` }}>
                <Col md={6} className="d-flex justify-content-center align-items-center">
                  <CustomerCard title="Customers" icon="users" className="card" />
                </Col>
                <Col md={6} className="d-flex justify-content-center align-items-center">
                  <InventoryCard title="Inventory" icon="box" className="card" />
                </Col>
              </div>
            </Row>
          </Carousel.Item>
          <Carousel.Item>
            <Row>
              <div className="card-wrapper" style={{ transform: `translateX(-${slideIndex * 100}%)` }}>
                <Col md={6} className="d-flex justify-content-center align-items-center">
                  <ProductCard title="Products" icon="shopping-cart" className="card" />
                </Col>
                <Col md={6} className="d-flex justify-content-center align-items-center">
                  <OrderCard title="Orders" icon="shopping-bag" className="card" />
                </Col>
              </div>

            </Row>
          </Carousel.Item>
        </Carousel>
      </Container>
    </div>
  );
};

export default AllCardsPage;
