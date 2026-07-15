const express = require('express');
const cors = require('cors');
const ProductRoutes = require('./routes/Product.routes.js');
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/products', ProductRoutes);
app.use('/uploads', express.static('uploads'));

module.exports = app;