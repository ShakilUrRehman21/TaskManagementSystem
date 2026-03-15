import api from './api';
import { LoginDTO, RegisterDTO } from '../types/auth';

export const login = async (data: LoginDTO) => {
  const response = await api.post('/auth/login', data);
  if (response.data.success) {
    localStorage.setItem('accessToken', response.data.data.accessToken);
  }
  return response.data;
};

export const register = async (data: RegisterDTO) => {
  const response = await api.post('/auth/register', data);
  if (response.data.success) {
    localStorage.setItem('accessToken', response.data.data.accessToken);
  }
  return response.data;
};

export const logout = async () => {
  await api.post('/auth/logout');
  localStorage.removeItem('accessToken');
  window.location.href = '/login';
};
