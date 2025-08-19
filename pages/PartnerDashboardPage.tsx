
import React, { useState, useEffect } from 'react';
import type { AuthSession } from '@supabase/supabase-js';
import type { Profile } from '../lib/supabaseClient';
import { supabase } from '../lib/supabaseClient';

import PartnerProfileEditor from '../components/PartnerProfileEditor';
import PartnerOffersManager from '../components/PartnerOffersManager';
import PartnerSidebar from '../components/PartnerSidebar';
import PartnerOverview from '../components/PartnerOverview';
import PartnerAnalytics from '../components/PartnerAnalytics';
import PartnerQrCode from '../components/PartnerQrCode';

interface PartnerDashboardPageProps {
    session: AuthSession;
}

export type PartnerDashboardView = 'overview' | 'offers' | 'profile' | 'analytics' | 'qrcode';

const PartnerDashboardPage: React.FC<PartnerDashboardPageProps> = ({ session }) => {
    const [activeView, setActiveView] = useState<PartnerDashboardView>('overview');
    const [profile, setProfile] = useState<Profile | null>(null);
    const [loadingProfile, setLoadingProfile] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            setLoadingProfile(true);
            try {
                const { data, error } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', session.user.id)
                    .single();
                if (error) throw error;
                setProfile(data);
            } catch (error: any) {
                console.error("Failed to fetch partner profile:", error.message);
            } finally {
                setLoadingProfile(false);
            }
        };
        fetchProfile();
    }, [session.user.id]);

    const renderContent = () => {
        if (loadingProfile) {
            return <div className="flex items-center justify-center h-64"><p>Carregando dados do parceiro...</p></div>;
        }
        if (!profile) {
            return <div className="flex items-center justify-center h-64"><p>Não foi possível carregar os dados do perfil.</p></div>;
        }
        
        switch (activeView) {
            case 'overview':
                return <PartnerOverview profile={profile} />;
            case 'offers':
                return <PartnerOffersManager session={session} />;
            case 'profile':
                return <PartnerProfileEditor session={session} />;
            case 'analytics':
                return <PartnerAnalytics />;
            case 'qrcode':
                return <PartnerQrCode partnerId={session.user.id} />;
            default:
                return <PartnerOverview profile={profile} />;
        }
    };

    return (
        <div className="bg-background">
             <div className="container mx-auto px-6 py-10">
                 <div className="lg:grid lg:grid-cols-[280px_1fr] lg:gap-8">
                    <PartnerSidebar 
                        activeView={activeView} 
                        setActiveView={setActiveView} 
                        profile={profile}
                        loading={loadingProfile}
                    />
                    <div className="mt-8 lg:mt-0">
                        {renderContent()}
                    </div>
                 </div>
             </div>
        </div>
    );
};

export default PartnerDashboardPage;
