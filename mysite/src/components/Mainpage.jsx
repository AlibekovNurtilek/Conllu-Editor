// src/pages/Home.jsx
import React, { useState } from "react";
import TextInput from "../components/TextInput";
import TokenTable from "../components/TokenTable";

const Home = () => {
  const [tokens, setTokens] = useState([]); // Состояние для токенов
  const [input, setInput] = useState(""); // Состояние для текста
  const [isProcessing, setIsProcessing] = useState(false); // Флаг для отображения таблицы

  const handleProcess = (inputText) => {
    setInput(inputText); // Сохраняем введённый текст
    const newTokens = inputText.match(/\S+/g) || [];
    setTokens(newTokens);
    setIsProcessing(true); // Переключаем на отображение таблицы
  };

  const handleTokenChange = (index, field, value) => {
    const updatedTokens = tokens.map((token, i) =>
      i === index ? { ...token, [field]: value } : token
    );
    setTokens(updatedTokens);
  };

  const handleEditText = () => {
    setIsProcessing(false); // Переключаем на режим ввода текста
  };

  const handleFinishMarkup = () => {
    alert("Разметка завершена!");
    // Логика для завершения разметки
  };

  return (
    <div className="p-3 h-screen flex flex-col">
      {/* Если не в процессе, показываем компонент ввода текста */}
      {!isProcessing ? (
        <TextInput input={input} onProcess={handleProcess} />
      ) : (
        <TokenTable
          tokens={tokens}
          onTokenChange={handleTokenChange}
          onEditText={handleEditText}
          onFinishMarkup={handleFinishMarkup}
        />
      )}
    </div>
  );
};

export default Home;
