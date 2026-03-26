import { useState, useEffect } from 'react';
import { getMarketPrices } from '../services/api';

const mockMarket = [
  { id: 1, crop: 'Wheat', price: '₹2,125 / Qtl', location: 'Punjab', trend: 'up' },
  { id: 2, crop: 'Rice', price: '₹1,940 / Qtl', location: 'Haryana', trend: 'down' },
  { id: 3, crop: 'Cotton', price: '₹6,080 / Qtl', location: 'Gujarat', trend: 'stable' },
  { id: 4, crop: 'Sugarcane', price: '₹315 / Qtl', location: 'UP', trend: 'up' },
  { id: 5, crop: 'Maize', price: '₹1,962 / Qtl', location: 'Bihar', trend: 'up' }
];

export const useMarket = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMarket = async () => {
      try {
        const responseData = await getMarketPrices();
        setData(responseData);
      } catch (err) {
        console.warn('API error, using mock data for market prices', err);
        setData(mockMarket);
        setError('Using mock data');
      } finally {
        setLoading(false);
      }
    };
    fetchMarket();
  }, []);

  return { data, loading, error };
};
