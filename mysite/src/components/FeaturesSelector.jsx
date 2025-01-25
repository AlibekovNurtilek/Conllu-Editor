import React, { useState } from "react";
import { featuresDictionary } from "../utils/featuresDictionary"; // Импортируйте ваш словарь
import { HiMiniXMark } from "react-icons/hi2";

const FeaturesSelector = ({ token, closeFeatureSelector, saveFeatures}) => {
  // Локальное состояние для признаков
  const [openFeature, setOpenFeature] = useState(null); // для открытия/закрытия категории признаков
// Локальное состояние для признаков (копируем начальные данные из token.feats)
  const [features, setFeatures] = useState(token.feats || {});


  const handleDeleteFeature = (key) => {
    const updatedFeatures = { ...features };
    delete updatedFeatures[key];
    setFeatures(updatedFeatures);
    console.log(features)
    
  };

  const handleSelectFeature = (key, valueKey, valueLabel) => {
    // Если объект features пустой, просто добавляем новый элемент
    if (Object.keys(features).length === 0) {
        setFeatures({ [key]: valueKey }); // Добавляем новый ключ и значение
        return; // Прерываем выполнение функции
    }

    // Копируем текущие данные из features
    const updatedFeatures = { ...features };

   

    // Добавляем новый элемент
    updatedFeatures[key] = valueKey;

    // Обновляем состояние с новым объектом
    setFeatures(updatedFeatures);

  };

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
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-10">
<     div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80vw] sm:w-[60vw] md:w-[40vw] min-h-[40vh] border rounded-md bg-white z-10 p-4" onClick={(e) => { e.stopPropagation() }}>
        <div className="font-bold text-lg mb-2">{token.form}</div>
        <div className="border border-black rounded-md ">
          {/* Дисплей текущих признаков */}
          <div className="flex overflow-x-auto  gap-2 bg-white border-b border-black p-2">
            {getFeatureDisplay(features, token.pos, handleDeleteFeature)}
          </div>

          {/* Селектор для добавления признаков */}
          <div className="overflow-y-auto">
            {posFeatures && (
              <ul >
                {Object.entries(posFeatures).map(([key, feature]) => {
                  const featureLabel = feature.label;
                  const featureValues = feature.values || {}; // Варианты для признака

                  return (
                    <li key={key} className="mt-1" >
                      <button
                        className={`w-full text-left p-2  flex justify-between hover:bg-dark-purple hover:text-white
                          ${openFeature === key ? "bg-dark-purple text-white" : "bg-white"}`}
                        onClick={() => setOpenFeature(openFeature === key ? null : key)}
                      >
                        {featureLabel}
                        {featureValues && <span>{openFeature === key ? "▲" : "▼"}</span>}
                      </button>

                      {/* Если есть варианты признака, то показываем их */}
                      {openFeature === key && featureValues && (
                        <ul className="">
                          {Object.entries(featureValues).map(([valueKey, valueLabel]) => (
                            <li key={valueKey} className="hover:bg-gray-300 pl-4">
                              <button
                                className="w-full text-left p-2 flex justify-between"
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
        <div className="flex mt-2 justify-between">
            <button className="bg-red-700 px-6 w-[49%] py-2 rounded-sm text-white text-lg font-semibold hover:bg-red-800 "
            onClick={closeFeatureSelector}> Отмена</button>
            <button className="bg-green-700 px-6 w-[49%] py-2 rounded-sm text-white text-lg font-semibold hover:bg-green-800"
             onClick={() => saveFeatures(token.id, features)} > Сактоо</button>
        </div>
        
      </div>
    </div>
  );
};

export default FeaturesSelector;
