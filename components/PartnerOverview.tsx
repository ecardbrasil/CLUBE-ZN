
import React, { useState, useEffect } from 'react';
import type { Profile } from '../lib/supabaseClient';
import { supabase } from '../lib/supabaseClient';
import { TagIcon } from './icons/TagIcon';
import { EyeIcon } from './icons/EyeIcon';
import { TicketIcon } from './icons/TicketIcon';

interface PartnerOverviewProps {
    profile: Profile;
}

const StatCard: React.FC<{ title: string; value: string | number; icon: React.ElementType }> = ({ title, value, icon: Icon }) => (
    <div className="bg-surface p-6 rounded-2xl border border-border flex items-center space-x-4">
        <div className="bg-primary/10 p-3 rounded-full">
            <Icon className="h-6 w-6 text-primary" />
        </div>
        <div>
            <p className="text-sm text-text-secondary">{title}</p>
            <p className="text-2xl font-bold text-text-primary">{value}</p>
        </div>
    </div>
);


const PartnerOverview: React.FC<PartnerOverviewProps> = ({ profile }) => {
    const [offerCount, setOfferCount] = useState<number | string>('...');

    useEffect(() => {
        const fetchOfferCount = async () => {
            const { count, error } = await supabase
                .from('offers')
                .select('*', { count: 'exact', head: true })
                .eq('user_id', profile.id);

            if (!error && count !== null) {
                setOfferCount(count);
            } else {
                setOfferCount(0);
            }
        };
        fetchOfferCount();
    }, [profile.id]);

    return (
        <section aria-labelledby="overview-heading">
            <h1 id="overview-heading" className="text-3xl font-bold text-text-primary mb-2">Bem-vindo, {profile.company_name}!</h1>
            <p className="text-lg text-text-secondary mb-8">Aqui está um resumo da sua atividade na plataforma.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <StatCard title="Ofertas Ativas" value={offerCount} icon={TagIcon} />
                <StatCard title="Visualizações no Perfil" value="1,245" icon={EyeIcon} />
                <StatCard title="Descontos Gerados" value="89" icon={TicketIcon} />
            </div>

            <div className="mt-10 bg-surface p-8 rounded-2xl border border-border">
                <h2 className="text-2xl font-bold text-text-primary mb-4">Próximos Passos</h2>
                <ul className="list-disc list-inside space-y-2 text-text-secondary">
                    <li>Verifique se as informações do seu <span className="font-semibold text-text-primary">perfil</span> estão atualizadas.</li>
                    <li>Crie uma <span className="font-semibold text-text-primary">nova oferta</span> para atrair mais clientes.</li>
                    <li>Explore a seção de <span className="font-semibold text-text-primary">Analytics</span> para entender seu desempenho (em breve).</li>
                </ul>
            </div>
        </section>
    );
};

export default PartnerOverview;
