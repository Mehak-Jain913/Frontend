import { useState } from 'react';
import { FileText, ArrowUpRight, Search, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const MOCK_SCHEMES = [
  {
    id: 1,
    name: "PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)",
    category: "Financial Support",
    benefits: "₹6,000 per year in three equal installments directly to bank accounts.",
    eligibility: "Small and marginal farmers with cultivable landholding up to 2 hectares.",
    applyLink: "#"
  },
  {
    id: 2,
    name: "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
    category: "Insurance",
    benefits: "Financial support to farmers suffering crop loss/damage arising out of unforeseen events.",
    eligibility: "All farmers including sharecroppers and tenant farmers growing notified crops.",
    applyLink: "#"
  },
  {
    id: 3,
    name: "Kisan Credit Card (KCC)",
    category: "Credit & Loans",
    benefits: "Short-term credit limits for crops and term loans with low interest rates.",
    eligibility: "Individual farmers, joint borrowers, tenant farmers, self-help groups.",
    applyLink: "#"
  },
  {
    id: 4,
    name: "Soil Health Card Scheme",
    category: "AgriTech",
    benefits: "Provides details about the soil health and recommends proper nutrients and fertilizers.",
    eligibility: "All farmers in India.",
    applyLink: "#"
  }
];

export const Schemes = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSchemes = MOCK_SCHEMES.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-primary/10 rounded-xl">
            <ShieldCheck className="text-primary w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Gov. Schemes & Support</h1>
            <p className="text-muted-foreground mt-1 text-lg">Apply for Central & State-level agricultural benefits.</p>
          </div>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search schemes..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-64 pl-10 pr-4 py-3 bg-card border border-border rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-muted-foreground/60"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        {filteredSchemes.map((scheme, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={scheme.id}
            className="bg-card hover:bg-muted/10 border border-border p-6 rounded-3xl shadow-sm hover:shadow-md transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-start mb-4">
                <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full uppercase tracking-wider">
                  {scheme.category}
                </span>
              </div>
              <h2 className="text-xl font-bold text-foreground mb-3">{scheme.name}</h2>
              
              <div className="space-y-3 mb-6">
                <div className="bg-background/80 p-3 rounded-xl border border-border/50">
                  <p className="text-sm font-semibold text-foreground flex items-center mb-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2"></span> Benefits
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{scheme.benefits}</p>
                </div>
                <div className="bg-background/80 p-3 rounded-xl border border-border/50">
                   <p className="text-sm font-semibold text-foreground flex items-center mb-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2"></span> Eligibility
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{scheme.eligibility}</p>
                </div>
              </div>
            </div>
            
            <button 
              className="w-full sm:w-auto self-start mt-auto flex items-center justify-center space-x-2 bg-foreground text-background font-semibold py-3 px-6 rounded-xl transition-all hover:bg-foreground/90 hover:scale-105 active:scale-95"
            >
              <span>Apply / View Details</span>
              <FileText size={18} />
            </button>
          </motion.div>
        ))}

        {filteredSchemes.length === 0 && (
          <div className="col-span-full py-12 text-center text-muted-foreground bg-card border border-border border-dashed rounded-3xl">
            <ShieldCheck className="w-16 h-16 mx-auto mb-4 opacity-50 text-primary" />
            <p className="text-lg font-medium text-foreground">No schemes found matching '{searchTerm}'.</p>
            <p className="text-sm mt-1">Try searching for insurance, financial, etc.</p>
          </div>
        )}
      </div>
    </div>
  );
};
