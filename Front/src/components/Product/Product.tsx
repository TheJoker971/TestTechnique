import React, { useEffect, useState } from "react";

import { ICategory } from "../../Model/CategoryModel";
import { IProduct } from "../../Model/ProductModel";
import axios from "axios";

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
            const response = await axios.get<IProduct[]>("http://localhost:8000/products");
            setProducts(response.data);
        } catch (err) {
            setError("Failed to fetch products.");
        } finally {
            setIsLoading(false);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await axios.get<ICategory[]>("http://localhost:8000/categories");
            setCategories(response.data);
        } catch (err) {
            setError("Failed to fetch categories.");
        }
    };

    const handleCreate = async (newProduct: Omit<IProduct, "id">) => {
        try {
            await axios.post("http://localhost:8000/products", {
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
                await axios.put(`http://localhost:8000/products/${selectedProduct.id}`, {
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
            await axios.delete(`http://localhost:8000/products/${id}`);
            fetchProducts();
        } catch (err) {
            setError("Failed to delete product.");
        }
    };

}