import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getWeather = async () => {
  const response = await api.get('/weather');
  return response.data;
};

export const getMarketPrices = async () => {
  const response = await api.get('/market-prices');
  return response.data;
};

export const getDashboardData = async () => {
  const response = await api.get('/dashboard');
  return response.data;
};

export const postRecommendation = async (data) => {
  const response = await api.post('/recommend', data);
  return response.data;
};

export default api;
