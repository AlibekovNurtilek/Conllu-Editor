// src/components/TextInput.jsx
import React, { useState, useEffect } from "react";

const TextInput = ({ input, onProcess }) => {
  const [text, setText] = useState(input); // Состояние для текста

  useEffect(() => {
    setText(input); // Обновляем текст, если он меняется извне
  }, [input]);

  const handleInputChange = (e) => {
    setText(e.target.value);
  };

  const handleProcess = () => {
    if (text.trim()) {
      onProcess(text); // Передаем введённый текст родительскому компоненту
    } else {
      alert("Пожалуйста, введите предложение.");
    }
  };

  return (
    <div className="mb-4">
      <h1 className="text-2xl font-bold mb-4">ManasNLP үчүн маалымат редактору</h1>
      <textarea
        className="w-full p-2 border border-gray-300 rounded"
        rows="4"
        placeholder="Суйломду киргизиниз..."
        value={text}
        onChange={handleInputChange}
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4"
        onClick={handleProcess}
      >
        Иштетүү
      </button>
    </div>
  );
};

export default TextInput;
