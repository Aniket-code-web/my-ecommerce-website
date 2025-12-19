import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navigation from '../components/Navigation/Navigation';
import HomePage from '../components/Pages/HomePage';
import Product from '../components/Product/Product';
import ProductDetails from '../components/ProductDetails/ProductDetails';
import Cart from '../components/Cart/Cart';
import Checkout from '../components/Checkout/Checkout';
import Order from '../components/Order/Order';
import OrderDetails from '../components/Order/OrderDetails';
import Footer from '../components/Footer/Footer';
import LoginForm from '../Auth/LoginForm';
import RegisterForm from '../Auth/RegisterForm';
import PaymentSuccess from '../components/Payment/PaymentSuccess';

const CustomerRouters = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <div>
        <Navigation />
      </div>

      {/* Routes */}
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<HomePage />} />
          <Route path="/register" element={<HomePage />} />
          <Route path="/:levelOne/:levelTwo/:levelThree" element={<Product />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/account/orders" element={<Order />} />
          <Route path="/orders/:orderId" element={<OrderDetails />} />
          <Route path="/payment/:id" element={<PaymentSuccess />} />

        </Routes>
      </div>

      {/* Footer */}
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default CustomerRouters;
