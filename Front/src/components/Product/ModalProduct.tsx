import React, { useState, useEffect } from "react";
import { ICategory } from "../../Model/CategoryModel";
import { IProduct } from "../../Model/ProductModel";

interface ModalProductProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (product: Omit<IProduct, "id">) => void;
    product: IProduct | null;
    categories: ICategory[];
}

const ModalProduct: React.FC<ModalProductProps> = ({
                                                       isOpen,
                                                       onClose,
                                                       onSubmit,
                                                       product,
                                                       categories,
                                                   }) => {
    const [nom, setNom] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [prix, setPrix] = useState<number>(0);
    const [categorie, setCategorie] = useState<ICategory | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (product) {
            setNom(product.nom);
            setDescription(product.description);
            setPrix(product.prix);
            setCategorie(product.categorie);
        } else {
            setNom("");
            setDescription("");
            setPrix(0);
            setCategorie(null);
        }
        setError(null); // Clear error on open
    }, [product]);

    const handleSubmit = () => {
        if (!nom || !description || !prix || !categorie) {
            setError("All fields are required.");
            return;
        }

        onSubmit({
            nom,
            description,
            prix,
            categorie,
        });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 shadow-lg max-w-md w-full">
                <h3 className="text-2xl font-bold mb-4 text-gray-800">
                    {product ? "Edit Product" : "Create Product"}
                </h3>

                {error && (
                    <div className="text-red-500 text-sm mb-4">
                        {error}
                    </div>
                )}

                <form onSubmit={(e) => e.preventDefault()}>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Name</label>
                        <input
                            type="text"
                            value={nom}
                            onChange={(e) => setNom(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Price</label>
                        <input
                            type="number"
                            value={prix}
                            onChange={(e) => setPrix(parseFloat(e.target.value))}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            min="0.01"
                            step="0.01"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Category</label>
                        <select
                            value={categorie?.id || ""}
                            onChange={(e) =>
                                setCategorie(categories.find((cat) => cat.id === parseInt(e.target.value)) || null)
                            }
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            required
                        >
                            <option value="">Select a category</option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.nom}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex justify-end gap-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={handleSubmit}
                            className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                        >
                            {product ? "Save" : "Create"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ModalProduct;
