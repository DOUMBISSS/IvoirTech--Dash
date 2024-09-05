// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './Pages/HomePage';
import CartPage from './Pages//CartPage';
import FavoritesPage from './Pages/FavoritesPage';
import ProductPage from './Pages/ProductPage';
import NotFoundPage from './Pages/NotFoundPage';
import CartContextProvider from './context/CartContext';
import FavoritesContextProvider from './context/FavoritesContext';

const App = () => {
    return (
        <CartContextProvider>
            <FavoritesContextProvider>
                <Router>
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/cart" element={<CartPage />} />
                        <Route path="/favorites" element={<FavoritesPage />} />
                        <Route path="/product/:id" element={<ProductPage />} />
                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                </Router>
            </FavoritesContextProvider>
        </CartContextProvider>
    );
};

export default App;