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
          </Route>
          <Route path="/checkout" element={<CheckoutPage />} />
        </Routes>
        {isCartVisible && <Cart />} {/* Conditionally render Cart */}
      </Router>
    </CartProvider>
  );
}

export default App;
