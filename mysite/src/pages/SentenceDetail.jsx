import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { getSentenceById } from '../services/api';
import PosSelector from '../components/SentenseDetails/PosSelector';  // Импортируем селектор
import { posDictionary } from '../utils/posDictionary';  // Путь зависит от структуры вашего проекта
import { posDictionaryReverse } from '../utils/posDictionaryReverse';  // Путь зависит от структуры вашего проекта
import FeaturesSelector from '../components/SentenseDetails/FeaturesSelector';
import { featuresDictionary } from "../utils/featuresDictionary"; // Импортируйте ваш словарь
import { useNavigate } from 'react-router-dom';
import {updateSentence} from '../services/api'
import Header from '../components/SentenseDetails/SentenseDetailHeader'
import { MdDelete } from "react-icons/md";



// Кастомные теги
const customTags = ['TTSOZ', 'ETSOZ', 'ISSOZ', 'ASSOZ', 'TTSSOZ'];

function SentenceDetail() {
    const navigate = useNavigate();
    const location = useLocation();
    const page = location.state?.page || 1; // Если состояние есть, берем его, если нет — по умолчанию 1

    const handleGoBack = () => {
        navigate(`/sentence-list?page=${page}`); // Вернуться на предыдущую страницу
    };


   

    const { id } = useParams();
    const [sentence, setSentence] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingTokenId, setEditingTokenId] = useState(null); // Для редактирования токенов
    const [editingFeatTokenId, setEditingFeatTokenId] = useState(null);
    const [selectedTokens, setSelectedTokens] = useState([]);



    const saveChanges = async () => {
        try {
            await updateSentence(sentence.id, sentence);
            alert('Сохранение успешно!');  // Уведомление пользователю об успешном сохранении
        } catch (error) {
            alert('Ошибка при сохранении изменений. Попробуйте еще раз.');
        }
        handleGoBack()
    };

    //Для обеденение 
    const handleTokenSelection = (tokenId) => {
        setSelectedTokens((prev) =>
            prev.includes(tokenId) ? prev.filter((id) => id !== tokenId) : [...prev, tokenId]
        );
    };

    const getMergedTokenIndex = () => {
        if (selectedTokens.length < 2) return null; // Должно быть минимум 2 токена
        const indices = selectedTokens.map((id) => {
            const token = sentence.tokens.find((t) => t.id === id);
            return token ? parseInt(token.token_index) : null;
        }).filter((index) => index !== null);
    
        const firstIndex = Math.min(...indices);
        const lastIndex = Math.max(...indices);
        return `${firstIndex}-${lastIndex}`;
    };

    const createMergedToken = () => {
        if (selectedTokens.length < 2) return;
    
        const mergedIndex = getMergedTokenIndex();
        if (!mergedIndex) return;
    
        // Найти все выбранные токены
        const selectedTokensData = sentence.tokens.filter((t) => selectedTokens.includes(t.id));
    
        // Создать новый токен
        const mergedToken = {
            token_index: mergedIndex,
            form: selectedTokensData.map((t) => t.form).join(" "), // Объединённая форма
            lemma: selectedTokensData.map((t) => t.form).join(" "), // Нужно будет редактировать вручную
            pos: "X", // Или предложи выбор
            xpos: "_",
            feats: {}, // Можно добавить выбор фич
            head: null,
            deprel: "_",
            misc: "{}"
        };
    
        // Добавить новый токен в список
        setSentence((prev) => ({
            ...prev,
            tokens: [...prev.tokens, mergedToken]
        }));
        // Очистить выбор
        setSelectedTokens([]);
    };
    const sortTokens = (tokens) => {
        return [...tokens].sort((a, b) => {
            const getMinIndex = (token) => {
                const parts = token.token_index.split("-").map(Number);
                return Math.min(...parts); // Берём минимальное значение в интервале
            };
    
            return getMinIndex(a) - getMinIndex(b) - 1;
        });
    };
    

    
    
    
    useEffect(() => {
        async function fetchSentence() {
            try {
                const data = await getSentenceById(id);
                setSentence(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchSentence();
    }, [id]);

    const handleSelectCategory = (tokenId, category) => {
        setSentence(prevSentence => {
            const updatedSentence = {
                ...prevSentence,
                tokens: prevSentence.tokens.map(token => {
                    if (token.id === tokenId) {
                        const updatedToken = { ...token };
    
                        // Сохраняем старое значение pos перед изменением
                        const oldPos = updatedToken.pos;
    
                        if (customTags.includes(posDictionaryReverse[category])) {
                            // Используем кастомный тег в XPOS
                            updatedToken.pos = 'X';  // В UPOS всегда X для кастомных тегов
                            updatedToken.xpos = posDictionaryReverse[category];  // В XPOS ставим кастомный тег
                        } else {
                            // Для обычных категорий
                            updatedToken.pos = posDictionaryReverse[category];  // В UPOS ставим стандартный тег
                            updatedToken.xpos = posDictionaryReverse[category];  // В XPOS ставим то же значение
                        }
    
                        // Если pos изменился, очищаем feats
                        if (updatedToken.pos !== oldPos) {
                            updatedToken.feats = {};  // Очищаем признаки
                        }
    
                        console.log(`Updated token:`, updatedToken); // Логирование обновленного токена
                        return updatedToken;
                    }
                    return token;
                })
            };
    
            return updatedSentence;
        });
    
        setEditingTokenId(null); // Закрываем селектор после выбора
    };
    

    const handleToggleToken = (tokenId) => {
        setEditingTokenId(editingTokenId === tokenId ? null : tokenId); // Переключаем редактирование
    };

    const handleToggleTokenFeat = (tokenId) =>{
        setEditingFeatTokenId(editingFeatTokenId === tokenId ? null : tokenId);
    }

    const closeFeatureSelector = () => {
        setEditingFeatTokenId(null);
      };

    const saveFeatures = (tokenId, updatedFeatures) => {
        // Обновляем признаки токена в объекте sentence
        const updatedTokens = sentence.tokens.map((token) => 
            token.id === tokenId ? { ...token, feats: updatedFeatures } : token
        );
        
        setSentence((prevSentence) => ({
            ...prevSentence,
            tokens: updatedTokens,
        })); // Обновляем tokens в sentence
        closeFeatureSelector(); // Закрываем модалку после сохранения
    };

    // Проверка перед рендерингом
    useEffect(() => {
        if (sentence && sentence !== prevSentence) {
            setPrevSentence(sentence);
        }
    }, [sentence]);
    
    const [prevSentence, setPrevSentence] = useState(null);




    const getFeatureDisplay = (features, posTag) => {
        if (!features) return <div>Список пуст</div>;
    
        const posFeatures = featuresDictionary[posTag];
    
        // Если часть речи отсутствует в словаре или у неё нет признаков, возвращаем специальный символ "⸺"
        if (!posFeatures) return <div>⸺</div>;
    
        const featureElements = Object.entries(features).map(([key, value]) => {
          const featureCategory = posFeatures[key];
          const displayValue = featureCategory?.values?.[value] || value;
          const displayKey = featureCategory ? featureCategory.label : key;
    
          return (
            <div key={key} className="border bg-blue-50 py-1 px-2 rounded-md text-black flex items-center gap-2">
              <p className="whitespace-nowrap"> {displayValue}</p>
            </div>
          );
        });
    
        return featureElements.length > 0 ? featureElements : <div>Список пуст</div>;
    };
    
    

    if (loading) return <p className="text-center text-lg">Жүктөлүүдө...</p>;
    if (error) return <p className="text-center text-red-500">Error: {error}</p>;
    if (!sentence) return <p className="text-center">Суйлом табылган жок.</p>;

    return (
        <div className="container mx-auto p-4">
            <Header sentence={sentence} />
            
            <div className="overflow-y-auto max-h-[60vh] sm:max-h-[60vh] md:max-h-[70vh] lg:max-h-[80vh]">
                <table className="min-w-full rounded-lg overflow-hidden">
                    <thead>
                        <tr className="bg-dark-purple text-white">
                            <th className="px-4 py-2 text-start">Индекс</th>
                            <th className="px-4 py-2 text-start">Форма</th>
                            <th className="px-4 py-2 text-start">Соз туркуму</th>
                            <th className="px-4 py-2 text-start">Касиеттер</th>
                            <th className="px-4 py-2 text-center" colSpan={2}>
                                <button className="bg-green-800 text-white p-2 rounded hover:bg-green-700"
                                    onClick={()=>createMergedToken()}>
                                    Бириктируу
                                </button>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortTokens(sentence.tokens).map((token, index) => (
                            <tr key={index} className="odd:bg-white even:bg-gray-200 ">
                                <td className="px-4 py-2">{token.token_index}</td>
                                <td className="px-4 py-2">{token.form}</td>
                                <td
                                    className="px-4 py-2 cursor-pointer  "
                                    onClick={() => handleToggleToken(token.id)} // Активируем редактирование
                                >
                                    {posDictionary[token.pos] || posDictionary[token.xpos] || token.pos} {/* Проверяем сначала UPOS, затем XPOS */}
                                    {editingTokenId === token.id && (
                                        <PosSelector
                                            token={token}
                                            handleSelectCategory={handleSelectCategory}
                                        />
                                    )}
                                </td>
                                <td
                                    className={`px-4 py-2 
                                        ${!featuresDictionary[token.pos] ? "opacity-50 cursor-not-allowed " : "cursor-pointer"}`}
                                    onClick={() => handleToggleTokenFeat(token.id)}  // Активируем редактирование
                                    >
                                    <div className="flex overflow-x-auto gap-2 bg-transparent max-w-[380px]">
                                        {featuresDictionary[token.pos]? getFeatureDisplay(token.feats, token.pos) : "Бул соз туркуму учун касиеттер аныкталбаган"}
                                        
                                    </div>

                                    {editingFeatTokenId === token.id && featuresDictionary[token.pos] &&(
                                        <FeaturesSelector
                                        token={token}
                                        closeFeatureSelector={closeFeatureSelector}
                                        saveFeatures={saveFeatures}
                                        />
                                    )}
                                </td>
                                <td className='px-4 py-2 w-12'>
                                    <div className='flex items-center justify-center'> 
                                        <input type='checkbox'
                                            checked={selectedTokens.includes(token.id)} 
                                            onChange={() => handleTokenSelection(token.id)}/>
                                    </div>                                  
                                </td>
                                <td className='px-4 py-2 w-12'>
                                    <div className='flex items-center justify-center' >
                                        <MdDelete className='text-2xl text-red-800 hover:text-red-900 cursor-pointer' />
                                    </div>                                   
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex mt-2 justify-between">
                <button className="bg-red-950 px-6 w-[49%] py-2 rounded-md text-white text-lg font-semibold hover:bg-red-900 "
                    onClick={handleGoBack}> Отмена</button>
                <button className="bg-dark-purple px-6 w-[49%] py-2 rounded-md text-white text-lg font-semibold hover:bg-blue-900"
                    onClick={saveChanges} > Сактоо</button>
            </div>
        </div>
    );
}

export default SentenceDetail;