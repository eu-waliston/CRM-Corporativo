import axios from 'axios';
import mockApi from './mock';

const useMock = process.env.REACT_APP_USE_MOCK === 'true';

const api = axios.create({
  baseURL: useMock
    ? null // não usa axios
    : process.env.REACT_APP_API_URL ||
      (process.env.NODE_ENV === 'development'
        ? 'http://localhost:5000/api'
        : undefined),
});

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


const isDevelopment = process.env.NODE_ENV === 'development';

// API wrapper que usa mock em desenvolvimento
const apiWrapper = {
  // ========== POST ==========
  post: async (url, data) => {
    if (isDevelopment) {
      console.log(`Mock POST ${url}:`, data);

      // Rotas específicas do mock
      if (url === '/auth/login') {
        return { data: await mockApi.login(data) };
      }
      if (url === '/leads') {
        return { data: await mockApi.createLead(data) };
      }
      if (url === '/contacts') {
        return { data: await mockApi.createContact(data) };
      }
      if (url === '/deals') {
        return { data: await mockApi.createDeal(data) };
      }
    }

    // Para produção ou rotas não mockadas
    console.warn(`POST ${url} não implementado no mock`);
    return Promise.reject(new Error('Endpoint não implementado'));
  },

  // ========== GET ==========
  get: async (url, config = {}) => {
    if (isDevelopment) {
      console.log(`Mock GET ${url}:`, config.params);

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
      if (url === '/dashboard/stats') {
        return { data: await mockApi.getDashboardStats() };
      }
      if (url === '/reports') {
        return { data: await mockApi.getReports(config.params) };
      }
    }

    // Para produção ou rotas não mockadas
    console.warn(`GET ${url} não implementado no mock`);
    return Promise.reject(new Error('Endpoint não implementado'));
  },

  // ========== PUT ==========
  put: async (url, data) => {
    if (isDevelopment) {
      console.log(`Mock PUT ${url}:`, data);

      // Rotas específicas do mock
      if (url.startsWith('/leads/')) {
        const id = url.split('/')[2];
        return { data: await mockApi.updateLead(id, data) };
      }
      if (url.startsWith('/contacts/')) {
        const id = url.split('/')[2];
        return { data: await mockApi.updateContact(id, data) };
      }
      if (url.startsWith('/deals/')) {
        const id = url.split('/')[2];
        return { data: await mockApi.updateDeal(id, data) };
      }
    }

    // Para produção ou rotas não mockadas
    console.warn(`PUT ${url} não implementado no mock`);
    return Promise.reject(new Error('Endpoint não implementado'));
  },

  // ========== DELETE ==========
  delete: async (url) => {
    if (isDevelopment) {
      console.log(`Mock DELETE ${url}`);

      // Rotas específicas do mock
      if (url.startsWith('/leads/')) {
        const id = url.split('/')[2];
        return { data: await mockApi.deleteLead(id) };
      }
      if (url.startsWith('/contacts/')) {
        const id = url.split('/')[2];
        return { data: await mockApi.deleteContact(id) };
      }
      if (url.startsWith('/deals/')) {
        const id = url.split('/')[2];
        return { data: await mockApi.deleteDeal(id) };
      }
    }

    // Para produção ou rotas não mockadas
    console.warn(`DELETE ${url} não implementado no mock`);
    return Promise.reject(new Error('Endpoint não implementado'));
  },

  // ========== PATCH ==========
  patch: async (url, data) => {
    if (isDevelopment) {
      console.log(`Mock PATCH ${url}:`, data);

      // Rotas específicas do mock
      if (url.includes('/stage')) {
        const id = url.split('/')[2];
        return { data: await mockApi.updateDealStage(id, data.stage) };
      }
    }

    // Para produção ou rotas não mockadas
    console.warn(`PATCH ${url} não implementado no mock`);
    return Promise.reject(new Error('Endpoint não implementado'));
  },
};

export default apiWrapper;