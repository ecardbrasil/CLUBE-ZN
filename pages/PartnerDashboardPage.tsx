
import React, { useState } from 'react';
import PartnerProfileEditor from '../components/PartnerProfileEditor';
import PartnerOffersManager from '../components/PartnerOffersManager';
import { UserIcon } from '../components/icons/UserIcon';
import { TagIcon } from '../components/icons/TagIcon';
import type { AuthSession } from '@supabase/supabase-js';

interface PartnerDashboardPageProps {
    session: AuthSession;
}

const PartnerDashboardPage: React.FC<PartnerDashboardPageProps> = ({ session }) => {
    const [activeTab, setActiveTab] = useState<'offers' | 'profile'>('offers');

    const renderContent = () => {
        switch (activeTab) {
            case 'offers':
                return <PartnerOffersManager session={session} />;
            case 'profile':
                return <PartnerProfileEditor session={session} />;
            default:
                return null;
        }
    };

    const getTabClass = (tabName: 'offers' | 'profile') => {
        return activeTab === tabName
            ? 'bg-primary text-white'
            : 'bg-surface text-text-secondary hover:bg-gray-100 border border-border';
    };

    return (
        <div className="py-12 sm:py-16">
            <div className="container mx-auto px-6">
                <div className="text-center mb-8">
                    <h1 className="text-3xl md:text-4xl font-black text-text-primary">Painel do Parceiro</h1>
                    <p className="text-lg text-text-secondary mt-2 max-w-2xl mx-auto">
                        Gerencie suas informações e ofertas para os membros do Clube ZN.
                    </p>
                </div>

                {/* Tabs */}
                <div className="mb-10 flex justify-center items-center gap-4">
                    <button
                        onClick={() => setActiveTab('offers')}
                        className={`flex items-center gap-2 px-6 py-3 font-bold rounded-full transition-all duration-300 ${getTabClass('offers')}`}
                    >
                        <TagIcon className="h-5 w-5" />
                        <span>Minhas Ofertas</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('profile')}
                        className={`flex items-center gap-2 px-6 py-3 font-bold rounded-full transition-all duration-300 ${getTabClass('profile')}`}
                    >
                        <UserIcon className="h-5 w-5" />
                        <span>Meu Perfil</span>
                    </button>
                </div>

                {/* Content */}
                <div>{renderContent()}</div>
            </div>
        </div>
    );
};

export default PartnerDashboardPage;