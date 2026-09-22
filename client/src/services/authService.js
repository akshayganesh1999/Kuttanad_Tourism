import api from './api';

export const login = async (credentials) => {
  const { data } = await api.post('/auth/login', credentials);
  return data.data; // { user, token }
};

export const register = async (payload) => {
  const { data } = await api.post('/auth/register', payload);
  return data.data; // { user, token }
};

export const getMe = async () => {
  const { data } = await api.get('/auth/me');
  return data.data.user;
};
