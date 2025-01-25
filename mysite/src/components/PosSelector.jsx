// CategorySelector.js
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
          { id: 111, label: "Зат атооч", designation: "NOUN" },
          { id: 112, label: "Ээнчилүү зат атооч", designation: "PROPN" },
        ],
      },
      { id: 12, label: "Сын атооч", designation: "ADJ" },
      { id: 13, label: "Ат атооч", designation: "PRON" },
      { id: 14, label: "Сан атооч", designation: "NUM" },
      {
        id: 15,
        label: "Этиш",
        children: [
          { id: 151, label: "Этиш", designation: "VERB" },
          { id: 152, label: "Көмөкчү этиш", designation: "AUX" },
        ],
      },
      { id: 16, label: "Тактооч", designation: "ADV" },
    ],
  },
  {
    id: 2,
    label: "Маани бербөөчү же кызматчы",
    children: [
      { id: 21, label: "Байламта", designation: "CCONJ" },
      { id: 22, label: "Жандооч", designation: "SCONJ" },
      { id: 23, label: "Бөлүкчө", designation: "PART" },
      { id: 24, label: "Модалдык сөз", designation: "INTJ" },
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
          { id: 311, label: "Табыш тууранды сөз", designation: "TTSOZ" },
          { id: 312, label: "Элес тууранды сөз", designation: "ETSOZ" },
        ],
      },
      {
        id: 32,
        label: "Сырдык сөз",
        children: [
          { id: 321, label: "Ички сезимди билдирүүчү", designation: "ISSOZ" },
          { id: 322, label: "Айбанаттарга карата айтылуучу", designation: "ASSOZ" },
          { id: 323, label: "Турмуш тиричиликте колдонулуучу", designation: "TTSSOZ" },
        ],
      },
    ],
  },
  {
    id: 4,
    label: "Башка...",
    children: [
      { id: 41, label: "Adposition(ADP)", designation: "ADP" },
      { id: 42, label: "Determiner(DET)", designation: "DET" },
      { id: 43, label: "Тыныш белгиси", designation: "PUNCT" },
      { id: 44, label: "Символ", designation: "SYM" },
    ],
  },
];

const PosSelector = ({ token, handleSelectCategory }) => {
  const [openCategory, setOpenCategory] = useState(null);
  const [openSubCategory, setOpenSubCategory] = useState(null);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
       bg-white border-2 border-dark-purple rounded-md shadow-lg w-96 z-10">
        <div className="h-10 bg-dark-purple relative">
          <h2
            className="text-lg font-semibold cursor-default pt-2 text-white text-center"
            onClick={(e) => e.stopPropagation()} // предотвращаем клик на h2
          >
            {token.form}
          </h2>

          <button className="absolute top-[-2px] right-[-2px] rounded-tr-md bg-red-600 w-11 h-[43px] text-white text-xl hover:bg-red-700">
            X
          </button>
        </div>

        <ul>
          {categories.map((category) => (
            <li key={category.id}>
              <button
                className={`w-full text-left p-2 border-t border-black flex justify-between
                          ${openCategory === category.id ? "bg-gray-300 " : "bg-gray-100 hover:bg-gray-300 "}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenCategory(openCategory === category.id ? null : category.id);
                  setOpenSubCategory(null);
                }}
              >
                {category.label}
                {category.children && <span>{openCategory === category.id ? "▲" : "▼"}</span>}
              </button>

              {openCategory === category.id && category.children && (
                <ul className="border-gray-300">
                  {category.children.map((sub) => (
                    <li key={sub.id}>
                      <button
                        className="w-full text-left p-2 hover:bg-gray-300 flex justify-between"
                        onClick={(e) => {
                          if (sub.children) {
                            e.stopPropagation();
                            setOpenSubCategory(openSubCategory === sub.id ? null : sub.id);
                          } else {
                            handleSelectCategory(token.id, sub.label);
                          }
                        }}
                      >
                        <span
                          className={`transition-transform duration-300 ${openCategory === category.id ? "translate-x-4" : ""}`}
                        >
                          {sub.label}
                        </span>
                        {sub.children && <span>{openSubCategory === sub.id ? "▲" : "▼"}</span>}
                      </button>

                      {openSubCategory === sub.id && sub.children && (
                        <ul className="border-gray-300">
                          {sub.children.map((child) => (
                            <li
                              key={child.id}
                              className="p-2 pl-6 text-left hover:bg-gray-200 cursor-pointer"
                              onClick={() => handleSelectCategory(token.id, child.label)}
                            >
                              <span
                                className={`transition-transform duration-300 ${openSubCategory === sub.id ? "ml-4" : ""}`}
                              >
                                {child.label}
                              </span>
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
    </div>
  );
};

export default PosSelector;
