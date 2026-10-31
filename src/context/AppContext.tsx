import React, { createContext, useContext, useState, useEffect } from 'react';
import { NavigationModule } from '../types';

interface AppContextType {
  currentModule: NavigationModule;
  setCurrentModule: (mod: NavigationModule) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  activeChannelFilter: 'all' | 'tiktok' | 'instagram' | 'facebook';
  setActiveChannelFilter: (c: 'all' | 'tiktok' | 'instagram' | 'facebook') => void;
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
  theme: 'dark' | 'light';
  setTheme: (t: 'dark' | 'light') => void;
  toggleTheme: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentModule, setCurrentModule] = useState<NavigationModule>('tablero-analitico');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeChannelFilter, setActiveChannelFilter] = useState<'all' | 'tiktok' | 'instagram' | 'facebook'>('all');
  const [notificationsCount, setNotificationsCount] = useState(2);
  const [isPresentationOpen, setIsPresentationOpen] = useState(false);
  const [activeCampaign, setActiveCampaign] = useState('Kajel Perú - Campaña Flores Amarillas (21 de Septiembre)');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    try {
      const saved = localStorage.getItem('kajel_theme');
      return saved === 'light' ? 'light' : 'dark';
    } catch {
      return 'dark';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('kajel_theme', theme);
      if (theme === 'light') {
        document.documentElement.classList.add('light');
        document.documentElement.classList.remove('dark');
      } else {
        document.documentElement.classList.remove('light');
        document.documentElement.classList.add('dark');
      }
    } catch (e) {
      console.error('Error saving theme to localStorage', e);
    }
  }, [theme]);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    showToast(next === 'light' ? 'Tema claro activado' : 'Tema oscuro activado');
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
        toggleSidebar,
        theme,
        setTheme,
        toggleTheme
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
