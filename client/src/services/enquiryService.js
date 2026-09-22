import api from './api';

export const createEnquiry = async (payload) => {
  const { data } = await api.post('/enquiries', payload);
  return data.data;
};

export const getMyEnquiries = async (params = {}) => {
  const { data } = await api.get('/enquiries/my', { params });
  return data;
};

// Admin-only.
export const listEnquiries = async (params = {}) => {
  const { data } = await api.get('/enquiries', { params });
  return data;
};

export const updateEnquiryStatus = async (id, payload) => {
  const { data } = await api.put(`/enquiries/${id}`, payload);
  return data.data;
};

export const deleteEnquiry = async (id) => {
  const { data } = await api.delete(`/enquiries/${id}`);
  return data.data;
};
