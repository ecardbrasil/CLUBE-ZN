
import React from 'react';
import { ChartBarIcon } from './icons/ChartBarIcon';

const PartnerAnalytics: React.FC = () => {
    return (
        <section aria-labelledby="analytics-heading">
            <div className="bg-surface p-8 rounded-2xl border border-border text-center">
                <ChartBarIcon className="h-16 w-16 text-primary mx-auto mb-4" />
                <h1 id="analytics-heading" className="text-3xl font-bold text-text-primary mb-2">Analytics em Breve</h1>
                <p className="text-lg text-text-secondary max-w-lg mx-auto">
                    Estamos trabalhando em uma seção completa de analytics para você acompanhar visualizações,
                    resgates de ofertas e muito mais. Fique de olho nas novidades!
                </p>
            </div>
        </section>
    );
};

export default PartnerAnalytics;
