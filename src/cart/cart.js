import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import '../cart/cart.css';
import '../productCategories/men.css';
import emptyImage from '../components/assets/images/empty.png';




const Cart = () => {
    const { cartItems, removeFromCart, clearCart, incrementQuantity, decrementQuantity } = useContext(CartContext);
    const [isCartVisible, setIsCartVisible] = useState(true);

    const totalAmount = cartItems.reduce((total, item) => total + item.totalPrice, 0);

    const toggleCartVisibility = () => {
        setIsCartVisible(!isCartVisible);
    };

    return (
        <>
            {isCartVisible && (
                <div className="cart">
                    <div className="cart-header">
                        <h2>Your Cart</h2>
                        <button onClick={toggleCartVisibility} className="close-cart-btn">X</button>
                    </div>
                    <ul>
                        {cartItems && cartItems.length > 0 ? (
                            cartItems.map((item, index) => (
                                <li key={index} className="cart-item">
                                    <img src={item.image_url} alt={item.name} className="cart-item-image" />
                                    <div className="cart-item-details">
                                        <h4>{item.name}</h4>
                                        <p>Price: ${item.price}</p>
                                        <p>Quantity: {item.quantity}</p>
                                        <p>Total Price: ${item.totalPrice}</p>
                                        <p>Color: <span style={{ backgroundColor: item.selectedColor, display: 'inline-block', width: '20px', height: '20px', border: '1px solid #000' }}></span></p>
                                        <p>Size: {item.selectedSize}</p>
                                    </div>
                                    <div className="cart-item-actions">
                                        <div className="cart-item-actions-1">
                                            <button onClick={() => incrementQuantity(item.id)} className="quantity-btn">+</button>
                                            <button onClick={() => decrementQuantity(item.id)} className="quantity-btn">-</button>
                                        </div>
                                        <button onClick={() => removeFromCart(item.id)} className="remove-item">Remove</button>
                                    </div>
                                </li>
                            ))
                        ) : (
                            <div className='empty'>
                                <li className="empty-cart">Your cart is empty</li>
                                <img src={emptyImage} alt="Image 1" />

                            </div>
                        )}
                    </ul>
                    {cartItems.length > 0 && (
                        <div className="total-amount">
                            <h3>Total Amount: ${totalAmount.toFixed(2)}</h3>
                            <div className="cart-item-actions-2">
                                <button onClick={clearCart} className="clear-cart">Clear Cart</button>
                                <Link to="/checkout" className="checkout-link">Checkout</Link>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default Cart;
