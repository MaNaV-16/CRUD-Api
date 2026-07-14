const app = require('./app');
const mongoose = require('mongoose');
const PORT = 5000;
const DB_URL = 'mongodb://127.0.0.1:27017/crud_db';

mongoose.connect(DB_URL)
.then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
})
.catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});