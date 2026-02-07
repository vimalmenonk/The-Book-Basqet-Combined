import { apiRequest } from './apiClient';

export const fetchCart = async (token) =>
  apiRequest('/cart', { method: 'GET', token, requiresAuth: true });

export const addCartItem = async (bookId, quantity, token) =>
  apiRequest('/cart/items', {
    method: 'POST',
    body: JSON.stringify({ bookId, quantity }),
    token,
    requiresAuth: true
  });

export const removeCartItem = async (cartItemId, token) =>
  apiRequest(`/cart/items/${cartItemId}`, { method: 'DELETE', token, requiresAuth: true });
