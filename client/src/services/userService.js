import api from './api';

export const getUsers = async (params = {}) => {
  const { data } = await api.get('/users', { params });
  return data;
};

export const updateUserRole = async (id, payload) => {
  const { data } = await api.put(`/users/${id}`, payload);
  return data.data;
};

export const deleteUser = async (id) => {
  const { data } = await api.delete(`/users/${id}`);
  return data.data;
};
