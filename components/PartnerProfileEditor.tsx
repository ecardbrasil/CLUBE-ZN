
import React, { useState, useEffect, useCallback } from 'react';
import type { Profile } from '../types';
import { UploadIcon } from './icons/UploadIcon';
import { supabase } from '../lib/supabaseClient';
import type { AuthSession } from '@supabase/supabase-js';

interface PartnerProfileEditorProps {
    session: AuthSession;
}

const PartnerProfileEditor: React.FC<PartnerProfileEditorProps> = ({ session }) => {
    const [profile, setProfile] = useState<Partial<Profile> | null>(null);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);

    const getProfile = useCallback(async () => {
        setLoading(true);
        const { user } = session;
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();
        
        if (error) {
            console.error('Error fetching profile:', error);
        } else {
            setProfile(data);
        }
        setLoading(false);
    }, [session]);

    useEffect(() => {
        getProfile();
    }, [getProfile]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (profile) {
            setProfile(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            setUploading(true);
            if (!e.target.files || e.target.files.length === 0) {
                throw new Error('You must select an image to upload.');
            }

            const file = e.target.files[0];
            const fileExt = file.name.split('.').pop();
            const fileName = `${session.user.id}.${fileExt}`;
            const filePath = `${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('logos')
                .upload(filePath, file, { upsert: true });

            if (uploadError) throw uploadError;

            const { data } = supabase.storage.from('logos').getPublicUrl(filePath);

            if (profile) {
                 setProfile(prev => ({ ...prev, logo_url: data.publicUrl }));
                 await supabase.from('profiles').update({ logo_url: data.publicUrl }).eq('id', session.user.id);
            }
            alert('Logo atualizada com sucesso!');
        } catch (error: any) {
            alert(error.message);
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!profile) return;
        
        const { error } = await supabase.from('profiles').update({
            company_name: profile.company_name,
            description: profile.description,
            category: profile.category,
            benefit: profile.benefit,
        }).eq('id', session.user.id);

        if (error) {
            alert(error.message);
        } else {
            alert('Perfil salvo com sucesso!');
        }
    };
    
    const inputClasses = "w-full px-4 py-3 bg-white border border-border rounded-xl text-text-primary focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-300 placeholder:text-text-secondary";

    if (loading) {
        return <p>Carregando perfil...</p>;
    }
    
    if (!profile) {
      return <p>Não foi possível carregar o perfil.</p>
    }

    return (
        <div className="max-w-2xl mx-auto bg-surface p-8 rounded-2xl border border-border">
            <h2 className="text-2xl font-bold text-text-primary mb-6">Editar Perfil da Empresa</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex items-center space-x-6">
                    <img src={profile.logo_url || 'https://picsum.photos/seed/placeholder/200'} alt="Logo da empresa" className="h-24 w-24 rounded-full object-cover border-4 border-white shadow-md" />
                    <div>
                      <label
                          htmlFor="logo-upload"
                          className="flex items-center gap-2 bg-surface text-primary border border-primary font-bold px-4 py-2 rounded-full hover:bg-primary/5 transition-colors duration-300 cursor-pointer"
                      >
                          <UploadIcon className="h-5 w-5" />
                          <span>{uploading ? 'Enviando...' : 'Alterar Logo'}</span>
                      </label>
                      <input id="logo-upload" type="file" accept="image/*" onChange={handleLogoUpload} disabled={uploading} className="hidden" />
                    </div>
                </div>
                <div>
                    <label htmlFor="companyName" className="block text-sm font-medium text-text-secondary mb-2">Nome da Empresa</label>
                    <input type="text" name="company_name" id="companyName" value={profile.company_name || ''} onChange={handleInputChange} className={inputClasses}/>
                </div>
                 <div>
                    <label htmlFor="description" className="block text-sm font-medium text-text-secondary mb-2">Descrição</label>
                    <textarea name="description" id="description" rows={4} value={profile.description || ''} onChange={handleInputChange} className={`${inputClasses} resize-y`}/>
                </div>
                 <div>
                    <label htmlFor="category" className="block text-sm font-medium text-text-secondary mb-2">Categoria</label>
                    <input type="text" name="category" id="category" value={profile.category || ''} placeholder="Ex: Gastronomia" onChange={handleInputChange} className={inputClasses}/>
                </div>
                 <div>
                    <label htmlFor="benefit" className="block text-sm font-medium text-text-secondary mb-2">Principal Benefício</label>
                    <input type="text" name="benefit" id="benefit" value={profile.benefit || ''} placeholder="Ex: 15% de desconto" onChange={handleInputChange} className={inputClasses}/>
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