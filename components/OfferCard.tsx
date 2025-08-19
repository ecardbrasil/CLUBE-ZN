import React, { useState } from 'react';
import type { Offer, Profile } from '../lib/supabaseClient';
import type { AuthSession } from '@supabase/supabase-js';
import { TagIcon } from './icons/TagIcon';
import { TicketIcon } from './icons/TicketIcon';
import CouponDisplayModal from './CouponDisplayModal';

type OfferWithProfile = Offer & { profiles: Profile | null };

interface OfferCardProps {
  offer: OfferWithProfile;
  session: AuthSession;
}

const OfferCard: React.FC<OfferCardProps> = ({ offer, session }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { profiles: partner } = offer;

  const handleActionClick = () => {
    setIsModalOpen(true);
  };

  const getDiscountText = (offer: Offer) => {
    switch (offer.discount_type) {
      case 'percentage':
        return `${offer.discount_value}% OFF`;
      case 'fixed':
        return `R$ ${offer.discount_value},00 OFF`;
      case 'custom':
        return offer.custom_discount_text;
      default:
        return '';
    }
  };

  const defaultImageUrl = 'https://picsum.photos/seed/placeholder/400/300';

  if (!partner) {
    return null; // Don't render card if partner profile is missing
  }

  return (
    <>
      <div className="bg-surface rounded-2xl border border-border flex flex-col overflow-hidden transform hover:-translate-y-1.5 transition-all duration-300 ease-in-out group hover:shadow-xl hover:border-primary/20">
        <div className="p-5 flex items-center space-x-4 border-b border-border">
            <img className="h-12 w-12 rounded-full object-cover" src={partner.logo_url || defaultImageUrl} alt={partner.company_name || 'Logo do parceiro'} />
            <div>
              <h4 className="font-bold text-text-primary leading-tight">{partner.company_name}</h4>
              {partner.category && <p className="text-sm text-text-secondary">{partner.category}</p>}
            </div>
        </div>
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-xl font-bold text-text-primary mb-2">{offer.title}</h3>
          <p className="text-text-secondary text-sm mb-4 flex-grow">{offer.description}</p>
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary font-bold text-sm px-3 py-1.5 rounded-full mb-5 self-start">
              <TagIcon className="h-4 w-4" />
              <span>{getDiscountText(offer)}</span>
          </div>
          <div className="mt-auto pt-4 border-t border-border">
            <button 
              onClick={handleActionClick}
              className="w-full flex items-center justify-center space-x-2 bg-primary text-white font-bold px-4 py-3 rounded-xl hover:opacity-90 transition-opacity duration-300"
            >
              <TicketIcon className="h-5 w-5" />
              <span>Gerar Desconto</span>
            </button>
          </div>
        </div>
      </div>
      
      <CouponDisplayModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        offer={offer}
        userId={session.user.id}
      />
    </>
  );
};

export default OfferCard;
