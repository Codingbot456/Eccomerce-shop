import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import HomePage from './pages/homePage';
import ProductPage from './pages/productPage';
import Cart from './cart/cart';
import { CartProvider } from './context/CartContext';
import Registration from './Registering/register';
import Login from './Registering/login';
import CheckoutPage from './checkout/checkout';
import Nav from './navbar/Navbar';
import { All } from './pages/All';
import NewTrends from './pages/Trends';
import { ContactUs } from './services/Email';



function App() {
  const [isCartVisible, setIsCartVisible] = useState(false); // State to manage cart visibility

  return (
    <CartProvider>
      <Router>
        <Nav isCartVisible={isCartVisible} setIsCartVisible={setIsCartVisible} /> {/* Pass props to Nav */}
        <Routes>
          <Route element={<Outlet />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductPage />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/login" element={<Login />} />
            <Route path='all' element={<All />} />
            <Route path='/trends' element={<NewTrends/>} />
            <Route path="/contacts" element={<ContactUs />} />
          </Route>
          <Route path="/checkout" element={<CheckoutPage />} />
        </Routes>
        {isCartVisible && <Cart />} {/* Conditionally render Cart */}
      </Router>
    </CartProvider>
  );
}

export default App;
