
import React, { useState } from 'react';
import { MapPinIcon } from '../components/icons/MapPinIcon';

interface RegisterPartnerPageProps {
  onClose: () => void;
}

const RegisterPartnerPage: React.FC<RegisterPartnerPageProps> = ({ onClose }) => {
    const [formData, setFormData] = useState({
        companyName: '',
        cnpj: '',
        activity: '',
        responsibleName: '',
        email: '',
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
        console.log('Partner form data submitted:', formData);
        alert('Cadastro de parceiro realizado com sucesso! (Simulação)');
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
                    Cadastre sua empresa
                </h2>
                <p className="mt-2 text-center text-sm text-text-secondary">
                    Faça parte da nossa rede de parceiros e conecte-se a clientes locais.
                </p>
            </div>
            <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
                <div className="space-y-4">
                    <input name="companyName" type="text" required placeholder="Nome Fantasia" className={inputClasses} value={formData.companyName} onChange={handleInputChange} />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input name="cnpj" type="text" required placeholder="CNPJ" className={inputClasses} value={formData.cnpj} onChange={handleInputChange} />
                        <input name="activity" type="text" placeholder="Ramo de Atividade" className={inputClasses} value={formData.activity} onChange={handleInputChange} />
                    </div>
                    <hr className="border-border" />
                    <input name="responsibleName" type="text" required placeholder="Nome do Responsável" className={inputClasses} value={formData.responsibleName} onChange={handleInputChange} />
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input name="email" type="email" required placeholder="E-mail de Contato" className={inputClasses} value={formData.email} onChange={handleInputChange} />
                        <input name="phone" type="tel" placeholder="Celular (com DDD)" className={inputClasses} value={formData.phone} onChange={handleInputChange} />
                    </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input name="password" type="password" required placeholder="Crie uma senha" className={inputClasses} value={formData.password} onChange={handleInputChange} />
                        <input name="passwordConfirm" type="password" required placeholder="Confirme a senha" className={inputClasses} value={formData.passwordConfirm} onChange={handleInputChange} />
                    </div>
                </div>

                <div className="flex items-start">
                    <div className="flex items-center h-5">
                        <input id="partner-terms" name="terms" type="checkbox" required className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded" checked={formData.terms} onChange={handleInputChange} />
                    </div>
                    <div className="ml-3 text-sm">
                        <label htmlFor="partner-terms" className="text-text-secondary">
                            Eu li e aceito os <a href="#" className="font-medium text-primary hover:text-primary/80">Termos de Parceria</a>.
                        </label>
                    </div>
                </div>

                <div>
                    <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent text-lg font-bold rounded-xl text-white bg-primary hover:opacity-90 transition-opacity duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                        Finalizar Cadastro
                    </button>
                </div>
            </form>
        </div>
    );
};

export default RegisterPartnerPage;
