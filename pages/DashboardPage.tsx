import React from 'react';
import type { AuthSession } from '@supabase/supabase-js';
import OfferListings from '../components/OfferListings';

interface DashboardPageProps {
  session: AuthSession;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ session }) => {
  return (
    <div className="py-12 sm:py-16">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-black text-text-primary">Painel de Vantagens</h1>
          <p className="text-lg text-text-secondary mt-2 max-w-2xl mx-auto">
            Olá! Explore os benefícios exclusivos que separamos para você.
          </p>
        </div>
        <OfferListings session={session} />
      </div>
    </div>
  );
};

export default DashboardPage;
