import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000';

export async function getSentences(page = 1, size = 10) {
    try {
        const response = await fetch(`http://127.0.0.1:8000/sentences?page=${page}&size=${size}`);
        if (!response.ok) {
            throw new Error('Failed to fetch sentences');
        }
        return await response.json();
    } catch (error) {
        console.error("API fetch error:", error);
        throw error;
    }
}

export const getSentenceById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/sentences/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching sentence:', error);
        throw error;
    }
};

export const createSentence = async (sentenceData) => {
    try {
        const response = await axios.post(`${API_URL}/sentences`, sentenceData);
        return response.data;
    } catch (error) {
        console.error('Error creating sentence:', error);
        throw error;
    }
};

export const updateSentence = async (id, sentenceData) => {
    try {
        const response = await axios.put(`${API_URL}/sentences/${id}`, sentenceData);
        return response.data;
    } catch (error) {
        console.error('Error updating sentence:', error);
        throw error;
    }
};
