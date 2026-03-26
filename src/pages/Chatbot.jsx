import { useState, useRef, useEffect } from 'react';
import { MessageSquare, Mic, Send, Bot, User, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Chatbot = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: 'नमस्ते! मैं आपका कृषि सहायक हूँ। मैं आपकी कैसे मदद कर सकता हूँ?', sender: 'bot', time: '10:00 AM' },
    { id: 2, text: 'Hello! I am your AI Agri-Assistant. How can I help you today?', sender: 'bot', time: '10:00 AM' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    const userMsg = { id: Date.now(), text: input, sender: 'user', time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);
    
    // Mock bot response
    setTimeout(() => {
      const botMsg = { 
        id: Date.now() + 1, 
        text: 'Based on current weather, it is recommended to delay watering by 2 days. (वर्तमान मौसम के अनुसार 2 दिन बाद सिंचाई करना बेहतर होगा।)', 
        sender: 'bot', 
        time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) 
      };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] max-w-4xl mx-auto bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-border bg-card/50 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
              <Bot className="text-primary w-6 h-6" />
            </div>
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-background rounded-full"></span>
          </div>
          <div>
            <h2 className="font-bold text-foreground">Kisan AI Mitra</h2>
            <p className="text-xs text-muted-foreground">Always Online • Hindi / English</p>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/10 scroll-smooth">
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={msg.id}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex space-x-2 max-w-[80%] ${msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.sender === 'user' ? 'bg-secondary text-secondary-foreground' : 'bg-primary/20 text-primary'}`}>
                  {msg.sender === 'user' ? <User size={16} /> : <Bot size={16} />}
                </div>
                <div>
                  <div className={`p-3 rounded-2xl ${
                    msg.sender === 'user' 
                      ? 'bg-primary text-primary-foreground rounded-tr-none' 
                      : 'bg-card border border-border rounded-tl-none shadow-sm text-foreground'
                  }`}>
                    {msg.text}
                  </div>
                  <div className={`text-[10px] text-muted-foreground mt-1 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                    {msg.time}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          {isTyping && (
             <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex justify-start"
            >
               <div className="flex space-x-2 max-w-[80%]">
                 <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0">
                   <Bot size={16} />
                 </div>
                 <div className="p-4 bg-card border border-border rounded-2xl rounded-tl-none shadow-sm flex items-center space-x-2">
                   <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce"></div>
                   <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                   <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                 </div>
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Input Area */}
      <div className="p-4 bg-card border-t border-border">
        <form onSubmit={handleSend} className="flex space-x-2">
          <button type="button" className="p-3 text-muted-foreground hover:bg-secondary hover:text-foreground rounded-xl transition-colors">
            <Mic size={20} />
          </button>
          <input 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about crops, diseases, or weather... (हिंदी / English)"
            className="flex-1 bg-background border border-border rounded-xl px-4 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
          <button 
            type="submit"
            disabled={!input.trim()}
            className="p-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center w-12 h-12"
          >
            {isTyping ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} className="ml-0.5" />}
          </button>
        </form>
      </div>
    </div>
  );
};
