

import React, { useState } from 'react';
import { MapPinIcon } from '../components/icons/MapPinIcon';
import { supabase } from '../lib/supabaseClient';
import { useToast } from '../contexts/ToastContext';
import { translateSupabaseError } from '../lib/errorUtils';

interface LoginPageProps {
  onSwitchToRegister: () => void;
  onClose: () => void;
  onLoginSuccess: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onSwitchToRegister, onClose, onLoginSuccess }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);
    const { addToast } = useToast();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            // FIX: supabase.signInWithPassword does not exist. Corrected to supabase.auth.signInWithPassword.
            const { error } = await supabase.auth.signInWithPassword({
                email: formData.email,
                password: formData.password,
            });

            if (error) throw error;

            addToast('Login realizado com sucesso!', 'success');
            onLoginSuccess();
        } catch (error: any) {
            addToast(translateSupabaseError(error.message), 'error');
        } finally {
            setLoading(false);
        }
    };

    const inputClasses = "w-full px-4 py-3 bg-background border border-border rounded-xl text-text-primary focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-300 placeholder:text-text-secondary";

    return (
        <div className="w-full max-w-md p-8 md:p-12 space-y-8 bg-surface rounded-3xl">
            <div>
                 <a href="#/" onClick={(e) => { e.preventDefault(); onClose(); }} className="flex items-center justify-center space-x-2 w-full">
                    <MapPinIcon className="h-10 w-10 text-primary" />
                    <span className="text-3xl font-black text-text-primary tracking-tighter">
                        CLUBE<span className="text-primary">ZN</span>
                    </span>
                </a>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-text-primary">
                    Acesse sua conta
                </h2>
                <p className="mt-2 text-center text-sm text-text-secondary">
                    Não tem uma conta?{' '}
                    <button onClick={onSwitchToRegister} className="font-medium text-primary hover:text-primary/80 focus:outline-none">
                        Cadastre-se gratuitamente
                    </button>
                </p>
            </div>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-4">
                    <input name="email" type="email" required placeholder="E-mail" className={inputClasses} value={formData.email} onChange={handleInputChange} disabled={loading} />
                    <input name="password" type="password" required placeholder="Senha" className={inputClasses} value={formData.password} onChange={handleInputChange} disabled={loading} />
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded" />
                        <label htmlFor="remember-me" className="ml-2 block text-sm text-text-secondary">
                            Lembrar-me
                        </label>
                    </div>

                    <div className="text-sm">
                        <a href="#" className="font-medium text-primary hover:text-primary/80">
                            Esqueceu a senha?
                        </a>
                    </div>
                </div>

                <div>
                    <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent text-lg font-bold rounded-xl text-white bg-primary hover:opacity-90 transition-opacity duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50" disabled={loading}>
                        {loading ? 'Entrando...' : 'Entrar'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default LoginPage;