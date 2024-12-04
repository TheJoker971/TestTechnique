import React from "react";
import { useNavigate } from "react-router-dom";

export default function Header() {
    const navigate = useNavigate();

    return (
        <header className="bg-blue-600 text-white py-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center px-6">
                {/* Title */}
                <h1 className="text-4xl font-bold">MarketStore</h1>

                {/* Navigation Buttons */}
                <div className="space-x-4">
                    <button
                        onClick={() => navigate("/products")}
                        className="bg-white text-blue-600 px-4 py-2 rounded-md shadow transition duration-300 ease-in-out hover:bg-red-500 hover:text-white"
                    >
                        Products
                    </button>
                    <button
                        onClick={() => navigate("/categories")}
                        className="bg-white text-blue-600 px-4 py-2 rounded-md shadow transition duration-300 ease-in-out hover:bg-red-500 hover:text-white"
                    >
                        Categories
                    </button>
                </div>
            </div>
        </header>
    );
}
