
import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProjectGrid from './components/ProjectGrid';
 import Skills from './components/Skills';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <main className="min-h-screen">
       <Navbar />
      <Hero /> 
      <section id="work" className="py-24 bg-[#F5F5F0]">
        <div className="mt-16 px-6 md:px-12 lg:px-24 mb-16 flex items-center gap-8">
        
           <h2 className=" text-xs font-black tracking-[0.5em] uppercase text-zinc-400 whitespace-nowrap">Selected Work</h2>
           <div className="w-full h-[1px] bg-black/10"></div>
        </div>
        <ProjectGrid /> 
      </section>
      <Skills />
      <ContactForm />
      <Footer /> 
    </main>
  );
};

export default App;
