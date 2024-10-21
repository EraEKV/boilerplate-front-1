"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const RequestForm = () => {
    const [query, setQuery] = useState("");
    const router = useRouter(); // For navigation

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    };

    const handleGenerateClick = () => {
        // Redirect to the homepage
        router.push("/homepage");
    };

    const handleSuggestionClick = (suggestion: string) => {
        setQuery(suggestion); // Set the input to the selected suggestion
    };

    const suggestions = [
        "Текст для сценария",
        "Рецепт жаренной курицы",
        "Идея для блога",
        "Советы по программированию",
        "История для рассказа"
    ];

    return (
        <div className="px-4 flex flex-col bg-bg justify-center items-center w-full min-h-screen">
            <div className="bg-white shadow-md rounded-lg px-8 py-8 max-w-96 space-y-14">
                <h1 className="text-2xl font-semibold text-center">Что вы хотите создать?</h1>
                <div className="space-y-4">
                    <input
                        type="text"
                        value={query}
                        onChange={handleChange}
                        placeholder="Введите запрос..."
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-400"
                    />
                    <button
                        onClick={handleGenerateClick}
                        className="w-full py-3 text-white text-lg font-bold rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 hover:shadow-lg transition-shadow duration-300 ease-in-out"
                    >
                        Сгенерировать
                    </button>
                </div>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl">   
                {suggestions.map((suggestion, index) => (
                    <div
                        key={index}
                        className="bg-white shadow-md rounded-lg p-4 hover:shadow-xl hover:bg-gray-50 transition duration-300 cursor-pointer"
                        onClick={() => handleSuggestionClick(suggestion)}
                    >
                        {suggestion}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RequestForm;
