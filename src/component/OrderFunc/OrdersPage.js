// import { motion } from 'framer-motion';
// import React, { useState } from 'react';
// import { Navbar, Nav, Container, Button, Row, Col, Form } from 'react-bootstrap';
// import { FaShoppingCart } from 'react-icons/fa';
// import { Link, useNavigate } from 'react-router-dom';
// import '../css files/OrdersPage.css';
// import axios from 'axios';
// import AppNavbar from '../Navbar/AppNavbar';

// const OrdersPage = () => {
//   const [order, setOrder]=useState({storeId:'', customerId:'', orderStatus:''})
//   const navigate=useNavigate();

//   const handleSubmit = async (e) =>{
//         const response = await axios.post('http://localhost:8086/api/v1/orders/', order)
//         navigate("/order-details")
//       }

//       const handleClick=()=>{
//         window.location.href='/order-details';
//     }

//     const handleCountClick=()=>{
//       window.location.href='/order-count';
//   }

//   const handleStoreNameClick=()=>{
//     window.location.href='/order-storename';
// }

// const handleOrderIdClick=()=>{
//   window.location.href='/order-id';
// }

// const handleCustomerIdClick=()=>{
//   window.location.href='/order-customerid';
// }

// const handleStatusClick=()=>{
//   window.location.href='/order-status';
// }

// const handleRangeClick=()=>{
//   window.location.href='/order-date';
// }

// const handleEmailClick=()=>{
//   window.location.href='/order-email';
// }
  

//   return (
//     <div style={{ backgroundColor: '#e7eaf6' }}>
//       <AppNavbar />
//       <Container className="py-4">
//         <Row>
//           <Col md={6}>
//             <div className="customer-form">
//               <motion.h2
//                 initial={{ opacity: 0, x: -50 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ duration: 0.5 }}
//               >
//                 <FaShoppingCart style={{ color: 'black' }} /> Orders
//               </motion.h2>
//               <Form onSubmit={handleSubmit}>
//               <Form.Group controlId="storeId">
//                    <Form.Label style={{ color: 'black' }}>Store ID*</Form.Label>
//                    <Form.Control type="text" placeholder="Enter store ID" required style={{ height: '30px' }} />
//                  </Form.Group>
//                 <Form.Group controlId="customerId">
//                    <Form.Label style={{ color: 'black' }}>Customer ID*</Form.Label>
//                   <Form.Control type="text" placeholder="Enter customer ID" required style={{ height: '30px' }} />
//                 </Form.Group>
//                 <Form.Group controlId="orderStatus">
//                   <Form.Label style={{ color: 'black' }}>Order Status</Form.Label>
//                    <Form.Control type="text" placeholder="Enter order status" style={{ height: '30px' }} />
//                  </Form.Group>
//                 <Button variant="primary" className="mb-3" type="submit" style={{ backgroundColor: '#38598b', borderColor: '#38598b', color: 'black' , marginTop:'15px' }}>
//                   Add
//                 </Button>
//                 <Button variant="success" className="mb-3" style={{ backgroundColor: '#38598b', borderColor: '#38598b' , color:'black'}} onClick={handleClick}>View All Orders</Button> {/* Update button color */}
//               </Form>
//             </div>
//           </Col>

//           <Col md={6}>
//             <motion.div
//               initial={{ opacity: 0, y: 50 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: 0.2 }}
//               className="customer-filter"
//             >
            
//               <Button variant="primary" className="mb-3" style={{ backgroundColor: '#38598b', borderColor: '#38598b', color: 'white' }} onClick={handleCountClick}>View Order Count</Button>
//               <Button variant="primary" className="mb-3" style={{ backgroundColor: '#38598b', borderColor: '#38598b', color: 'white' }} onClick={handleStoreNameClick}>View orders by Store</Button>
//               <Button variant="primary" className="mb-3" style={{ backgroundColor: '#38598b', borderColor: '#38598b', color: 'white' }} onClick={handleOrderIdClick}>View order details by it's ID</Button>
//               <Button variant="primary" className="mb-3" style={{ backgroundColor: '#38598b', borderColor: '#38598b', color: 'white' }} onClick={handleCustomerIdClick}>View order details by customer ID</Button>
//               <Button variant="primary" className="mb-3" style={{ backgroundColor: '#38598b', borderColor: '#38598b', color: 'white' }} onClick={handleStatusClick}>View order details by specific status</Button>
//               <Button variant="primary" className="mb-3" style={{ backgroundColor: '#38598b', borderColor: '#38598b', color: 'white' }} onClick={handleRangeClick}>View orders within the specified date</Button>
//               <Button variant="primary" className="mb-3" style={{ backgroundColor: '#38598b', borderColor: '#38598b', color: 'white' }} onClick={handleEmailClick}>View orders associated with customer's email</Button>
//             </motion.div>
//           </Col>
//         </Row>
//       </Container>
//     </div>

//   );
// };

// export default OrdersPage;




import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { Container, Button, Row, Col, Form, FormGroup } from 'react-bootstrap';
import { FaShoppingCart } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AppNavbar from '../Navbar/AppNavbar';


const OrdersPage = () => {
  const [formData, setFormData] = useState({ storeId: '', customerId: '', orderStatus: '' });
  const [customers, setCustomers] = useState([]);
  const [stores, setStores] = useState([]);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
      // Fetch customers
      fetch('http://localhost:8085/api/v1/orders/customers')
          .then(response => response.json())
          .then(data => setCustomers(data))
          .catch(error => console.error('Error fetching customers:', error));

      // Fetch stores
      fetch('http://localhost:8085/api/v1/orders/stores')
          .then(response => response.json())
          .then(data => setStores(data))
          .catch(error => console.error('Error fetching stores:', error));
  }, []);

  const handleChange = (e) => {
    setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });
};

