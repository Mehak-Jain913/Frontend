import { useWeather } from '../hooks/useWeather';
import { motion } from 'framer-motion';
import { ThermometerSun, Droplet, CloudRain, Wind } from 'lucide-react';

export const Weather = () => {
  const { data, loading, error } = useWeather();

  if (loading) return <div className="p-8 text-center text-muted-foreground animate-pulse">Loading weather data...</div>;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Weather Advisory</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Real-time local conditions to help you protect your crops.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <WeatherCard title="Temperature" value={data?.temperature} icon={<ThermometerSun className="text-orange-500" size={32} />} />
        <WeatherCard title="Humidity" value={data?.humidity} icon={<Droplet className="text-cyan-500" size={32} />} />
        <WeatherCard title="Rainfall" value={data?.rainfall} icon={<CloudRain className="text-blue-500" size={32} />} />
        <WeatherCard title="Wind Speed" value={data?.windSpeed} icon={<Wind className="text-gray-400" size={32} />} />
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 rounded-xl shadow-md relative overflow-hidden">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Upcoming 5-Day Forecast</h3>
        <div className="overflow-x-auto pb-4">
            <div className="flex space-x-4 min-w-max">
            {[...Array(5)].map((_, i) => (
                <div key={i} className="flex flex-col items-center bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 w-32 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <span className="text-sm text-gray-500 dark:text-gray-400 mb-2">Day {i + 1}</span>
                <CloudRain className="text-blue-500 mb-2" size={24} />
                <span className="font-semibold text-gray-900 dark:text-white">{26 + i}°C</span>
                <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">60% Rain</span>
                </div>
            ))}
            </div>
        </div>
      </div>
    </motion.div>
  );
};

const WeatherCard = ({ title, value, icon }) => (
  <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-800 relative overflow-hidden group">
    <div className="relative z-10 flex justify-between items-start">
      <div>
        <h4 className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1">{title}</h4>
        <p className="text-3xl font-bold text-gray-900 dark:text-white">{value || '--'}</p>
      </div>
      <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-xl group-hover:scale-110 transition-transform">
        {icon}
      </div>
    </div>
  </div>
);
