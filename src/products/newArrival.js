import React, { useState, useContext } from 'react';
import { CartContext } from '../context/CartContext';
import CartBuy from '../components/products/CartBuy-grid';
import ProductCard from '../components/products/ProductCard-grid';
import '../products/grid-display.css';

import onSellImage from '../components/assets/images/new-Arriv1.webp';
import onSellImage1 from '../components/assets/images/new-Arriv2.webp';
import onSellImage2 from '../components/assets/images/new-Arriv3.webp';
import onSellImage3 from '../components/assets/images/new-Arriv4.webp';
import onSellImage4 from '../components/assets/images/new-Arriv5.webp';
import onSellImage5 from '../components/assets/images/new-Arriv6.webp';
import onSellImage6 from '../components/assets/images/new-Arriv7.webp';
import onSellImage7 from '../components/assets/images/new-Arriv8.webp';
import onSellImage8 from '../components/assets/images/new-Arriv9.webp';

const initialProducts = [
    {
        id: 1,
        name: 'Roadster Women Round Neck',
        description: 'Fendi began life in 1925 as a fur and leather speciality store in Rome.',
        price: 18.99,
        image_url: onSellImage,
        category: 'Clothing',
        brand: 'Roadster',
        color: 'Red'
    },
    {
        id: 2,
        name: 'Roadster Women Round Neck',
        description: 'Fendi began life in 1925 as a fur and leather speciality store in Rome.',
        price: 39.99,
        image_url: onSellImage1,
        category: 'Clothing',
        brand: 'Roadster',
        color: 'Blue'
    },
    {
        id: 3,
        name: 'Roadster Women Round Neck',
        description: 'Fendi began life in 1925 as a fur and leather speciality store in Rome.Description for Product 3',
        price: 49.99,
        image_url: onSellImage2,
        category: 'Clothing',
        brand: 'Roadster',
        color: 'Green'
    },
    {
        id: 4,
        name: 'Roadster Women Round Neck',
        description: 'Fendi began life in 1925 as a fur and leather speciality store in Rome.',
        price: 39.99,
        image_url: onSellImage4,
        category: 'Clothing',
        brand: 'Roadster',
        color: 'Yellow'
    },
    {
        id: 5,
        name: 'Roadster Women Round Neck',
        description: 'Fendi began life in 1925 as a fur and leather speciality store in Rome.',
        price: 39.99,
        image_url: onSellImage5,
        category: 'Clothing',
        brand: 'Roadster',
        color: 'Black'
    },
    {
        id: 6,
        name: 'Roadster Women Round Neck',
        description: 'Fendi began life in 1925 as a fur and leather speciality store in Rome.',
        price: 39.99,
        image_url: onSellImage6,
        category: 'Clothing',
        brand: 'Roadster',
        color: 'White'
    },
    {
        id: 7,
        name: 'Roadster Women Round Neck',
        description: 'Fendi began life in 1925 as a fur and leather speciality store in Rome.',
        price: 39.99,
        image_url: onSellImage7,
        category: 'Clothing',
        brand: 'Roadster',
        color: 'Gray'
    },
    {
        id: 8,
        name: 'Roadster Women Round Neck',
        description: 'Fendi began life in 1925 as a fur and leather speciality store in Rome.',
        price: 39.99,
        image_url: onSellImage8,
        category: 'Clothing',
        brand: 'Roadster',
        color: 'Pink'
    },
    {
        id: 9,
        name: 'Roadster Women Round Neck',
        description: 'Fendi began life in 1925 as a fur and leather speciality store in Rome.',
        price: 39.99,
        image_url: onSellImage3,
        category: 'Clothing',
        brand: 'Roadster',
        color: 'Orange'
    },
];

function FeaturedProducts({ filters = {} }) {
    const [products] = useState(initialProducts);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const { addToCart } = useContext(CartContext);

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

        return true;
    };

    const filteredProducts = products.filter(applyFilters);

    return (
        <div className={`home-prods4 ${selectedProduct ? 'dimmed' : ''}`}>
            <h2>New-Arrival Clothes</h2>
            <div className="item-content4">
                {filteredProducts && filteredProducts.length && filteredProducts.map((product, index) => (
                    <ProductCard
                        key={index}
                        product={product}
                        addToCart={addToCart}
                        setSelectedProduct={setSelectedProduct}
                    />
                ))}
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
