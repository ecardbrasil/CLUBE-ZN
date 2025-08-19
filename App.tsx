
import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import Modal from './components/Modal';

function App(): React.ReactNode {
  const [modal, setModal] = useState<'none' | 'login' | 'register'>('none');
  const [page, setPage] = useState<'home' | 'dashboard'>('home');

  // Lida com o hash da URL para abrir modais
  useEffect(() => {
    const handleHashChange = () => {
      if (page !== 'home') return; // Só abre modal na home
      const hash = window.location.hash;
      if (hash === '#/login') {
        setModal('login');
      } else if (hash === '#/cadastro-cliente') {
        setModal('register');
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
  
  const handleCloseModal = useCallback(() => {
    setModal('none');
    if (window.location.hash) {
      history.replaceState("", document.title, window.location.pathname + window.location.search);
    }
  }, []);

  const handleLoginSuccess = useCallback(() => {
    handleCloseModal();
    setPage('dashboard');
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
        isLoggedIn={page === 'dashboard'}
        onLoginClick={handleOpenLogin} 
        onRegisterClick={handleOpenRegister}
        onLogoutClick={handleLogout}
      />
      <main className="flex-grow">
        {page === 'home' && <HomePage />}
        {page === 'dashboard' && <DashboardPage />}
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
    </div>
  );
}

export default App;
