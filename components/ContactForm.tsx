
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Check, Copy } from 'lucide-react';

const phrases = [
  { p1: "Let's build", p2: "something." },
  { p1: "Tell me", p2: "your vision." },
  { p1: "Lets start", p2: "today." }
];

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [index, setIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % phrases.length);
    }, 14000); 
    return () => clearInterval(timer);
  }, []);

  const handleCopyEmail = () => {
    const email = "bianchinmauro2.0@gmail.com";
    navigator.clipboard.writeText(email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const subject = `Message from ${formData.name}`;
    const body = `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`;
    const mailtoUrl = `mailto:bianchinmauro2.0@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    window.location.href = mailtoUrl;
    
    setTimeout(() => {
      setIsSubmitting(false);
      setFormData({ name: '', email: '', message: '' });
    }, 1000);
  };

  return (
    <section id="contact" className="px-6 py-32 md:px-12 lg:px-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
        <div>
          <span className="text-[10px] font-black tracking-[0.4em] uppercase text-[#9333EA] block mb-6">Get in touch</span>
          
          <div className="h-[120px] md:h-[160px]">
            <AnimatePresence mode="wait">
              <motion.h2 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 leading-[0.9]"
              >
                {phrases[index].p1} <br />
                <span className="text-zinc-200 italic">{phrases[index].p2}</span>
              </motion.h2>
            </AnimatePresence>
          </div>
          
          <div className="flex flex-col gap-10 mt-16">
            <div className="group relative">
              <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400 block mb-2">Direct Contact </span>
              <button 
                onClick={handleCopyEmail}
                className="md:text-2xl text-md font-bold hover:text-[#9333EA] transition-colors flex items-center gap-3 group/link"
              >
                bianchinmauro2.0@gmail.com
                <div className="relative">
                  <AnimatePresence mode="wait">
                    {copied ? (
                      <motion.div
                        key="check"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                      >
                        <Check size={20} className="text-green-500" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="copy"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 0.3 }}
                        className="group-hover/link:opacity-100"
                      >
                        <Copy size={18} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  {copied && (
                    <motion.span 
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 20 }}
                      className="absolute left-full top-1/2 -translate-y-1/2 text-[10px] font-black uppercase tracking-widest text-green-500 whitespace-nowrap"
                    >
                      Copied!
                    </motion.span>
                  )}
                </div>
              </button>
            </div>
            
            <div className="p-8 bg-zinc-50 border border-zinc-100 rounded-2xl max-w-sm">
              <p className="text-zinc-500 font-medium leading-relaxed">
                Currently based in Belgium. Available for work, worldwide collaborations and freelance projects.
              </p>
            </div>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-[9px] font-bold uppercase tracking-widest text-zinc-400 ml-4">Full Name</label>
              <input 
                required
                type="text" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Tyler Durden"
                className="bg-zinc-50 border-2 border-transparent focus:border-zinc-200 focus:bg-white rounded-2xl p-6 outline-none transition-all text-sm font-semibold"
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-[9px] font-bold uppercase tracking-widest text-zinc-400 ml-4">Email Address</label>
              <input 
                required
                type="email" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="design@studio.com"
                className="bg-zinc-50 border-2 border-transparent focus:border-zinc-200 focus:bg-white rounded-2xl p-6 outline-none transition-all text-sm font-semibold"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[9px] font-bold uppercase tracking-widest text-zinc-400 ml-4">Your message</label>
              <textarea 
                required
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                placeholder="Tell me about your vision..."
                className="bg-zinc-50 border-2 border-transparent focus:border-zinc-200 focus:bg-white rounded-2xl p-6 outline-none transition-all text-sm font-semibold resize-none"
              />
            </div>

            <button 
              type="submit"
              disabled={isSubmitting}
              className="bg-black text-white rounded-2xl py-6 px-10 text-[11px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-4 hover:bg-[#9333EA] hover:shadow-2xl hover:shadow-purple-500/20 transition-all active:scale-95 disabled:opacity-50 mt-4"
            >
              {isSubmitting ? 'Opening Mail Client...' : 'Launch Message'}
              <Send size={16} />
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactForm;