
import React, { useState } from 'react';

const CTASection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setMessage('Por favor, insira um e-mail válido.');
      setIsSuccess(false);
      return;
    }

    // Simulação de envio para a API
    setMessage('Obrigado pelo seu interesse! Entraremos em contato em breve.');
    setIsSuccess(true);
    setEmail('');

    setTimeout(() => {
        setMessage('');
    }, 5000);
  };

  return (
    <section id="cadastro" className="bg-primary">
      <div className="container mx-auto px-6 py-16 text-center">
        <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Seja um parceiro de sucesso!</h2>
        <p className="text-lg text-green-100 max-w-2xl mx-auto mb-8">
            Aumente sua visibilidade e atraia mais clientes da Zona Norte. Entre em contato para saber mais.
        </p>
        <div className="max-w-lg mx-auto">
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
                <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Digite o e-mail do seu negócio" 
                    className="flex-grow bg-white/90 px-5 py-4 rounded-xl text-text-primary border-2 border-transparent focus:outline-none focus:ring-4 focus:ring-white/50 transition-all duration-300 placeholder:text-text-secondary"
                    aria-label="E-mail do seu negócio"
                />
                <button 
                    type="submit" 
                    className="bg-surface text-primary font-bold px-8 py-4 rounded-xl hover:scale-105 transition-transform duration-300 shadow-lg"
                >
                    Quero ser parceiro
                </button>
            </form>
            {message && (
                <p className={`mt-4 text-sm font-semibold ${isSuccess ? 'text-white' : 'text-red-900'}`}>
                    {message}
                </p>
            )}
        </div>
      </div>
    </section>
  );
};

export default CTASection;
