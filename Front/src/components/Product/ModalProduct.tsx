import React, { useEffect, useState } from "react";
import { ICategory } from "../../Model/CategoryModel";
import { IProduct } from "../../Model/ProductModel";

interface ModalProductProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (product: Omit<IProduct, "id">) => void;
    product?: IProduct | null; // Produit à modifier (optionnel)
    categories: ICategory[]; // Liste des catégories
}

export default function ModalProduct({
                                         isOpen,
                                         onClose,
                                         onSubmit,
                                         product,
                                         categories,
                                     }: ModalProductProps) {
    const [formProduct, setFormProduct] = useState<Omit<IProduct, "id">>({
        nom: "",
        description: "",
        prix: 0,
        categorie: { id: 0, nom: "" },
    });

    // Remplir le formulaire si un produit est fourni
    useEffect(() => {
        if (product) {
            setFormProduct({
                nom: product.nom,
                description: product.description,
                prix: product.prix,
                categorie: product.categorie,
            });
        } else {
            setFormProduct({
                nom: "",
                description: "",
                prix: 0,
                categorie: { id: 0, nom: "" },
            });
        }
    }, [product]);

    const handleChange = (field: keyof Omit<IProduct, "id">, value: any) => {
        setFormProduct((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formProduct);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-lg max-w-lg w-full">
                <div className="flex justify-between items-center px-6 py-4 border-b">
                    <h3 className="text-lg font-semibold text-gray-800">
                        {product ? "Edit Product" : "Create Product"}
                    </h3>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 focus:outline-none"
                    >
                        ✕
                    </button>
                </div>

                <div className="p-6">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Name</label>
                            <input
                                type="text"
                                value={formProduct.nom}
                                onChange={(e) => handleChange("nom", e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Description</label>
                            <textarea
                                value={formProduct.description}
                                onChange={(e) => handleChange("description", e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Price</label>
                            <input
                                type="number"
                                value={formProduct.prix}
                                onChange={(e) => handleChange("prix", parseFloat(e.target.value))}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Category</label>
                            <select
                                value={formProduct.categorie.id}
                                onChange={(e) =>
                                    handleChange(
                                        "categorie",
                                        categories.find((cat) => cat.id === parseInt(e.target.value)) || {
                                            id: 0,
                                            nom: "",
                                        }
                                    )
                                }
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                required
                            >
                                <option value="">Select a category</option>
                                {categories.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.nom}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex justify-end gap-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                            >
                                {product ? "Save Changes" : "Create"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
