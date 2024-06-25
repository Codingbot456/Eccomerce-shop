import React, { useState, useContext } from 'react';
import { CartContext } from '../context/CartContext';
import '../products/flex-display.css';

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
        image_url: onSellImage
    },
    {
        id: 2,
        name: 'Adidas Shoes Black',
        description: 'Men Black top shoes gown',
        price: 45.99,
        image_url: onSellImage1
    },
    {
        id: 3,
        name: 'Product 3',
        description: 'Description for Product 3',
        price: 49.99,
        image_url: onSellImage2
    },
    {
        id: 4,
        name: 'Gucci Carlton UK',
        description: 'Knitted midi A-line dress, has a scoop neck, sleeveless, straight hem',
        price: 14.99,
        image_url: onSellImage4
    },
    {
        id: 5,
        name: 'Hermes Carlton London',
        description: 'Off-White self-striped knitted midi A-line dress, has a scoop neck, sleeveless, straight hem',
        price: 39.99,
        image_url: onSellImage5
    },{
        id: 6,
        name: 'Wayfarer Sunglasses',
        description: 'Our optical engineers developed these sunglasses for hiking. Ideal for occasional use in the mountains.',
        price: 39.99,
        image_url:onSellImage6
    },{
        id: 7,
        name: 'Armani Wide-Leg Trousers',
        description: 'Monochrome elegance. Made with a relaxed wide-leg, these trousers are made from a sustainable soft organic cotton with a mechanical stretch making the garment easily recycled.',
        price: 60.00,
        image_url:onSellImage7
    },{
        id: 8,
        name: 'REDQ Steel Watch',
        description: 'The Black Bay celebrates 60 years of diving watches with extraordinary heritage. The iconic model inherits the general lines.',
        price: 80.00,
        image_url:onSellImage8
    },{
        id: 9,
        name: 'Scuba Stand Collar Topper Jacket',
        description: 'Zara provides only the highest-quality selection of dresses, womens suits, and suited separates.',
        price: 12.00,
        image_url: onSellImage3
    },
];

function SellingProducts() {
    const [products] = useState(initialProducts);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const { addToCart } = useContext(CartContext);

    return (
        <div className={`home-prods3 ${selectedProduct ? 'dimmed' : ''}`}>
            <h2>On-Selling Clothes</h2>
            <div className="item-content3">
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
        <div className='new'>
            <div className='card'>
                <div className='card-gap3'>
                    <div className='card-abt3' onClick={handleCardClick}>
                        {product.image_url && <img src={product.image_url} alt={product.name} className='card-image3' />}
                    </div>
                    <div className='card-info3'>
                        <h5>{product.name}</h5>
                        <p1>{product.description}</p1>
                        <h5>Price: ${product.price}</h5>
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
        <div className="buy-card-main">
           
            <div  className='cart-buy-abt'>
            <button className='close-button1' onClick={onClose}>X</button>
            {product.image_url && <img src={product.image_url} alt={product.name} className='card-image-main' />}
        </div>
        <div className='cart-buy-abt2'>
        <div className='card-info'>
            <div className='card-wrap'>
            <h4>{product.name}</h4>
                        <p1>{product.description}</p1>
                        <h4>Price: ${product.price}</h4>

            </div>
            
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


export default SellingProducts;
