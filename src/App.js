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
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <CartProvider>
      <Router>
        <Nav 
          isCartVisible={isCartVisible} 
          setIsCartVisible={setIsCartVisible}
          setSearchQuery={setSearchQuery}
        />
        <Routes>
          <Route element={<Outlet />}>
            <Route path="/" element={<HomePage searchQuery={searchQuery} />} />
            <Route path="/products" element={<ProductPage />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/login" element={<Login />} />
            <Route path="/checkout" element={<CheckoutPage />} />
          </Route>
        </Routes>
        {isCartVisible && <Cart />} 
      </Router>
    </CartProvider>
  );
}

export default App;
