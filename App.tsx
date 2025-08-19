
import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import PartnersSection from './components/PartnersSection';
import AboutSection from './components/AboutSection';
import CTASection from './components/CTASection';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import Modal from './components/Modal';
import RegisterPartnerPage from './pages/RegisterPartnerPage';
import PartnerDashboardPage from './pages/PartnerDashboardPage';

function App(): React.ReactNode {
  const [modal, setModal] = useState<'none' | 'login' | 'register' | 'register-partner'>('none');
  const [page, setPage] = useState<'home' | 'dashboard' | 'partner-dashboard'>('home');

  // Lida com o hash da URL para abrir modais
  useEffect(() => {
    const handleHashChange = () => {
      if (page !== 'home') return; // Só abre modal na home
      const hash = window.location.hash;
      if (hash === '#/login') {
        setModal('login');
      } else if (hash === '#/cadastro-cliente') {
        setModal('register');
      } else if (hash === '#/cadastro-parceiro') {
        setModal('register-partner');
      } else {
        setModal('none');
      }
    };
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [page]);
  
  const handleOpenLogin = useCallback(() => window.location.hash = '#/login', []);
  const handleOpenRegister = useCallback(() => window.location.hash = '#/cadastro-cliente', []);
  const handleOpenRegisterPartner = useCallback(() => window.location.hash = '#/cadastro-parceiro', []);
  
  const handleCloseModal = useCallback(() => {
    setModal('none');
    if (window.location.hash) {
      history.replaceState("", document.title, window.location.pathname + window.location.search);
    }
  }, []);

  const handleLoginSuccess = useCallback((userType: 'customer' | 'partner') => {
    handleCloseModal();
    setPage(userType === 'partner' ? 'partner-dashboard' : 'dashboard');
    window.scrollTo(0, 0);
  }, [handleCloseModal]);
  
  const handleLogout = useCallback(() => {
    setPage('home');
    window.location.hash = '';
  }, []);

  const handleSwitchToRegister = useCallback(() => window.location.hash = '#/cadastro-cliente', []);
  const handleSwitchToLogin = useCallback(() => window.location.hash = '#/login', []);

  return (
    <div className="bg-background text-text-primary min-h-screen font-sans antialiased flex flex-col">
      <Header 
        isLoggedIn={page === 'dashboard' || page === 'partner-dashboard'}
        onLoginClick={handleOpenLogin} 
        onRegisterClick={handleOpenRegister}
        onRegisterPartnerClick={handleOpenRegisterPartner}
        onLogoutClick={handleLogout}
      />
      <main className="flex-grow">
        {page === 'home' && (
          <>
            <Hero />
            <PartnersSection />
            <AboutSection />
            <CTASection />
          </>
        )}
        {page === 'dashboard' && <DashboardPage />}
        {page === 'partner-dashboard' && <PartnerDashboardPage />}
      </main>
      <Footer />

      <Modal isOpen={modal === 'login'} onClose={handleCloseModal}>
        <LoginPage 
          onSwitchToRegister={handleSwitchToRegister} 
          onClose={handleCloseModal}
          onLoginSuccess={handleLoginSuccess}
        />
      </Modal>

      <Modal isOpen={modal === 'register'} onClose={handleCloseModal}>
        <RegisterPage onSwitchToLogin={handleSwitchToLogin} onClose={handleCloseModal} />
      </Modal>

      <Modal isOpen={modal === 'register-partner'} onClose={handleCloseModal}>
        <RegisterPartnerPage onClose={handleCloseModal} />
      </Modal>
    </div>
  );
}

export default App;
