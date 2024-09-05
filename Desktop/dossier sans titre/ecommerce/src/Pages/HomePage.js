// src/pages/HomePage.js
import React from 'react';
import Navbar from '../components/Navbar';
import ProductList from '../components/ProductList';
import data from "../data";

const HomePage = () => {
    return (
        <div>
            <h1>Home Page</h1>
            <ProductList />
        </div>
    );
};

export default HomePage;