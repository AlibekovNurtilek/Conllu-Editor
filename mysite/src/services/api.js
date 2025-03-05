import axios from 'axios';

const API_URL = 'https://tilex.home.kg';

export async function getSentences(page = 1, size = 10) {
    try {
        const response = await fetch(`${API_URL}/sentences?page=${page}&size=${size}`);
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

export const updateSentence = async (sentenceId, updatedSentence) => {
    try {
        const dataToSend = {
            updated_sentence: {
                text: updatedSentence.text
            },
            updated_tokens: updatedSentence.tokens
        };


        const response = await axios.put(`${API_URL}/sentences/${sentenceId}`, dataToSend);
        return response.data;
    } catch (error) {
        console.error('Error updating sentence:', error);
        throw error;
    }
};

