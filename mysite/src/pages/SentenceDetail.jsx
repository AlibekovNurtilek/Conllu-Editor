import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getSentenceById } from '../services/api';

function SentenceDetail() {
    const { id } = useParams();
    const [sentence, setSentence] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
                        <th className="border border-gray-300 px-4 py-2">Индекс</th>
                        <th className="border border-gray-300 px-4 py-2">Форма</th>
                        <th className="border border-gray-300 px-4 py-2">Лемма</th>
                        <th className="border border-gray-300 px-4 py-2">POS</th>
                        <th className="border border-gray-300 px-4 py-2">XPOS</th>
                        <th className="border border-gray-300 px-4 py-2">Фитчи</th>
                        <th className="border border-gray-300 px-4 py-2">Head</th>
                        <th className="border border-gray-300 px-4 py-2">Deprel</th>
                        <th className="border border-gray-300 px-4 py-2">Misc</th>
                    </tr>
                </thead>
                <tbody>
                    {sentence.tokens.map((token, index) => (
                        <tr key={index} className="border border-gray-300">
                            <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                            <td className="border border-gray-300 px-4 py-2">{token.form}</td>
                            <td className="border border-gray-300 px-4 py-2">{token.lemma}</td>
                            <td className="border border-gray-300 px-4 py-2">{token.pos}</td>
                            <td className="border border-gray-300 px-4 py-2">{token.xpos}</td>
                            <td className="border border-gray-300 px-4 py-2">
                                {token.feats ? Object.entries(token.feats).map(([key, value], idx) => (
                                    `${key}=${value}${idx < Object.entries(token.feats).length - 1 ? '|' : ''}`
                                )) : 'N/A'}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">{token.head}</td>
                            <td className="border border-gray-300 px-4 py-2">{token.deprel}</td>
                            <td className="border border-gray-300 px-4 py-2">{token.misc}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default SentenceDetail;
