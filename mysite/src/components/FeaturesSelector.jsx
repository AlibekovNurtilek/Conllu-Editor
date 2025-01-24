import React, { useState } from "react";
import { featuresDictionary } from "../utils/featuresDictionary"; // Импортируйте ваш словарь
import { HiMiniXMark } from "react-icons/hi2";

const FeaturesSelector = ({ token, handleSelectFeature, handleDeleteFeature }) => {
  // Локальное состояние для признаков
  const [openFeature, setOpenFeature] = useState(null); // для открытия/закрытия категории признаков
  const [openValue, setOpenValue] = useState(null); // для открытия/закрытия значений признаков

  const getFeatureDisplay = (features, posTag, onDelete) => {
    if (!features) return <div>N/A</div>;

    const posFeatures = featuresDictionary[posTag];

    // Если часть речи отсутствует в словаре или у неё нет признаков, возвращаем специальный символ "⸺"
    if (!posFeatures) return <div>⸺</div>;

    const featureElements = Object.entries(features).map(([key, value]) => {
      const featureCategory = posFeatures[key];
      const displayValue = featureCategory?.values?.[value] || value;
      const displayKey = featureCategory ? featureCategory.label : key;

      return (
        <div key={key} className="border bg-dark-purple p-2 rounded text-white flex items-center gap-2">
          <HiMiniXMark onClick={() => onDelete(key)} className="text-lg cursor-pointer hover:text-gray-200" />
          <p className="whitespace-nowrap"> {displayValue}</p>
        </div>
      );
    });

    return featureElements.length > 0 ? featureElements : <div>⸺</div>;
  };

  // Получаем признаки для текущего pos
  const posFeatures = featuresDictionary[token.pos];

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[60%] min-h-[40%] border rounded-md bg-gray-300 z-10 p-4" onClick={(e) => { e.stopPropagation() }}>
      <div className="font-bold text-lg mb-2">{token.form}</div>
      
      {/* Дисплей текущих признаков */}
      <div className="flex flex-wrap gap-2">
        {getFeatureDisplay(token.feats, token.pos, handleDeleteFeature)}
      </div>

      {/* Селектор для добавления признаков */}
      <div className="mt-4">
        {posFeatures && (
          <ul>
            {Object.entries(posFeatures).map(([key, feature]) => {
              const featureLabel = feature.label;
              const featureValues = feature.values || {}; // Варианты для признака

              return (
                <li key={key}>
                  <button
                    className={`w-full text-left p-2 border-t border-black flex justify-between 
                      ${openFeature === key ? "bg-gray-300" : "bg-gray-100 hover:bg-gray-300"}`}
                    onClick={() => setOpenFeature(openFeature === key ? null : key)}
                  >
                    {featureLabel}
                    {featureValues && <span>{openFeature === key ? "▲" : "▼"}</span>}
                  </button>

                  {/* Если есть варианты признака, то показываем их */}
                  {openFeature === key && featureValues && (
                    <ul className="border-gray-300">
                      {Object.entries(featureValues).map(([valueKey, valueLabel]) => (
                        <li key={valueKey}>
                          <button
                            className="w-full text-left p-2 hover:bg-gray-300 flex justify-between"
                            onClick={() => handleSelectFeature(key, valueKey, valueLabel)}
                          >
                            <span>{valueLabel}</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default FeaturesSelector;
