import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getSentences } from '../services/api';
import { FaPen } from "react-icons/fa";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";
import { FaCircleXmark } from "react-icons/fa6";
import { BiSolidDetail } from "react-icons/bi";




function SentenceList() {
    const navigate = useNavigate();
    const location = useLocation();
    const [sentences, setSentences] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1); // Текущая страница
    const [totalPages, setTotalPages] = useState(0); // Общее количество страниц
    const [currentPageGroup, setCurrentPageGroup] = useState(0); // Текущая группа страниц

    const pageSize = 16; // Количество записей на странице
    const pagesPerGroup = 10; // Количество страниц в одной группе

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const pageFromUrl = parseInt(searchParams.get('page')) || 1;
        setPage(pageFromUrl);
    
        // Запрашиваем данные с сервера
        async function fetchData() {
            try {
                setLoading(true);
                const response = await getSentences(pageFromUrl, pageSize);
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
    }, [location.search, pageSize]); // Зависит от location.search и pageSize
    

    useEffect(() => {
        setCurrentPageGroup(Math.floor((page - 1) / pagesPerGroup)); // Update page group based on current page
    }, [page]);

    const handleNextPage = () => {
        if (page < totalPages) {
            const nextPage = page + 1;
            setPage(nextPage);
            navigate(`/sentence-list?page=${nextPage}`); // Обновление URL
        }
    };

    const handlePrevPage = () => {
        if (page > 1) {
            const prevPage = page - 1;
            setPage(prevPage);
            navigate(`/sentence-list?page=${prevPage}`); // Обновление URL
        }
    };

    const handlePageClick = (pageNumber) => {
        setPage(pageNumber);
        navigate(`/sentence-list?page=${pageNumber}`); // Обновление URL
    };

    const handleGroupChange = (direction) => {
        if (direction === 'next' && (currentPageGroup + 1) * pagesPerGroup < totalPages) {
            // Если переходим на следующую декаду, устанавливаем первую страницу следующей декады
            setPage((currentPageGroup + 1) * pagesPerGroup + 1);
            navigate(`/sentence-list?page=${(currentPageGroup + 1) * pagesPerGroup + 1}`);
            setCurrentPageGroup((prev) => prev + 1);
        } else if (direction === 'prev' && currentPageGroup > 0) {
            // Если возвращаемся на предыдущую декаду, устанавливаем первую страницу текущей декады
            setPage((currentPageGroup - 1) * pagesPerGroup + 1);
            navigate(`/sentence-list?page=${(currentPageGroup - 1) * pagesPerGroup + 1}`);
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


    if (loading) return (
        <div className='flex justify-center items-center h-screen'>
            <h1 className='text-3xl font-semibold'>Жуктолуудо...</h1>
        </div>
    );
    if (error) return <p className="text-red-500">Error: {error}</p>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Суйломдор</h1>
            <div className="overflow-y-auto max-h-[60vh] sm:max-h-[60vh] md:max-h-[70vh] lg:max-h-[80vh]" >

            

            <table className="min-w-full  border-black rounded-lg overflow-hidden">
                <thead>
                    <tr className="bg-dark-purple text-white">
                        <th className=" px-4 py-2">ID</th>
                        <th className=" px-4 py-2">Текст</th>
                        <th className="px-4 py-2 w-8">Деталдар</th>
                        <th className='px-4 py-2 w-8'>Озгортуу</th>
                        <th className="px-4 py-2 w-10">Статус</th>
                    </tr>
                </thead>
                <tbody>
                    {sentences.map((sentence) => (
                        <tr 
                            key={sentence.id}
                            className={` border-black px-4 py-2 ${
                                sentence.is_corrected ? '': '' 
                            } odd:bg-white even:bg-gray-200 `}
                            
                        >
                            <td className=" px-4 py-2">{sentence.id}</td>
                            <td className=" px-4 py-2 text-black">{sentence.text}</td>
                            
                            <td  className='px-4 py-2'>
                                <div className='flex justify-center items-center' >
                                    <BiSolidDetail className="text-dark-purple text-lg cursor-pointer 
                                        hover:text-green-800 hover:transform hover:translate-y-[-2px] transition-transform duration-300"
                                        title="Деталдар"
                                        onClick={() => navigate(`/sentence/${sentence.id}`, { state: { page } })} />
                                </div>                               
                            </td>

                            <td className="px-4 py-2 flex justify-center items-center">
                                <FaPen
                                    className="text-dark-purple text-lg cursor-pointer 
                                    hover:text-green-800 hover:transform hover:translate-y-[-2px] transition-transform duration-300"
                                    title="Озгортуу"
                                    onClick={() =>navigate('/edit-sentence')}
                                />
                            </td>
                            
                            <td className="px-4 py-2 ">
                                <div className='w-[100%] flex justify-center items-center'>                               
                                    {sentence.is_corrected? <IoCheckmarkDoneCircleSharp className='text-xl text-green-700'/> : 
                                        <FaCircleXmark  className='text-red-700'/>}
                                </div>
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
            <div className="flex justify-center items-center gap-4 mt-4">
                <button
                    onClick={handlePrevPage}
                    disabled={page === 1}
                    className={`px-4 py-2 rounded ${
                        page === 1 ? 'bg-gray-400 cursor-not-allowed' : 'bg-dark-purple hover:bg-blue-950 text-white'
                    }`}
                >
                    Previous
                </button>
                <button
                    onClick={() => handleGroupChange('prev')}
                    disabled={currentPageGroup === 0}
                    className={`px-4 py-2 rounded ${
                        currentPageGroup === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-dark-purple hover:bg-blue-950 text-white'
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
                                ? 'bg-dark-purple text-white'
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
                            : 'bg-dark-purple hover:bg-blue-950 text-white'
                    }`}
                >
                    &gt;&gt;
                </button>
                <button
                    onClick={handleNextPage}
                    disabled={page === totalPages}
                    className={`px-4 py-2 rounded ${
                        page === totalPages ? 'bg-gray-400 cursor-not-allowed' : 'bg-dark-purple hover:bg-blue-950 text-white'
                    }`}
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default SentenceList;