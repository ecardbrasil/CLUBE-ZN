
import React from 'react';
import type { Partner } from '../types';
import { SparklesIcon } from './icons/SparklesIcon';
import { TicketIcon } from './icons/TicketIcon';

interface PartnerCardProps {
  partner: Partner;
  showActionButton?: boolean;
}

const PartnerCard: React.FC<PartnerCardProps> = ({ partner, showActionButton = false }) => {
  const handleActionClick = (e: React.MouseEvent) => {
    e.preventDefault();
    alert(`Gerando desconto para ${partner.name}... (Simulação)`);
  };

  return (
    <div className="bg-surface rounded-2xl border border-border flex flex-col overflow-hidden transform hover:-translate-y-1.5 transition-all duration-300 ease-in-out group hover:shadow-xl hover:border-primary/20">
      <div className="relative">
        <img className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105" src={partner.imageUrl} alt={partner.name} />
        <div className="absolute top-0 right-0 bg-primary/10 text-primary text-xs font-semibold px-3 py-1 m-4 rounded-full">
          {partner.category}
        </div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-text-primary mb-2">{partner.name}</h3>
        <div className="flex items-center text-primary mb-4">
          <SparklesIcon className="h-5 w-5 mr-2 flex-shrink-0" />
          <p className="font-semibold text-md">{partner.benefit}</p>
        </div>
        {showActionButton && (
          <div className="mt-auto pt-4 border-t border-border">
            <button 
              onClick={handleActionClick}
              className="w-full flex items-center justify-center space-x-2 bg-primary text-white font-bold px-4 py-3 rounded-xl hover:opacity-90 transition-opacity duration-300"
            >
              <TicketIcon className="h-5 w-5" />
              <span>Gerar Desconto</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PartnerCard;
