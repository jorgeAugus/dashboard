import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';

interface HeaderProps {
  onToggleMobile?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onToggleMobile }) => {
  const { 
    searchQuery, 
    setSearchQuery, 
    notificationsCount, 
    clearNotifications,
    setCurrentModule,
    showToast,
    isSidebarOpen,
    toggleSidebar,
    theme,
    toggleTheme
  } = useApp();
  const { profile, openAuthModal, user } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    {
      id: 'notif-1',
      title: 'Alerta Nivel 2: Demoras en Lima Norte',
      desc: '+34% quejas en Surco y San Miguel detectadas por Sentinel NLP.',
      time: 'Hace 4 min',
      type: 'crisis',
      action: () => setCurrentModule('social-listening')
    },
    {
      id: 'notif-2',
      title: 'Ticket Urgente SLA < 2 min',
      desc: '@mariana_flores_pe consulta por despacho a Miraflores.',
      time: 'Hace 6 min',
      type: 'ticket',
      action: () => setCurrentModule('inbox-comunitario')
    }
  ];

  const handleToggle = () => {
    if (onToggleMobile) {
      onToggleMobile();
    } else {
      toggleSidebar();
    }
  };

  return (
    <header className="h-16 w-full shrink-0 bg-[#0b1326]/90 backdrop-blur-xl z-30 border-b border-[#222a3d]/50 shadow-[0_1px_8px_rgba(0,0,0,0.1)]">
      <div className="w-full h-full px-4 lg:px-6 flex items-center justify-between gap-3">
        {/* Left side: Toggle button (desktop + mobile) + Store/Campaign Selector */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={handleToggle}
            className={`p-2 rounded-lg transition-all flex items-center gap-1.5 ${
              !isSidebarOpen 
                ? 'bg-[#171f33] text-[#ffc174] hover:bg-[#222a3d] border border-[#ffc174]/30' 
                : 'text-[#d8c3ad] hover:text-[#dae2fd] hover:bg-[#222a3d]'
            }`}
            title={isSidebarOpen ? 'Ocultar menú lateral' : 'Mostrar menú lateral'}
            aria-label={isSidebarOpen ? 'Ocultar menú lateral' : 'Mostrar menú lateral'}
          >
            <span className="material-symbols-outlined text-2xl">
              {isSidebarOpen ? 'menu_open' : 'menu'}
            </span>
            {!isSidebarOpen && (
              <span className="text-xs font-semibold pr-1 hidden sm:inline">
                Menú
              </span>
            )}
          </button>

          {/* Date range chip */}
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#171f33] text-[#d8c3ad] text-xs font-medium border border-[#222a3d]/60">
            <span className="material-symbols-outlined text-base text-[#ffc640]">local_florist</span>
            <span>Flores Amarillas · Primavera 2026</span>
          </div>
        </div>

        {/* Center: Search input */}
        <div className="flex-1 max-w-md hidden md:block">
          <div className="relative flex items-center w-full">
            <span className="material-symbols-outlined absolute left-3 text-[#d8c3ad] text-base">search</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar métricas, creadores o hashtags..."
              className="w-full pl-9 pr-8 py-1.5 rounded-lg bg-[#131b2e] border border-[#222a3d]/70 text-[#dae2fd] placeholder:text-[#d8c3ad]/70 text-xs focus:outline-none focus:ring-1 focus:ring-[#f59e0b] focus:border-[#f59e0b] transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 text-[#d8c3ad] hover:text-[#dae2fd]"
              >
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            )}
          </div>
        </div>

        {/* Right side: Notifications & User Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Notifications button and dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-lg text-[#d8c3ad] hover:text-[#dae2fd] hover:bg-[#222a3d] transition-colors"
              title="Notificaciones"
            >
              <span className="material-symbols-outlined text-xl">notifications</span>
              {notificationsCount > 0 && (
                <span className="absolute -top-1 -right-1 px-1.5 py-0.2 rounded-full bg-[#f59e0b] text-[#0b1326] text-[10px] font-bold shadow-md shadow-[#f59e0b]/30">
                  {notificationsCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-[#171f33] border border-[#222a3d] rounded-xl shadow-2xl py-2 z-50">
                <div className="px-4 py-2 flex items-center justify-between border-b border-[#222a3d]">
                  <span className="font-semibold text-xs text-[#dae2fd]">Centro de Alertas Sentinel</span>
                  <button
                    onClick={() => {
                      clearNotifications();
                      showToast('Todas las alertas marcadas como leídas');
                    }}
                    className="text-[11px] text-[#ffc174] hover:underline"
                  >
                    Marcar leídas
                  </button>
                </div>
                <div className="divide-y divide-[#222a3d]/60">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      onClick={() => {
                        n.action();
                        setShowNotifications(false);
                      }}
                      className="p-3 hover:bg-[#222a3d] transition-colors cursor-pointer flex items-start gap-2.5"
                    >
                      <span className="material-symbols-outlined text-lg text-[#ffb4ab] mt-0.5">
                        {n.type === 'crisis' ? 'warning' : 'inbox'}
                      </span>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-[#dae2fd]">{n.title}</span>
                          <span className="text-[10px] text-[#d8c3ad]">{n.time}</span>
                        </div>
                        <p className="text-[11px] text-[#d8c3ad] mt-0.5">{n.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Theme Toggle Button (Modo Claro / Oscuro) al costado de la campana */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-[#d8c3ad] hover:text-[#ffc174] hover:bg-[#222a3d] transition-all flex items-center justify-center relative group"
            title={theme === 'dark' ? 'Cambiar a Tema Claro' : 'Cambiar a Tema Oscuro'}
            aria-label={theme === 'dark' ? 'Cambiar a Tema Claro' : 'Cambiar a Tema Oscuro'}
          >
            <span className="material-symbols-outlined text-xl transition-transform duration-300 group-hover:rotate-45">
              {theme === 'dark' ? 'light_mode' : 'dark_mode'}
            </span>
          </button>

          {/* Profile Trigger */}
          <button
            onClick={openAuthModal}
            className="flex items-center gap-2 pl-2 p-1 rounded-lg hover:bg-[#222a3d] transition-colors group text-left"
            title="Gestionar Perfil y Autenticación Firebase"
          >
            <div className="relative">
              <img
                src={profile.avatarUrl}
                alt="Profile Avatar"
                className="w-8 h-8 rounded-full object-cover ring-1 ring-[#f59e0b]/40 group-hover:ring-[#f59e0b]"
              />
              <span
                className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-[#0b1326] ${
                  user ? 'bg-emerald-400' : 'bg-[#ffc640]'
                }`}
                title={user ? 'Conectado a Firebase' : 'Sesión Local Activa'}
              ></span>
            </div>
            <div className="hidden xl:flex flex-col text-left">
              <span className="text-xs font-semibold text-[#dae2fd] group-hover:text-[#ffc174] transition-colors">
                {profile.displayName || profile.role}
              </span>
              <span className="text-[10px] text-[#d8c3ad] font-mono">{profile.email}</span>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};
