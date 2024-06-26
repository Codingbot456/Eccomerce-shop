import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../navbar/Nav.css';
import { CartContext } from '../context/CartContext';

function Nav({ isCartVisible, setIsCartVisible }) {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const { cartItems } = useContext(CartContext);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const toggleCart = () => {
    setIsCartVisible(!isCartVisible);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
      if (window.innerWidth <= 768) {
        setIsSidebarVisible(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const cartItemCount = cartItems.length;

  const MainNav = () => (
    <nav className="main-nav">
      <div className='container-fluid d-flex justify-content-between align-items-center'>
        <div className='nav-logo p-3'>
          <h5>Trend</h5>
          <p>Wear</p>
        </div>
        {!isSmallScreen && (
          <div className='nav-list d-inline-flex'>
            <ul className='mr-3 list-unstyled container d-flex justify-content-center align-items-center'>
              <li className='p-3'>
                <Link className="no-underline" to="/">Home</Link>
              </li>
              <li className='p-3 position-relative'>
                <Link to="#" className="no-underline">Menwear</Link>
                <div className="dropdown-menu">
                  <Link to="/menwear/shoes" className="dropdown-item">Shoes</Link>
                  <Link to="/menwear/vests" className="dropdown-item">Vests</Link>
                </div>
              </li>
              <li className='p-3'>
                <Link to="/womenwear" className="no-underline">Womenwear</Link>
              </li>
              <li className='p-3'>
                <Link to="/pages" className="no-underline">Pages</Link>
              </li>
              <li className='p-3'>
                <Link to="/shops" className="no-underline">Shops</Link>
              </li>
              <li className='p-3'>
                <Link to="/signin" className="no-underline">Sign In</Link>
              </li>
            </ul>
            <div className='search-container p-3'>
              <input type="text" placeholder="Search..." className="search-input"/>
              <button className="search-button"><i className="fas fa-search"></i></button>
            </div>
            <div className='message p-3'>
            <i className="fa fa-message" >

      </i>
            </div>
            <div className=' shopping p-3'>
            <i className="fa fa-shopping-basket" onClick={toggleCart}>
        {cartItemCount > 0 && <span className="cart-count">{cartItemCount}</span>}
      </i>
            </div>
          </div>
        )}
        {isSmallScreen && (
          <div className="toggler p-3">
            <i className="fa fa-bars openbtn" onClick={toggleSidebar}></i>
          </div>
        )}
      </div>
    </nav>
  );

  const SidebarNav = () => (
    <div className='sidebar p-3'>
      <div className='nav-side'>
        <ul className='mr-3 list-unstyled container d-grid justify-content-left align-items-left'>
          <li className='p-3'>
            <Link className="no-underline" to="/">Home</Link>
          </li>
          <li className='p-3 position-relative'>
            <Link to="#" className="no-underline">Menwear</Link>
            <div className="dropdown-menu">
              <Link to="/menwear/shoes" className="dropdown-item">Shoes</Link>
              <Link to="/menwear/vests" className="dropdown-item">Vests</Link>
            </div>
          </li>
          <li className='p-3'>
            <Link to="/womenwear" className="no-underline">Womenwear</Link>
          </li>
          <li className='p-3'>
            <Link to="/pages" className="no-underline">Pages</Link>
          </li>
          <li className='p-3'>
            <Link to="/shops" className="no-underline">Shops</Link>
          </li>
          <li className='p-3'>
            <Link to="/signin" className="no-underline">Sign In</Link>
          </li>
        </ul>
      </div>
    </div>
  );

  const BottomNav = () => (
    <div className="bottom-nav">
      <i className="fa fa-search"></i>
      <Link to="/" aria-label="Home">
      <i className="fa fa-message" aria-hidden="true"></i>
      </Link>
      <Link to="/" aria-label="Home">
        <i className="fa fa-home" aria-hidden="true"></i>
      </Link>
      <i className="fa fa-shopping-basket" onClick={toggleCart}>
        {cartItemCount > 0 && <span className="cart-count">{cartItemCount}</span>}
      </i>
      <Link to="/register" aria-label="User">
        <i className="fa fa-user" aria-hidden="true"></i>
      </Link>
    </div>
  );

  return (
    <div>
      <MainNav />
      {isSmallScreen && isSidebarVisible && <SidebarNav />}
      {isSmallScreen && <BottomNav />}
    </div>
  );
}

export default Nav;
