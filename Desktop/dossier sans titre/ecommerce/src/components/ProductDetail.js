// src/components/ProductDetail.js
import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../services/productService';
import { CartContext } from '../context/CartContext';
import { FavoritesContext } from '../context/FavoritesContext';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const { dispatch: cartDispatch } = useContext(CartContext);
    const { dispatch: favoritesDispatch } = useContext(FavoritesContext);

    useEffect(() => {
        const getProduct = async () => {
            const product = await fetchProductById(id);
            setProduct(product);
        };
        getProduct();
    }, [id]);

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className="product-detail">
            <img src={product.image} alt={product.title} />
            <h1>{product.title}</h1>
            <p>{product.description}</p>
            <p>{product.price} $</p>
            <button onClick={() => cartDispatch({ type: 'ADD_TO_CART', payload: product })}>Add to Cart</button>
            <button onClick={() => favoritesDispatch({ type: 'ADD_TO_FAVORITES', payload: product })}>Add to Favorites</button>
        </div>
    );
};

export default ProductDetail;