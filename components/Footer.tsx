
import React from 'react';
import { LogoImage } from './Navbar';

const Footer: React.FC = () => {
  return (
    <footer className="px-6 py-12 md:px-12 lg:px-24 bg-[#F5F5F0] text-zinc-900 border-t border-black/5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        
        <div className="flex flex-col md:flex-row items-center gap-6">
          <LogoImage className="w-8 h-8 opacity-80" />
          <div className="flex flex-col items-center md:items-start">
           
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">© 2025-26</span>
          </div>
        </div>

        <div className="flex flex-col items-center md:items-start">
          <span className="text-[8px] font-black uppercase tracking-[0.4em] text-zinc-300 mb-2">Support the project</span>
          <div className="flex gap-6">
            <a 
              href="https://instagram.com/em.cees" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-xs font-bold hover:text-[#9333EA] transition-colors"
            >
              Instagram
            </a>
            <a 
              href="https://behance.net/maurobianchin" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-xs font-bold hover:text-[#9333EA] transition-colors"
            >
              Behance
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;