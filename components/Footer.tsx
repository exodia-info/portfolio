import React from 'react';
import { LogoImage } from './Navbar';

const Footer: React.FC = () => {
  return (
    <footer className="px-6 py-12 md:px-12 lg:px-24 bg-[#F5F5F0] text-zinc-900 border-t border-black/5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        
        {/* Logo & Copyright */}
        <div className="flex flex-col md:flex-row items-center gap-6">
          <LogoImage className="w-8 h-8 opacity-80" />            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">©Mauro Bianchin</span>

          <div className="flex flex-col items-center md:items-start">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">2025-26</span>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex flex-col items-center md:items-start">
          <span className="text-[8px] font-black uppercase tracking-[0.4em] text-zinc-400 mb-2">Support the project</span>
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

        <div className="flex items-center gap-3 opacity-70 hover:opacity-100 transition-opacity">
          <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-500">Built in</span>
          <div className="flex items-center gap-1.5">
            <img 
              src="https://cdn.allthepics.net/images/2026/04/09/ts.png" 
              alt="TypeScript Logo" 
              className="w-4 h-4 object-contain"
            />
            <span className="text-[10px] font-semibold text-zinc-600">TypeScript</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;