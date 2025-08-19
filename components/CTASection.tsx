
import React from 'react';

const CTASection: React.FC = () => {
  return (
    <section id="cadastro" className="bg-primary">
      <div className="container mx-auto px-6 py-16 text-center">
        <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Seja um parceiro de sucesso!</h2>
        <p className="text-lg text-green-100 max-w-2xl mx-auto mb-8">
            Aumente sua visibilidade e atraia mais clientes da Zona Norte. Cadastre sua empresa em nossa plataforma.
        </p>
        <div className="max-w-lg mx-auto">
            <a 
                href="#/cadastro-parceiro"
                className="inline-block bg-surface text-primary font-bold px-8 py-4 rounded-xl hover:scale-105 transition-transform duration-300 shadow-lg"
            >
                Quero ser parceiro
            </a>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
