
import React, { useState } from 'react';
import { MapPinIcon } from './icons/MapPinIcon';
import { MenuIcon } from './icons/MenuIcon';
import { XIcon } from './icons/XIcon';
import { LogoutIcon } from './icons/LogoutIcon';

interface HeaderProps {
  isLoggedIn: boolean;
  onLoginClick: () => void;
  onRegisterClick: () => void;
  onRegisterPartnerClick: () => void;
  onLogoutClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ isLoggedIn, onLoginClick, onRegisterClick, onRegisterPartnerClick, onLogoutClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: '#parceiros', label: 'Parceiros' },
    { href: '#sobre', label: 'Sobre Nós' },
  ];

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  const handleAuthClick = (e: React.MouseEvent, action: () => void) => {
    e.preventDefault();
    action();
    setIsMenuOpen(false);
  };
  
  const handleLogoClick = (e: React.MouseEvent) => {
    if (isLoggedIn) {
      e.preventDefault();
      onLogoutClick();
    }
  }

  return (
    <header className="bg-background/80 backdrop-blur-sm border-b border-border sticky top-0 z-40">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <a href="#/" onClick={handleLogoClick} className="flex items-center space-x-2">
           <MapPinIcon className="h-8 w-8 text-primary" />
           <span className="text-2xl font-black text-text-primary tracking-tighter">
             CLUBE<span className="text-primary">ZN</span>
           </span>
        </a>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-6">
          {!isLoggedIn && (
            <>
              {navLinks.map((link) => (
                <a key={link.href} href={link.href} className="text-text-secondary hover:text-primary transition-colors duration-300 font-medium">
                  {link.label}
                </a>
              ))}
              <a href="#/cadastro-parceiro" onClick={(e) => handleAuthClick(e, onRegisterPartnerClick)} className="text-text-secondary hover:text-primary transition-colors duration-300 font-medium">
                Seja Parceiro
              </a>
              <div className="w-px h-6 bg-border mx-1"></div>
              <a href="#/login" onClick={(e) => handleAuthClick(e, onLoginClick)} className="text-text-secondary hover:text-primary transition-colors duration-300 font-medium">
                Login
              </a>
              <a href="#/cadastro-cliente" onClick={(e) => handleAuthClick(e, onRegisterClick)} className="bg-primary text-white px-6 py-2 rounded-full hover:opacity-90 transition-opacity duration-300 font-bold">
                Quero Desconto
              </a>
            </>
          )}
          {isLoggedIn && (
            <button onClick={onLogoutClick} className="flex items-center space-x-2 bg-red-500 text-white px-6 py-2 rounded-full hover:opacity-90 transition-opacity duration-300 font-bold">
              <LogoutIcon className="h-5 w-5" />
              <span>Sair</span>
            </button>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-text-primary focus:outline-none"
            aria-label="Abrir menu"
          >
            {isMenuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} bg-surface absolute top-full left-0 w-full shadow-lg border-t border-border`}>
        <div className="flex flex-col px-6 py-4">
          {!isLoggedIn && (
            <>
              {navLinks.map((link) => (
                <a key={link.href} href={link.href} onClick={handleLinkClick} className="text-text-secondary hover:text-primary transition-colors duration-300 font-medium py-3 text-center">
                  {link.label}
                </a>
              ))}
              <a href="#/cadastro-parceiro" onClick={(e) => handleAuthClick(e, onRegisterPartnerClick)} className="text-text-secondary hover:text-primary transition-colors duration-300 font-medium py-3 text-center">
                  Seja Parceiro
              </a>
              <div className="w-full pt-4 mt-2 border-t border-border space-y-3">
                <a href="#/login" onClick={(e) => handleAuthClick(e, onLoginClick)} className="block w-full text-center bg-surface text-primary border border-primary px-4 py-3 rounded-full hover:bg-primary/5 transition-colors duration-300 font-bold">
                  Login
                </a>
                <a href="#/cadastro-cliente" onClick={(e) => handleAuthClick(e, onRegisterClick)} className="block w-full text-center bg-primary text-white px-4 py-3 rounded-full hover:opacity-90 transition-opacity duration-300 font-bold">
                  Quero Desconto
                </a>
              </div>
            </>
          )}
          {isLoggedIn && (
            <div className="w-full pt-2">
              <button onClick={() => { onLogoutClick(); setIsMenuOpen(false); }} className="flex items-center justify-center space-x-2 w-full text-center bg-red-500 text-white px-4 py-3 rounded-full hover:opacity-90 transition-opacity duration-300 font-bold">
                <LogoutIcon className="h-5 w-5" />
                <span>Sair</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
