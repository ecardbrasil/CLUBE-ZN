
import React, { useState } from 'react';
import { MapPinIcon } from '../components/icons/MapPinIcon';
import { supabase } from '../lib/supabaseClient';

interface RegisterPageProps {
  onSwitchToLogin: () => void;
  onClose: () => void;
  onRegisterSuccess: () => void;
}

const RegisterPage: React.FC<RegisterPageProps> = ({ onSwitchToLogin, onClose, onRegisterSuccess }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        passwordConfirm: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (formData.password !== formData.passwordConfirm) {
            setError('As senhas não conferem.');
            return;
        }
        setLoading(true);
        setError(null);

        const { error } = await supabase.auth.signUp({
            email: formData.email,
            password: formData.password,
            options: {
                data: {
                    user_type: 'customer',
                }
            }
        });

        setLoading(false);
        if (error) {
            setError(error.message);
        } else {
            alert('Cadastro realizado! Verifique seu e-mail para confirmar a conta.');
            onRegisterSuccess();
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
                    Crie sua conta gratuita
                </h2>
                <p className="mt-2 text-center text-sm text-text-secondary">
                    Já tem uma conta?{' '}
                    <button onClick={onSwitchToLogin} className="font-medium text-primary hover:text-primary/80 focus:outline-none">
                        Faça login
                    </button>
                </p>
            </div>
            <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
                {error && <p className="text-red-500 text-sm text-center bg-red-100 p-3 rounded-xl">{error}</p>}
                <div className="space-y-4">
                    <input name="email" type="email" required placeholder="E-mail" className={inputClasses} value={formData.email} onChange={handleInputChange} disabled={loading} />
                    <input name="password" type="password" required placeholder="Senha" className={inputClasses} value={formData.password} onChange={handleInputChange} disabled={loading} />
                    <input name="passwordConfirm" type="password" required placeholder="Confirme sua Senha" className={inputClasses} value={formData.passwordConfirm} onChange={handleInputChange} disabled={loading} />
                </div>
                <div>
                    <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent text-lg font-bold rounded-xl text-white bg-primary hover:opacity-90 transition-opacity duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50" disabled={loading}>
                        {loading ? 'Criando conta...' : 'Criar minha conta'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default RegisterPage;