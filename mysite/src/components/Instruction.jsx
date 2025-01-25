import React, { useState } from "react";
import PosSelector from "./PosSelector.jsx"; // Импортируем компонент

const TokenTable = () => {
  const initialTokens = [
    { id: 1, token: "Мен", category: "N/A" },
    { id: 2, token: "китеп", category: "N/A" },
    { id: 3, token: "окуйм ", category: "N/A" },
  ];

  const [tokens, setTokens] = useState(initialTokens);
  const [editingTokenId, setEditingTokenId] = useState(null);

  const handleSelectCategory = (tokenId, category) => {
    setTokens(
      tokens.map((token) =>
        token.id === tokenId ? { ...token, category } : token
      )
    );
    setEditingTokenId(null); // Закрываем селектор
  };

  const handleToggleToken = (tokenId) => {
    if (editingTokenId === tokenId) {
      setEditingTokenId(null);
    } else {
      setEditingTokenId(tokenId);
    }
  };

  return (
    <div className="w-2/3 mx-auto mt-5">
      <table className="border-collapse border border-gray-400 w-full">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-400 p-2">Токен</th>
            <th className="border border-gray-400 p-2">Категория</th>
          </tr>
        </thead>
        <tbody>
          {tokens.map((token) => (
            <tr key={token.id} className="text-center">
              <td className="border border-gray-400 p-2">{token.token}</td>
              <td
                className="border border-gray-400 p-2 cursor-pointer relative"
                onClick={() => handleToggleToken(token.id)}
              >
                {token.category}

                {editingTokenId === token.id && (
                  <PosSelector token={token} handleSelectCategory={handleSelectCategory} />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TokenTable;
