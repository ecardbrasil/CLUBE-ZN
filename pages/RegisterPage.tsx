
import React, { useState } from 'react';
import { MapPinIcon } from '../components/icons/MapPinIcon';

interface RegisterPageProps {
  onSwitchToLogin: () => void;
  onClose: () => void;
}

const RegisterPage: React.FC<RegisterPageProps> = ({ onSwitchToLogin, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        cpf: '',
        birthDate: '',
        phone: '',
        password: '',
        passwordConfirm: '',
        terms: false,
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // TODO: Add form validation and submission logic
        console.log('Form data submitted:', formData);
        alert('Cadastro realizado com sucesso! (Simulação)');
        onClose(); // Fecha o modal após o sucesso
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
                <div className="space-y-4">
                    <input name="name" type="text" required placeholder="Nome Completo" className={inputClasses} value={formData.name} onChange={handleInputChange} />
                    <input name="email" type="email" required placeholder="E-mail" className={inputClasses} value={formData.email} onChange={handleInputChange} />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input name="cpf" type="text" required placeholder="CPF" className={inputClasses} value={formData.cpf} onChange={handleInputChange} />
                        <input name="birthDate" type="text" placeholder="Data de Nascimento" className={inputClasses} onFocus={(e) => e.target.type='date'} onBlur={(e) => {if(!e.target.value) e.target.type='text'}} value={formData.birthDate} onChange={handleInputChange} />
                    </div>
                    <input name="phone" type="tel" placeholder="Celular (com DDD)" className={inputClasses} value={formData.phone} onChange={handleInputChange} />
                    <input name="password" type="password" required placeholder="Senha" className={inputClasses} value={formData.password} onChange={handleInputChange} />
                    <input name="passwordConfirm" type="password" required placeholder="Confirme sua Senha" className={inputClasses} value={formData.passwordConfirm} onChange={handleInputChange} />
                </div>

                <div className="flex items-start">
                    <div className="flex items-center h-5">
                        <input id="terms" name="terms" type="checkbox" required className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded" checked={formData.terms} onChange={handleInputChange} />
                    </div>
                    <div className="ml-3 text-sm">
                        <label htmlFor="terms" className="text-text-secondary">
                            Eu li e aceito os <a href="#" className="font-medium text-primary hover:text-primary/80">Termos de Uso e Privacidade</a>.
                        </label>
                    </div>
                </div>

                <div>
                    <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent text-lg font-bold rounded-xl text-white bg-primary hover:opacity-90 transition-opacity duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                        Criar minha conta
                    </button>
                </div>
            </form>
        </div>
    );
};

export default RegisterPage;
