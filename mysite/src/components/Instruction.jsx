import React, { useState } from "react";

// Данные для селектора
const categories = [
    {
      id: 1,
      label: "Маани берүүчү",
      children: [
        {
          id: 11,
          label: "Зат атооч",
          children: [
            { id: 111, label: "Жалпы зат атооч - NOUN" },
            { id: 112, label: "Ээнчилүү зат атооч - PROPN" },
          ],
        },
        { id: 12, label: "Сын атооч - ADJ" },
        { id: 13, label: "Ат атооч - PRON" },
        { id: 14, label: "Сан атооч - NUM" },
        {
          id: 15,
          label: "Этиш",
          children: [
            { id: 151, label: "Этиш - VERB" },
            { id: 152, label: "Көмөкчү этиш - AUX" },
          ],
        },
        { id: 16, label: "Тактооч - ADV" },
      ],
    },
    {
      id: 2,
      label: "Маани бербөөчү же кызматчы",
      children: [
        { id: 21, label: "Байламта - CCONJ" },
        { id: 22, label: "Жандооч - SCONJ" },
        { id: 23, label: "Бөлүкчө - PART" },
        { id: 24, label: "Модалдык сөз - INTJ" },
      ],
    },
    {
      id: 3,
      label: "Өзгөчө сөз түркүмдөрү",
      children: [
        {
          id: 31,
          label: "Тууранды сөз",
          children: [
            { id: 311, label: "Табыш тууранды сөз - TTSOZ" },
            { id: 312, label: "Элес тууранды сөз - ETSOZ" },
          ],
        },
        {
          id: 32,
          label: "Сырдык сөз",
          children: [
            { id: 321, label: "Ички сезимди билдирүүчү - ISSOZ" },
            { id: 322, label: "Айбанаттарга карата айтылуучу - ASSOZ" },
            { id: 323, label: "Турмуш тиричиликте колдонулуучу - TTSSOZ" },
          ],
        },
      ],
    },
  ];
  

  const TokenTable = () => {
    const initialTokens = [
      { id: 1, token: "Мен", category: "N/A" },
      { id: 2, token: "китеп", category: "N/A" },
      { id: 3, token: "окуйм", category: "N/A" },
    ];
  
    const [tokens, setTokens] = useState(initialTokens);
    const [editingTokenId, setEditingTokenId] = useState(null);
    const [openCategory, setOpenCategory] = useState(null);
    const [openSubCategory, setOpenSubCategory] = useState(null);
  
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
        setOpenCategory(null);
        setOpenSubCategory(null);
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
                    <div className="absolute left-0 mt-1 bg-white border border-gray-400 shadow-lg w-64 z-10">
                        <h2>{token.token}</h2>
                        <ul className="">
                        {categories.map((category) => (
                            <li key={category.id}>
                            <button
                                className="w-full text-left p-2 bg-gray-100 hover:bg-gray-200 flex justify-between"
                                onClick={(e) => {
                                e.stopPropagation();
                                setOpenCategory(
                                    openCategory === category.id ? null : category.id
                                );
                                setOpenSubCategory(null);
                                }}
                            >
                                {category.label}
                                {category.children && (
                                <span>{openCategory === category.id ? "▲" : "▼"}</span>
                                )}
                            </button>
    
                            {openCategory === category.id && category.children && (
                                <ul className="ml-4 border-l border-gray-300">
                                {category.children.map((sub) => (
                                    <li key={sub.id}>
                                    <button
                                        className="w-full text-left p-2 bg-gray-100 hover:bg-gray-200 flex justify-between"
                                        onClick={(e) => {
                                        e.stopPropagation();
                                        setOpenSubCategory(
                                            openSubCategory === sub.id ? null : sub.id
                                        );
                                        }}
                                    >
                                        {sub.label}
                                        {sub.children && (
                                        <span>
                                            {openSubCategory === sub.id ? "▲" : "▼"}
                                        </span>
                                        )}
                                    </button>
    
                                    {openSubCategory === sub.id && sub.children && (
                                        <ul className="ml-4 border-l border-gray-300">
                                        {sub.children.map((child) => (
                                            <li
                                            key={child.id}
                                            className="p-2 pl-6 hover:bg-gray-100 cursor-pointer"
                                            onClick={() =>
                                                handleSelectCategory(token.id, child.label)
                                            }
                                            >
                                            {child.label}
                                            </li>
                                        ))}
                                        </ul>
                                    )}
                                    </li>
                                ))}
                                </ul>
                            )}
                            </li>
                        ))}
                        </ul>
                    </div>
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