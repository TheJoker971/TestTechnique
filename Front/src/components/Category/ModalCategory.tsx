import React, { useEffect, useState } from "react";
import {ICategory} from "../../Model/CategoryModel";

interface ModalCategoryProps {
    isOpen: boolean; // Contrôle si la modal est visible
    onClose: () => void; // Fonction de fermeture
    onSubmit: (category: Omit<ICategory, "id">) => void; // Callback pour la soumission
    category?: ICategory | null; // Catégorie existante à modifier (optionnel)
}

export default function ModalCategory({
                                          isOpen,
                                          onClose,
                                          onSubmit,
                                          category,
                                      }: ModalCategoryProps) {
    const [formCategory, setFormCategory] = useState<Omit<ICategory, "id">>({
        nom: "",
    });

    // Remplir le formulaire si une catégorie existante est fournie
    useEffect(() => {
        if (category) {
            setFormCategory({
                nom: category.nom,
            });
        } else {
            setFormCategory({
                nom: "",
            });
        }
    }, [category]);

    const handleChange = (field: keyof Omit<ICategory, "id">, value: string) => {
        setFormCategory((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formCategory);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-lg max-w-lg w-full">
                <div className="flex justify-between items-center px-6 py-4 border-b">
                    <h3 className="text-lg font-semibold text-gray-800">
                        {category ? "Edit Category" : "Create Category"}
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
                                value={formCategory.nom}
                                onChange={(e) => handleChange("nom", e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                required
                            />
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
                                {category ? "Save Changes" : "Create"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
