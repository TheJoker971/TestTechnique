import React, { useEffect, useState } from "react";

import { ICategory } from "../../Model/CategoryModel";
import { IProduct } from "../../Model/ProductModel";
import axios from "axios";
import API from "../../service/API";
import ModalProduct from "./ModalProduct";

export default function Products() {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);

    const fetchProducts = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get<IProduct[]>(`${API.getUrl()}/products`);
            setProducts(response.data);
        } catch (err) {
            setError("Failed to fetch products.");
        } finally {
            setIsLoading(false);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await axios.get<ICategory[]>(`${API.getUrl()}/categories`);
            setCategories(response.data);
        } catch (err) {
            setError("Failed to fetch categories.");
        }
    };

    const handleCreate = async (newProduct: Omit<IProduct, "id">) => {
        try {
            await axios.post(`${API.getUrl()}/products`, {
                ...newProduct,
                categorie: newProduct.categorie.id,
            });
            fetchProducts();
            setIsModalOpen(false);
        } catch (err) {
            setError("Failed to create product.");
        }
    };

    const handleEdit = async (updatedProduct: Omit<IProduct, "id">) => {
        if (selectedProduct) {
            try {
                await axios.put(`${API.getUrl()}/products/${selectedProduct.id}`, {
                    ...updatedProduct,
                    categorie: updatedProduct.categorie.id,
                });
                fetchProducts();
                setIsModalOpen(false);
            } catch (err) {
                setError("Failed to update product.");
            }
        }
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm("Are you sure you want to delete this product?")) {
            return;
        }
        try {
            await axios.delete(`${API.getUrl()}/products/${id}`);
            fetchProducts();
        } catch (err) {
            setError("Failed to delete product.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
            {/* Title */}
            <h2 className="text-4xl font-bold text-gray-800 mb-6">Products</h2>
    
            {/* Navbar */}
            <nav className="w-full max-w-7xl flex justify-between items-center bg-white p-4 rounded-lg shadow mb-8">
                {/* Filtre par catégorie */}
                <select
                    className="border border-gray-300 rounded-lg px-4 py-2 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">All Categories</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.nom}
                        </option>
                    ))}
                </select>
                {/* Bouton Create */}
                <button
                    onClick={() => {
                        setSelectedProduct(null);
                        setIsModalOpen(true);
                    }}
                    className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg hover:bg-green-600 transition duration-300"
                >
                    Create Product
                </button>
            </nav>
    
            {/* Products */}
            {isLoading ? (
                <div className="text-center text-gray-500 text-xl">Loading products...</div>
            ) : error ? (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-red-500 text-white rounded-lg p-6 shadow-lg max-w-md w-full">
                        <h3 className="text-2xl font-bold mb-4">Error</h3>
                        <p>{error}</p>
                        <button
                            onClick={() => setError(null)} // Fermer le bloc d'erreur
                            className="mt-4 bg-white text-red-500 px-6 py-2 rounded-md hover:bg-gray-100 transition"
                        >
                            Close
                        </button>
                    </div>
                </div>
            ) : (
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {products.map((product) => (
                        <li
                            key={product.id}
                            className="bg-white border border-gray-300 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow flex flex-col justify-between"
                        >
                            <div>
                                <h3 className="text-lg font-medium text-gray-800 mb-2">{product.nom}</h3>
                                <p className="text-gray-600 mb-2">{product.description}</p>
                                <p className="text-lg font-bold text-gray-800 mb-2">
                                    ${product.prix.toFixed(2)}
                                </p>
                                <p className="text-sm text-gray-500">Category: {product.categorie.nom}</p>
                            </div>
                            <div className="mt-4 flex gap-4">
                                <button
                                    onClick={() => {
                                        setSelectedProduct(product);
                                        setIsModalOpen(true);
                                    }}
                                    className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(product.id)}
                                    className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition"
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
    
            {/* Modal to Create and Edit */}
            <ModalProduct
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={selectedProduct ? handleEdit : handleCreate}
                product={selectedProduct}
                categories={categories}
            />
        </div>
    );
    

}