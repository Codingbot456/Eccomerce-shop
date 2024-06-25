import React, { useState, useContext } from 'react';
import { CartContext } from '../context/CartContext';
import '../products/grid-display.css';

import onSellImage from '../components/assets/images/feature-1.webp';
import onSellImage1 from '../components/assets/images/feature-2.webp';
import onSellImage2 from '../components/assets/images/feature-3.webp';
import onSellImage3 from '../components/assets/images/feature-4.webp';
import onSellImage4 from '../components/assets/images/feature-5.webp';


const initialProducts = [
    {
        id: 1,
        name: 'Nike Bag',
        description: 'Rolex’s powerhouse calibre 3235 Perpetual movement. An upgrade from the calibre 3135 movement',
        price: 16.38,
        image_url: onSellImage
    },
    {
        id: 2,
        name: 'Adidas Woolen Cap',
        description: 'Casual wear (casual attire or clothing) may be a Western code that’s relaxed, occasional, spontaneous and fitted to everyday use. Casual wear became popular within the Western world following the counterculture of the 1960s.',
        price: 16.00,
        image_url: onSellImage1
    },
    {
        id: 3,
        name: 'Nike Leader VT',
        description: 'Footwear refers to garments worn on the feet, which originally serves to purpose of protection against adversities of the environment, usually regarding ground textures and temperature.',
        price: 16.38,
        image_url: onSellImage2
    },
    {
        id: 4,
        name: 'Tissot Classic',
        description: 'The new-model Submariner now features Rolex’s powerhouse calibre 3235 Perpetual movement. An upgrade from the calibre 3135 movement,',
        price: 600.00,
        image_url: onSellImage4
    }
];



function FeaturedProducts() {
    const [products] = useState(initialProducts);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const { addToCart } = useContext(CartContext);

    return (
        <div className={`home-prods4 ${selectedProduct ? 'dimmed' : ''}`}>
            <h2>Our Featured Clothes</h2>
            <div className="item-content4">
                {products && products.length && products.map((product, index) => (
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

const ProductCard = ({ product, addToCart, setSelectedProduct }) => {
    const handleCardClick = () => {
        setSelectedProduct(product);
    };

    return (
        <div className='new4'>
            <div className='card'>
                <div className='card-gap4'>
                    <div className='card-abt4' onClick={handleCardClick}>
                        {product.image_url && <img src={product.image_url} alt={product.name} className='card-image4' />}
                    </div>
                    <div className='card-info4'>
                        <h5>{product.name}</h5>
                        <p2>{product.description}</p2>
                        <h6>Price: ${product.price}</h6>
                    </div>
                </div>
            </div>
        </div>
    );
};

const CartBuy = ({ product, onClose, onAddToCart }) => {
    const [quantity, setQuantity] = useState(1);
    const [selectedColor, setSelectedColor] = useState('#000000');
    const [selectedSize, setSelectedSize] = useState('');

    const handleIncrement = () => {
        setQuantity(quantity + 1);
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handleColorChange = (event) => {
        setSelectedColor(event.target.value);
    };

    const handleSizeSelect = (size) => {
        setSelectedSize(size);
    };

    const handleAddToCartClick = () => {
        const totalPrice = product.price * quantity;
        onAddToCart({ ...product, quantity, totalPrice, selectedColor, selectedSize });
        onClose();
    };

    return (
        <div className="buy-card4">
            <button className='close-button' onClick={onClose}>X</button>
            <div className='cart-buy-abt'>
                {product.image_url && <img src={product.image_url} alt={product.name} className='card-image' />}
            </div>
            <div className='cart-buy-abt2'>
                <div className='card-info'>
                <h4>{product.name}</h4>
                        <p1>{product.description}</p1>
                        <h5>Price: ${product.price}</h5>
                </div>
                <div className='sizes'>
                    {['S', 'M', 'L', 'XL', 'XXL'].map(size => (
                        <button
                            key={size}
                            className={`size-btn ${selectedSize === size ? 'selected' : ''}`}
                            onClick={() => handleSizeSelect(size)}
                        >
                            {size}
                        </button>
                    ))}
                </div>
                <div className='color-picker'>
                    <p>Color:</p>
                    <input type='color' value={selectedColor} onChange={handleColorChange} />
                </div>
                <div className='buys'>
                    <div className='quantity'>
                        <button onClick={handleDecrement} className='quantity-btn'>-</button>
                        <span className='quantity-value'>{quantity}</span>
                        <button onClick={handleIncrement} className='quantity-btn'>+</button>
                        <div className='ccart'>
                        <button onClick={handleAddToCartClick} className='add-to-cart'>Add to Cart</button>
                        </div>
                        
                    </div>
                </div>
                <button className='view-details'>View Details</button>
            </div>
        </div>
    );
};
export default FeaturedProducts;
