import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';

export const TableroAnalitico: React.FC = () => {
  const { 
    activeChannelFilter, 
    setActiveChannelFilter, 
    setCurrentModule, 
    showToast,
    searchQuery 
  } = useApp();

  const [trafficTab, setTrafficTab] = useState<'reach' | 'interactions' | 'clicks'>('reach');
  const [isExporting, setIsExporting] = useState(false);
  const [selectedSort, setSelectedSort] = useState('roi');

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      showToast('Reporte Ejecutivo (PDF/CSV) descargado con éxito');
    }, 1200);
  };

  const publications = [
    {
      id: 'pub-1',
      title: '"El verdadero significado de regalar flores amarillas este 21"',
      sub: 'ID: #TK-FLOR-882 • Tag: #FloresAmarillasPeru',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD9kkLiWPMPegOCsIE_2wqJWE4lziSlCr7coC_MMfUwhsBgzyPvOE60ctO64Oe04O4VVVxtB_fPifCvrwexRwzwO4_bDXE2Rut29skkcoGSeka--CJWctDAPaDom7-8HjMMtu_p3UEThJW08mifjqdYvQ2TwgLLQAqU9GitvLzRJGOZlM9BP-9tUSy3aG3pOtlbjcOhAyipWPU6UqMd9Qh75iVIfkJgT7jbjcKCOI_nGem_awkYmZiNzQ',
      channel: 'tiktok',
      badge: 'TikTok Viral Video',
      badgeColor: 'bg-cyan-500/15 text-cyan-400',
      reach: '1,420,800',
      reachRaw: 1420800,
      er: '9.62%',
      erRaw: 9.62,
      revenue: 'S/ 48,150',
      revenueRaw: 48150,
      orders: '720 órdenes web',
      sentinelStatus: '98% Positivo',
      sentinelColor: 'bg-emerald-500/15 text-emerald-400'
    },
    {
      id: 'pub-2',
      title: 'Colección Primavera Bloom: Outfits Amarillos para Oficina',
      sub: 'ID: #IG-OUTFIT-104 • Colab @valeria.lifestyle',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC43ZdQhZva_99x7XSlUKY0V4MRLrunlLJLsvjmzMjpnQB-JyriEhjtYB-Pi8jIhJqf6FXxWfQfp9vXc4vQCcx4sV2ABugk9danQ43rkRYR7MxOOVGQGQzMVamNu3nLrKb1ukKO8XzEYnfYtsJh7kfpUGd1V14T4EWDUi3qFbfePqJCA3fJeOKyu5W4GbTClhyjWO0tVWhbEj1mdabBCGrs8Qd2y7AD1dne_y6zN_A8XCQgimEJ951nGg',
      channel: 'instagram',
      badge: 'Instagram Reel',
      badgeColor: 'bg-pink-500/15 text-pink-400',
      reach: '980,400',
      reachRaw: 980400,
      er: '7.45%',
      erRaw: 7.45,
      revenue: 'S/ 32,800',
      revenueRaw: 32800,
      orders: '410 carritos pagados',
      sentinelStatus: '94% Positivo',
      sentinelColor: 'bg-emerald-500/15 text-emerald-400'
    },
    {
      id: 'pub-3',
      title: 'Moodboard: Inspiración Floral & Mesa de Estación Perú',
      sub: 'ID: #PIN-CAT-309 • Enlace Directo Catálogo Shopify',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDtSc0lSalC8Gtun0xwj5xpGWAXN-4zqtkB7oSJBRUlMkkvJ1gyY89fjFjRBD6z-GHr1Wovr7BDDxKFbVIQMggnnU-uYdZQiG9B0GslCg6R6xCEFViRP0htC3cCdD1fT1Vi23KTByadkjdCJ8N47vUO4qP1GnE5e255zLwBRT_2vacFSLR5-ro86xel2r7qYxQgPIta8RoSnMByNq3Ac8bJLCOdHS5WklcFijkY2OeKPpnpHfvSLirOcA',
      channel: 'pinterest',
      badge: 'Pin de Catálogo',
      badgeColor: 'bg-rose-500/15 text-rose-400',
      reach: '512,100',
      reachRaw: 512100,
      er: '18.2% Guardados',
      erRaw: 18.2,
      revenue: 'S/ 29,400',
      revenueRaw: 29400,
      orders: '285 compras directas',
      sentinelStatus: 'Neutral / Consultas',
      sentinelColor: 'bg-[#222a3d] text-[#ffc640]'
    },
    {
      id: 'pub-4',
      title: 'POV: Te llega el arreglo sorpresa antes de las 12 PM',
      sub: 'ID: #TK-UGC-012 • Formato Reacción Orgánica',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDGaffwMehl1_UiKw038AguYpY010K89-AC_5KUTQelIRSII-fsW_3K6i8nDtUfCv_qCnEdwU5RqziCARGVWikZmAlUCCQId7RQf53vTCgxy4rWTyQ8d17B8rJLIboZy2Mfxuj5Yf6n3GsMZ2Jy9fk_x7XaUljBkC0PBeTK8svChfDlvqU2jOolVm9KbLZJo4HHfAwFcD52LCrbRBgCrlM-QxKuiZMO7TMKmVWleZRFdYTJ2wPGxfg5eQ',
      channel: 'tiktok',
      badge: 'TikTok Duet / UGC',
      badgeColor: 'bg-cyan-500/15 text-cyan-400',
      reach: '845,900',
      reachRaw: 845900,
      er: '8.90%',
      erRaw: 8.9,
      revenue: 'S/ 22,300',
      revenueRaw: 22300,
      orders: '310 envíos express',
      sentinelStatus: '99% Positivo',
      sentinelColor: 'bg-emerald-500/15 text-emerald-400'
    }
  ];

  const filteredPublications = publications
    .filter((p) => {
      if (activeChannelFilter !== 'all' && p.channel !== activeChannelFilter) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return p.title.toLowerCase().includes(q) || p.sub.toLowerCase().includes(q);
      }
      return true;
    })
    .sort((a, b) => {
      if (selectedSort === 'roi') return b.revenueRaw - a.revenueRaw;
      if (selectedSort === 'reach') return b.reachRaw - a.reachRaw;
      if (selectedSort === 'er') return b.erRaw - a.erRaw;
      return 0;
    });

  return (
    <div className="flex flex-col w-full gap-6">
      {/* TOP CONTEXT & DASHBOARD HEADER */}
      <section className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <div className="flex flex-wrap items-center gap-2.5">
              <h1 className="text-2xl sm:text-3xl font-bold text-[#dae2fd] tracking-tight">
                Tablero Analítico Ejecutivo
              </h1>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#222a3d] shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[#ffc640] animate-pulse"></span>
                <span className="text-[11px] text-[#ffc640] font-semibold">
                  En Vivo (Sincronización Webhook 418ms)
                </span>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-[#d8c3ad] flex flex-wrap items-center gap-2">
              <span>Consolidado Omnicanal: TikTok Creator API</span>
              <span className="inline-block w-1 h-1 rounded-full bg-[#a08e7a]"></span>
              <span>Meta Graph v20+</span>
              <span className="inline-block w-1 h-1 rounded-full bg-[#a08e7a]"></span>
              <span>Pinterest API v5</span>
              <span className="inline-block w-1 h-1 rounded-full bg-[#a08e7a]"></span>
              <span className="text-[#ffc174] font-medium">Mercado: Perú Retail</span>
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleExport}
              disabled={isExporting}
              className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#222a3d] hover:bg-[#31394d] text-[#dae2fd] transition-all text-xs font-semibold shadow-sm"
            >
              <span className={`material-symbols-outlined text-base text-[#ffc174] ${isExporting ? 'animate-spin' : ''}`}>
                {isExporting ? 'sync' : 'download'}
              </span>
              <span>{isExporting ? 'Generando PDF/CSV...' : 'Descargar Reporte (PDF/CSV)'}</span>
            </button>
            <button
              onClick={() => showToast('Share of Voice: Kajel Bloom lidera con 48.2% en Lima Metropolitana')}
              className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#222a3d] hover:bg-[#31394d] text-[#dae2fd] transition-all text-xs font-semibold shadow-sm"
            >
              <span className="material-symbols-outlined text-base text-[#ffc640]">pie_chart</span>
              <span>Share of Voice</span>
            </button>
            <button
              onClick={() => setCurrentModule('calendario-contenido')}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#f59e0b] text-[#0b1326] hover:bg-[#ffc640] text-xs font-bold shadow-[0_4px_20px_-2px_rgba(245,158,11,0.28)] transition-all"
            >
              <span className="material-symbols-outlined text-base">bolt</span>
              <span>Programar Post Optimizado</span>
            </button>
          </div>
        </div>

        {/* Platform Filter Chips Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-2 rounded-xl bg-[#131b2e] border border-[#222a3d]/60 shadow-sm">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setActiveChannelFilter('all')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all shadow-sm ${
                activeChannelFilter === 'all'
                  ? 'bg-[#f59e0b] text-[#0b1326]'
                  : 'bg-[#171f33] text-[#d8c3ad] hover:text-[#dae2fd] hover:bg-[#222a3d]'
              }`}
            >
              Todos los Canales
            </button>
            <button
              onClick={() => setActiveChannelFilter('tiktok')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeChannelFilter === 'tiktok'
                  ? 'bg-[#22d3ee] text-[#0b1326]'
                  : 'bg-[#171f33] text-[#d8c3ad] hover:text-[#dae2fd] hover:bg-[#222a3d]'
              }`}
            >
              <span className="inline-flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#22d3ee]"></span>
                TikTok (Viral)
              </span>
            </button>
            <button
              onClick={() => setActiveChannelFilter('instagram')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeChannelFilter === 'instagram'
                  ? 'bg-[#f43f5e] text-white'
                  : 'bg-[#171f33] text-[#d8c3ad] hover:text-[#dae2fd] hover:bg-[#222a3d]'
              }`}
            >
              <span className="inline-flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#f43f5e]"></span>
                Instagram (Comunidad)
              </span>
            </button>
            <button
              onClick={() => setActiveChannelFilter('pinterest')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeChannelFilter === 'pinterest'
                  ? 'bg-[#f87171] text-white'
                  : 'bg-[#171f33] text-[#d8c3ad] hover:text-[#dae2fd] hover:bg-[#222a3d]'
              }`}
            >
              <span className="inline-flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#f87171]"></span>
                Pinterest (Catálogo & Conversión)
              </span>
            </button>
          </div>

          <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-[#171f33] text-[#d8c3ad] text-[11px] font-mono border border-[#222a3d]/50">
            <span className="material-symbols-outlined text-sm text-[#ffc640]">tune</span>
            <span>Atribución: Modelo Multi-Touch (Data-Driven)</span>
          </div>
        </div>
      </section>

      {/* TOP 4 KPI HERO TILES */}
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {/* KPI 1: Alcance Omnicanal */}
        <div className="rounded-xl bg-[#171f33] p-4 flex flex-col justify-between border border-[#222a3d] shadow-md hover:bg-[#222a3d]/70 transition-all">
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="text-xs text-[#d8c3ad] uppercase tracking-wider font-semibold">Alcance Omnicanal</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl lg:text-3xl font-extrabold text-[#dae2fd] font-metric">4,842,910</span>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-[#2d3449] text-[#ffc640] text-xs font-bold flex items-center gap-0.5">
              <span className="material-symbols-outlined text-xs">trending_up</span>+32.4%
            </span>
          </div>

          {/* Sparkline Visual */}
          <div className="my-3 w-full h-10 flex items-end">
            <svg className="w-full h-full text-[#ffc640]" fill="none" preserveAspectRatio="none" viewBox="0 0 200 45">
              <path d="M0,35 Q20,38 40,28 T80,30 T120,18 T160,22 T200,4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"></path>
              <path d="M0,35 Q20,38 40,28 T80,30 T120,18 T160,22 T200,4 L200,45 L0,45 Z" fill="currentColor" fillOpacity="0.15"></path>
            </svg>
          </div>

          <div className="pt-2 border-t border-[#222a3d]/60 flex items-center justify-between text-[11px] text-[#d8c3ad]">
            <span className="text-[#dae2fd] font-medium">TikTok 2.4M (50%)</span>
            <span>IG 1.8M (37%)</span>
            <span>Pin 642K (13%)</span>
          </div>
        </div>

        {/* KPI 2: Engagement Rate */}
        <div className="rounded-xl bg-[#171f33] p-4 flex flex-col justify-between border border-[#222a3d] shadow-md hover:bg-[#222a3d]/70 transition-all">
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="text-xs text-[#d8c3ad] uppercase tracking-wider font-semibold">Engagement Rate Ponderado</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl lg:text-3xl font-extrabold text-[#ffc174] font-metric">6.84%</span>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>Óptimo
            </span>
          </div>

          <div className="my-3 flex flex-col gap-1.5">
            <div className="flex justify-between text-[11px] text-[#d8c3ad]">
              <span>Meta Retail Perú (4.9%)</span>
              <span className="text-[#dae2fd] font-semibold">85% completado</span>
            </div>
            <div className="w-full bg-[#2d3449] rounded-full h-2 overflow-hidden">
              <div className="bg-[#f59e0b] h-2 rounded-full transition-all duration-500" style={{ width: '85%' }}></div>
            </div>
          </div>

          <div className="pt-2 border-t border-[#222a3d]/60 flex items-center justify-between text-[11px] text-[#d8c3ad]">
            <span className="text-emerald-400 font-semibold">+1.9% vs Promedio</span>
            <span>Falabella / Ripley</span>
          </div>
        </div>

        {/* KPI 3: Valor Publicitario (EMV / ROI) */}
        <div className="rounded-xl bg-[#171f33] p-4 flex flex-col justify-between border border-[#222a3d] shadow-md hover:bg-[#222a3d]/70 transition-all">
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="text-xs text-[#d8c3ad] uppercase tracking-wider font-semibold">Valor Publicitario (EMV / ROI)</span>
              <div className="flex items-baseline gap-1.5 mt-1">
                <span className="text-2xl lg:text-3xl font-extrabold text-[#dae2fd] font-metric">S/ 148,650</span>
                <span className="text-xs text-[#d8c3ad] font-mono">PEN</span>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-[#2d3449] text-[#ffc640] text-xs font-semibold">
              +41.8% MoM
            </span>
          </div>

          <div className="my-2 p-2 rounded-lg bg-[#131b2e] flex flex-col gap-1 text-xs">
            <div className="flex justify-between items-center text-[#dae2fd]">
              <span className="flex items-center gap-1 text-[#d8c3ad]">
                <span className="material-symbols-outlined text-sm text-[#ffc174]">link</span>UTM Influencers
              </span>
              <span className="font-semibold text-[#ffc174]">S/ 89,400</span>
            </div>
            <div className="flex justify-between items-center text-[#dae2fd]">
              <span className="flex items-center gap-1 text-[#d8c3ad]">
                <span className="material-symbols-outlined text-sm text-[#ff9837]">shopping_bag</span>Catálogo Pinterest
              </span>
              <span className="font-semibold text-[#ff9837]">S/ 59,250</span>
            </div>
          </div>

          <div className="pt-1 border-t border-[#222a3d]/60 flex items-center justify-between text-[11px] text-[#d8c3ad]">
            <span>Cálculo IAB Perú</span>
            <span className="text-[#ffc640] font-bold">ROAS 4.6x</span>
          </div>
        </div>

        {/* KPI 4: Sentinel Social SLA */}
        <div className="rounded-xl bg-[#171f33] p-4 flex flex-col justify-between border border-[#222a3d] shadow-md hover:bg-[#222a3d]/70 transition-all">
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="text-xs text-[#d8c3ad] uppercase tracking-wider font-semibold">Sentinel Social SLA</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl lg:text-3xl font-extrabold text-[#dae2fd] font-metric">5.2 min</span>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold flex items-center gap-1">
              <span className="material-symbols-outlined text-xs">verified</span>Meta &lt; 10m
            </span>
          </div>

          <div className="my-2 p-2 rounded-lg bg-[#131b2e] flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#222a3d] flex items-center justify-center text-[#ffc640] shrink-0">
              <span className="material-symbols-outlined text-lg">shield</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-[#dae2fd] font-semibold">0 Alertas de Crisis Activas</span>
              <span className="text-[11px] text-[#d8c3ad]">14 menciones resueltas hoy</span>
            </div>
          </div>

          <div className="pt-1 border-t border-[#222a3d]/60 flex items-center justify-between text-[11px] text-[#d8c3ad]">
            <span>Tasa Contención AI: 94%</span>
            <span className="text-emerald-400 font-medium">Escudos Activos</span>
          </div>
        </div>
      </section>

      {/* MAIN CHARTS & VISUAL ANALYTICS (7:5 Split) */}
      <section className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Left Column (7/12) - Evolución Temporal y Tendencia Viral */}
        <div className="xl:col-span-7 flex flex-col rounded-xl bg-[#171f33] p-5 border border-[#222a3d] shadow-md">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-[#dae2fd]">Evolución de Tráfico y Conversiones</h2>
                <span className="px-2 py-0.5 rounded bg-[#222a3d] text-[#ffc174] text-[11px] font-mono">Marzo 2026</span>
              </div>
              <span className="text-xs text-[#d8c3ad]">Campaña "Flores Amarillas" • TikTok & Meta Omnichannel</span>
            </div>

            {/* Metric Tab Switcher */}
            <div className="flex items-center p-1 rounded-lg bg-[#131b2e] border border-[#222a3d]/60">
              <button
                onClick={() => setTrafficTab('reach')}
                className={`px-3 py-1 rounded text-xs font-semibold transition-colors ${
                  trafficTab === 'reach' ? 'bg-[#222a3d] text-[#dae2fd]' : 'text-[#d8c3ad] hover:text-[#dae2fd]'
                }`}
              >
                Alcance Bruto
              </button>
              <button
                onClick={() => setTrafficTab('interactions')}
                className={`px-3 py-1 rounded text-xs font-semibold transition-colors ${
                  trafficTab === 'interactions' ? 'bg-[#222a3d] text-[#dae2fd]' : 'text-[#d8c3ad] hover:text-[#dae2fd]'
                }`}
              >
                Interacciones
              </button>
              <button
                onClick={() => setTrafficTab('clicks')}
                className={`px-3 py-1 rounded text-xs font-semibold transition-colors ${
                  trafficTab === 'clicks' ? 'bg-[#222a3d] text-[#dae2fd]' : 'text-[#d8c3ad] hover:text-[#dae2fd]'
                }`}
              >
                Clics E-commerce
              </button>
            </div>
          </div>

          {/* Rich Visual Chart Area with Floating Annotation */}
          <div className="relative w-full h-72 rounded-lg bg-[#060e20] p-4 flex flex-col justify-between overflow-hidden shadow-inner border border-[#222a3d]/50">
            {/* Peak Viral Highlight Badge */}
            <div className="absolute top-3 left-1/2 -translate-x-1/4 z-10 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#222a3d]/90 backdrop-blur border border-[#ffc640]/40 shadow-lg">
              <span className="w-2 h-2 rounded-full bg-[#ffc640] animate-ping"></span>
              <div className="flex flex-col">
                <span className="text-[11px] text-[#ffc640] font-bold">21 Mar: Pico Floral (+284%)</span>
                <span className="text-[10px] text-[#d8c3ad]">Efecto "Flores Amarillas" TikTok Viral Lima</span>
              </div>
            </div>

            {/* SVG Area Curves */}
            <div className="w-full h-full pt-6">
              <svg className="w-full h-44 overflow-visible" fill="none" preserveAspectRatio="none" viewBox="0 0 700 180">
                <line stroke="#222a3d" strokeDasharray="4 4" strokeWidth="1" x1="0" x2="700" y1="30" y2="30"></line>
                <line stroke="#222a3d" strokeDasharray="4 4" strokeWidth="1" x1="0" x2="700" y1="80" y2="80"></line>
                <line stroke="#222a3d" strokeDasharray="4 4" strokeWidth="1" x1="0" x2="700" y1="130" y2="130"></line>

                <defs>
                  <linearGradient id="area-grad" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#ffc640" stopOpacity="0.4"></stop>
                    <stop offset="60%" stopColor="#f59e0b" stopOpacity="0.1"></stop>
                    <stop offset="100%" stopColor="#060e20" stopOpacity="0"></stop>
                  </linearGradient>
                </defs>

                {/* TikTok Main Curve */}
                <path d="M 0,140 Q 60,135 120,120 T 240,110 T 360,95 Q 420,15 470,20 T 560,85 T 640,90 T 700,75 L 700,180 L 0,180 Z" fill="url(#area-grad)"></path>
                <path d="M 0,140 Q 60,135 120,120 T 240,110 T 360,95 Q 420,15 470,20 T 560,85 T 640,90 T 700,75" stroke="#ffc640" strokeWidth="3" strokeLinecap="round"></path>

                {/* Instagram Reels Curve */}
                <path d="M 0,155 Q 80,145 160,130 T 320,120 T 470,60 T 580,110 T 700,105" stroke="#22d3ee" strokeDasharray="3 3" strokeWidth="2"></path>

                {/* Pinterest Curve */}
                <path d="M 0,170 Q 100,165 200,155 T 400,140 T 470,115 T 600,130 T 700,125" stroke="#f87171" strokeWidth="2"></path>

                {/* 21 Mar Hotspot */}
                <circle cx="470" cy="20" r="6" fill="#f59e0b" stroke="#060e20" strokeWidth="3"></circle>
                <circle cx="470" cy="20" r="11" stroke="#ffc640" strokeOpacity="0.6" strokeWidth="1.5"></circle>
              </svg>
            </div>

            {/* Axis Dates */}
            <div className="flex items-center justify-between text-[#d8c3ad] text-[11px] font-mono pt-1">
              <span>01 Mar</span>
              <span>06 Mar</span>
              <span>11 Mar</span>
              <span>16 Mar</span>
              <span className="text-[#ffc640] font-bold">21 Mar (Pico)</span>
              <span>26 Mar</span>
              <span>31 Mar</span>
            </div>
          </div>

          {/* Quick Legend & Metric Breakdown */}
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3 rounded-lg bg-[#131b2e] flex flex-col gap-0.5 border border-[#222a3d]/50">
              <div className="flex items-center gap-1.5 text-[11px] text-[#d8c3ad]">
                <span className="w-2 h-2 rounded-full bg-[#ffc640]"></span>
                <span>TikTok Live & UGC</span>
              </div>
              <span className="text-base font-bold text-[#dae2fd]">2,410,200</span>
              <span className="text-[#ffc640] text-[11px] font-semibold">+58% interacción</span>
            </div>
            <div className="p-3 rounded-lg bg-[#131b2e] flex flex-col gap-0.5 border border-[#222a3d]/50">
              <div className="flex items-center gap-1.5 text-[11px] text-[#d8c3ad]">
                <span className="w-2 h-2 rounded-full bg-[#22d3ee]"></span>
                <span>Instagram Stories & Reels</span>
              </div>
              <span className="text-base font-bold text-[#dae2fd]">1,790,450</span>
              <span className="text-[#ffc174] text-[11px]">14,210 DMs automáticos</span>
            </div>
            <div className="p-3 rounded-lg bg-[#131b2e] flex flex-col gap-0.5 border border-[#222a3d]/50">
              <div className="flex items-center gap-1.5 text-[11px] text-[#d8c3ad]">
                <span className="w-2 h-2 rounded-full bg-[#f87171]"></span>
                <span>Pinterest Ideas & Catalog</span>
              </div>
              <span className="text-base font-bold text-[#dae2fd]">642,260</span>
              <span className="text-[#ff9837] text-[11px]">8.2% CTR Niubiz/Yape</span>
            </div>
          </div>
        </div>

        {/* Right Column (5/12) - Distribución y Atribución por Plataforma */}
        <div className="xl:col-span-5 flex flex-col rounded-xl bg-[#171f33] p-5 border border-[#222a3d] shadow-md justify-between">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <h2 className="text-base font-bold text-[#dae2fd]">Distribución & Atribución</h2>
              <span className="text-xs text-[#d8c3ad]">Impacto en ventas y tráfico multicanal</span>
            </div>
            <button 
              onClick={() => showToast('Modelo de atribución: First touch + Last touch ponderado según IAB Perú')}
              className="p-1 rounded-lg bg-[#222a3d] text-[#d8c3ad] hover:text-[#dae2fd]"
            >
              <span className="material-symbols-outlined text-base">info</span>
            </button>
          </div>

          {/* Donut Chart Component */}
          <div className="my-4 flex flex-col sm:flex-row items-center justify-center gap-6">
            <div className="relative w-40 h-40 flex items-center justify-center shrink-0">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="38" fill="none" stroke="#222a3d" strokeWidth="12"></circle>
                {/* TikTok 49% */}
                <circle cx="50" cy="50" r="38" fill="none" stroke="#f59e0b" strokeWidth="12" strokeDasharray="117 238.7" strokeDashoffset="0"></circle>
                {/* IG 36% */}
                <circle cx="50" cy="50" r="38" fill="none" stroke="#22d3ee" strokeWidth="12" strokeDasharray="86 238.7" strokeDashoffset="-117"></circle>
                {/* Pinterest 15% */}
                <circle cx="50" cy="50" r="38" fill="none" stroke="#f87171" strokeWidth="12" strokeDasharray="35.8 238.7" strokeDashoffset="-203"></circle>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-[10px] text-[#d8c3ad] uppercase tracking-widest font-mono">Share Total</span>
                <span className="text-xl font-bold text-[#dae2fd]">100%</span>
                <span className="text-[10px] text-[#ffc640] font-semibold">S/ 148.6K</span>
              </div>
            </div>

            <div className="flex flex-col gap-2 w-full sm:w-auto">
              <div className="flex items-center gap-2 p-2 rounded-lg bg-[#131b2e] border border-[#222a3d]/50">
                <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b] shrink-0"></span>
                <div className="flex flex-col">
                  <span className="text-xs text-[#dae2fd] font-semibold">TikTok (49%)</span>
                  <span className="text-[11px] text-[#d8c3ad]">Descubrimiento Viral & Live</span>
                </div>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-[#131b2e] border border-[#222a3d]/50">
                <span className="w-2.5 h-2.5 rounded-full bg-[#22d3ee] shrink-0"></span>
                <div className="flex flex-col">
                  <span className="text-xs text-[#dae2fd] font-semibold">Instagram (36%)</span>
                  <span className="text-[11px] text-[#d8c3ad]">Stories & Venta Consultiva</span>
                </div>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-[#131b2e] border border-[#222a3d]/50">
                <span className="w-2.5 h-2.5 rounded-full bg-[#f87171] shrink-0"></span>
                <div className="flex flex-col">
                  <span className="text-xs text-[#dae2fd] font-semibold">Pinterest (15%)</span>
                  <span className="text-[11px] text-[#d8c3ad]">Tableros & Checkout</span>
                </div>
              </div>
            </div>
          </div>

          {/* Performance Micro Table */}
          <div className="flex flex-col gap-1.5 pt-1">
            <div className="flex items-center justify-between text-[#d8c3ad] text-[10px] font-mono uppercase tracking-wider px-2">
              <span>CANAL</span>
              <span>CPA PROM.</span>
              <span>TASA GUARDADOS</span>
              <span>CLICS</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded bg-[#131b2e] text-xs">
              <span className="font-semibold text-[#ffc640]">TikTok Ads</span>
              <span className="text-[#dae2fd]">S/ 1.42</span>
              <span className="text-[#dae2fd]">9.4%</span>
              <span className="text-[#dae2fd] font-semibold">48.2K</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded bg-[#131b2e] text-xs">
              <span className="font-semibold text-[#22d3ee]">Instagram Reels</span>
              <span className="text-[#dae2fd]">S/ 2.10</span>
              <span className="text-[#dae2fd]">14.8%</span>
              <span className="text-[#dae2fd] font-semibold">32.6K</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded bg-[#131b2e] text-xs">
              <span className="font-semibold text-[#f87171]">Pinterest Shopping</span>
              <span className="text-[#dae2fd]">S/ 0.88</span>
              <span className="text-[#dae2fd]">22.4%</span>
              <span className="text-[#dae2fd] font-semibold">19.1K</span>
            </div>
          </div>
        </div>
      </section>

      {/* AI FORECASTER & SENTIMENT INTELLIGENCE (3-Column Row) */}
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Widget 1: AI Timing & Format Forecaster */}
        <div className="rounded-xl bg-[#171f33] p-5 border border-[#222a3d] shadow-md flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-[#f59e0b] text-[#0b1326]">
                <span className="material-symbols-outlined text-base">psychology</span>
              </div>
              <span className="font-bold text-sm text-[#dae2fd]">AI Timing & Forecaster</span>
            </div>
            <span className="px-2 py-0.5 rounded bg-[#222a3d] text-[#ffc174] text-[11px] font-mono">RF-3.3 Motor</span>
          </div>

          <div className="my-4 p-3.5 rounded-lg bg-[#131b2e] border border-[#222a3d]/60 flex flex-col gap-2">
            <div className="flex items-center gap-1.5 text-[#ffc640] text-xs font-semibold">
              <span className="material-symbols-outlined text-base">auto_awesome</span>
              <span>Ventana de Oportunidad Detectada</span>
            </div>
            <p className="text-xs text-[#dae2fd] leading-relaxed">
              Recomendación para hoy <strong className="text-[#ffc174]">Jueves</strong>: Publicar video en formato{' '}
              <span className="underline decoration-[#ffc640]">Reel / TikTok a las 7:45 PM (Hora Lima)</span> con audio viral en tendencia de flores amarillas.
            </p>
            <div className="flex items-center justify-between p-2 rounded bg-[#171f33] text-[11px] text-[#d8c3ad] mt-1">
              <span>Proyección de Alcance:</span>
              <span className="text-emerald-400 font-bold">+26% sobre la media</span>
            </div>
          </div>

          <button
            onClick={() => {
              setCurrentModule('calendario-contenido');
              showToast('Slot de 7:45 PM seleccionado en el Calendario');
            }}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[#f59e0b] text-[#0b1326] hover:bg-[#ffc640] text-xs font-bold shadow-md transition-all"
          >
            <span className="material-symbols-outlined text-base">calendar_add_on</span>
            <span>Auto-programar en Calendario</span>
          </button>
        </div>

        {/* Widget 2: Sentinel Social NLP Peru */}
        <div className="rounded-xl bg-[#171f33] p-5 border border-[#222a3d] shadow-md flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-[#222a3d] text-[#ffc640]">
                <span className="material-symbols-outlined text-base">radar</span>
              </div>
              <span className="font-bold text-sm text-[#dae2fd]">Monitor de Sentimiento Sentinel</span>
            </div>
            <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[11px] font-semibold">
              Seguro / 0 Crisis
            </span>
          </div>

          <div className="my-4 flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <div className="flex justify-between text-xs">
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>92% Positivo
                </span>
                <span className="text-[#d8c3ad] text-[11px]">Alegría, obsequios florales</span>
              </div>
              <div className="w-full bg-[#2d3449] rounded-full h-1.5 overflow-hidden">
                <div className="bg-emerald-400 h-1.5 rounded-full" style={{ width: '92%' }}></div>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex justify-between text-xs">
                <span className="text-[#ffc640] font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ffc640]"></span>6% Neutral
                </span>
                <span className="text-[#d8c3ad] text-[11px]">Precios, envíos distritos</span>
              </div>
              <div className="w-full bg-[#2d3449] rounded-full h-1.5 overflow-hidden">
                <div className="bg-[#ffc640] h-1.5 rounded-full" style={{ width: '6%' }}></div>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex justify-between text-xs">
                <span className="text-[#f87171] font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#f87171]"></span>2% Negativo
                </span>
                <span className="text-[#d8c3ad] text-[11px]">Demoras courier AQP/TRU</span>
              </div>
              <div className="w-full bg-[#2d3449] rounded-full h-1.5 overflow-hidden">
                <div className="bg-[#f87171] h-1.5 rounded-full" style={{ width: '2%' }}></div>
              </div>
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-[#131b2e] border border-[#222a3d]/50 flex items-center justify-between text-xs">
            <span className="text-[#d8c3ad] text-[11px]">Diccionario NLP: Slangs Lima activo</span>
            <button
              onClick={() => setCurrentModule('social-listening')}
              className="text-[#ffc640] hover:underline font-semibold flex items-center gap-1 text-[11px]"
            >
              <span>Ver 14 Casos</span>
              <span className="material-symbols-outlined text-sm">chevron_right</span>
            </button>
          </div>
        </div>

        {/* Widget 3: Top Influencer Attribution */}
        <div className="rounded-xl bg-[#171f33] p-5 border border-[#222a3d] shadow-md flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-[#222a3d] text-[#ffc174]">
                <span className="material-symbols-outlined text-base">stars</span>
              </div>
              <span className="font-bold text-sm text-[#dae2fd]">Top Creadores Perú</span>
            </div>
            <span className="px-2 py-0.5 rounded bg-[#222a3d] text-[#d8c3ad] text-[11px] font-mono">ROI Semanal</span>
          </div>

          <div className="my-3 flex flex-col gap-2">
            {/* Creador 1 */}
            <div className="p-2 rounded-lg bg-[#131b2e] flex items-center justify-between border border-[#222a3d]/50 hover:bg-[#222a3d]/50 transition-colors">
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAVLyf1iSoqI5CQmJP-tq0cbrrDamsP_Kvr9Nme8LJ1Zx5g87QuUywKkNa-FXDOYngyh2zh2M1MSug0890vf_rmJWFcRYNSZlxomI0PcxA35Gx1NqnScSd_oEinBwFdLeexkxxAFNkeI9ey9daJuewFynVtAJtk2TRGvmrwOVFNGK8_sMiuDNoya4b8voMP8RIS7-znZLn_-3sPyqC9e7cEu7O5pLXTIPUAqt3NlFuoHY4je2ZvRp8PhQ"
                    alt="Valeria"
                    className="w-9 h-9 rounded-full object-cover"
                  />
                  <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#ffc640] text-[#060e20] font-bold text-[9px] flex items-center justify-center">
                    1
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-[#dae2fd]">@valeria.lifestyle</span>
                  <span className="text-[10px] text-[#22d3ee]">Instagram & TikTok</span>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-xs font-bold text-[#ffc174]">S/ 38,200 EMV</span>
                <span className="text-[10px] text-emerald-400">8.4% ER • 1.2K ventas</span>
              </div>
            </div>

            {/* Creador 2 */}
            <div className="p-2 rounded-lg bg-[#131b2e] flex items-center justify-between border border-[#222a3d]/50 hover:bg-[#222a3d]/50 transition-colors">
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBclQifSvSd1CYS9vlOY-5AN2X5NpuXO8ChqcvAjcoTZ8d4sX3-ZJtb7dXd7if7PN5Yl8N4dfN1gZFz7eVReVdmb_XOmq4EkEruZRIlt0W4IvCix8z3h0945_JP7bKB0uN_dvuaTW4Q8RdUGF124zKEzp41t0mpgU4YwEmrav_NYHytw4kHwHtd2ehdnvQtkQpr_B7pEPFwErrRhfuWs8vkvy4hBv-6TTDQ2g0Ytp27kGeWeTRAS-EdrA"
                    alt="Diego"
                    className="w-9 h-9 rounded-full object-cover"
                  />
                  <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#222a3d] text-[#dae2fd] font-bold text-[9px] flex items-center justify-center">
                    2
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-[#dae2fd]">@diego_lima_trends</span>
                  <span className="text-[10px] text-[#ffc640]">TikTok Creator</span>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-xs font-bold text-[#dae2fd]">S/ 24,100 EMV</span>
                <span className="text-[10px] text-emerald-400">7.1% ER • 840 ventas</span>
              </div>
            </div>

            {/* Creador 3 */}
            <div className="p-2 rounded-lg bg-[#131b2e] flex items-center justify-between border border-[#222a3d]/50 hover:bg-[#222a3d]/50 transition-colors">
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuArdt65xno3KGbPPbbb1dRX-a9cOD34IODANEIMLUXXEFvVT02ljGpU_mUaB671gxOjVMTCBR21odzrYAlDagQUHAq-bpoCRA8LtgZYSDp31tsd3yXpvp-oC9FGrKf5VjBrtKNEXaH-hScpT_lrYI-gjMVBO8PsE3jym-0gr7PMSFqAn8taK1MGsJ4IKUlwGb3z9jX8ks6unKjyFusqyLuzxhbbZ1A6ARMKHiK7BSEhFuZAidigCplCrQ"
                    alt="Camila Deco"
                    className="w-9 h-9 rounded-full object-cover"
                  />
                  <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#222a3d] text-[#dae2fd] font-bold text-[9px] flex items-center justify-center">
                    3
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-[#dae2fd]">@deco_peru</span>
                  <span className="text-[10px] text-[#f87171]">Pinterest Curador</span>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-xs font-bold text-[#dae2fd]">12.8K clics</span>
                <span className="text-[10px] text-[#ffc174]">S/ 18,900 Catálogo</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setCurrentModule('directorio-influencers')}
            className="w-full flex items-center justify-center gap-1.5 py-2 rounded-lg bg-[#222a3d] hover:bg-[#31394d] text-[#dae2fd] text-xs font-semibold transition-colors border border-[#222a3d]"
          >
            <span>Gestionar Directorio Completo</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>
      </section>

      {/* TABLA DE TOP ASSETS VIRALES */}
      <section className="rounded-xl bg-[#171f33] p-5 border border-[#222a3d] shadow-md flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-col">
            <h2 className="text-lg font-bold text-[#dae2fd]">Publicaciones con Mayor Impacto del Mes</h2>
            <span className="text-xs text-[#d8c3ad]">Ordenado por atribución algorítmica de conversiones y engagement verificado</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-[#d8c3ad]">Filtrar por:</span>
            <select
              value={selectedSort}
              onChange={(e) => setSelectedSort(e.target.value)}
              className="px-3 py-1.5 rounded-lg bg-[#131b2e] border border-[#222a3d] text-[#dae2fd] text-xs focus:outline-none focus:border-[#f59e0b]"
            >
              <option value="roi">Mayor Retorno (ROI)</option>
              <option value="reach">Mayor Alcance Viral</option>
              <option value="er">Tasa de Guardados / ER</option>
            </select>
          </div>
        </div>

        {/* Table Container */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="text-[#d8c3ad] text-[11px] font-mono uppercase tracking-wider bg-[#131b2e] border-b border-[#222a3d]">
                <th className="py-3 px-4 rounded-l-lg">Contenido & Título</th>
                <th className="py-3 px-4">Plataforma / Formato</th>
                <th className="py-3 px-4">Alcance Total</th>
                <th className="py-3 px-4">Interacción (ER)</th>
                <th className="py-3 px-4">Conversiones / Ventas</th>
                <th className="py-3 px-4">Estado Sentinel</th>
                <th className="py-3 px-4 text-right rounded-r-lg">Acción Rápida</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#222a3d]/50">
              {filteredPublications.map((pub) => (
                <tr key={pub.id} className="hover:bg-[#222a3d]/40 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-[#060e20] border border-[#222a3d]/60">
                        <img src={pub.image} alt={pub.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex flex-col min-w-0 max-w-sm">
                        <span className="font-semibold text-[#dae2fd] truncate text-xs">{pub.title}</span>
                        <span className="text-[11px] text-[#d8c3ad] font-mono truncate">{pub.sub}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-semibold ${pub.badgeColor}`}>
                      {pub.badge}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-semibold text-[#dae2fd] font-metric">{pub.reach}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1 text-emerald-400 font-semibold">
                      <span className="material-symbols-outlined text-sm">trending_up</span>
                      <span>{pub.er}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-bold text-[#ffc174]">{pub.revenue}</span>
                    <span className="block text-[10px] text-[#d8c3ad]">{pub.orders}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${pub.sentinelColor}`}>
                      {pub.sentinelStatus}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="inline-flex items-center gap-1.5">
                      <button
                        onClick={() => {
                          setCurrentModule('social-listening');
                          showToast(`Inspeccionando comentarios NLP para: ${pub.title}`);
                        }}
                        className="p-1.5 rounded-lg bg-[#222a3d] text-[#d8c3ad] hover:text-[#dae2fd] hover:bg-[#31394d] transition-colors"
                        title="Inspeccionar NLP"
                      >
                        <span className="material-symbols-outlined text-base">forum</span>
                      </button>
                      <button
                        onClick={() => showToast(`Campaña de amplificación configurada para: ${pub.title}`)}
                        className="px-3 py-1 rounded-lg bg-[#f59e0b] text-[#0b1326] text-[11px] font-bold hover:bg-[#ffc640] transition-colors shadow-sm"
                      >
                        Amplificar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs text-[#d8c3ad]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>Atribución certificada por Webhooks Niubiz, Shopify y Mercado Pago</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-mono text-[11px]">Mostrando {filteredPublications.length} de {publications.length} posts activos</span>
            <button
              onClick={() => showToast('Catálogo de métricas sincronizado con Data Warehouse')}
              className="text-[#ffc174] hover:underline font-semibold flex items-center gap-1"
            >
              <span>Ver catálogo completo</span>
              <span className="material-symbols-outlined text-sm">open_in_new</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
