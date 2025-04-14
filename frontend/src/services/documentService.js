import axios from 'axios';

const API_URL = 'http://localhost:5000/api/documents';

const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
};

export const getDocuments = async () => {
    try {
        const { data } = await axios.get(API_URL, { headers: getAuthHeaders() });
        return data;
    } catch (error) {
        throw error;
    }
};

export const getDocumentById = async (id) => {
    try {
        const { data } = await axios.get(`${API_URL}/${id}`, { headers: getAuthHeaders() });
        return data;
    } catch (error) {
        throw error;
    }
};

export const updateDocument = async (id, documentData) => {
    try {
        const { data } = await axios.put(`${API_URL}/${id}`, documentData, { headers: getAuthHeaders() });
        return data;
    } catch (error) {
        throw error;
    }
};

export const deleteDocument = async (id) => {
    try {
        const { data } = await axios.delete(`${API_URL}/${id}`, { headers: getAuthHeaders() });
        return data;
    } catch (error) {
        throw error;
    }
};
