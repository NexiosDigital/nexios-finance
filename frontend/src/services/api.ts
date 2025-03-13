import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
});

export const authService = {
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },
  register: async (userData: any) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },
  logout: () => {
    localStorage.removeItem('accessToken');
  }
};

export const transactionService = {
  getAll: async () => {
    const response = await api.get('/transactions');
    return response.data;
  },
  getById: async (id: string) => {
    const response = await api.get(`/transactions/${id}`);
    return response.data;
  },
  create: async (transaction: any) => {
    const response = await api.post('/transactions', transaction);
    return response.data;
  },
  update: async (id: string, transaction: any) => {
    const response = await api.put(`/transactions/${id}`, transaction);
    return response.data;
  },
  delete: async (id: string) => {
    const response = await api.delete(`/transactions/${id}`);
    return response.data;
  }
};

export default api;