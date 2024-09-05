import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const Cart = () => {
    const { cart, dispatch } = useContext(CartContext);

    const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <div className="cart">
            <h2>Your Cart</h2>
            {cart.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <ul>
                    {cart.map(item => (
                        <li key={item.id}>
                            {item.title} - {item.price} $ x {item.quantity}
                            <button onClick={() => dispatch({ type: 'REMOVE_FROM_CART', payload: item.id })}>-</button>
                        </li>
                    ))}
                </ul>
            )}
            <div>
                <strong>Total: {totalAmount.toFixed(2)} $</strong>
            </div>
            {cart.length > 0 && (
                <button onClick={() => dispatch({ type: 'CLEAR_CART' })}>Clear Cart</button>
            )}
        </div>
    );
};

export default Cart;