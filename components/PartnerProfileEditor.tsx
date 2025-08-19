
import React, { useState } from 'react';
import { MOCK_PARTNER_PROFILE } from '../constants';
import type { PartnerProfile } from '../types';
import { UploadIcon } from './icons/UploadIcon';

const PartnerProfileEditor: React.FC = () => {
    const [profile, setProfile] = useState<PartnerProfile>(MOCK_PARTNER_PROFILE);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProfile(prev => ({ ...prev, [name]: value }));
    };

    const handleLogoChange = () => {
        // Simulação de upload de arquivo
        const newLogoUrl = `https://picsum.photos/seed/${Date.now()}/200/200`;
        setProfile(prev => ({ ...prev, logoUrl: newLogoUrl }));
        alert('Nova logo carregada com sucesso! (Simulação)');
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Profile saved:', profile);
        alert('Perfil salvo com sucesso! (Simulação)');
    };
    
    const inputClasses = "w-full px-4 py-3 bg-white border border-border rounded-xl text-text-primary focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-300 placeholder:text-text-secondary";

    return (
        <div className="max-w-2xl mx-auto bg-surface p-8 rounded-2xl border border-border">
            <h2 className="text-2xl font-bold text-text-primary mb-6">Editar Perfil da Empresa</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex items-center space-x-6">
                    <img src={profile.logoUrl} alt="Logo da empresa" className="h-24 w-24 rounded-full object-cover border-4 border-white shadow-md" />
                    <button
                        type="button"
                        onClick={handleLogoChange}
                        className="flex items-center gap-2 bg-surface text-primary border border-primary font-bold px-4 py-2 rounded-full hover:bg-primary/5 transition-colors duration-300"
                    >
                        <UploadIcon className="h-5 w-5" />
                        <span>Alterar Logo</span>
                    </button>
                </div>
                <div>
                    <label htmlFor="companyName" className="block text-sm font-medium text-text-secondary mb-2">Nome da Empresa</label>
                    <input
                        type="text"
                        name="companyName"
                        id="companyName"
                        value={profile.companyName}
                        onChange={handleInputChange}
                        className={inputClasses}
                    />
                </div>
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-text-secondary mb-2">Descrição</label>
                    <textarea
                        name="description"
                        id="description"
                        rows={4}
                        value={profile.description}
                        onChange={handleInputChange}
                        className={`${inputClasses} resize-y`}
                    />
                </div>
                <div>
                    <button
                        type="submit"
                        className="w-full flex justify-center py-3 px-4 border border-transparent text-lg font-bold rounded-xl text-white bg-primary hover:opacity-90 transition-opacity duration-300"
                    >
                        Salvar Alterações
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PartnerProfileEditor;
