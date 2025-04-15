import api from './api';

export async function fetchUserRanking() {
  const response = await api.get('/recycling-items/ranking');
  return response.data;
}
