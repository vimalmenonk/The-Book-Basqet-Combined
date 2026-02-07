import { apiRequest } from './apiClient';

export const loginRequest = async (email, password) => {
  return apiRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  });
};

export const registerRequest = async (name, email, password) => {
  return apiRequest('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ name, email, password })
  });
};
