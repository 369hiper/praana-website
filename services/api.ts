import axios from 'axios';

// Create axes instance with base URL pointing to the backend
const api = axios.create({
    baseURL: 'http://localhost:5000/api', // Update this if you deploy backend elsewhere
    headers: {
        'Content-Type': 'application/json',
    },
});

export const createOrder = async (orderData: any) => {
    try {
        const response = await api.post('/orders', orderData);
        return response.data;
    } catch (error) {
        console.error('API Error createOrder:', error);
        throw error;
    }
};

export default api;
