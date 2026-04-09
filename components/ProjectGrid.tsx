import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { projects } from '../data/projects';
import ProjectModal from './ProjectModal';
import { type Project } from '../types';

const processColor = (r: number, g: number, b: number): { h: number, s: number, l: number } => {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s, l = (max + min) / 2;
  if (max === min) { h = 0; s = 0; } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return { h, s, l };
};

const extractColorFromUrl = (url: string, callback: (color: string) => void) => {
  const img = new Image();
  img.crossOrigin = "Anonymous";
  img.src = url;
  img.onload = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const size = 10;
    canvas.width = size; canvas.height = size;
    ctx.drawImage(img, 0, 0, size, size);
    try {
      const data = ctx.getImageData(0, 0, size, size).data;
      let r = 0, g = 0, b = 0;
      for (let i = 0; i < data.length; i += 4) {
        r += data[i]; g += data[i+1]; b += data[i+2];
      }
      r = Math.floor(r / (size * size)); g = Math.floor(g / (size * size)); b = Math.floor(b / (size * size));
      const { h, s } = processColor(r, g, b);
      callback(`hsl(${Math.round(h * 360)}, ${Math.max(50, Math.round(s * 100))}%, 40%)`);
    } catch (e) { callback('#9333EA'); }
  };
  img.onerror = () => callback('#9333EA');
};

const ProjectCard: React.FC<{ project: Project; onClick: (color: string) => void }> = ({ project, onClick }) => {
  const [dynamicColor, setDynamicColor] = useState(project.accentColor || '#9333EA');
  const [isHovered, setIsHovered] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => {
    if (project.accentColor) setDynamicColor(project.accentColor);
    else extractColorFromUrl(project.thumbnail, (color) => setDynamicColor(color));
  }, [project.thumbnail, project.accentColor]);

  return (
    <div 
      className="relative group h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onClick(dynamicColor)}
    >
      <motion.div 
        initial={{ opacity: 0, x: 0, y: 0 }}
        animate={isHovered && !project.incoming ? { opacity: 1, x: 4, y: 4 } : { opacity: 0, x: 0, y: 0 }}
        className="absolute inset-0 z-0 pointer-events-none border border-black/[0.03]"
        style={{ backgroundColor: dynamicColor }}
      />
      
      <div className={`relative z-10 bg-white border border-black/[0.05] overflow-hidden h-full flex flex-col shadow-sm cursor-pointer`}>
        <div className="relative aspect-[3/4] overflow-hidden bg-zinc-100">
          
          <img
            src={project.thumbnail}
            alt={project.title}
            className={`w-full h-full object-cover transition-all duration-1000 ${isHovered && !project.incoming ? 'scale-105' : 'scale-100'} ${imgLoaded ? 'opacity-100' : 'opacity-0'} ${project.incoming ? 'grayscale brightness-50' : ''}`}
            onLoad={() => setImgLoaded(true)}
          />

          {project.incoming ? (
            <div className="absolute inset-0 z-20 backdrop-blur-[3px] bg-black/20 flex flex-col items-center justify-center p-6 text-center">
              <div className="absolute inset-4 border-t border-l border-white/20 w-4 h-4" />
              <div className="absolute inset-4 border-b border-r border-white/20 w-4 h-4 ml-auto mt-auto" />
              
              <div className="flex flex-col items-center gap-3">
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white bg-white/10 px-3 py-1.5 backdrop-blur-md border border-white/10">
                  Coming Soon
                </span>
                <div className="h-[1px] w-8 bg-white/30" />
                <p className="text-[9px] text-white/50 font-mono uppercase tracking-widest">
                  {project.category}
                </p>
              </div>

              <motion.div 
                animate={{ top: ['-5%', '105%'] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute left-0 right-0 h-[1px] bg-white/30 shadow-[0_0_10px_white] z-30 pointer-events-none"
              />
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              className="absolute inset-0 bg-[#F5F5F0]/90 flex flex-col justify-end p-8 z-20"
            >
              <h3 className="text-2xl font-bold tracking-tight mb-4" style={{ color: dynamicColor }}>{project.title}</h3>
              <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-[0.4em]">{project.category}</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

const ProjectGrid: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeColor, setActiveColor] = useState('#9333EA');

  const handleProjectClick = (project: Project, color: string) => {
    setActiveColor(color);
    setSelectedProject(project);
  };

  const currentIndex = selectedProject ? projects.findIndex(p => p.id === selectedProject.id) : -1;
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject = currentIndex >= 0 && currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  const handleNavigate = (target: Project | null) => {
    if (!target) return;
    setSelectedProject(target);
    if (target.accentColor) setActiveColor(target.accentColor);
    else extractColorFromUrl(target.thumbnail, (color) => setActiveColor(color));
  };

  return (
    <div className="w-full px-6 py-12 md:px-12 lg:px-24">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-24">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} onClick={(color) => handleProjectClick(project, color)} />
        ))}
      </div>

      <ProjectModal 
        project={selectedProject} accentColor={activeColor}
        onClose={() => setSelectedProject(null)}
        onNext={nextProject ? () => handleNavigate(nextProject) : undefined}
        onPrev={prevProject ? () => handleNavigate(prevProject) : undefined}
        nextTitle={nextProject?.title} prevTitle={prevProject?.title}
      />
    </div>
  );
};

export default ProjectGrid;