const handleSubmit = (e) => {
  e.preventDefault();
 
  // Validate order status
  const allowedStatuses = ['COMPLETE', 'PENDING', 'CANCELLED', 'OVERDUE'];
  if (!allowedStatuses.includes(formData.orderStatus)) {
      setErrorMessage('Invalid order status. Allowed values are COMPLETE, PENDING, CANCELLED, OVERDUE.');
      return;
  }
 
  // Send form data to backend to create new order
  fetch('http://localhost:8086/api/v1/orders', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Invalid request');
      }
      return response.text();
  })
  .then(data => {
      console.log('Order created successfully:', data);
      // Reset form fields
      setFormData({
          orderStatus: '',
          customerId: '',
          storeId: ''
      });
      // Clear error message if any
      setErrorMessage('');
      // Set success message
      setSuccessMessage('Order created successfully.');
      // Redirect to order-details page after 2 seconds
      setTimeout(() => {
          navigate('/order-details');
      }, 2000);
  })
  .catch(error => {
      console.error('Error creating order:', error);
      setErrorMessage('Invalid request. Please provide valid order data for creation.');
  });
};

  const handleClick=()=>{
            window.location.href='/order-details';
        }
    
        const handleCountClick=()=>{
          window.location.href='/order-count';
      }
    
      const handleStoreNameClick=()=>{
        window.location.href='/order-storename';
    }
    
    const handleOrderIdClick=()=>{
      window.location.href='/order-id';
    }
    
    const handleCustomerIdClick=()=>{
      window.location.href='/order-customerid';
    }
    
    const handleStatusClick=()=>{
      window.location.href='/order-status';
    }
    
    const handleRangeClick=()=>{
      window.location.href='/order-date';
    }
    
    const handleEmailClick=()=>{
      window.location.href='/order-email';
    }
      
    

  // Other functions remain unchanged...

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
                <FaShoppingCart style={{ color: 'black' }} /> Orders
              </motion.h2>
              <Form onSubmit={handleSubmit}>
              
                    <label htmlFor="orderStatus" style={{ color: 'black' , fontSize:'18px'}}>Order Status:</label>
                    <div>
                    <input
                    style={{ color: 'black' , width:'100%' , marginTop:'10px' }}
                        type="text"
                        id="orderStatus"
                        name="orderStatus"
                        value={formData.orderStatus}
                        onChange={handleChange}
                        required
                    />
                    </div>
                <div>
                    <label htmlFor="customerId" style={{ color: 'black' , fontSize:'18px'}}>Customer:</label>
                    <select
                     style={{ color: 'black' , width:'100%' , marginTop:'10px' }}
                        id="customerId"
                        name="customerId"
                        value={formData.customerId}
                        onChange={handleChange}
                        required
                    >
                        <option  value="">Select Customer</option>
                        {customers.map(customer => (
                            <option key={customer.id} value={customer.id}>
                                {customer.id} - {customer.fullName}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label style={{ color: 'black' , fontSize:'18px'}} htmlFor="storeId">Store:</label>
                    <select
                     style={{ color: 'black' , width:'100%' , marginTop:'10px' }}
                        id="storeId"
                        name="storeId"
                        value={formData.storeId}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Store</option>
                        {stores.map(store => (
                            <option key={store.id} value={store.id}>
                                {store.id} - {store.storeName}
                            </option>
                        ))}
                    </select>
                </div>
                <Button variant="primary" className="mb-3" type="submit" style={{ backgroundColor: '#38598b', borderColor: '#38598b', color: 'black' , marginTop:'15px' }}>
                  Add
                </Button>
                <Button variant="success" className="mb-3" style={{ backgroundColor: '#38598b', borderColor: '#38598b' , color:'black'}} onClick={handleClick}>View All Orders</Button> {/* Update button color */}
              </Form>
              {errorMessage && <div className="error-message">{errorMessage}</div>}
            {successMessage && <div className="success-message">{successMessage}</div>}
            </div>
          </Col>
          <Col md={6}>
            {/* Rest of the code */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="customer-filter"
             >
            
              <Button variant="primary" className="mb-3" style={{ backgroundColor: '#38598b', borderColor: '#38598b', color: 'white' }} onClick={handleCountClick}>View Order Count</Button>
              <Button variant="primary" className="mb-3" style={{ backgroundColor: '#38598b', borderColor: '#38598b', color: 'white' }} onClick={handleStoreNameClick}>View orders by Store</Button>
               <Button variant="primary" className="mb-3" style={{ backgroundColor: '#38598b', borderColor: '#38598b', color: 'white' }} onClick={handleOrderIdClick}>View order details by it's ID</Button>
               <Button variant="primary" className="mb-3" style={{ backgroundColor: '#38598b', borderColor: '#38598b', color: 'white' }} onClick={handleCustomerIdClick}>View order details by customer ID</Button>
              <Button variant="primary" className="mb-3" style={{ backgroundColor: '#38598b', borderColor: '#38598b', color: 'white' }} onClick={handleStatusClick}>View order details by specific status</Button>
              <Button variant="primary" className="mb-3" style={{ backgroundColor: '#38598b', borderColor: '#38598b', color: 'white' }} onClick={handleRangeClick}>View orders within the specified date</Button>
              <Button variant="primary" className="mb-3" style={{ backgroundColor: '#38598b', borderColor: '#38598b', color: 'white' }} onClick={handleEmailClick}>View orders associated with customer's email</Button>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default OrdersPage;
