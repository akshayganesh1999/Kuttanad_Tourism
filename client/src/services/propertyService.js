import api from './api';

export const getFeaturedProperties = async (limit = 4) => {
  const { data } = await api.get('/properties', { params: { featured: true, limit } });
  return data.data;
};

export const getProperties = async (params = {}) => {
  const { data } = await api.get('/properties', { params });
  return data; // { success, message, data, pagination }
};

export const getPropertyBySlug = async (slugOrId) => {
  const { data } = await api.get(`/properties/${slugOrId}`);
  return data.data;
};

export const createProperty = async (payload) => {
  const { data } = await api.post('/properties', payload);
  return data.data;
};

export const updateProperty = async (id, payload) => {
  const { data } = await api.put(`/properties/${id}`, payload);
  return data.data;
};

export const deleteProperty = async (id) => {
  const { data } = await api.delete(`/properties/${id}`);
  return data.data;
};
