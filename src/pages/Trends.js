import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import Filter from '../components/filters/filters';
import CartBuy from '../components/products/CartBuy-grid';
import ProductCard from '../components/products/ProductCard-grid';
import "../pages/all.css";
import trendInit from '../productImages/TrendInit';

 const Trends = () => {
  const [filters, setFilters] = useState({});
  const [showFilters, setShowFilters] = useState(false); // State to manage filter visibility
  const [sortOption, setSortOption] = useState(''); // State to manage sorting
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768); // State to manage screen size
  const { addToCart } = useContext(CartContext);

  // State for NewTrends component
  const [products] = useState(trendInit);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setShowFilters(true); // Ensure filters are shown on larger screens
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const closeFilters = () => {
    setShowFilters(false);
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const sortProducts = (productsToSort) => {
    switch (sortOption) {
      case 'newest':
        return [...productsToSort].sort((a, b) => new Date(b.date) - new Date(a.date));
      case 'popularity':
        return [...productsToSort].sort((a, b) => b.popularity - a.popularity);
      case 'low-high':
        return [...productsToSort].sort((a, b) => a.price - b.price);
      case 'high-low':
        return [...productsToSort].sort((a, b) => b.price - a.price);
      default:
        return productsToSort;
    }
  };

  // Function to apply filters for NewTrends
  const applyFilters = (product) => {
    const { category = '', brand = '', color = '', price = '' } = filters;

    if (category && product.category !== category) return false;
    if (brand && product.brand !== brand) return false;
    if (color && product.color !== color) return false;

    if (price) {
      const priceValue = product.price;
      if (price === 'Under $50' && priceValue >= 50) return false;
      if (price === '$50 to $100' && (priceValue < 50 || priceValue > 100)) return false;
      if (price === '$100 to $150' && (priceValue < 100 || priceValue > 150)) return false;
      if (price === '$150 to $200' && (priceValue < 150 || priceValue > 200)) return false;
      if (price === '$200 to $300' && (priceValue < 200 || priceValue > 300)) return false;
      if (price === '$300 to $500' && (priceValue < 300 || priceValue > 500)) return false;
      if (price === '$500 to $1000' && (priceValue < 500 || priceValue > 1000)) return false;
      if (price === 'Over $1000' && priceValue <= 1000) return false;
    }

    if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }

    return true;
  };

  // Apply filters and search query for NewTrends
  const filteredProducts = products.filter(applyFilters);

  // Function to handle search input change for NewTrends
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Function to handle selecting a product for details (e.g., add to cart) for NewTrends
  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
  };

  // Rendered NewTrends component within All
  return (
    <div className='all'>
      <div className='filters' style={{ display: isMobile && !showFilters ? 'none' : 'block' }}>
        <div className='filter-actions'>
          <div className='all-nav'>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/cart">Cart</Link></li>
            </ul>
          </div>
          <h3>Filters</h3>
          <div>
            <Filter onFilterChange={handleFilterChange} />
          </div>
          {isMobile && <button className='close-toggle' onClick={closeFilters}>Close Filters</button>}
        </div>
      </div>

      <div className='all-items'>
        <div className='sort'>
          {isMobile && <button className='toggle' onClick={toggleFilters}>Open Filters</button>}
          <select className='sorts' onChange={handleSortChange}>
            <option value="">Sort Products</option>
            <option value="newest">Newest</option>
            <option value="popularity">Popularity</option>
            <option value="low-high">Price: Low to High</option>
            <option value="high-low">Price: High to Low</option>
          </select>
        </div>

        <div className='all-prods'> 
          <div className={`home-prods4 ${selectedProduct ? 'dimmed' : ''}`}>
            <h2>Our Featured Clothes</h2>
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="search-input"
            />
            <div className="item-content4">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product, index) => (
                  <ProductCard
                    key={index}
                    product={product}
                    addToCart={addToCart}
                    setSelectedProduct={handleSelectProduct}
                  />
                ))
              ) : (
                <p>No products available.</p>
              )}
            </div>
            {selectedProduct && (
              <div className="overlay">
                <CartBuy
                  product={selectedProduct}
                  onClose={() => setSelectedProduct(null)}
                  onAddToCart={addToCart}
                />
              </div>
            )}
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Trends;

