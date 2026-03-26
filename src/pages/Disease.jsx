import { useState } from 'react';
import { UploadCloud, FileSearch, ShieldCheck, Bug, Search } from 'lucide-react';
import { motion } from 'framer-motion';

export const Disease = () => {
  const [image, setImage] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setAnalyzing(true);
      setResult(null);
      
      // Mock API call
      setTimeout(() => {
        setAnalyzing(false);
        setResult({
          disease: 'Leaf Blight (Puccinia triticina)',
          confidence: '94%',
          solution: 'Remove infected leaves immediately. Improve air circulation by proper spacing.',
          pesticide: 'Apply Mancozeb 75% WP @ 2g/liter of water.',
        });
      }, 2500);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in max-w-5xl mx-auto">
      <div className="flex items-center space-x-3">
        <div className="p-3 bg-destructive/10 rounded-xl">
          <Bug className="text-destructive w-8 h-8" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Disease Detection</h1>
          <p className="text-muted-foreground mt-1 text-lg">Upload an image of your crop to instantly identify diseases.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
        {/* Upload Section */}
        <div className="space-y-6">
          <label className="block w-full cursor-pointer relative group">
            <div className={`border-2 border-dashed rounded-3xl p-12 text-center transition-all duration-300 ${image ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50 hover:bg-accent/5'} bg-card aspect-video flex flex-col items-center justify-center relative overflow-hidden`}>
              {image ? (
                <>
                  <img src={image} alt="Crop" className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-20 transition-opacity" />
                  <div className="relative z-10">
                    <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <UploadCloud className="w-8 h-8 text-primary" />
                    </div>
                    <p className="font-medium text-foreground text-lg shadow-sm">Click to upload a different image</p>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                    <UploadCloud className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">Click to upload crop image</h3>
                  <p className="text-muted-foreground max-w-xs mx-auto">Upload a clear photo of the affected leaf or plant part for analysis.</p>
                </>
              )}
              <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
            </div>
          </label>
        </div>

        {/* Results Section */}
        <div>
          {analyzing ? (
            <div className="h-full flex flex-col items-center justify-center p-12 bg-card rounded-3xl border border-border shadow-sm">
              <div className="relative">
                <div className="absolute inset-0 border-4 border-primary/20 rounded-full animate-pulse"></div>
                <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                <Search className="w-10 h-10 text-primary m-6" />
              </div>
              <h3 className="text-xl font-semibold mt-6 mb-2">Analyzing Image...</h3>
              <p className="text-muted-foreground text-center">Our AI is scanning the image against thousands of known plant diseases.</p>
            </div>
          ) : result ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card rounded-3xl border border-border shadow-sm overflow-hidden h-full flex flex-col"
            >
              <div className="bg-destructive/10 p-6 border-b border-destructive/20 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <ShieldCheck className="text-destructive w-7 h-7" />
                  <h3 className="text-xl font-bold text-destructive">Disease Detected</h3>
                </div>
                <span className="bg-background px-3 py-1 rounded-full text-sm font-semibold border border-border">
                  Confidence: <span className="text-primary">{result.confidence}</span>
                </span>
              </div>
              
              <div className="p-6 space-y-6 flex-1 bg-muted/5">
                <div>
                  <p className="text-sm text-muted-foreground mb-1 uppercase tracking-wider font-semibold">Diagnosis</p>
                  <p className="text-2xl font-bold text-foreground">{result.disease}</p>
                </div>
                
                <div className="space-y-4">
                  <div className="p-4 bg-background rounded-2xl border border-border shadow-sm">
                    <p className="text-sm font-semibold text-foreground mb-2 flex items-center">
                      <span className="w-2 h-2 rounded-full bg-blue-500 mr-2"></span>
                      Treatment Plan
                    </p>
                    <p className="text-muted-foreground text-sm leading-relaxed">{result.solution}</p>
                  </div>
                  
                  <div className="p-4 bg-primary/5 rounded-2xl border border-primary/20 shadow-sm">
                    <p className="text-sm font-semibold text-primary mb-2 flex items-center">
                      <span className="w-2 h-2 rounded-full bg-primary mr-2"></span>
                      Chemical Recommendation
                    </p>
                    <p className="text-foreground font-medium text-sm leading-relaxed">{result.pesticide}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
             <div className="h-full flex flex-col items-center justify-center p-12 bg-card rounded-3xl border border-border border-dashed text-center">
              <FileSearch className="w-16 h-16 text-muted-foreground/30 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Awaiting Image</h3>
              <p className="text-muted-foreground">Upload a photo to see AI-powered disease detection results here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
