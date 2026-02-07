import axios from 'axios';
import mockApi from './mock';

const api = axios.create({
  baseURL:
    process.env.REACT_APP_API_URL ??
    (process.env.NODE_ENV === 'development'
      ? 'http://localhost:5000/api'
      : undefined),
});

// Função para verificar se estamos em desenvolvimento
const isDevelopment = process.env.NODE_ENV === 'development';

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Wrapper da API que usa mock em desenvolvimento
const apiWrapper = {
  // Autenticação
  post: async (url, data) => {
    if (isDevelopment) {
      // Rotas específicas do mock
      if (url === '/auth/login') {
        return { data: await mockApi.login(data) };
      }
      // Para outras rotas POST, simula com axios
    }
    return api.post(url, data);
  },

  get: async (url, config = {}) => {
    if (isDevelopment) {
      // Rotas específicas do mock
      if (url === '/leads') {
        return { data: await mockApi.getLeads(config.params) };
      }
      if (url === '/contacts') {
        return { data: await mockApi.getContacts(config.params) };
      }
      if (url === '/deals') {
        return { data: await mockApi.getDeals(config.params) };
      }
      // Para outras rotas GET, simula com axios
    }
    return api.get(url, config);
  },

  put: async (url, data) => {
    if (isDevelopment) {
      // Rotas específicas do mock
      if (url.startsWith('/leads/')) {
        const id = url.split('/')[2];
        return { data: await mockApi.updateLead(id, data) };
      }
      // Para outras rotas PUT, simula com axios
    }
    return api.put(url, data);
  },

  delete: async (url) => {
    if (isDevelopment) {
      // Rotas específicas do mock
      if (url.startsWith('/leads/')) {
        const id = url.split('/')[2];
        return { data: await mockApi.deleteLead(id) };
      }
      // Para outras rotas DELETE, simula com axios
    }
    return api.delete(url);
  },

  patch: async (url, data) => {
    if (isDevelopment) {
      // Rotas específicas do mock
      if (url.includes('/stage')) {
        const id = url.split('/')[2];
        return { data: await mockApi.updateDealStage(id, data.stage) };
      }
      // Para outras rotas PATCH, simula com axios
    }
    return api.patch(url, data);
  },
};

export default apiWrapper;