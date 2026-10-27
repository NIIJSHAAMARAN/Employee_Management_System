import axios from 'axios';

const api = axios.create({ baseURL: '/api' });

// Pull a readable message out of an axios error
export const errMsg = (err) =>
  err.response?.data?.message || err.message || 'Something went wrong';

export const getEmployees = (search = '') =>
  api.get('/employees', { params: { search } }).then((r) => r.data);
export const createEmployee = (data) => api.post('/employees', data).then((r) => r.data);
export const updateEmployee = (id, data) => api.put(`/employees/${id}`, data).then((r) => r.data);
export const deleteEmployee = (id) => api.delete(`/employees/${id}`).then((r) => r.data);

export const loginUser = (data) => api.post('/auth/login', data).then((r) => r.data);
export const registerUser = (data) => api.post('/auth/register', data).then((r) => r.data);
