

import React, { useState } from 'react';
import type { Profile } from '../lib/supabaseClient';
import type { PartnerDashboardView } from '../pages/PartnerDashboardPage';
import { supabase } from '../lib/supabaseClient';

import { DashboardIcon } from './icons/DashboardIcon';
import { TagIcon } from './icons/TagIcon';
import { UserIcon } from './icons/UserIcon';
import { ChartBarIcon } from './icons/ChartBarIcon';
import { QrCodeIcon } from './icons/QrCodeIcon';
import { CheckBadgeIcon } from './icons/CheckBadgeIcon';
import { LogoutIcon } from './icons/LogoutIcon';
import { MenuIcon } from './icons/MenuIcon';
import { XIcon } from './icons/XIcon';

interface PartnerSidebarProps {
    activeView: PartnerDashboardView;
    setActiveView: (view: PartnerDashboardView) => void;
    profile: Profile | null;
    loading: boolean;
}

const PartnerSidebar: React.FC<PartnerSidebarProps> = ({ activeView, setActiveView, profile, loading }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    
    const navItems = [
        { id: 'overview', label: 'Visão Geral', icon: DashboardIcon },
        { id: 'offers', label: 'Minhas Ofertas', icon: TagIcon },
        { id: 'profile', label: 'Meu Perfil', icon: UserIcon },
        { id: 'validator', label: 'Validar Cupom', icon: CheckBadgeIcon },
        { id: 'qrcode', label: 'QR Code', icon: QrCodeIcon },
        { id: 'analytics', label: 'Analytics', icon: ChartBarIcon },
    ];
    
    const handleLogout = async () => {
        await supabase.auth.signOut();
        window.location.hash = '';
    };

    const NavLink: React.FC<{ item: typeof navItems[0] }> = ({ item }) => {
        const Icon = item.icon;
        const isActive = activeView === item.id;
        return (
            <button
                onClick={() => {
                    setActiveView(item.id as PartnerDashboardView);
                    setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 text-left ${
                    isActive
                        ? 'bg-primary text-white font-bold shadow-md shadow-primary/20'
                        : 'text-text-secondary hover:bg-gray-100 hover:text-text-primary font-medium'
                }`}
            >
                <Icon className="h-6 w-6 flex-shrink-0" />
                <span>{item.label}</span>
            </button>
        );
    };
    
    const SidebarContent = () => (
        <aside className="bg-surface lg:bg-transparent rounded-2xl lg:rounded-none p-6 lg:p-0 border border-border lg:border-none">
            {loading ? (
                 <div className="space-y-4 animate-pulse">
                    <div className="flex items-center space-x-4 mb-8">
                        <div className="h-16 w-16 bg-gray-200 rounded-full"></div>
                        <div className="space-y-2">
                            <div className="h-4 bg-gray-200 rounded w-32"></div>
                            <div className="h-3 bg-gray-200 rounded w-24"></div>
                        </div>
                    </div>
                    <div className="h-10 bg-gray-200 rounded-lg w-full"></div>
                    <div className="h-10 bg-gray-200 rounded-lg w-full"></div>
                    <div className="h-10 bg-gray-200 rounded-lg w-full"></div>
                 </div>
            ) : profile && (
                 <>
                    <div className="flex items-center space-x-4 mb-8">
                        <img src={profile.logo_url || 'https://picsum.photos/seed/placeholder/200'} alt="Logo" className="h-16 w-16 rounded-full object-cover border-2 border-primary/20" />
                        <div>
                            <h2 className="font-bold text-lg text-text-primary">{profile.company_name}</h2>
                            <p className="text-sm text-text-secondary">Parceiro Oficial</p>
                        </div>
                    </div>
                
                    <nav className="space-y-2">
                        {navItems.map(item => <NavLink key={item.id} item={item} />)}
                    </nav>

                    <div className="mt-8 pt-6 border-t border-border">
                         <button
                            onClick={handleLogout}
                            className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-text-secondary hover:bg-red-50 hover:text-red-600 transition-colors duration-200 font-medium"
                        >
                            <LogoutIcon className="h-6 w-6" />
                            <span>Sair</span>
                        </button>
                    </div>
                 </>
            )}
        </aside>
    );

    return (
       <>
            {/* Mobile Header */}
            <div className="lg:hidden flex justify-between items-center bg-surface p-4 rounded-2xl border border-border">
                <div className="font-bold text-text-primary text-lg">Menu do Parceiro</div>
                <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Toggle menu">
                    {isMobileMenuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
                </button>
            </div>
            
            {isMobileMenuOpen && (
                <div className="lg:hidden mt-4">
                    <SidebarContent />
                </div>
            )}

            {/* Desktop Sidebar */}
            <div className="hidden lg:block">
                <SidebarContent />
            </div>
       </>
    );
};

export default PartnerSidebar;