import api from './api';

export const authService = {
  login: async (username, password) => {
    const response = await api.post('/token/', { username, password });
    if (response.data.access) {
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
    }
    return response.data;
  },
  
  register: async (username, email, password) => {
    return await api.post('/travel/register/', { username, email, password });
  },

  logout: () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }
};