import api from './api';

export const getFeaturedActivities = async (limit = 4) => {
  const { data } = await api.get('/activities', { params: { featured: true, limit } });
  return data.data;
};

export const getActivities = async (params = {}) => {
  const { data } = await api.get('/activities', { params });
  return data;
};

export const getActivityBySlug = async (slugOrId) => {
  const { data } = await api.get(`/activities/${slugOrId}`);
  return data.data;
};

// Admin-only.
export const createActivity = async (payload) => {
  const { data } = await api.post('/activities', payload);
  return data.data;
};

export const updateActivity = async (id, payload) => {
  const { data } = await api.put(`/activities/${id}`, payload);
  return data.data;
};

export const deleteActivity = async (id) => {
  const { data } = await api.delete(`/activities/${id}`);
  return data.data;
};
