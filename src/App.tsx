import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { AuthModal } from './components/layout/AuthModal';
import { PresentationModal } from './components/layout/PresentationModal';

// Modules
import { TableroAnalitico } from './components/modules/AnalyticsDashboard/TableroAnalitico';
import { CalendarioContenido } from './components/modules/ContentCalendar/CalendarioContenido';
import { SocialListeningSentinel } from './components/modules/SocialListening/SocialListeningSentinel';
import { DirectorioInfluencers } from './components/modules/CreatorDirectory/DirectorioInfluencers';
import { InboxComunitario } from './components/modules/CommunityInbox/InboxComunitario';
import { ConfiguracionApis } from './components/modules/ApiGovernance/ConfiguracionApis';

const ModuleRenderer: React.FC = () => {
  const { currentModule } = useApp();

  switch (currentModule) {
    case 'tablero-analitico':
      return <TableroAnalitico />;
    case 'calendario-contenido':
      return <CalendarioContenido />;
    case 'social-listening':
      return <SocialListeningSentinel />;
    case 'directorio-influencers':
      return <DirectorioInfluencers />;
    case 'inbox-comunitario':
      return <InboxComunitario />;
    case 'configuracion-apis':
      return <ConfiguracionApis />;
    default:
      return <TableroAnalitico />;
  }
};

const ToastNotification: React.FC = () => {
  const { toastMessage } = useApp();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl bg-[#172033] border border-[#ffb951]/40 text-slate-100 shadow-2xl backdrop-blur-md animate-bounce-subtle">
      <span className="material-symbols-outlined text-[#ffb951] text-xl">
        info
      </span>
      <p className="text-sm font-medium text-slate-200">{toastMessage}</p>
    </div>
  );
};

const MainLayout: React.FC = () => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#0b1326] text-slate-100 font-sans selection:bg-[#ffb951]/30 selection:text-[#ffb951]">
      {/* Sidebar Navigation */}
      <Sidebar
        isMobileOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#0b1326]">
        {/* Header Bar */}
        <Header onToggleMobile={() => setMobileSidebarOpen((prev) => !prev)} />

        {/* Dynamic Module Body */}
        <main className="flex-1 overflow-y-auto bg-[#0b1326] p-4 lg:p-6 custom-scrollbar">
          <ModuleRenderer />
        </main>
      </div>

      {/* Modals & Overlays */}
      <AuthModal />
      <PresentationModal />
      <ToastNotification />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <MainLayout />
      </AppProvider>
    </AuthProvider>
  );
}
