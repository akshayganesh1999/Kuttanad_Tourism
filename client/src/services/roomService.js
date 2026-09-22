import api from './api';

export const getRoomsByProperty = async (propertyId) => {
  const { data } = await api.get('/rooms', { params: { property: propertyId, limit: 50 } });
  return data.data;
};

// Admin-only.
export const getRooms = async (params = {}) => {
  const { data } = await api.get('/rooms', { params });
  return data;
};

export const getRoomById = async (id) => {
  const { data } = await api.get(`/rooms/${id}`);
  return data.data;
};

export const createRoom = async (payload) => {
  const { data } = await api.post('/rooms', payload);
  return data.data;
};

export const updateRoom = async (id, payload) => {
  const { data } = await api.put(`/rooms/${id}`, payload);
  return data.data;
};

export const deleteRoom = async (id) => {
  const { data } = await api.delete(`/rooms/${id}`);
  return data.data;
};
