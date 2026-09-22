import api from './api';

export const getFeaturedDestinations = async (limit = 4) => {
  const { data } = await api.get('/destinations', { params: { featured: true, limit } });
  return data.data;
};

export const getDestinations = async (params = {}) => {
  const { data } = await api.get('/destinations', { params });
  return data;
};

export const getDestinationBySlug = async (slugOrId) => {
  const { data } = await api.get(`/destinations/${slugOrId}`);
  return data.data;
};

// Admin-only.
export const createDestination = async (payload) => {
  const { data } = await api.post('/destinations', payload);
  return data.data;
};

export const updateDestination = async (id, payload) => {
  const { data } = await api.put(`/destinations/${id}`, payload);
  return data.data;
};

export const deleteDestination = async (id) => {
  const { data } = await api.delete(`/destinations/${id}`);
  return data.data;
};
