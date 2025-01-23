import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getSentenceById } from '../services/api';
import PosSelector from '../components/PosSelector';  // Импортируем селектор
import { posDictionary } from '../utils/posDictionary';  // Путь зависит от структуры вашего проекта
import { posDictionaryReverse } from '../utils/posDictionaryReverse';  // Путь зависит от структуры вашего проекта

// Кастомные теги
const customTags = ['TTSOZ', 'ETSOZ', 'ISSOZ', 'ASSOZ', 'TTSSOZ'];

function SentenceDetail() {
    const { id } = useParams();
    const [sentence, setSentence] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingTokenId, setEditingTokenId] = useState(null); // Для редактирования токенов

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

                        if (customTags.includes(posDictionaryReverse[category])) {
                            // Используем кастомный тег в XPOS
                            updatedToken.pos = 'X';  // В UPOS всегда X для кастомных тегов
                            updatedToken.xpos = posDictionaryReverse[category];  // В XPOS ставим кастомный тег
                        } else {
                            // Для обычных категорий
                            updatedToken.pos = posDictionaryReverse[category];  // В UPOS ставим стандартный тег
                            updatedToken.xpos = posDictionaryReverse[category];  // В XPOS ставим то же значение
                        }

                        console.log(`Updated token:`, updatedToken); // Логирование обновленного токена
                        return updatedToken;
                    }
                    return token;
                })
            };

            console.log(`Updated sentence:`, updatedSentence); // Логирование обновленного предложения
            return updatedSentence;
        });

        setEditingTokenId(null); // Закрываем селектор после выбора
    };

    const handleToggleToken = (tokenId) => {
        setEditingTokenId(editingTokenId === tokenId ? null : tokenId); // Переключаем редактирование
    };

    // Проверка перед рендерингом
    useEffect(() => {
        if (sentence && sentence !== prevSentence) {
            console.log("Current sentence state: ", sentence);
            // Обновляем prevSentence для следующего сравнения
            setPrevSentence(sentence);
        }
    }, [sentence]);
    
    const [prevSentence, setPrevSentence] = useState(null);
    

    if (loading) return <p className="text-center text-lg">Жүктөлүүдө...</p>;
    if (error) return <p className="text-center text-red-500">Error: {error}</p>;
    if (!sentence) return <p className="text-center">Суйлом табылган жок.</p>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Суйломдун деталдары</h1>
            <p className="text-lg mb-2"><strong>Текст:</strong> {sentence.text}</p>
            <p className="text-lg mb-4">
                <strong>Туураланганбы:</strong> {sentence.is_corrected ? 'Ооба' : 'Жок'}
            </p>

            <table className="min-w-full border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border border-gray-300 px-4 py-2 w-1/12">Индекс</th>
                        <th className="border border-gray-300 px-4 py-2 w-1/4">Форма</th>
                        <th className="border border-gray-300 px-4 py-2 w-1/4">Лемма</th>
                        <th className="border border-gray-300 px-4 py-2 w-1/4">Соз туркуму</th>
                        <th className="border border-gray-300 px-4 py-2 w-1/6">Фитчи</th>
                    </tr>
                </thead>
                <tbody>
                    {sentence.tokens.map((token, index) => (
                        <tr key={index} className="border border-gray-300">
                            <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                            <td className="border border-gray-300 px-4 py-2">{token.form}</td>
                            <td className="border border-gray-300 px-4 py-2">{token.lemma}</td>
                            <td
                                className="border border-gray-300 px-4 py-2 cursor-pointer relative"
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
                            <td className="border border-gray-300 px-4 py-2">
                                {token.feats ? Object.entries(token.feats).map(([key, value], idx) => (
                                    `${key}=${value}${idx < Object.entries(token.feats).length - 1 ? '|' : ''}`
                                )) : 'N/A'}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default SentenceDetail;
