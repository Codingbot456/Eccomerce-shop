import React, { useEffect, useState } from 'react';
import Carousel from '../slide/slider';
import Filter from '../filters/filter';
import Sort from '../filters/Sort';
import Brand from '../home/brand';
import Footer from '../home/footer';
import SellingProducts from '../products/onselling';
import TrendingProducts from '../products/trending';
import NewProducts from '../products/newArrival';
import FeaturedProducts from '../products/featured';
import Nav from '../navbar/Navbar'
import Cart from '../cart/cart'; // Ensure this path is correct
import './pages.css';

function HomePage() {
  

  return (
    
  
    <div className='home-page'>
      <div className="hero-section">
        <div className='sec1'>
          <img src="images/banner-1.webp" className="large-image" />
          <img src="images/banner-2.webp" className="small-image" />
          <img src="images/banner-3.webp" className="small-image" />
        </div>
        <div className='sec2'>
          <img src="images/banner-4.webp" className="small-image" />
          <img src="images/banner-5.webp" className="small-image" />
          <img src="images/banner-6.webp" className="large-image" />
        </div>
      </div>

 


      <div className="section">
        <FeaturedProducts />
      </div>
      <div className="section">
        <Carousel />
      </div>
      <div className="section">
        <SellingProducts />
      </div>
      <div className="section">
        <Brand />
      </div>
      <div className="section">
        <NewProducts />
      </div>
     <Footer/>
      
    </div>
    
  );
}

export default HomePage;
