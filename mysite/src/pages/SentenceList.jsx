import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSentences } from '../services/api';

function SentenceList() {
    const navigate = useNavigate();
    const [sentences, setSentences] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1); // Текущая страница
    const [totalPages, setTotalPages] = useState(0); // Общее количество страниц
    const [currentPageGroup, setCurrentPageGroup] = useState(0); // Текущая группа страниц

    const pageSize = 15; // Количество записей на странице
    const pagesPerGroup = 10; // Количество страниц в одной группе

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                const response = await getSentences(page, pageSize);
                if (response && response.items) {
                    setSentences(response.items);
                    setTotalPages(response.pages);
                } else {
                    throw new Error("Invalid response format");
                }
            } catch (err) {
                console.error("Error fetching sentences:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [page]);

    useEffect(() => {
        setCurrentPageGroup(Math.floor((page - 1) / pagesPerGroup)); // Update page group based on current page
    }, [page]);

    const handleNextPage = () => {
        if (page < totalPages) setPage((prev) => prev + 1);
    };

    const handlePrevPage = () => {
        if (page > 1) setPage((prev) => prev - 1);
    };

    const handlePageClick = (pageNumber) => {
        setPage(pageNumber);
    };

    const handleGroupChange = (direction) => {
        if (direction === 'next' && (currentPageGroup + 1) * pagesPerGroup < totalPages) {
            // Если переходим на следующую декаду, устанавливаем первую страницу следующей декады
            setPage((currentPageGroup + 1) * pagesPerGroup + 1);
            setCurrentPageGroup((prev) => prev + 1);
        } else if (direction === 'prev' && currentPageGroup > 0) {
            // Если возвращаемся на предыдущую декаду, устанавливаем первую страницу текущей декады
            setPage((currentPageGroup -1 ) * pagesPerGroup + 1);
            setCurrentPageGroup((prev) => prev - 1);
        }
    };

    const getPageNumbers = () => {
        const startPage = currentPageGroup * pagesPerGroup + 1;
        const endPage = Math.min((currentPageGroup + 1) * pagesPerGroup, totalPages);
        let pageNumbers = [];
        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }
        return pageNumbers;
    };

    const getGroupRange = () => {
        const startPage = currentPageGroup * pagesPerGroup + 1;
        const endPage = Math.min((currentPageGroup + 1) * pagesPerGroup, totalPages);
        return `${startPage}–${endPage}`;
    };

    if (loading) return (
        <div className='flex justify-center items-center h-screen'>
            <h1 className='text-3xl font-semibold'>Жуктолуудо...</h1>
        </div>
    );
    if (error) return <p className="text-red-500">Error: {error}</p>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Суйломдор</h1>
            <table className="min-w-full border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border border-gray-300 px-4 py-2">ID</th>
                        <th className="border border-gray-300 px-4 py-2">Text</th>
                    </tr>
                </thead>
                <tbody>
                    {sentences.map((sentence) => (
                        <tr
                            key={sentence.id}
                            className={`border border-gray-300 px-4 py-2 ${
                                sentence.is_corrected ? 'bg-green-200 hover:bg-green-300': 'bg-red-100 hover:bg-red-200'
                            } cursor-pointer`}
                            onClick={() => navigate(`/sentence/${sentence.id}`)}
                        >
                            <td className="border border-gray-300 px-4 py-2">{sentence.id}</td>
                            <td className="border border-gray-300 px-4 py-2">{sentence.text}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex justify-center items-center gap-4 mt-4">
                <button
                    onClick={handlePrevPage}
                    disabled={page === 1}
                    className={`px-4 py-2 rounded ${
                        page === 1 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 text-white'
                    }`}
                >
                    Previous
                </button>
                <button
                    onClick={() => handleGroupChange('prev')}
                    disabled={currentPageGroup === 0}
                    className={`px-4 py-2 rounded ${
                        currentPageGroup === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 text-white'
                    }`}
                >
                    &lt;&lt;
                </button>
                {getPageNumbers().map((pageNumber) => (
                    <button
                        key={pageNumber}
                        onClick={() => handlePageClick(pageNumber)}
                        className={`px-4 py-2 rounded ${
                            page === pageNumber
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-300 hover:bg-gray-400 text-black'
                        }`}
                    >
                        {pageNumber}
                    </button>
                ))}
                <button
                    onClick={() => handleGroupChange('next')}
                    disabled={(currentPageGroup + 1) * pagesPerGroup >= totalPages}
                    className={`px-4 py-2 rounded ${
                        (currentPageGroup + 1) * pagesPerGroup >= totalPages
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-blue-500 hover:bg-blue-600 text-white'
                    }`}
                >
                    &gt;&gt;
                </button>
                <button
                    onClick={handleNextPage}
                    disabled={page === totalPages}
                    className={`px-4 py-2 rounded ${
                        page === totalPages ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 text-white'
                    }`}
                >
                    Next
                </button>
            </div>
            
        </div>
    );
}

export default SentenceList;
