

import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import Modal from './components/Modal';
import RegisterPartnerPage from './pages/RegisterPartnerPage';
import PartnerDashboardPage from './pages/PartnerDashboardPage';
import { supabase, isSupabaseConfigured } from './lib/supabaseClient';
import type { AuthSession } from '@supabase/supabase-js';
import type { Profile } from './lib/supabaseClient';
import { ToastProvider } from './contexts/ToastContext';
import SupabaseCredentialsWarning from './components/SupabaseCredentialsWarning';

function App(): React.ReactNode {
  if (!isSupabaseConfigured) {
    return <SupabaseCredentialsWarning />;
  }

  const [modal, setModal] = useState<'none' | 'login' | 'register' | 'register-partner'>('none');
  const [session, setSession] = useState<AuthSession | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      // FIX: supabase.getSession() does not exist. Corrected to supabase.auth.getSession().
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setLoading(false);
    };
    getSession();

    // FIX: supabase.onAuthStateChange does not exist. Corrected to supabase.auth.onAuthStateChange.
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session?.user) {
      const fetchProfile = async () => {
        try {
          const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();
          
          if (error) {
            throw error;
          }
          setProfile(data);
        } catch (error: any) {
           console.error('Error fetching profile:', error.message || error);
        }
      };
      fetchProfile();
    } else {
      setProfile(null);
    }
  }, [session]);
  
  // Lida com o hash da URL para abrir modais
  useEffect(() => {
    const handleHashChange = () => {
      // Only allow auth modals if not logged in
      if (session) {
        setModal('none');
        return;
      }
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
  }, [session]);
  
  const handleOpenLogin = useCallback(() => window.location.hash = '#/login', []);
  const handleOpenRegister = useCallback(() => window.location.hash = '#/cadastro-cliente', []);
  const handleOpenRegisterPartner = useCallback(() => window.location.hash = '#/cadastro-parceiro', []);
  
  const handleCloseModal = useCallback(() => {
    setModal('none');
    if (window.location.hash) {
      history.replaceState("", document.title, window.location.pathname + window.location.search);
    }
  }, []);

  const handleLogout = useCallback(async () => {
    // FIX: supabase.signOut() does not exist. Corrected to supabase.auth.signOut().
    await supabase.auth.signOut();
    window.location.hash = '';
  }, []);

  const handleSwitchToRegister = useCallback(() => window.location.hash = '#/cadastro-cliente', []);
  const handleSwitchToLogin = useCallback(() => window.location.hash = '#/login', []);
  
  const renderPage = () => {
    if (loading) {
      return <div className="flex-grow flex items-center justify-center"><p>Carregando...</p></div>;
    }

    if (session && profile) {
      if (profile.user_type === 'partner') {
        return <PartnerDashboardPage session={session} />;
      }
      return <DashboardPage session={session} />;
    }

    return <HomePage />;
  };

  return (
    <ToastProvider>
      <div className="bg-background text-text-primary min-h-screen font-sans antialiased flex flex-col">
        <Header 
          isLoggedIn={!!session}
          onLoginClick={handleOpenLogin} 
          onRegisterClick={handleOpenRegister}
          onRegisterPartnerClick={handleOpenRegisterPartner}
          onLogoutClick={handleLogout}
        />
        <main className="flex-grow">
          {renderPage()}
        </main>
        <Footer />

        <Modal isOpen={modal === 'login'} onClose={handleCloseModal}>
          <LoginPage 
            onSwitchToRegister={handleSwitchToRegister} 
            onClose={handleCloseModal}
            onLoginSuccess={handleCloseModal}
          />
        </Modal>

        <Modal isOpen={modal === 'register'} onClose={handleCloseModal}>
          <RegisterPage 
            onSwitchToLogin={handleSwitchToLogin} 
            onClose={handleCloseModal}
            onRegisterSuccess={handleCloseModal}
          />
        </Modal>

        <Modal isOpen={modal === 'register-partner'} onClose={handleCloseModal}>
          <RegisterPartnerPage 
            onClose={handleCloseModal}
            onRegisterSuccess={handleCloseModal}
          />
        </Modal>
      </div>
    </ToastProvider>
  );
}

export default App;