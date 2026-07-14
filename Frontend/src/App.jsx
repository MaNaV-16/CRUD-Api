import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API_URL = "http://localhost:5000/api/products";
const App = () => {
    const [products, setProducts] = useState([]);
    const [formData, setFormData] = useState({ name: "", price: "", description: "" });
    const [editId, setEditId] = useState(null);

    const fetchProducts = async () => {
        try {
            const response = await axios.get(API_URL);
            setProducts(response.data.data);
        } catch (error) {
            console.error("Error fetching products", error);
        }
    };
    useEffect(() => {
        fetchProducts();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editId) {
                await axios.put(`${API_URL}/${editId}`, formData);
                setEditId(null);
            }
            else{
                await axios.post(API_URL, formData);
            }
            setFormData({ name: "", price: "", description: "" });
            fetchProducts();
            alert("Product submitted successfully!");
        } catch (error) {
            console.error("Error submitting form", error);
            const errorMessage = error.response?.data?.message || "An error occurred while submitting the form.";
            alert(errorMessage);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            fetchProducts();
        } catch (error) {
            console.error("Error deleting product", error);
        }
    };

    const handleEdit = (product) => {
        setEditId(product._id);
        setFormData({ name: product.name, price: product.price, description: product.description });
    };

    return (
        <div className="container">
            <h2>Product Management</h2>

            <form onSubmit={handleSubmit} className="form-container">
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Product Name"
                    className="input-field"
                />
                <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="Product Price"
                    className="input-field"
                />
                <input
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Product Description"
                    className="input-field"
                />
                <button type="submit" className="btn-submit">
                    {editId ? "Update Product" : "Add Product"}
                </button>
            </form>
            <table className="product-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product._id}>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.description}</td>
                            <td>
                                <button onClick={() => handleEdit(product)} className="btn-edit">
                                    Edit
                                </button>
                                <button onClick={() => handleDelete(product._id)} className="btn-delete">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
};

export default App;



