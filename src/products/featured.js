import React, { useState, useContext } from 'react';
import { CartContext } from '../context/CartContext';
import CartBuy from '../components/products/CartBuy-grid';
import ProductCard from '../components/products/ProductCard-grid';
import '../products/grid-display.css';

import featured from '../components/assets/images/feature-1.webp';
import featured1 from '../components/assets/images/feature-2.webp';
import  featured2 from '../components/assets/images/feature-3.webp';
import featured3 from '../components/assets/images/feature-4.webp';
import featured4 from '../components/assets/images/feature-5.webp';


const initialProducts = [
    {
        id: 1,
        name: 'Nike Bag',
        description: 'Rolex’s powerhouse calibre 3235 Perpetual movement. An upgrade from the calibre 3135 movement',
        price: 16.38,
        image_url: featured
    },
    {
        id: 2,
        name: 'Adidas Woolen Cap',
        description: 'Casual wear (casual attire or clothing) may be a Western code that’s relaxed, occasional, spontaneous and fitted to everyday use. Casual wear became popular within the Western world following the counterculture of the 1960s.',
        price: 16.00,
        image_url: featured1
    },
    {
        id: 3,
        name: 'Nike Leader VT',
        description: 'Footwear refers to garments worn on the feet, which originally serves to purpose of protection against adversities of the environment, usually regarding ground textures and temperature.',
        price: 16.38,
        image_url: featured2
    },
    {
        id: 4,
        name: 'Tissot Classic',
        description: 'The new-model Submariner now features Rolex’s powerhouse calibre 3235 Perpetual movement. An upgrade from the calibre 3135 movement,',
        price: 600.00,
        image_url: featured3
    }
];



function FeaturedProducts({ filters = {} }) {
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

export default FeaturedProducts;
