const express = require('express');
const cors = require('cors');
const ProductRoutes = require('./routes/Product.routes.js');
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/products', ProductRoutes);

module.exports = app;