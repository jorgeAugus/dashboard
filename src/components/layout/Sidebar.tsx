import React from 'react';
import { useApp } from '../../context/AppContext';
import { NavigationModule } from '../../types';

export const Sidebar: React.FC = () => {
  const { currentModule, setCurrentModule, isSidebarOpen, setIsSidebarOpen } = useApp();

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
    // On small screens, close sidebar when navigating
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Backdrop (closes sidebar on tap outside) */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black/70 backdrop-blur-xs z-40 lg:hidden transition-opacity duration-300"
          aria-hidden="true"
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed lg:static top-0 bottom-0 left-0 z-50 h-full bg-[#060e20] flex flex-col justify-between border-r border-[#222a3d]/50 shadow-2xl lg:shadow-none transition-all duration-300 ease-in-out shrink-0 ${
          isSidebarOpen
            ? 'w-72 translate-x-0 opacity-100'
            : '-translate-x-full lg:translate-x-0 lg:w-0 lg:opacity-0 lg:border-r-0 lg:pointer-events-none'
        }`}
      >
        {/* Inner container with fixed width to prevent text squishing during collapse transition */}
        <div className="w-72 flex flex-col h-full justify-between overflow-y-auto custom-scrollbar">
          <div className="flex flex-col">
            {/* Brand header & Close button */}
            <div className="h-16 px-4 sm:px-5 flex items-center justify-between bg-[#131b2e] border-b border-[#222a3d]/50 shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#f59e0b] to-[#ffc640] flex items-center justify-center text-[#060e20] font-black shadow-md shadow-[#f59e0b]/20">
                  <span className="material-symbols-outlined text-lg font-bold">local_florist</span>
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-sm text-[#dae2fd] tracking-tight">Kajel Bloom</span>
                    <span className="px-1 py-0.2 rounded bg-[#222a3d] text-[#ffc174] text-[10px] font-semibold font-mono">
                      v2.4
                    </span>
                  </div>
                  <p className="text-[10px] text-[#8e98b0]">Retail Omnichannel</p>
                </div>
              </div>

              {/* Hide / Collapse Sidebar Button */}
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="p-1.5 rounded-lg text-[#8e98b0] hover:text-[#ffc174] hover:bg-[#222a3d] transition-colors flex items-center justify-center"
                title="Ocultar menú lateral"
                aria-label="Ocultar menú lateral"
              >
                <span className="material-symbols-outlined text-xl">menu_open</span>
              </button>
            </div>

            {/* Region Chip */}
            <div className="px-4 py-2.5">
              <div className="px-3 py-1.5 bg-[#171f33] rounded-lg flex items-center justify-between border border-[#222a3d]/60">
                <span className="text-[11px] text-[#d8c3ad] uppercase tracking-wider font-semibold">Región Activa</span>
                <span className="text-[11px] text-[#ffc640] flex items-center gap-1.5 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ffc640] animate-pulse"></span>
                  Perú Retail
                </span>
              </div>
            </div>

            {/* Navigation list */}
            <nav className="flex flex-col gap-1 px-3 py-1">
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


            </nav>
          </div>

          {/* Connected APIs Footer Widget */}
          <div className="p-4 flex flex-col gap-2 bg-[#060e20] border-t border-[#222a3d]/40 shrink-0">
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
                  <span>Facebook Graph API v20</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1877F2]"></span>
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
        </div>
      </aside>
    </>
  );
};
