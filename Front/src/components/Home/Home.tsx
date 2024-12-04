import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();

    return (
        <div className="bg-white min-h-screen flex flex-col">
            {/* Hero Section */}
            <section className="flex-1 flex items-center justify-center bg-gray-50">
                <div className="max-w-5xl text-center px-4">
                    <h2 className="text-5xl font-bold text-gray-800 leading-tight mb-6">
                        Discover and Manage Your <span className="text-blue-600">Products</span> and{" "}
                        <span className="text-blue-600">Categories</span>
                    </h2>
                    <p className="text-lg text-gray-600 mb-8">
                        MarketStore helps you keep track of your inventory and organize your business
                        with ease.
                    </p>
                    <div className="space-x-4">
                        <button
                            onClick={() => navigate("/products")}
                            className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:shadow-lg hover:bg-blue-700 transition"
                        >
                            View Products
                        </button>
                        <button
                            onClick={() => navigate("/categories")}
                            className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg shadow hover:shadow-lg hover:bg-gray-300 transition"
                        >
                            View Categories
                        </button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-800 text-gray-200 py-6">
                <div className="max-w-6xl mx-auto px-4 text-center">
                    <p className="text-sm">
                        © 2024 MarketStore. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
}
