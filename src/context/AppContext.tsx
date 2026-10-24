import React, { createContext, useContext, useState } from 'react';
import { NavigationModule } from '../types';

interface AppContextType {
  currentModule: NavigationModule;
  setCurrentModule: (mod: NavigationModule) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  activeChannelFilter: 'all' | 'tiktok' | 'instagram' | 'pinterest';
  setActiveChannelFilter: (c: 'all' | 'tiktok' | 'instagram' | 'pinterest') => void;
  notificationsCount: number;
  clearNotifications: () => void;
  isPresentationOpen: boolean;
  setIsPresentationOpen: (open: boolean) => void;
  activeCampaign: string;
  setActiveCampaign: (camp: string) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentModule, setCurrentModule] = useState<NavigationModule>('tablero-analitico');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeChannelFilter, setActiveChannelFilter] = useState<'all' | 'tiktok' | 'instagram' | 'pinterest'>('all');
  const [notificationsCount, setNotificationsCount] = useState(2);
  const [isPresentationOpen, setIsPresentationOpen] = useState(false);
  const [activeCampaign, setActiveCampaign] = useState('Kajel Perú - Campaña Primavera / Flores Amarillas');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  return (
    <AppContext.Provider
      value={{
        currentModule,
        setCurrentModule,
        searchQuery,
        setSearchQuery,
        activeChannelFilter,
        setActiveChannelFilter,
        notificationsCount,
        clearNotifications: () => setNotificationsCount(0),
        isPresentationOpen,
        setIsPresentationOpen,
        activeCampaign,
        setActiveCampaign,
        toastMessage,
        showToast,
        isSidebarOpen,
        setIsSidebarOpen,
        toggleSidebar
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
