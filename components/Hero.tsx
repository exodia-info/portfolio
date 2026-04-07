
import React from 'react';
import { motion, useScroll, useTransform, type Variants } from 'framer-motion';

const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 100]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center px-6 md:px-12 lg:px-24 bg-[#0c0c0c]">
      {/* Background Layer */}
      <motion.div 
        style={{ y, opacity }}
        className="absolute inset-0 z-0 bg-[#0c0c0c]"
      >
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat hidden md:block"
          style={{ 
            backgroundImage: "url('https://cdn.allthepics.net/images/2026/04/07/scrus.jpg')",
          }}
        />
        
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-bottom md:hidden"
          style={{ 
            backgroundImage: "url('https://i.imgur.com/clnNoSd.jpg')",
          }}
        />
        
        {/* Sfumatura da trasparente a nera */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black via-85% to-100% pointer-events-none" />
      </motion.div>

      {/* Titografia: Product e Design bianchi, Portfolio argenteo */}
      <motion.div 
        className="relative z-10 w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 
          variants={itemVariants}
          className="text-white mix-blend-difference text-6xl md:text-8xl lg:text-[10rem] font-black uppercase leading-[0.85] tracking-tighter"
        >
          Product<br />
          Design<br />
          <span >Portfolio</span>
        </motion.h1>
      </motion.div>
    </section>
  );
};

export default Hero;
