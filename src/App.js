import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './component/LoginPage';
import LandingPage from './component/LandingPage';
import AllCardsPage from './component/AllCardsPage';
import CustomerPage from './component/CustomerFunc/CustomerPage';
import GetAllCustomer from './component/CustomerFunc/GetAllCustomer';
import UpdateCustomer from './component/CustomerFunc/UpdateCustomer';
import CountOfCustomersPage from './component/CustomerFunc/CountOfCustomersPage';
import OrderOfCustomersPage from './component/CustomerFunc/OrderOfCustomersPage';
import ShipmentHistoryPage from './component/CustomerFunc/ShipmentHistoryPage';
import InventoryPage from './component/InventoryFunc/InventoryPage';
import GetAllInventory from './component/InventoryFunc/GetAllInventory';
import GetProductCustomerStoreByOrderId from './component/InventoryFunc/GetProductCustomerStoreByOrderId';
import GetInventoryDetailsByOrderId from './component/InventoryFunc/GetInventoryDetailsByOrderId';
import ShipmentInventoryPage from './component/InventoryFunc/ShipmentInventoryPage';
import UpdateProduct from './component/ProductFunc/UpdateProduct';
import GetProductByField from './component/ProductFunc/GetProductByField';
import GetProductByBrand from './component/ProductFunc/GetProductsByBrand';
import GetProductByPrice from './component/ProductFunc/GetProductByPrice';
import GetProductByName from './component/ProductFunc/GetProductByName';
import GetAllProduct from './component/ProductFunc/GetAllProduct';
import ProductsPage from './component/ProductFunc/ProductsPage';
import OrderDateRange from './component/OrderFunc/OrderDateRange';
import UpdateOrder from './component/OrderFunc/UpdateOrder';
import OrderByEmail from './component/OrderFunc/OrderByEmail';
import OrderByCustomerId from './component/OrderFunc/OrderByCustomerId';
import OrderByStatus from './component/OrderFunc/OrderByStatus';
import OrderIdDetails from './component/OrderFunc/OrderIdDetails';
import OrderDetailsPage from './component/OrderFunc/OrderDetailsPage';
import OrderStoreName from './component/OrderFunc/OrderStoreName';
import OrderCountStatus from './component/OrderFunc/OrderCountStatus';
import OrdersPage from './component/OrderFunc/OrdersPage';
import RegisterForm from './component/RegisterForm';
import CountOfSoldProducts from './component/InventoryFunc/CountOfSoldProducts';
import OrderCancel from './component/OrderFunc/OrderCancel';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/rform" element={<RegisterForm />} />
          <Route path="/dashboard" element={<AllCardsPage />} />
          <Route path="/customers" element={<CustomerPage />} />
          <Route path="/all" element={<GetAllCustomer />} />
          <Route path="/update/customer/:cid" element={<UpdateCustomer />} />
          <Route path="/count" element={<CountOfCustomersPage />} />
          <Route path="/details" element={<OrderOfCustomersPage />} />
          <Route path="/shipment" element={<ShipmentHistoryPage />} />
          <Route path="/inventory" element={<InventoryPage />} />
          <Route path="/all/inventory" element={<GetAllInventory />} />
          <Route path="/get/pcs" element={<GetProductCustomerStoreByOrderId />} />
          <Route path="/get/inventory/details" element={<GetInventoryDetailsByOrderId />} />
          <Route path="/inventory/shipment" element={<ShipmentInventoryPage />} />
          <Route path="/inventory/sold-products" element={<CountOfSoldProducts />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/all/products" element={<GetAllProduct />} />
          <Route path="/getProductsByName" element={<GetProductByName />} />
          <Route path="/getProductsByBrand" element={<GetProductByBrand />} />
          <Route path="/getProductsByPrice" element={<GetProductByPrice />} />
          <Route path="/getProductsByField" element={<GetProductByField />} />
          <Route path="/update/product/:cid" element={<UpdateProduct />} />
          <Route path="/order" element={<OrdersPage />} />
          <Route path="/order-details" element={<OrderDetailsPage />} />
          <Route path="/order-count" element={<OrderCountStatus />} />
          <Route path="/order-storename" element={<OrderStoreName />} />
          <Route path="/order-id" element={<OrderIdDetails />} />
          <Route path="/order-customerid" element={<OrderByCustomerId />} />
          <Route path="/order-status" element={<OrderByStatus />} />
          <Route path="/order-email" element={<OrderByEmail />} />
          <Route path="/order/edit/:orderId" element={<UpdateOrder />} />
          <Route path="/order-date" element={<OrderDateRange />} />
          <Route path="//order-cancel/:orderId" element={<OrderCancel />} />
        </Routes>
      </BrowserRouter>
    </div>

  );
}
export default App