
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-text-primary mb-4 leading-tight">
              Conecte-se e <span className="text-primary">economize</span> na Zona Norte
            </h1>
            <p className="text-lg md:text-xl max-w-md mx-auto md:mx-0 mb-8 text-text-secondary">
              Descubra benefícios exclusivos e apoie o comércio local. Simples, rápido e gratuito.
            </p>
            <a 
              href="#parceiros" 
              className="inline-block bg-primary text-white font-bold text-lg px-8 py-4 rounded-xl hover:opacity-90 transform transition-all duration-300 shadow-lg shadow-primary/20"
            >
              Ver Parceiros
            </a>
          </div>
          <div className="relative h-80 md:h-96 flex items-center justify-center">
             <div className="absolute inset-0 flex items-center justify-center">
               <div className="w-full h-full max-w-md bg-primary/10 rounded-3xl blur-3xl"></div>
             </div>
             <img 
               src="https://picsum.photos/seed/happy/600/600" 
               alt="Membros felizes do Clube ZN" 
               className="relative w-full h-full max-w-sm rounded-3xl object-cover shadow-2xl"
             />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;