
import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

interface Skill {
  name: string;
  rating: number; // da 1 a 5
}

const skills: Skill[] = [
  { name: "Siemens NX Solid Modeling", rating: 4.5 },
  { name: "Siemens NX Surface Modeling", rating: 2.5 },
  { name: "FreeCAD", rating: 2 },
  { name: "Sketching", rating: 4 },
  { name: "AI prompting", rating: 3 },
  { name: "Keyshot Rendering", rating: 3 },
  { name: "3D Printing & Prototyping", rating: 4 },
  { name: "User research", rating: 3.5 },
];

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => {
        const starValue = i + 1;
        
        // Full star
        if (starValue <= Math.floor(rating)) {
          return (
            <Star 
              key={i} 
              size={12} 
              className="fill-[#475569] text-[#475569] group-hover:fill-[#9333EA] group-hover:text-[#9333EA] transition-colors duration-300" 
              strokeWidth={0}
            />
          );
        } 
        
        // Half star (Stacked for perfect full outline + half fill)
        if (starValue - 0.5 === rating) {
          return (
            <div key={i} className="relative w-3 h-3 flex items-center justify-center">
              {/* Background: Full star outline */}
              <Star 
                size={12} 
                className="text-zinc-200 absolute inset-0" 
                strokeWidth={2}
              />
              {/* Foreground: Half star fill with clipping */}
              <div className="absolute inset-0 overflow-hidden w-[50%] pointer-events-none">
                <Star 
                  size={12} 
                  className="fill-[#475569] text-[#475569] group-hover:fill-[#9333EA] group-hover:text-[#9333EA] transition-colors duration-300" 
                  strokeWidth={0}
                />
              </div>
            </div>
          );
        }
        
        // Empty star
        return (
          <Star 
            key={i} 
            size={12} 
            className="text-zinc-200 transition-colors duration-300" 
            strokeWidth={2}
          />
        );
      })}
    </div>
  );
};

const Skills: React.FC = () => {
  return (
    <section className="py-24 bg-white px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-8 mb-16">
          <h2 className="text-xs font-black tracking-[0.5em] uppercase text-zinc-400 whitespace-nowrap">Toolkit</h2>
          <div className="w-full h-[1px] bg-black/10"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-12">
          {skills.map((skill, index) => (
            <motion.div 
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
              className="flex flex-col gap-3 group"
            >
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-800 transition-colors">
                {skill.name}
              </span>
              <StarRating rating={skill.rating} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
