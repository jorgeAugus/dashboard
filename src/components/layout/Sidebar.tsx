import React from 'react';
import { useApp } from '../../context/AppContext';
import { NavigationModule } from '../../types';

interface SidebarProps {
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isMobileOpen, onCloseMobile }) => {
  const { currentModule, setCurrentModule, setIsPresentationOpen } = useApp();

  const navItems: Array<{
    id: NavigationModule;
    label: string;
    icon: string;
    badge?: number;
  }> = [
    { id: 'tablero-analitico', label: 'Tablero Analítico', icon: 'analytics' },
    { id: 'calendario-contenido', label: 'Calendario Contenido', icon: 'calendar_month' },
    { id: 'social-listening', label: 'Social Listening', icon: 'radar' },
    { id: 'directorio-influencers', label: 'Directorio Influencers', icon: 'group' },
    { id: 'inbox-comunitario', label: 'Inbox Comunitario', icon: 'forum', badge: 14 },
    { id: 'configuracion-apis', label: 'Configuración & APIs', icon: 'tune' },
  ];

  const handleSelect = (id: NavigationModule) => {
    setCurrentModule(id);
    if (onCloseMobile) onCloseMobile();
  };

  return (
    <aside
      className={`fixed left-0 top-0 h-full w-72 bg-[#060e20] z-50 flex flex-col justify-between border-r border-[#222a3d]/40 shadow-[0_1px_8px_rgba(0,0,0,0.1)] transition-transform duration-300 ${
        isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}
    >
      <div className="flex flex-col">
        {/* Brand header */}
        <div className="h-16 px-6 flex items-center justify-between bg-[#131b2e] border-b border-[#222a3d]/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#f59e0b] to-[#ffc640] flex items-center justify-center text-[#060e20] font-black shadow-md shadow-[#f59e0b]/20">
              <span className="material-symbols-outlined text-lg font-bold">local_florist</span>
            </div>
            <span className="font-semibold text-base text-[#dae2fd] tracking-tight">Kajel Bloom</span>
          </div>
          <span className="px-1.5 py-0.5 rounded bg-[#222a3d] text-[#ffc174] text-[11px] font-semibold font-mono">
            v2.4 Pro
          </span>
        </div>

        {/* Region Chip */}
        <div className="px-6 py-2.5">
          <div className="px-3 py-1.5 bg-[#171f33] rounded-lg flex items-center justify-between border border-[#222a3d]/60">
            <span className="text-[11px] text-[#d8c3ad] uppercase tracking-wider font-semibold">Región Activa</span>
            <span className="text-[11px] text-[#ffc640] flex items-center gap-1.5 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ffc640] animate-pulse"></span>
              Perú Retail
            </span>
          </div>
        </div>

        {/* Navigation list */}
        <nav className="flex flex-col gap-1 px-3 py-2">
          {navItems.map((item) => {
            const isActive = currentModule === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelect(item.id)}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-[#f59e0b] text-[#0b1326] font-semibold shadow-md shadow-[#f59e0b]/20'
                    : 'text-[#d8c3ad] hover:bg-[#222a3d] hover:text-[#dae2fd]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`material-symbols-outlined text-lg ${isActive ? 'text-[#0b1326]' : 'text-[#ffc174]'}`}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                      isActive ? 'bg-[#0b1326] text-[#ffc640]' : 'bg-[#f59e0b] text-[#0b1326]'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-2 mt-2 border-t border-[#222a3d]/50">
            <button
              onClick={() => {
                setIsPresentationOpen(true);
                if (onCloseMobile) onCloseMobile();
              }}
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-semibold bg-[#171f33] hover:bg-[#222a3d] text-[#ffc174] border border-[#ffc174]/20 transition-all"
            >
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-base text-[#ffc640]">slideshow</span>
                <span>Sustentación / Pitch 2026</span>
              </div>
              <span className="text-[10px] font-mono bg-[#ffc640]/20 text-[#ffc640] px-1.5 py-0.5 rounded">5 min</span>
            </button>
          </div>
        </nav>
      </div>

      {/* Connected APIs Footer Widget */}
      <div className="p-4 flex flex-col gap-2 bg-[#060e20] border-t border-[#222a3d]/40">
        <div className="p-3.5 rounded-lg bg-[#131b2e] flex flex-col gap-2.5 border border-[#222a3d]/60">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-[#d8c3ad] uppercase tracking-wider font-semibold">APIs Conectadas</span>
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ffc640] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ffc640]"></span>
            </span>
          </div>

          <div className="flex flex-col gap-1 text-xs text-[#dae2fd]">
            <div className="flex items-center justify-between py-0.5">
              <span>TikTok Marketing API</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#22d3ee]"></span>
            </div>
            <div className="flex items-center justify-between py-0.5">
              <span>Meta Graph API v19</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#f43f5e]"></span>
            </div>
            <div className="flex items-center justify-between py-0.5">
              <span>Pinterest Ads API v5</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#f87171]"></span>
            </div>
          </div>

          <div className="pt-1">
            <div className="flex justify-between text-[11px] text-[#d8c3ad] mb-1 font-mono">
              <span>Cuota Data Mensual</span>
              <span className="text-[#ffc640] font-semibold">84%</span>
            </div>
            <div className="w-full bg-[#2d3449] rounded-full h-1.5 overflow-hidden">
              <div className="bg-[#f59e0b] h-1.5 rounded-full transition-all duration-500" style={{ width: '84%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
