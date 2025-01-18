// src/components/TokenTable.jsx
import React from "react";

const TokenTable = ({ tokens, onTokenChange, onEditText, onFinishMarkup }) => {
  const handleTokenChange = (index, field, value) => {
    onTokenChange(index, field, value); // Передаем изменения родительскому компоненту
  };

  return (
    <div className="flex-1 overflow-y-auto mt-4">
      {tokens.length > 0 && (
        <div>
          {/* Таблица с токенами */}
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-2 py-1">#</th>
                <th className="border border-gray-300 px-2 py-1">Токен</th>
                <th className="border border-gray-300 px-2 py-1">LEMMA</th>
                <th className="border border-gray-300 px-2 py-1">UPOS</th>
                <th className="border border-gray-300 px-2 py-1">XPOS</th>
                <th className="border border-gray-300 px-2 py-1">FEATS</th>
                <th className="border border-gray-300 px-2 py-1">HEAD</th>
                <th className="border border-gray-300 px-2 py-1">DEPREL</th>
              </tr>
            </thead>
            <tbody>
              {tokens.map((token, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 px-2 py-1">{index + 1}</td>
                  <td className="border border-gray-300 px-2 py-1">{token}</td>
                  <td className="border border-gray-300 px-2 py-1">
                    <input
                      type="text"
                      className="w-full p-1"
                      placeholder="Лемма"
                      onChange={(e) =>
                        handleTokenChange(index, "LEMMA", e.target.value)
                      }
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-1">
                    <input
                      type="text"
                      className="w-full p-1"
                      placeholder="UPOS"
                      onChange={(e) =>
                        handleTokenChange(index, "UPOS", e.target.value)
                      }
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-1">
                    <input
                      type="text"
                      className="w-full p-1"
                      placeholder="XPOS"
                      onChange={(e) =>
                        handleTokenChange(index, "XPOS", e.target.value)
                      }
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-1">
                    <input
                      type="text"
                      className="w-full p-1"
                      placeholder="FEATS"
                      onChange={(e) =>
                        handleTokenChange(index, "FEATS", e.target.value)
                      }
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-1">
                    <input
                      type="number"
                      className="w-full p-1"
                      placeholder="HEAD"
                      onChange={(e) =>
                        handleTokenChange(index, "HEAD", e.target.value)
                      }
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-1">
                    <input
                      type="text"
                      className="w-full p-1"
                      placeholder="DEPREL"
                      onChange={(e) =>
                        handleTokenChange(index, "DEPREL", e.target.value)
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Кнопки */}
          <div className="mt-4 flex justify-between">
            <button
              className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
              onClick={onEditText}
            >
              Отредактировать текст
            </button>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              onClick={onFinishMarkup}
            >
              Закончить разметку
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TokenTable;
