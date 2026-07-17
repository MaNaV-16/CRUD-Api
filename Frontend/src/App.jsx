import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './page/login';
import Register from './page/register';
import Products from './page/product';
import ChangePassword from './page/changePassword';

const App = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Products />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/change-password" element={<ChangePassword />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;