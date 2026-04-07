
// Fix: Added React to imports to resolve 'Cannot find namespace React' errors
import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowLeft, ArrowRight, ImageOff, Loader2 } from 'lucide-react';
import type { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  accentColor?: string;
  onClose: () => void;
  onNext?: () => void;
  onPrev?: () => void;
  nextTitle?: string;
  prevTitle?: string;
}

const SafeImage: React.FC<{ src: string; alt?: string; className?: string }> = ({ src, alt, className }) => {
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading');
  
  return (
    <div className={`relative w-full bg-zinc-100 overflow-hidden ${className}`}>
      {status === 'loading' && (
        <div className="absolute inset-0 flex items-center justify-center text-zinc-300">
          <Loader2 className="animate-spin" size={24} />
        </div>
      )}
      
      {status === 'error' ? (
        <div className="flex flex-col items-center justify-center py-20 bg-zinc-200/50">
          <ImageOff size={32} strokeWidth={1} className="text-zinc-400" />
        </div>
      ) : (
        <motion.img 
          initial={{ opacity: 0 }}
          animate={{ opacity: status === 'loaded' ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          src={src} 
          alt={alt} 
          className="w-full h-auto block"
          onLoad={() => setStatus('loaded')}
          onError={() => setStatus('error')}
          referrerPolicy="no-referrer"
        />
      )}
    </div>
  );
};

const HoverImageSwap: React.FC<{ img1: string; img2: string }> = ({ img1, img2 }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative w-full mb-4 md:mb-10 shadow-sm overflow-hidden bg-zinc-100 cursor-crosshair"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-full">
        {/* Immagine Base */}
        <SafeImage src={img1} className={`transition-opacity duration-500 ${isHovered ? 'opacity-0' : 'opacity-100'}`} />
        
        {/* Immagine Hover */}
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          <SafeImage 
            src={img2} 
            className={`w-full h-full transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`} 
          />
        </div>
      </div>
      
      {/* Indicatore visivo opzionale (molto discreto) */}
      <div className="absolute bottom-4 right-4 bg-white/10 backdrop-blur-sm px-2 py-1 border border-white/20 rounded pointer-events-none transition-opacity duration-300 opacity-40">
        <span className="text-[8px] font-bold uppercase tracking-widest text-white">Compare</span>
      </div>
    </div>
  );
};

const ProjectModal: React.FC<ProjectModalProps> = ({ 
  project, 
  accentColor = '#9333EA', 
  onClose,
  onNext,
  onPrev,
  nextTitle,
  prevTitle
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
      if (containerRef.current) containerRef.current.scrollTop = 0;
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [project]);

  const renderGallery = () => {
    if (!project) return null;

    if (project.id === 'compliant-precision-scale') {
      return (
        <>
          {/* Prima Immagine */}
          <SafeImage src={project.images[0]} className="mb-4 md:mb-10 shadow-sm" />
          
          {/* I 2 Render insieme (scale2, scale3) */}
          <div className="grid grid-cols-2 gap-4 mb-4 md:mb-10">
            <SafeImage src={project.images[1]} className="shadow-sm" />
            <SafeImage src={project.images[2]} className="shadow-sm" />
          </div>

          {/* Le 2 Foto Cucina con Hover Swap (cucina.34, cucina.38) */}
          <HoverImageSwap img1={project.images[3]} img2={project.images[4]} />

          {/* Il resto delle immagini */}
          {project.images.slice(5).map((img, i) => (
            <SafeImage key={i + 5} src={img} className="mb-4 md:mb-10 shadow-sm" />
          ))}
        </>
      );
    }

return (
  <>
    {project.videoUrl && (
      <video 
        src={project.videoUrl} 
        controls 
        className="w-full mb-4 md:mb-10 shadow-sm"
        playsInline
      />
    )}
    {project.images.map((img, i) => (
      <SafeImage key={i} src={img} className="mb-4 md:mb-10 shadow-sm" />
    ))}
  </>
);
  };

  return (
    <AnimatePresence mode="wait">
      {project && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-[#F5F5F0] overflow-y-auto"
          ref={containerRef}
        >
          <div className="relative w-full flex flex-col md:flex-row-reverse items-start min-h-screen">
            <button 
              onClick={onClose} 
              className="fixed top-6 right-6 z-[100] p-4 bg-white/80 backdrop-blur-md rounded-full shadow-lg hover:scale-105 transition-all border border-black/5"
            >
              <X size={20} style={{ color: accentColor }} />
            </button>

            <div className="w-full md:w-[40%] p-8 md:p-20 md:sticky md:top-0 self-start z-10 bg-[#F5F5F0]">
              <div className="max-w-xl">
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase mb-4 block" style={{ color: accentColor }}>{project.category}</span>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">{project.title}</h2>
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-6 h-[1px]" style={{ backgroundColor: accentColor }}></div>
                  <span className="text-[10px] font-medium uppercase tracking-widest text-zinc-400">{project.date}</span>
                </div>
                <p className="text-base md:text-lg text-zinc-600 font-normal leading-relaxed whitespace-pre-line mb-12">
                   {project.fullContent}
                </p>
                <div className="pt-8 border-t border-black/5 flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-[9px] font-bold uppercase tracking-widest text-zinc-400 border border-black/10 px-3 py-1">{tag}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="w-full md:w-[60%] bg-zinc-100/30">
              <div className="p-4 md:p-12">
                {renderGallery()}
                
                <div className="pt-24 pb-40">
                   <div className={`flex flex-col md:flex-row gap-8 pt-12 px-4 border-t border-black/5 ${!onPrev ? 'justify-end' : 'justify-between'} items-center`}>
                      {onPrev && (
                        <button onClick={onPrev} className="group flex items-center gap-4 hover:opacity-60 transition-all text-left">
                           <ArrowLeft size={18} style={{ color: accentColor }} />
                           <div>
                              <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-300 block">Previous</span>
                              <span className="text-base font-bold tracking-tight">{prevTitle}</span>
                           </div>
                        </button>
                      )}
                      {onNext && (
                        <button onClick={onNext} className="group flex items-center gap-4 hover:opacity-60 transition-all text-right flex-row-reverse">
                           <ArrowRight size={18} style={{ color: accentColor }} />
                           <div>
                              <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-300 block">Next</span>
                              <span className="text-base font-bold tracking-tight">{nextTitle}</span>
                           </div>
                        </button>
                      )}
                   </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;