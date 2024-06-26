import React, { useState, useContext } from 'react';
import { CartContext } from '../context/CartContext';
import CartBuy from '../components/products/CartBuy-grid';
import ProductCard from '../components/products/ProductCard-grid';
import '../products/grid-display.css';

import newArrival from '../components/assets/images/new-Arriv1.webp';
import newArrival1 from '../components/assets/images/new-Arriv2.webp';
import newArrival2 from '../components/assets/images/new-Arriv3.webp';
import newArrival3 from '../components/assets/images/new-Arriv4.webp';
import newArrival4 from '../components/assets/images/new-Arriv5.webp';
import newArrival5 from '../components/assets/images/new-Arriv6.webp';
import newArrival6 from '../components/assets/images/new-Arriv7.webp';
import newArrival7 from '../components/assets/images/new-Arriv8.webp';
import newArrival8 from '../components/assets/images/new-Arriv9.webp';

const initialProducts = [
    {
        id: 1,
        name: 'Roadster Women Round Neck',
        description: 'Fendi began life in 1925 as a fur and leather speciality store in Rome.',
        price: 18.99,
        image_url: newArrival,
        category: 'Clothing',
        brand: 'Roadster',
        color: 'Red'
    },
    {
        id: 2,
        name: 'Roadster Women Round Neck',
        description: 'Fendi began life in 1925 as a fur and leather speciality store in Rome.',
        price: 39.99,
        image_url: newArrival1,
        category: 'Clothing',
        brand: 'Roadster',
        color: 'Blue'
    },
    {
        id: 3,
        name: 'Roadster Women Round Neck',
        description: 'Fendi began life in 1925 as a fur and leather speciality store in Rome.Description for Product 3',
        price: 49.99,
        image_url: newArrival2,
        category: 'Clothing',
        brand: 'Roadster',
        color: 'Green'
    },
    {
        id: 4,
        name: 'Roadster Women Round Neck',
        description: 'Fendi began life in 1925 as a fur and leather speciality store in Rome.',
        price: 39.99,
        image_url: newArrival4,
        category: 'Clothing',
        brand: 'Roadster',
        color: 'Yellow'
    },
    {
        id: 5,
        name: 'Roadster Women Round Neck',
        description: 'Fendi began life in 1925 as a fur and leather speciality store in Rome.',
        price: 39.99,
        image_url: newArrival5,
        category: 'Clothing',
        brand: 'Roadster',
        color: 'Black'
    },
    {
        id: 6,
        name: 'Roadster Women Round Neck',
        description: 'Fendi began life in 1925 as a fur and leather speciality store in Rome.',
        price: 39.99,
        image_url: newArrival6,
        category: 'Clothing',
        brand: 'Roadster',
        color: 'White'
    },
    {
        id: 7,
        name: 'Roadster Women Round Neck',
        description: 'Fendi began life in 1925 as a fur and leather speciality store in Rome.',
        price: 39.99,
        image_url: newArrival7,
        category: 'Clothing',
        brand: 'Roadster',
        color: 'Gray'
    },
    {
        id: 8,
        name: 'Roadster Women Round Neck',
        description: 'Fendi began life in 1925 as a fur and leather speciality store in Rome.',
        price: 39.99,
        image_url: newArrival8,
        category: 'Clothing',
        brand: 'Roadster',
        color: 'Pink'
    },
    {
        id: 9,
        name: 'Roadster Women Round Neck',
        description: 'Fendi began life in 1925 as a fur and leather speciality store in Rome.',
        price: 39.99,
        image_url: newArrival3,
        category: 'Clothing',
        brand: 'Roadster',
        color: 'Orange'
    },
];


function NewProducts({ filters = {} }) {
    const [products] = useState(initialProducts);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const { addToCart } = useContext(CartContext);

    // Function to apply filters to the products
    const applyFilters = (product) => {
        const { category = '', brand = '', price = '', color = '' } = filters;

        // Check category
        if (category && product.category !== category) return false;
        // Check brand
        if (brand && product.brand !== brand) return false;

        // Check price range
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

        // Check color
        if (color && product.color !== color) return false;

        return true;
    };

    // Filter products based on the filters applied
    const filteredProducts = Array.isArray(products) ? products.filter(applyFilters) : []; // Check if products is an array

    return (
        <div className={`home-prods4 ${selectedProduct ? 'dimmed' : ''}`}>
            <h2>Our Featured Clothes</h2>
            <div className="item-content4">
                {filteredProducts.length > 0 ? ( // Check if there are any filtered products
                    filteredProducts.map((product, index) => (
                        <ProductCard
                            key={index}
                            product={product}
                            addToCart={addToCart}
                            setSelectedProduct={setSelectedProduct}
                        />
                    ))
                ) : (
                    <p>No products available.</p> // Fallback message if no products are available
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
    );
}


export default NewProducts;
