import React, { useEffect, useState } from "react";
import { ICategory } from "../../Model/CategoryModel";
import ModalCategory from "./ModalCategory";
import axios from "axios";
import API from "../../service/API";

export default function Category() {
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [categoryToDelete, setCategoryToDelete] = useState<ICategory | null>(null);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axios.get<ICategory[]>(`${API.getUrl()}/categories`);
            setCategories(response.data);
        } catch (err) {
            setError("Failed to fetch categories.");
        }
    };

    const handleCreate = async (newCategory: Omit<ICategory, "id">) => {
        try {
            const response = await axios.post<ICategory>(`${API.getUrl()}/categories`, newCategory);
            fetchCategories();
            setIsModalOpen(false);
        } catch (err) {
            setError("Failed to create category.");
        }
    };

    const handleEdit = async (updatedCategory: Omit<ICategory, "id">) => {
        if (selectedCategory) {
            try {
                const response = await axios.put<ICategory>(
                    `${API.getUrl()}/categories/${selectedCategory.id}`,
                    updatedCategory
                );
                fetchCategories();
                setIsModalOpen(false);
            } catch (err) {
                setError("Failed to update category.");
            }
        }
    };

    const handleDelete = async () => {
        if (!categoryToDelete) return;
        try {
            await axios.delete(`${API.getUrl()}/categories/${categoryToDelete.id}`);
            fetchCategories();
            setCategoryToDelete(null);
            setIsConfirmDeleteOpen(false);
        } catch (err) {
            setError("Failed to delete category.");
            setIsConfirmDeleteOpen(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto p-8">
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Categories</h2>
            <button
                onClick={() => {
                    setSelectedCategory(null);
                    setIsModalOpen(true);
                }}
                className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600"
            >
                Create Category
            </button>

            {error && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-red-500 text-white rounded-lg p-6 shadow-lg max-w-md w-full text-center">
                        <h3 className="text-2xl font-bold mb-4">Error</h3>
                        <p>{error}</p>
                        <button
                            onClick={() => setError(null)}
                            className="mt-4 bg-white text-red-500 px-6 py-2 rounded-md hover:bg-gray-100 transition"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            <ul className="mt-6 space-y-4">
                {categories.map((category) => (
                    <li
                        key={category.id}
                        className="flex items-center justify-between border p-4 rounded-lg shadow-md"
                    >
                        <span className="text-gray-800 font-medium">{category.nom}</span>
                        <div className="space-x-4">
                            <button
                                onClick={() => {
                                    setSelectedCategory(category);
                                    setIsModalOpen(true);
                                }}
                                className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => {
                                    setCategoryToDelete(category);
                                    setIsConfirmDeleteOpen(true);
                                }}
                                className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600"
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

            {/* Modal Create/Edit */}
            <ModalCategory
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={selectedCategory ? handleEdit : handleCreate}
                category={selectedCategory}
            />

            {/* Modal Confirmation Delete */}
            {isConfirmDeleteOpen && categoryToDelete && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 shadow-lg max-w-md w-full text-center">
                        <h3 className="text-2xl font-bold mb-4 text-gray-800">
                            Confirm Deletion
                        </h3>
                        <p className="text-gray-600">
                            Are you sure you want to delete <strong>{categoryToDelete.nom}</strong>?
                        </p>
                        <div className="mt-6 flex justify-center gap-4">
                            <button
                                onClick={() => setIsConfirmDeleteOpen(false)}
                                className="px-6 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
