import React from 'react'
import '../component/css files/LandingPage.css';
import LandingPageImage from '../component/images/warehouseLandingPage.jpg'
import { Dropdown } from 'react-bootstrap';

function LandingPage() {

  const handleClick = () => {
    window.location.href = '/login';
  }

  const scrollToTop = () => {
    const targetSection = document.getElementById('target-section');
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  return (


    <div class='pb-4' style={{ backgroundColor: '#38598b', height: '100vh' }}>
      <nav class="navbar navbar-expand-lg pb-0 mb-0 pt-4 mx-auto content">
        <div class="container-fluid bg-white" style={{ width: "90%" }}>
          <a class="navbar-brand ms-5 p-3" href="#"><img src="https://w7.pngwing.com/pngs/784/452/png-transparent-black-house-warehouse-ico-icon-creative-gray-logistics-warehouse-logo-map-miscellaneous-angle-white-thumbnail.png" height={100}></img></a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent" style={{ width: "90%" }}>
            <ul class="navbar-nav ms-auto p-3 mb-2 mb-lg-0">
              <li class="nav-item me-4">
                <a class="nav-link active text-secondary" aria-current="page" href="/login">LOGIN</a>
              </li>
              <li class="nav-item me-4">

                <a class="nav-link text-secondary" onClick={scrollToTop}>ABOUT</a>

              </li>
              <li class="nav-item me-4">
                <Dropdown>
                  <Dropdown.Toggle variant="text" id="dropdown-basic">
                    CONTACT US
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item>Phone: 9450467825</Dropdown.Item>
                    <Dropdown.Item>Email: support@inventory.com</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div class="container-fluid content bg-white" style={{ width: "85.5%" }}>
        <div class="row align-items-center">
          <div className='col-6 p-5'>
          <h2 className='color-green fw-bold'>WareTrack</h2>
            <h4 className='color-green fw-bold'>START MANAGING YOUR ORDER INVENTORY WITH US</h4>
            <p className='text-secondary'>Efficiently manage your inventory, customers, products, and orders.</p>
            <button type="button" class="btn btn-primary rounded" style={{ backgroundColor: '#38598b' }} onClick={handleClick}>Start Your Journey Here</button>
          </div>
          <div class='col-6' >
            <img src={LandingPageImage} style={{ height: '400px', width: '500px' }} />
          </div>
        </div>
      </div>
      <div style={{ color: 'white', backgroundColor: '#38598b', paddingTop: '100px' }} id="target-section">
        <p style={{ fontSize: '40px', textAlign: 'center' }}>Welcome to WareTrack</p>
        <p style={{ padding: '10px', fontSize: '20px', textAlign: 'center', color: 'beige' }}>This initiative stems from the need for a streamlined
          and efficient system to manage and track orders, inventory, and related
          processes. The primary purpose of the Order Inventory system is to enhance the
          overall order management experience, providing users with a centralized platform to optimize inventory control and improve order fulfillment processes.</p>
      </div>
    </div>

  )
}
export default LandingPage;