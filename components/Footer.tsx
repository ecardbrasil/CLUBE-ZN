
import React from 'react';
import { MapPinIcon } from './icons/MapPinIcon';

const Footer: React.FC = () => {
  return (
    <footer className="bg-background text-text-secondary border-t border-border">
      <div className="container mx-auto px-6 py-8 text-center">
        <div className="flex items-center justify-center space-x-2 mb-4">
           <MapPinIcon className="h-6 w-6 text-primary" />
           <span className="text-xl font-black text-text-primary tracking-tighter">
             CLUBE<span className="text-primary">ZN</span>
           </span>
        </div>
        <p>Feito com ❤️ para a Zona Norte de Porto Alegre/RS.</p>
        <p className="text-sm mt-2 text-gray-400">&copy; {new Date().getFullYear()} CLUBE ZN. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;