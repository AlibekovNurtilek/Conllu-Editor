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
import { FaPen } from "react-icons/fa";
import { MdDoneOutline } from "react-icons/md";
import PopUp from '../components/SentenseDetails/PopUp';
import { BsSearch } from "react-icons/bs";
import { IoFilterSharp } from "react-icons/io5";
import { IoMdDownload } from "react-icons/io";



// Кастомные теги
const customTags = ['TTSOZ', 'ETSOZ', 'ISSOZ', 'ASSOZ', 'TTSSOZ',];

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
    const [editingFromTokenId, setEditingFromTokenId] = useState(null);
    const [showPopUp, setShowPopUp] = useState(false); // Состояние для показа попапа
    const [isSaving, setIsSaving] = useState(false); // Состояние для определения типа операции (сохранение или отмена)



        // Функция для отображения попапа при попытке сохранить или отменить изменения
    const handleSaveChangesClick = () => {
        setIsSaving(true);  // Операция сохранения
        setShowPopUp(true);  // Показываем попап
    };

    const handleCancelChangesClick = () => {
        setIsSaving(false);  // Операция отмены
        setShowPopUp(true);  // Показываем попап
    };

    const saveChanges = async () => {
        try {
            await updateSentence(sentence.id, sentence);
        } catch (error) {
            alert('Ошибка при сохранении изменений. Попробуйте еще раз.');
        }
        setShowPopUp(false);  // Скрываем попап после завершения сохранения
        handleGoBack(); // Возвращаемся на предыдущую страницу или делаем другие действия
    };
        // Функция для отмены действия (закрытие попапа)
    const cancelChanges = () => {
        setShowPopUp(false); // Закрытие попапа без сохранения
    };

    //Для обеденение 
    const handleTokenSelection = (token) => {
        setSelectedTokens((prev) =>
            prev.includes(token) ? prev.filter((id) => id !== token) : [...prev, token]
        );
    };

    const getMergedTokenIndex = () => {
        if (selectedTokens.length < 2) return null; // Должно быть минимум 2 токена
        const indices = selectedTokens.map((selectedToken) => {
            const token = sentence.tokens.find((t) => t.id === selectedToken.id);
            return token ? parseInt(token.token_index) : null;
        }).filter((index) => index !== null);
    
        const firstIndex = Math.min(...indices);
        const lastIndex = Math.max(...indices);
        return `${firstIndex}-${lastIndex}`;
    };

    const createMergedToken = () => {
        // Очистить выбор
        setSelectedTokens([]);
        if (selectedTokens.length < 2) return;
    
        const mergedIndex = getMergedTokenIndex();
        if (!mergedIndex) return;
    
        // Найти все выбранные токены
        const selectedTokensData = sentence.tokens.filter((t) => selectedTokens.includes(t));
    
        // Создать новый токен
        const mergedToken = {
            token_index: mergedIndex,
            form: selectedTokensData.map((t) => t.form).join(" "), // Объединённая форма
            lemma: selectedTokensData.map((t) => t.form).join(" "), // Нужно будет редактировать вручную
            pos: "X", // Или предложи выбор
            xpos: "_",
            feats: null, // Можно добавить выбор фич
            head: selectedTokensData[0].head,
            deprel: "_",
            misc: "None"
        };
    
        // Добавить новый токен в список
        setSentence((prev) => ({
            ...prev,
            tokens: [...prev.tokens, mergedToken]
        }));

        
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
    

    

   
   
    

    //для изменение формы токена 
    const handleEditTokenFrom = (tokenId) => {
        setEditingFromTokenId(editingFromTokenId === tokenId ? null : tokenId); // Переключаем редактирование
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



    const handleDeleteToken = () => {
        if (selectedTokens.length === 0) return;
    
        // Фильтруем токены, исключая те, что выбраны для удаления
        setSentence((prev) => ({
            ...prev,
            tokens: prev.tokens.filter((token) => !selectedTokens.includes(token))
        }));
    
        // Очистить выбор после удаления
        setSelectedTokens([]);
    };
    


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
    

    const updateSentenceText = (token) => {
        // Проверяем, если token_index не содержит тире (то есть это одиночный индекс)
        if (!token.token_index.includes('-')) {
            // Получаем индекс токена в предложении
            const tokenIndex = parseInt(token.token_index) - 1;  // индексация с 0
    
            // Создаём новый текст, заменяя нужное слово на обновлённое значение
            const updatedText = sentence.text.split(' ').map((word, index) => {
                if (index === tokenIndex) {
                    return token.form;  // обновляем слово
                }
                return word;
            }).join(' ');
    
            // Обновляем sentence.text
            sentence.text = updatedText;
    
            
        } else {
            // Если token_index содержит интервал, ничего не обновляем
            console.log('Не обновляем текст для токена с интервалом');
        }
        // Завершаем редактирование
        handleEditTokenFrom(null);
    };
    
    

    if (loading) return <p className="text-center text-lg">Жүктөлүүдө...</p>;
    if (error) return <p className="text-center text-red-500">Error: {error}</p>;
    if (!sentence) return <p className="text-center">Суйлом табылган жок.</p>;

    return (
        <div className="container mx-auto p-4">
            <Header sentence={sentence} />
            
            <div className="overflow-y-auto max-h-[60vh] sm:max-h-[60vh] md:max-h-[70vh] lg:max-h-[80vh]">
                <table className="table-fixed w-full rounded-t-lg overflow-hidden">
                    <thead>
                       {selectedTokens.length === 0 ? (
                            <tr className='h-20 bg-dark-purple border-none duration-300'>
                                <th colSpan='3' className='w-40 text-white text-lg '>
                                    <div className='flex border-b border-light-white items-center w-72 ml-10 text-md justify-between'>
                                        <input type='text' placeholder='Издөө' className='bg-transparent focus:outline-none' />
                                        <BsSearch />
                                    </div>
                                </th>
                                <th colSpan='2' />
                                <th className='px-4 py-2 text-end w-60'>
                                    <div className='flex items-center text-white gap-1 text-lg justify-end'>
                                        <div className='flex items-center p-2 rounded-md cursor-pointer gap-2'>
                                            <IoFilterSharp />
                                            <p>Add filters</p>
                                        </div>
                                    </div>
                                </th>
                                <th className='px-4 py-2 w-32'>
                                    <div className='flex items-center justify-end text-white p-2 rounded-md cursor-pointer gap-2'>
                                        <IoMdDownload />
                                        <p>Export</p>
                                    </div>
                                </th>
                            </tr>
                        ) : (
                            <tr className='bg-blue-800 h-20 duration-300'>
                                <th colSpan='3' className='w-60 text-white text-lg pl-10 text-start'>
                                    {selectedTokens.length} соз тандалды
                                </th>
                                <th colSpan='2'/>
                                <th className='px-4 py-2 text-end w-60'>
                                    <div className='flex items-center text-white gap-1 text-lg justify-end'>
                                        <div className='flex items-center hover:bg-blue-700 p-2 rounded-md cursor-pointer active:bg-blue-600'
                                        onClick={()=>createMergedToken()}>
                                            <IoMdDownload />
                                            <p>Бириктирүү</p>
                                        </div>
                                    </div>
                                </th>
                                <th className='px-4 py-2 w-32'>
                                    <div className='flex text-lg items-center hover:bg-red-600 p-2 rounded-md cursor-pointer text-red-600 active:bg-red-500 hover:text-white'
                                    onClick={()=>handleDeleteToken()}>
                                        <MdDelete />
                                        <p>Очуруу</p>
                                    </div>
                                </th>
                            </tr>
                    )}
                    </thead>
                </table>
                <table className="table-fixed w-full rounded-b-lg overflow-hidden">
                    <thead>
                    <tr className="bg-dark-purple text-white">
                        <th className=" w-12 "></th>
                        <th className="px-4 py-2 w-16 text-start">Id</th>
                        <th className="px-4 py-2 text-start w-[20%]">Форма</th>
                        <th className="px-4 py-2 text-start w-[20%]">Соз туркуму</th>
                        <th className="px-4 py-2 text-start w-[35%]">Касиеттер</th>
                        <th className="px-4 py-2 w-16 text-center"></th>
                    </tr>
                    </thead>

                    <tbody>
                        {sortTokens(sentence.tokens).map((token, index) => (
                            <tr key={index} className="odd:bg-white even:bg-gray-200 ">
                                <td className='px-4 py-2 w-12'>                                
                                    <div className='flex items-center justify-center'> 
                                        <input type='checkbox'
                                            checked={selectedTokens.includes(token)} 
                                            onChange={() => handleTokenSelection(token)}/>
                                    </div>                                  
                                </td>

                                <td className="px-4 py-2 w-18">{token.token_index}</td>
                                <td className="px-4 py-2">
                                    {editingFromTokenId === token.id ? (
                                        <input className='p-2 border-none'
                                            autoFocus
                                            type="text"
                                            value={token.form}
                                            onChange={(e) => {
                                                const newForm = e.target.value;
                                                setSentence(prevSentence => ({
                                                    ...prevSentence,
                                                    tokens: prevSentence.tokens.map(t => 
                                                        t.id === token.id ? { ...t, form: newForm } : t
                                                    )
                                                }));
                                            }}
                                        />
                                    ) : (
                                        token.form
                                    )}
                                </td>
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
                                        <div>
                                        {editingFromTokenId === token.id ? (
                                            <div className="text-green-600 cursor-pointer flex items-center justify-center" 
                                                onClick={() => updateSentenceText(token)}>
                                                <MdDoneOutline  className='bg-green-700 text-white rounded-[50%] p-1 text-2xl
                                                    hover:transform hover:translate-y-[-2px] transition-transform duration-300 hover:bg-green-800'/>
                                            </div>
                                        ) : (
                                            <div className="text-green-600 cursor-pointer flex items-center justify-center" >
                                                <FaPen
                                                    className="text-dark-purple text-lg cursor-pointer 
                                                    hover:text-green-800 hover:transform hover:translate-y-[-2px] transition-transform duration-300"
                                                    title="Озгортуу"
                                                    onClick={() => handleEditTokenFrom(token.id)}     
                                                />
                                            </div>
                                        )}

                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex mt-2 justify-between">
                <button className="bg-red-950 px-6 w-[49%] py-2 rounded-md text-white text-lg font-semibold hover:bg-red-900 "
                    onClick={handleCancelChangesClick}> Отмена</button>
                <button className="bg-dark-purple px-6 w-[49%] py-2 rounded-md text-white text-lg font-semibold hover:bg-blue-900"
                    onClick={handleSaveChangesClick} > Сактоо
                    </button>
                {/* Показываем попап, если состояние showPopUp == true */}
                {showPopUp && (
                    <PopUp
                    message={isSaving ? "Вы уверены, что хотите сохранить изменения?" : "Вы уверены, что хотите отменить изменения?"}
                    confirmButtonText={isSaving ? "ОК" : "Да, отменить"}
                    cancelButtonText="Отмена"
                    onConfirm={isSaving ? saveChanges : handleGoBack}  // Функция зависит от операции
                    onCancel={() => setShowPopUp(false)}  // Закрыть попап при отмене
                    />
                )}
            </div>
        </div>
    );
}

export default SentenceDetail;

{/* jfofrjg ro ipoj eroijt  erjgt eriojot erw setoijh  drsoig drsj  rijg seorij  srjgoj e erghij   srg roi  jr ger */}