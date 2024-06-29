import React, { useState, useContext } from 'react';
import { CartContext } from '../context/CartContext';
import '../products/flex-display.css';
import ProductCard from '../components/products/ProductCard';
import CartBuy from '../components/products/CartBuy';

import onSellImage from '../components/assets/images/on-sell1.webp';
import onSellImage1 from '../components/assets/images/on-sell2.webp';
import onSellImage2 from '../components/assets/images/on-sell3.webp';
import onSellImage3 from '../components/assets/images/on-sell4.webp';
import onSellImage4 from '../components/assets/images/on-sell5.webp';
import onSellImage5 from '../components/assets/images/on-sell6.webp';
import onSellImage6 from '../components/assets/images/on-sell7.webp';
import onSellImage7 from '../components/assets/images/on-sell8.webp';
import onSellImage8 from '../components/assets/images/on-sell9.webp';

const initialProducts = [
    {
        id: 1,
        name: 'Armani Veni Vidi Vici',
        description: 'Fendi began life in 1925 as a fur and leather speciality store in Rome.',
        price: 17.99,
        image_url: onSellImage,
        category: 'Watch',
        brand: 'Armani',
        color: 'Black'
    },
    {
        id: 2,
        name: 'Adidas Shoes Black',
        description: 'Men Black top shoes gown',
        price: 45.99,
        image_url: onSellImage1,
        category: 'Sneakers',
        brand: 'Adidas',
        color: 'Black'
    },
    {
        id: 3,
        name: 'Product 3',
        description: 'Description for Product 3',
        price: 49.99,
        image_url: onSellImage2,
        category: 'Woman',
        brand: 'Gucci',
        color: 'Blue'
    },
    {
        id: 4,
        name: 'Gucci Carlton UK',
        description: 'Knitted midi A-line dress, has a scoop neck, sleeveless, straight hem',
        price: 14.99,
        image_url: onSellImage4,
        category: 'Woman',
        brand: 'Gucci',
        color: 'White'
    },
    {
        id: 5,
        name: 'Hermes Carlton London',
        description: 'Off-White self-striped knitted midi A-line dress, has a scoop neck, sleeveless, straight hem',
        price: 39.99,
        image_url: onSellImage5,
        category: 'Woman',
        brand: 'Hermes',
        color: 'Olive'
    },
    {
        id: 6,
        name: 'Wayfarer Sunglasses',
        description: 'Our optical engineers developed these sunglasses for hiking. Ideal for occasional use in the mountains.',
        price: 39.99,
        image_url:onSellImage6,
        category: 'Sunglass',
        brand: 'Wayfarer',
        color: 'Gray'
    },
    {
        id: 7,
        name: 'Armani Wide-Leg Trousers',
        description: 'Monochrome elegance. Made with a relaxed wide-leg, these trousers are made from a sustainable soft organic cotton with a mechanical stretch making the garment easily recycled.',
        price: 60.00,
        image_url:onSellImage7,
        category: 'Man',
        brand: 'Armani',
        color: 'Brown'
    },
    {
        id: 8,
        name: 'REDQ Steel Watch',
        description: 'The Black Bay celebrates 60 years of diving watches with extraordinary heritage. The iconic model inherits the general lines.',
        price: 80.00,
        image_url:onSellImage8,
        category: 'Watch',
        brand: 'REDQ',
        color: 'Black'
    },
    {
        id: 9,
        name: 'Scuba Stand Collar Topper Jacket',
        description: 'Zara provides only the highest-quality selection of dresses, womens suits, and suited separates.',
        price: 12.00,
        image_url: onSellImage3,
        category: 'Woman',
        brand: 'Zara',
        color: 'Maroon'
    },
];

function SellingProducts({ filters = {} }) {
    const [products] = useState(initialProducts);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const { addToCart } = useContext(CartContext);

    const applyFilters = (product) => {
        const {
            category = '',
            brand = '',
            price = '',
            color = ''
        } = filters;

        if (category && product.category !== category) return false;
        if (brand && product.brand !== brand) return false;

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

        if (color && product.color !== color) return false;

        return true;
    };

    const filteredProducts = products.filter(applyFilters);

    return (
        <div className={`home-prods3 ${selectedProduct ? 'dimmed' : ''}`}>
            <h2>On-Selling Clothes</h2>
            <div className="item-content3">
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

export default SellingProducts;
