

import React, { useState } from 'react';
import { MapPinIcon } from '../components/icons/MapPinIcon';
import { supabase } from '../lib/supabaseClient';
import { useToast } from '../contexts/ToastContext';
import { translateSupabaseError } from '../lib/errorUtils';

interface RegisterPartnerPageProps {
  onClose: () => void;
  onRegisterSuccess: () => void;
}

const RegisterPartnerPage: React.FC<RegisterPartnerPageProps> = ({ onClose, onRegisterSuccess }) => {
    const [formData, setFormData] = useState({
        companyName: '',
        email: '',
        password: '',
        passwordConfirm: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { addToast } = useToast();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        if (formData.password !== formData.passwordConfirm) {
            setError('As senhas não conferem.');
            return;
        }
        setLoading(true);
        
        try {
            const { error: signUpError } = await supabase.auth.signUp({
                email: formData.email,
                password: formData.password,
                options: {
                    data: {
                        user_type: 'partner',
                        company_name: formData.companyName,
                    }
                }
            });

            if (signUpError) throw signUpError;

            addToast('Cadastro de parceiro realizado! Verifique seu e-mail para confirmar a conta.', 'success');
            onRegisterSuccess();
        } catch (error: any) {
            addToast(translateSupabaseError(error.message), 'error');
        } finally {
            setLoading(false);
        }
    };

    const inputClasses = "w-full px-4 py-3 bg-background border border-border rounded-xl text-text-primary focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-300 placeholder:text-text-secondary";

    return (
        <div className="w-full max-w-lg p-8 md:p-10 space-y-6 bg-surface rounded-3xl max-h-[90vh] overflow-y-auto">
            <div>
                <a href="#/" onClick={(e) => { e.preventDefault(); onClose(); }} className="flex items-center justify-center space-x-2 w-full">
                    <MapPinIcon className="h-10 w-10 text-primary" />
                    <span className="text-3xl font-black text-text-primary tracking-tighter">
                        CLUBE<span className="text-primary">ZN</span>
                    </span>
                </a>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-text-primary">
                    Cadastre sua empresa
                </h2>
                <p className="mt-2 text-center text-sm text-text-secondary">
                    Faça parte da nossa rede de parceiros e conecte-se a clientes locais.
                </p>
            </div>
            <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
                {error && <p className="text-red-500 text-sm text-center bg-red-100 p-3 rounded-xl">{error}</p>}
                <div className="space-y-4">
                    <input name="companyName" type="text" required placeholder="Nome Fantasia" className={inputClasses} value={formData.companyName} onChange={handleInputChange} disabled={loading} />
                    <input name="email" type="email" required placeholder="E-mail de Acesso" className={inputClasses} value={formData.email} onChange={handleInputChange} disabled={loading} />
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input name="password" type="password" required placeholder="Crie uma senha" minLength={6} className={inputClasses} value={formData.password} onChange={handleInputChange} disabled={loading} />
                        <input name="passwordConfirm" type="password" required placeholder="Confirme a senha" className={inputClasses} value={formData.passwordConfirm} onChange={handleInputChange} disabled={loading} />
                    </div>
                </div>

                <div>
                    <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent text-lg font-bold rounded-xl text-white bg-primary hover:opacity-90 transition-opacity duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50" disabled={loading}>
                        {loading ? 'Finalizando...' : 'Finalizar Cadastro'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default RegisterPartnerPage;