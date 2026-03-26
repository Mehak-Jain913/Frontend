import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Leaf, Sprout, DollarSign, ArrowUpRight } from 'lucide-react';

export const Recommend = () => {
  const [formData, setFormData] = useState({
    location: '',
    soilType: 'alluvial',
    landArea: '',
    season: 'kharif'
  });
  
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulating API Call
    try {
      await new Promise(r => setTimeout(r, 1500)); // fake delay
      setResult({
        crop: 'Wheat',
        yield: '4,200 Kg',
        profit: '₹88,000',
        mixFarming: {
          suggestion: 'Wheat + Mustard',
          benefit: 'Higher Profit & Pest Control',
          profitIncrease: '₹18,000 Extra'
        }
      });
      toast.success('Recommendation generated successfully!');
    } catch (err) {
      toast.error('Failed to get recommendation');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-6xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-green-700 dark:text-green-500">
        AI Crop Recommendation
      </h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 rounded-xl shadow-md space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium mb-1 inline-block text-gray-500 dark:text-gray-400">Location (City/District)</label>
              <input 
                required
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. Pune"
                className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white p-3 rounded-xl focus:ring-2 focus:ring-green-600 focus:border-green-600 outline-none transition-all placeholder:text-gray-400" 
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-gray-500 dark:text-gray-400">Soil Type</label>
              <select 
                name="soilType"
                value={formData.soilType}
                onChange={handleChange}
                className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white p-3 rounded-xl focus:ring-2 focus:ring-green-600 focus:border-green-600 outline-none transition-all"
              >
                <option value="alluvial">Alluvial</option>
                <option value="black">Black</option>
                <option value="red">Red</option>
                <option value="laterite">Laterite</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-gray-500 dark:text-gray-400">Land Area (Acres)</label>
              <input 
                required
                type="number"
                name="landArea"
                value={formData.landArea}
                onChange={handleChange}
                placeholder="e.g. 5"
                className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white p-3 rounded-xl focus:ring-2 focus:ring-green-600 focus:border-green-600 outline-none transition-all placeholder:text-gray-400" 
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-medium mb-1 text-gray-500 dark:text-gray-400">Season</label>
              <select 
                name="season"
                value={formData.season}
                onChange={handleChange}
                className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white p-3 rounded-xl focus:ring-2 focus:ring-green-600 focus:border-green-600 outline-none transition-all"
              >
                <option value="kharif">Kharif (Monsoon)</option>
                <option value="rabi">Rabi (Winter)</option>
                <option value="zaid">Zaid (Summer)</option>
              </select>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 rounded-xl transition-all shadow-md flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed text-lg mt-4"
          >
            {loading ? <span className="animate-pulse">Analyzing Soil & Climate...</span> : 'Generate Farm Plan'}
          </button>
        </form>

        <div className="h-full flex flex-col justify-center">
          {result ? (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <div className="bg-white dark:bg-gray-900 border border-green-200 dark:border-gray-800 p-8 rounded-xl relative overflow-hidden shadow-md">
                <div className="absolute -right-10 -top-10 text-green-100 dark:text-gray-800 pointer-events-none">
                  <Leaf size={150} />
                </div>
                <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white relative z-10 flex items-center">
                  <span className="w-2 h-6 bg-green-600 rounded-full mr-3"></span> Main Crop Analysis
                </h2>
                
                <div className="space-y-6 relative z-10">
                  <div className="flex items-center space-x-5 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 flex-wrap gap-y-4 shadow-sm">
                    <div className="flex-1 min-w-[120px]">
                      <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center mb-1"><Leaf size={14} className="mr-1 text-green-600"/> Top Match</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">{result.crop}</p>
                    </div>
                    <div className="w-px h-12 bg-gray-300 dark:bg-gray-600 hidden sm:block"></div>
                    <div className="flex-1 min-w-[120px]">
                      <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center mb-1"><Sprout size={14} className="mr-1 text-blue-500"/> Expected Yield</p>
                      <p className="text-xl font-bold text-gray-900 dark:text-white">{result.yield}</p>
                    </div>
                    <div className="w-px h-12 bg-gray-300 dark:bg-gray-600 hidden sm:block"></div>
                    <div className="flex-1 min-w-[120px]">
                      <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center mb-1"><DollarSign size={14} className="mr-1 text-green-500"/> Base Profit</p>
                      <p className="text-xl font-bold text-gray-900 dark:text-white">{result.profit}</p>
                    </div>
                  </div>
                </div>
              </div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }} 
                animate={{ opacity: 1, scale: 1 }} 
                transition={{ delay: 0.2 }}
                className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 rounded-xl shadow-md relative overflow-hidden group hover:border-amber-500 transition-colors"
              >
                
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="inline-block px-3 py-1 bg-amber-500 text-white dark:bg-amber-600 text-xs font-bold rounded-full uppercase tracking-widest mb-2 shadow-sm">
                      Mix Farming Strategy
                    </span>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{result.mixFarming.suggestion}</h3>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-gray-800 flex items-center justify-center text-amber-500">
                    <ArrowUpRight size={20} />
                  </div>
                </div>
                
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 leading-relaxed">
                  Grow {result.mixFarming.suggestion} together to maximize land usage, reduce pest attack risks naturally, and secure a higher ROI.
                </p>
                
                <div className="flex items-center space-x-2 text-sm font-semibold text-green-700 dark:text-green-400 bg-green-100 dark:bg-gray-800 p-3 rounded-xl border border-green-300 dark:border-gray-700">
                  <DollarSign size={16} />
                  <span>Profit Potential: +{result.mixFarming.profitIncrease}</span>
                </div>
              </motion.div>
            </motion.div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-500 dark:text-gray-400 p-12 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900">
              <div className="w-20 h-20 bg-green-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6">
                <Leaf size={32} className="text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Awaiting Input</h3>
              <p className="text-center max-w-sm">Enter your land details and soil type to generate an AI-optimized farming plan with profit predictions.</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
