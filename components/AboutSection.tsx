
import React from 'react';
import { SparklesIcon } from './icons/SparklesIcon';

const AboutSection: React.FC = () => {
  return (
    <section id="sobre" className="py-16 sm:py-24 bg-surface text-text-primary">
      <div className="container mx-auto px-6">
        <div className="relative max-w-4xl mx-auto text-center">
            <div className="absolute -top-10 -left-10 w-24 h-24 bg-primary/10 rounded-full blur-2xl -z-10"></div>
            <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-primary/10 rounded-full blur-2xl -z-10"></div>
            <SparklesIcon className="h-12 w-12 text-primary mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-black text-text-primary">Tudo sobre as pessoas</h2>
            <p className="mt-4 text-lg text-text-secondary leading-relaxed">
                O <span className="font-bold text-text-primary">CLUBE ZN</span> nasceu com a missão de fortalecer a economia local e valorizar quem vive e consome na Zona Norte de Porto Alegre. 
                Nossa plataforma conecta os moradores aos melhores estabelecimentos da região, oferecendo descontos e vantagens exclusivas.
            </p>
            <p className="mt-4 text-lg text-text-secondary leading-relaxed">
                É bom para você, que economiza e descobre novos lugares. É bom para o comércio local, que ganha mais visibilidade e clientes. Junte-se a nós e faça parte deste movimento!
            </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;