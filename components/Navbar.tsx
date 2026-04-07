
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export const LogoImage = ({ className = "w-7 h-7" }: { className?: string }) => (
  <img 
    src="https://i.allthepics.net/2025/12/29/exodia.png" 
    alt="Mauro Bianchin Logo" 
    className={`${className} object-contain`}
  />
);

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsMobileMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav className={`absolute top-0 left-0 right-0 z-50 transition-all duration-500 ${isMobileMenuOpen ? 'bg-[#F5F5F0]/95 backdrop-blur-md border-b border-black/5' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 md:py-5 md:px-12 flex justify-between items-center">
          <a 
            href="#" 
            className={`flex items-center gap-3 text-xs font-bold tracking-[0.2em] uppercase transition-colors duration-300 ${isMobileMenuOpen ? 'text-zinc-900' : 'text-white'} group z-50`}
          >
            <LogoImage className="w-8 h-8" />
            <span>MAURO <span className="group-hover:text-[#9333EA] transition-colors duration-300">BIANCHIN</span></span>
          </a>

          <div className="hidden md:flex gap-8 items-center">
            <a 
              href="#contact" 
              onClick={scrollToContact}
              className={`text-[10px] font-black uppercase tracking-[0.3em] border px-4 py-2 transition-all duration-300 border-white text-white hover:bg-[#9333EA] hover:text-white hover:border-[#9333EA]`}
            >
              Contact
            </a>
          </div>

          <button 
            className="md:hidden z-50 p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X size={24} className="text-zinc-900" />
            ) : (
              <Menu size={24} className="text-white" />
            )}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-[#F5F5F0] flex flex-col items-center justify-center p-6 md:hidden"
          >
            <div className="flex flex-col gap-12 items-center text-center">
              <a 
                href="#contact" 
                onClick={scrollToContact}
                className="text-4xl font-black uppercase tracking-tighter text-zinc-900 hover:text-[#9333EA] transition-colors"
              >
                Contact
              </a>
              
              <div className="mt-8 pt-8 border-t border-black/5 w-full max-w-[200px] flex flex-col gap-4 items-center">
                 <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-300">Get in touch</span>
                 <p className="text-xs font-bold text-zinc-400">bianchinmauro2.0@gmail.com</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;