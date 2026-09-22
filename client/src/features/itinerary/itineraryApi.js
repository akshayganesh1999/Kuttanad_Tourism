import api from '../../services/api';

export const createItinerary = async (payload) => {
  const { data } = await api.post('/itineraries', payload);
  return data.data;
};

export const getMyItineraries = async (params = {}) => {
  const { data } = await api.get('/itineraries', { params });
  return data;
};

export const getItineraryById = async (id) => {
  const { data } = await api.get(`/itineraries/${id}`);
  return data.data;
};
