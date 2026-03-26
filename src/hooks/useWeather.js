import { useState, useEffect } from 'react';
import { getWeather } from '../services/api';

const mockWeather = {
  temperature: '28°C',
  humidity: '65%',
  rainfall: '120mm / month',
  windSpeed: '14 km/h'
};

export const useWeather = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const responseData = await getWeather();
        setData(responseData);
      } catch (err) {
        console.warn('API error, using mock data for weather', err);
        setData(mockWeather);
        setError('Using mock data');
      } finally {
        setLoading(false);
      }
    };
    fetchWeather();
  }, []);

  return { data, loading, error };
};
