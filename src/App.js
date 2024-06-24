import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import HomePage from './pages/homePage';
import ProductPage from './pages/productPage';
import Cart from './cart/cart'; // Ensure this path is correct
import { CartProvider } from './context/CartContext'; 
import Registration from './Registering/register';
import Login from './Registering/login';
import CheckoutPage from './checkout/checkout';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track authentication status

  // Check if user is authenticated (you may adjust this logic based on your authentication method)
  useEffect(() => {
    // Example: Check if user is logged in (you might use localStorage or sessionStorage)
    const userLoggedIn = !!localStorage.getItem('token');

    setIsLoggedIn(userLoggedIn);
  }, []);

  const [cartWidth, setCartWidth] = useState('0');
  const [cartBgColor, setCartBgColor] = useState('');

  useEffect(() => {
    const handleCartIconClick = () => {
      if (window.innerWidth <= 768) {
        setCartWidth('0px');
      } else {
        setCartWidth('450px');
      }
      // Change background color to red when cart icon is clicked
    };

    window.addEventListener('cartIconClicked', handleCartIconClick);

    return () => {
      window.removeEventListener('cartIconClicked', handleCartIconClick);
    };
  }, []);

  const handleCloseCart = () => {
    setCartWidth('0');
  };

  return (
    <CartProvider>
      <Router>
        <Cart width={cartWidth} bgColor={cartBgColor} onClose={handleCloseCart} />
        <Routes>
          <Route element={<Outlet />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductPage />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/login" element={<Login />} />
            <Route path="/checkout" element={ <CheckoutPage />} />
          </Route>
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;