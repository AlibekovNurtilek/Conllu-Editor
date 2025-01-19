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
      <div className="flex justify-end mt-4">
        <button
          className="bg-dark-purple text-white px-10 py-2 rounded hover:bg-blue-900"
          onClick={handleProcess}
        >
          Иштетүү
        </button>
      </div>
    </div>
  
  );
};

export default TextInput;
