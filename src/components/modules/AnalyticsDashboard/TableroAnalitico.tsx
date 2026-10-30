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
  const [selectedSort, setSelectedSort] = useState<'roi' | 'reach' | 'er'>('roi');
  // 'resumida' provides a light, decluttered, breathable view by default
  const [viewMode, setViewMode] = useState<'resumida' | 'detallada'>('resumida');

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      showToast('Reporte de Emprendimiento (PDF/CSV) descargado con éxito');
    }, 1200);
  };

  // Métricas diferenciadas por red social para Kajel Bloom
  const channelDataMap = {
    all: {
      name: 'Todos los Canales',
      subtext: 'Métricas consolidadas de inicio y tracción en Lima · Septiembre 2026',
      badge: 'Consolidado Omnicanal',
      badgeColor: 'text-[#ffc640] bg-[#ffc640]/10',
      reach: '4,850',
      reachLabel: 'Cuentas alcanzadas en Septiembre',
      reachGrowth: '+48% vs agosto',
      er: '8.80%',
      erLabel: 'Promedio omnicanal de interacciones',
      revenue: 'S/ 2,480',
      ordersCount: '28 pedidos',
      ticketLabel: 'Ticket promedio: S/ 88.50 por ramo',
      kpi4Value: '3.8 min',
      kpi4Label: 'Atención WhatsApp / DM',
      kpi4Sub: 'Cierre ágil por Yape / Plin',
      kpi4Growth: 'Rápido',
      pauta: 'S/ 150 en boost',
      roas: 'ROAS 4.6x',
      sharePercent: 100,
      shareLabel: 'Total Ventas',
      recommendationTitle: 'Estrategia Omnicanal de Primavera',
      recommendationText: 'Lanzar video en TikTok y Reel en simultáneo a las 7:15 PM el 21 de septiembre, enlazando directamente al catálogo y WhatsApp para pedidos urgentes.',
      recommendationGrowth: '+35% pedidos',
      sentimentTitle: 'Satisfacción de Entrega y Calidad',
      sentimentText: '96% Clientes Felices · 4% Consultas de Cobertura',
      sentimentPositive: 96,
      sentimentNeutral: 4,
      chartColor: '#ffc640',
      chartPath: 'M 0,145 Q 60,140 120,130 T 240,120 T 360,105 Q 430,20 470,18 T 560,95 T 640,110 T 700,100',
      chartArea: 'M 0,145 Q 60,140 120,130 T 240,120 T 360,105 Q 430,20 470,18 T 560,95 T 640,110 T 700,100 L 700,180 L 0,180 Z',
      metricBreakdown: [
        { label: 'TikTok (49%)', value: 'S/ 1,220 (14 ventas)', dot: 'bg-[#f59e0b]' },
        { label: 'Instagram (36%)', value: 'S/ 890 (10 ventas)', dot: 'bg-[#22d3ee]' },
        { label: 'WhatsApp / Web (15%)', value: 'S/ 370 (4 ventas)', dot: 'bg-[#f87171]' }
      ]
    },
    tiktok: {
      name: 'TikTok',
      subtext: 'Descubrimiento viral, videos de reacción y tráfico a link en bio',
      badge: 'TikTok Viral & Spark',
      badgeColor: 'text-[#22d3ee] bg-[#22d3ee]/10',
      reach: '2,850',
      reachLabel: 'Reproducciones de Video en Septiembre',
      reachGrowth: '+64% por video viral',
      er: '9.65%',
      erLabel: 'Likes, comentarios y guardados',
      revenue: 'S/ 1,220',
      ordersCount: '14 pedidos',
      ticketLabel: 'Ticket promedio: S/ 87.10',
      kpi4Value: '140',
      kpi4Label: 'Veces Compartido',
      kpi4Sub: '+195 seguidores ganados',
      kpi4Growth: 'Viral',
      pauta: 'S/ 70 en TikTok Boost',
      roas: 'ROAS 5.0x',
      sharePercent: 49,
      shareLabel: '49% de ventas totales',
      recommendationTitle: 'Mejor Formato en TikTok',
      recommendationText: 'Videos de 12 a 18 segundos mostrando la reacción al abrir la caja de flores amarillas con música en tendencia. Pico viral comprobado: 7:45 PM.',
      recommendationGrowth: '3.4x compartidos',
      sentimentTitle: 'Sentimiento en Comentarios de TikTok',
      sentimentText: '98% Comentarios Positivos · 2% Preguntas de precio',
      sentimentPositive: 98,
      sentimentNeutral: 2,
      chartColor: '#22d3ee',
      chartPath: 'M 0,165 Q 60,160 120,150 T 240,140 T 360,110 Q 430,22 470,15 T 560,105 T 640,120 T 700,115',
      chartArea: 'M 0,165 Q 60,160 120,150 T 240,140 T 360,110 Q 430,22 470,15 T 560,105 T 640,120 T 700,115 L 700,180 L 0,180 Z',
      metricBreakdown: [
        { label: 'Tasa de visualización completa', value: '38.4% (>15s)', dot: 'bg-[#22d3ee]' },
        { label: 'Clics al enlace en perfil', value: '145 clics directos', dot: 'bg-[#ffc640]' },
        { label: 'Nuevos seguidores ganados', value: '+195 en Septiembre', dot: 'bg-emerald-400' }
      ]
    },
    instagram: {
      name: 'Instagram',
      subtext: 'Reels estéticos, Stories diarias y venta consultiva por DM',
      badge: 'Instagram Graph & DMs',
      badgeColor: 'text-[#f43f5e] bg-[#f43f5e]/10',
      reach: '1,420',
      reachLabel: 'Cuentas Únicas Alcanzadas en Lima',
      reachGrowth: '+36% en Lima moderna',
      er: '8.20%',
      erLabel: 'Guardados de posts y respuestas a Stories',
      revenue: 'S/ 890',
      ordersCount: '10 pedidos',
      ticketLabel: 'Ticket promedio: S/ 89.00',
      kpi4Value: '38',
      kpi4Label: 'DMs de Clientes Iniciados',
      kpi4Sub: '26 pedidos cerrados por chat',
      kpi4Growth: 'Alto Cierre',
      pauta: 'S/ 55 en Instagram Ads',
      roas: 'ROAS 4.2x',
      sharePercent: 36,
      shareLabel: '36% de ventas totales',
      recommendationTitle: 'Mejor Formato en Instagram',
      recommendationText: 'Stories diarias con stickers de encuesta y cuenta regresiva al 21 de septiembre. Los clientes de Instagram prefieren reservar ramos personalizados por mensaje directo.',
      recommendationGrowth: '88% conversión DM',
      sentimentTitle: 'Sentimiento en Mensajes Directos',
      sentimentText: '95% Satisfacción · 5% Consultas de distritos',
      sentimentPositive: 95,
      sentimentNeutral: 5,
      chartColor: '#f43f5e',
      chartPath: 'M 0,160 Q 80,150 160,140 T 320,130 T 470,55 T 580,115 T 700,120',
      chartArea: 'M 0,160 Q 80,150 160,140 T 320,130 T 470,55 T 580,115 T 700,120 L 700,180 L 0,180 Z',
      metricBreakdown: [
        { label: 'Conversaciones iniciadas en DM', value: '38 mensajes', dot: 'bg-[#f43f5e]' },
        { label: 'Respuestas a Stories activas', value: '64 interacciones', dot: 'bg-[#ffc640]' },
        { label: 'Guardados en colecciones', value: '52 guardados', dot: 'bg-emerald-400' }
      ]
    },
    pinterest: {
      name: 'Pinterest / Catálogo',
      subtext: 'Inspiración botánica, envolturas Kraft y pedidos directos de catálogo',
      badge: 'Catálogo Visual & Pines',
      badgeColor: 'text-[#f87171] bg-[#f87171]/10',
      reach: '580',
      reachLabel: 'Impresiones de Pines de Catálogo',
      reachGrowth: '+52% en búsquedas de regalos',
      er: '14.20%',
      erLabel: 'Tasa récord de guardados en tableros',
      revenue: 'S/ 370',
      ordersCount: '4 pedidos',
      ticketLabel: 'Ticket promedio: S/ 92.50',
      kpi4Value: '74',
      kpi4Label: 'Pines Guardados en Tableros',
      kpi4Sub: '6.8% CTR hacia WhatsApp Tienda',
      kpi4Growth: 'Gran Interés',
      pauta: 'S/ 25 Pines Promocionados',
      roas: 'ROAS 3.9x',
      sharePercent: 15,
      shareLabel: '15% de ventas totales',
      recommendationTitle: 'Mejor Formato en Pinterest',
      recommendationText: 'Pines verticales 2:3 con fondo Kraft artesanal y nombres descriptivos ("Ramo Flores Amarillas Lima"). Generan alta intención de compra en usuarios que buscan ideas de regalo.',
      recommendationGrowth: '14.2% guardados',
      sentimentTitle: 'Intención de Compra en Tableros',
      sentimentText: '97% Alta Intención · 3% Dudas de envío',
      sentimentPositive: 97,
      sentimentNeutral: 3,
      chartColor: '#f87171',
      chartPath: 'M 0,175 Q 100,170 200,160 T 400,145 T 470,110 T 600,135 T 700,130',
      chartArea: 'M 0,175 Q 100,170 200,160 T 400,145 T 470,110 T 600,135 T 700,130 L 700,180 L 0,180 Z',
      metricBreakdown: [
        { label: 'Pines guardados en tableros', value: '74 pines guardados', dot: 'bg-[#f87171]' },
        { label: 'Tasa de clic saliente (CTR)', value: '6.8% a WhatsApp', dot: 'bg-[#ffc640]' },
        { label: 'Búsquedas de origen asociadas', value: 'Flores Amarillas Lima', dot: 'bg-emerald-400' }
      ]
    }
  };

  const currentStats = channelDataMap[activeChannelFilter] || channelDataMap.all;

  // Publicaciones realistas de Kajel Bloom
  const publications = [
    {
      id: 'pub-1',
      title: 'El significado de regalar flores amarillas este 21 de septiembre',
      sub: 'TikTok Orgánico · #FloresAmarillasPeru',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD9kkLiWPMPegOCsIE_2wqJWE4lziSlCr7coC_MMfUwhsBgzyPvOE60ctO64Oe04O4VVVxtB_fPifCvrwexRwzwO4_bDXE2Rut29skkcoGSeka--CJWctDAPaDom7-8HjMMtu_p3UEThJW08mifjqdYvQ2TwgLLQAqU9GitvLzRJGOZlM9BP-9tUSy3aG3pOtlbjcOhAyipWPU6UqMd9Qh75iVIfkJgT7jbjcKCOI_nGem_awkYmZiNzQ',
      channel: 'tiktok',
      format: 'Video Viral',
      reach: '2,850',
      reachRaw: 2850,
      er: '9.8%',
      erRaw: 9.8,
      revenue: 'S/ 980',
      revenueRaw: 980,
      orders: '11 pedidos',
      sentinelStatus: '98% Positivo',
      sentimentTone: 'positive' as const
    },
    {
      id: 'pub-2',
      title: 'Colección Primavera: Mini Ramos Girasol para Oficina',
      sub: 'Colab orgánica @valeria.lifestyle',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC43ZdQhZva_99x7XSlUKY0V4MRLrunlLJLsvjmzMjpnQB-JyriEhjtYB-Pi8jIhJqf6FXxWfQfp9vXc4vQCcx4sV2ABugk9danQ43rkRYR7MxOOVGQGQzMVamNu3nLrKb1ukKO8XzEYnfYtsJh7kfpUGd1V14T4EWDUi3qFbfePqJCA3fJeOKyu5W4GbTClhyjWO0tVWhbEj1mdabBCGrs8Qd2y7AD1dne_y6zN_A8XCQgimEJ951nGg',
      channel: 'instagram',
      format: 'Instagram Reel',
      reach: '1,420',
      reachRaw: 1420,
      er: '8.4%',
      erRaw: 8.4,
      revenue: 'S/ 720',
      revenueRaw: 720,
      orders: '8 pedidos',
      sentinelStatus: '95% Positivo',
      sentimentTone: 'positive' as const
    },
    {
      id: 'pub-3',
      title: 'Catálogo de Arreglos Florales en Papel Kraft Artesanal',
      sub: 'Enlace directo a WhatsApp Tienda',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDtSc0lSalC8Gtun0xwj5xpGWAXN-4zqtkB7oSJBRUlMkkvJ1gyY89fjFjRBD6z-GHr1Wovr7BDDxKFbVIQMggnnU-uYdZQiG9B0GslCg6R6xCEFViRP0htC3cCdD1fT1Vi23KTByadkjdCJ8N47vUO4qP1GnE5e255zLwBRT_2vacFSLR5-ro86xel2r7qYxQgPIta8RoSnMByNq3Ac8bJLCOdHS5WklcFijkY2OeKPpnpHfvSLirOcA',
      channel: 'pinterest',
      format: 'Pin de Catálogo',
      reach: '580',
      reachRaw: 580,
      er: '14.2% Guardados',
      erRaw: 14.2,
      revenue: 'S/ 480',
      revenueRaw: 480,
      orders: '5 pedidos',
      sentinelStatus: 'Consultas activas',
      sentimentTone: 'neutral' as const
    },
    {
      id: 'pub-4',
      title: 'POV: Empacando los primeros pedidos con lazo amarillo',
      sub: 'UGC grabado en taller propio',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDGaffwMehl1_UiKw038AguYpY010K89-AC_5KUTQelIRSII-fsW_3K6i8nDtUfCv_qCnEdwU5RqziCARGVWikZmAlUCCQId7RQf53vTCgxy4rWTyQ8d17B8rJLIboZy2Mfxuj5Yf6n3GsMZ2Jy9fk_x7XaUljBkC0PBeTK8svChfDlvqU2jOolVm9KbLZJo4HHfAwFcD52LCrbRBgCrlM-QxKuiZMO7TMKmVWleZRFdYTJ2wPGxfg5eQ',
      channel: 'tiktok',
      format: 'TikTok Duet / Behind The Scenes',
      reach: '890',
      reachRaw: 890,
      er: '9.1%',
      erRaw: 9.1,
      revenue: 'S/ 300',
      revenueRaw: 300,
      orders: '4 pedidos',
      sentinelStatus: '99% Positivo',
      sentimentTone: 'positive' as const
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
    <div className="flex flex-col w-full max-w-7xl mx-auto gap-6 pb-8">
      {/* HEADER SECTION - Emprendimiento Kajel Bloom */}
      <section className="flex flex-col gap-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-xl sm:text-2xl font-bold text-[#dae2fd] tracking-tight">
                Tablero Analítico: {currentStats.name}
              </h1>
              <span className="text-xs text-[#d8c3ad] hidden sm:inline">·</span>
              <span className="text-xs text-[#ffc640] font-semibold hidden sm:inline">
                Campaña 21 de Septiembre
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#8e98b0] mt-0.5">
              {currentStats.subtext}
            </p>
          </div>

          {/* Quick Actions & View Density Toggle */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            {/* View Mode Toggle: Light/Simplified vs Detailed */}
            <div className="flex items-center p-1 rounded-lg bg-[#131b2e] border border-[#222a3d]">
              <button
                onClick={() => {
                  setViewMode('resumida');
                  showToast('Vista simplificada activada');
                }}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                  viewMode === 'resumida'
                    ? 'bg-[#222a3d] text-[#ffc640] shadow-sm'
                    : 'text-[#8e98b0] hover:text-[#dae2fd]'
                }`}
                title="Menos información y mayor claridad visual"
              >
                Vista Ligera
              </button>
              <button
                onClick={() => {
                  setViewMode('detallada');
                  showToast('Vista detallada activada');
                }}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                  viewMode === 'detallada'
                    ? 'bg-[#222a3d] text-[#ffc640] shadow-sm'
                    : 'text-[#8e98b0] hover:text-[#dae2fd]'
                }`}
                title="Muestra todas las métricas y micro-tablas"
              >
                Vista Detallada
              </button>
            </div>

            <button
              onClick={handleExport}
              disabled={isExporting}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#171f33] hover:bg-[#222a3d] text-[#dae2fd] transition-colors text-xs font-medium border border-[#222a3d]"
              title="Descargar resumen de ventas"
            >
              <span className={`material-symbols-outlined text-sm text-[#ffc174] ${isExporting ? 'animate-spin' : ''}`}>
                {isExporting ? 'sync' : 'download'}
              </span>
              <span className="hidden md:inline">{isExporting ? 'Descargando...' : 'Exportar'}</span>
            </button>

            <button
              onClick={() => setCurrentModule('calendario-contenido')}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#f59e0b] hover:bg-[#ffc640] text-[#0b1326] text-xs font-semibold shadow-sm transition-colors"
            >
              <span className="material-symbols-outlined text-sm">add</span>
              <span>Nuevo Post</span>
            </button>
          </div>
        </div>

        {/* Channel Filter Tabs - Reactive to each platform */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          <button
            onClick={() => {
              setActiveChannelFilter('all');
              showToast('Mostrando métricas consolidadas de todos los canales');
            }}
            className={`px-3.5 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
              activeChannelFilter === 'all'
                ? 'bg-[#222a3d] text-[#dae2fd] border border-[#ffc640]/50 shadow-sm'
                : 'text-[#8e98b0] hover:text-[#dae2fd] hover:bg-[#171f33]'
            }`}
          >
            Todos los canales
          </button>
          <button
            onClick={() => {
              setActiveChannelFilter('tiktok');
              showToast('Cargando estadísticas de TikTok');
            }}
            className={`px-3.5 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeChannelFilter === 'tiktok'
                ? 'bg-[#222a3d] text-[#22d3ee] border border-[#22d3ee]/50 shadow-sm font-semibold'
                : 'text-[#8e98b0] hover:text-[#dae2fd] hover:bg-[#171f33]'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#22d3ee]"></span>
            TikTok
          </button>
          <button
            onClick={() => {
              setActiveChannelFilter('instagram');
              showToast('Cargando estadísticas de Instagram');
            }}
            className={`px-3.5 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeChannelFilter === 'instagram'
                ? 'bg-[#222a3d] text-[#f43f5e] border border-[#f43f5e]/50 shadow-sm font-semibold'
                : 'text-[#8e98b0] hover:text-[#dae2fd] hover:bg-[#171f33]'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#f43f5e]"></span>
            Instagram
          </button>
          <button
            onClick={() => {
              setActiveChannelFilter('pinterest');
              showToast('Cargando estadísticas de Pinterest & Catálogo');
            }}
            className={`px-3.5 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeChannelFilter === 'pinterest'
                ? 'bg-[#222a3d] text-[#f87171] border border-[#f87171]/50 shadow-sm font-semibold'
                : 'text-[#8e98b0] hover:text-[#dae2fd] hover:bg-[#171f33]'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#f87171]"></span>
            Pinterest / Catálogo
          </button>
        </div>
      </section>

      {/* 4 KEY METRICS - Reactivas a la red seleccionada */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Alcance / Vistas según la red */}
        <div className="rounded-xl bg-[#171f33] p-4 border border-[#222a3d] hover:border-[#2d3449] transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-[#8e98b0]">
            <span>{activeChannelFilter === 'all' ? 'Alcance Total' : `Alcance en ${currentStats.name}`}</span>
            <span className="text-emerald-400 font-semibold text-[11px]">{currentStats.reachGrowth}</span>
          </div>
          <div className="my-2">
            <span className="text-2xl sm:text-3xl font-bold text-[#dae2fd] tabular-nums font-mono">
              {currentStats.reach}
            </span>
          </div>
          <div className="text-[11px] text-[#8e98b0]">
            <span>{currentStats.reachLabel}</span>
          </div>
        </div>

        {/* KPI 2: Engagement Rate según la red */}
        <div className="rounded-xl bg-[#171f33] p-4 border border-[#222a3d] hover:border-[#2d3449] transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-[#8e98b0]">
            <span>Engagement Rate</span>
            <span className="text-emerald-400 font-semibold text-[11px]">Auténtico</span>
          </div>
          <div className="my-2">
            <span className="text-2xl sm:text-3xl font-bold text-[#ffc174] tabular-nums font-mono">
              {currentStats.er}
            </span>
          </div>
          <div className="text-[11px] text-[#8e98b0]">
            <span>{currentStats.erLabel}</span>
          </div>
        </div>

        {/* KPI 3: Ventas Atribuidas al canal */}
        <div className="rounded-xl bg-[#171f33] p-4 border border-[#222a3d] hover:border-[#2d3449] transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-[#8e98b0]">
            <span>Ventas {activeChannelFilter === 'all' ? 'Totales' : currentStats.name}</span>
            <span className="text-[#ffc640] font-semibold text-[11px]">{currentStats.ordersCount}</span>
          </div>
          <div className="my-2">
            <span className="text-2xl sm:text-3xl font-bold text-[#dae2fd] tabular-nums font-mono">
              {currentStats.revenue}
            </span>
          </div>
          <div className="text-[11px] text-[#8e98b0]">
            <span>{currentStats.ticketLabel}</span>
          </div>
        </div>

        {/* KPI 4: Métrica Específica del Canal */}
        <div className="rounded-xl bg-[#171f33] p-4 border border-[#222a3d] hover:border-[#2d3449] transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-[#8e98b0]">
            <span>{currentStats.kpi4Label}</span>
            <span className="text-emerald-400 font-semibold text-[11px]">{currentStats.kpi4Growth}</span>
          </div>
          <div className="my-2">
            <span className="text-2xl sm:text-3xl font-bold text-[#dae2fd] tabular-nums font-mono">
              {currentStats.kpi4Value}
            </span>
          </div>
          <div className="text-[11px] text-[#8e98b0]">
            <span>{currentStats.kpi4Sub}</span>
          </div>
        </div>
      </section>

      {/* MAIN VISUAL SECTION - Trend Chart adaptado al canal + Distribución / Métricas de red */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (8/12) - Evolución Temporal reactiva */}
        <div className="lg:col-span-7 xl:col-span-8 flex flex-col rounded-xl bg-[#171f33] p-5 border border-[#222a3d]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div>
              <h2 className="text-sm sm:text-base font-semibold text-[#dae2fd]">
                Evolución de Tráfico: {currentStats.name}
              </h2>
              <p className="text-xs text-[#8e98b0]">
                Septiembre 2026 · Pico viral de pedidos el <strong className="text-[#ffc640]">21 de Septiembre</strong>
              </p>
            </div>

            {/* Metric Switcher */}
            <div className="flex items-center p-0.5 rounded-lg bg-[#131b2e] border border-[#222a3d] self-start sm:self-auto text-xs">
              <button
                onClick={() => setTrafficTab('reach')}
                className={`px-2.5 py-1 rounded font-medium transition-colors ${
                  trafficTab === 'reach' ? 'bg-[#222a3d] text-[#dae2fd]' : 'text-[#8e98b0] hover:text-[#dae2fd]'
                }`}
              >
                Vistas
              </button>
              <button
                onClick={() => setTrafficTab('interactions')}
                className={`px-2.5 py-1 rounded font-medium transition-colors ${
                  trafficTab === 'interactions' ? 'bg-[#222a3d] text-[#dae2fd]' : 'text-[#8e98b0] hover:text-[#dae2fd]'
                }`}
              >
                Interacciones
              </button>
              <button
                onClick={() => setTrafficTab('clicks')}
                className={`px-2.5 py-1 rounded font-medium transition-colors ${
                  trafficTab === 'clicks' ? 'bg-[#222a3d] text-[#dae2fd]' : 'text-[#8e98b0] hover:text-[#dae2fd]'
                }`}
              >
                Clics Tienda
              </button>
            </div>
          </div>

          {/* SVG Chart Reactivo */}
          <div className="w-full h-56 rounded-lg bg-[#0b1326] p-4 flex flex-col justify-between border border-[#222a3d]/50 relative">
            <div className="w-full h-40 pt-2">
              <svg className="w-full h-full" fill="none" preserveAspectRatio="none" viewBox="0 0 700 180">
                <line stroke="#222a3d" strokeDasharray="3 3" strokeWidth="1" x1="0" x2="700" y1="40" y2="40"></line>
                <line stroke="#222a3d" strokeDasharray="3 3" strokeWidth="1" x1="0" x2="700" y1="90" y2="90"></line>
                <line stroke="#222a3d" strokeDasharray="3 3" strokeWidth="1" x1="0" x2="700" y1="140" y2="140"></line>

                <defs>
                  <linearGradient id="chart-grad-dyn" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor={currentStats.chartColor} stopOpacity="0.28"></stop>
                    <stop offset="100%" stopColor="#0b1326" stopOpacity="0"></stop>
                  </linearGradient>
                </defs>

                {/* Main Curve of the selected channel */}
                <path d={currentStats.chartArea} fill="url(#chart-grad-dyn)"></path>
                <path d={currentStats.chartPath} stroke={currentStats.chartColor} strokeWidth="2.5" strokeLinecap="round"></path>

                {/* If 'all' is selected, also show secondary dashed curves */}
                {activeChannelFilter === 'all' && (
                  <>
                    <path d="M 0,160 Q 80,150 160,140 T 320,130 T 470,55 T 580,115 T 700,120" stroke="#22d3ee" strokeWidth="1.5" strokeDasharray="4 4"></path>
                    <path d="M 0,175 Q 100,170 200,160 T 400,145 T 470,110 T 600,135 T 700,130" stroke="#f87171" strokeWidth="1.5" strokeDasharray="2 2"></path>
                  </>
                )}

                {/* 21 Septiembre Hotspot Marker */}
                <circle cx="470" cy="18" r="6" fill={currentStats.chartColor} stroke="#0b1326" strokeWidth="2"></circle>
                <circle cx="470" cy="18" r="10" stroke={currentStats.chartColor} strokeOpacity="0.5" strokeWidth="1.5"></circle>
              </svg>
            </div>

            {/* Date labels de Septiembre */}
            <div className="flex items-center justify-between text-[#8e98b0] text-[11px] font-mono pt-1">
              <span>01 Set</span>
              <span>08 Set</span>
              <span>15 Set</span>
              <span className="text-[#ffc640] font-bold">21 Set (Pico Floral)</span>
              <span>26 Set</span>
              <span>30 Set</span>
            </div>
          </div>

          {/* Minimalist Legend adaptada */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-[#8e98b0] mt-3 pt-2 border-t border-[#222a3d]/60">
            {activeChannelFilter === 'all' ? (
              <>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-0.5 bg-[#ffc640] rounded"></span>
                  <span className="text-[#dae2fd]">TikTok (Pico 2.8K)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-0.5 bg-[#22d3ee] rounded"></span>
                  <span>Instagram (1.4K)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-0.5 bg-[#f87171] rounded"></span>
                  <span>Catálogo & WhatsApp (580)</span>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-0.5 rounded" style={{ backgroundColor: currentStats.chartColor }}></span>
                <span className="text-[#dae2fd] font-medium">Curva de rendimiento exclusiva de {currentStats.name}</span>
                <span className="text-[#8e98b0]">· Máximo histórico registrado el 21 de Septiembre</span>
              </div>
            )}
          </div>
        </div>

        {/* Right Column (4/12 or 5/12) - Distribución y Desglose del Canal */}
        <div className="lg:col-span-5 xl:col-span-4 flex flex-col rounded-xl bg-[#171f33] p-5 border border-[#222a3d] justify-between">
          <div>
            <div className="flex items-center justify-between">
              <h2 className="text-sm sm:text-base font-semibold text-[#dae2fd]">
                {activeChannelFilter === 'all' ? 'Ventas por Canal' : `Rendimiento en ${currentStats.name}`}
              </h2>
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${currentStats.badgeColor}`}>
                {currentStats.badge}
              </span>
            </div>
            <p className="text-xs text-[#8e98b0] mt-0.5">
              {activeChannelFilter === 'all' ? 'Total generado en Septiembre: S/ 2,480' : `Aporte de ${currentStats.name} a los ingresos`}
            </p>
          </div>

          {/* Visual Indicator: Donut (if all) or Channel Gauge Card (if specific) */}
          {activeChannelFilter === 'all' ? (
            <div className="my-4 flex items-center justify-center gap-5">
              <div className="relative w-32 h-32 flex items-center justify-center shrink-0">
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
                  <span className="text-base font-bold text-[#dae2fd]">S/ 2,480</span>
                  <span className="text-[10px] text-[#8e98b0]">28 ventas</span>
                </div>
              </div>

              <div className="flex flex-col gap-2.5 text-xs">
                {currentStats.metricBreakdown.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${item.dot}`}></span>
                    <div>
                      <span className="text-[#dae2fd] font-medium block">{item.label}</span>
                      <span className="text-[11px] text-[#8e98b0]">{item.value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="my-4 flex flex-col gap-3">
              <div className="p-3 rounded-lg bg-[#0b1326] border border-[#222a3d]/50 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-[#8e98b0] block uppercase tracking-wider font-mono">Participación de Ventas</span>
                  <span className="text-xl font-bold text-[#dae2fd]">{currentStats.sharePercent}%</span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold text-[#ffc640] block">{currentStats.revenue}</span>
                  <span className="text-[11px] text-[#8e98b0]">{currentStats.ordersCount} generados</span>
                </div>
              </div>

              <div className="flex flex-col gap-2 text-xs">
                <span className="text-[11px] text-[#8e98b0] uppercase tracking-wider font-semibold">Métricas Destacadas:</span>
                {currentStats.metricBreakdown.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 rounded bg-[#131b2e] border border-[#222a3d]/40">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${item.dot}`}></span>
                      <span className="text-[#d8c3ad]">{item.label}</span>
                    </div>
                    <span className="font-semibold text-[#dae2fd] font-mono">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="pt-3 border-t border-[#222a3d]/60 flex items-center justify-between text-xs text-[#8e98b0]">
            <span>Inversión Pauta {currentStats.name}:</span>
            <span className="text-[#ffc640] font-medium">{currentStats.pauta} ({currentStats.roas})</span>
          </div>
        </div>
      </section>

      {/* ACTIONABLE INSIGHTS ROW - Específico para el canal seleccionado */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Insight 1: Recomendación de Horario y Formato específico de la red */}
        <div className="rounded-xl bg-[#171f33] p-4 border border-[#222a3d] flex flex-col justify-between">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-base text-[#ffc640]">schedule</span>
              <span className="font-semibold text-xs text-[#dae2fd]">{currentStats.recommendationTitle}</span>
            </div>
            <span className="text-[11px] text-emerald-400 font-medium">{currentStats.recommendationGrowth}</span>
          </div>

          <p className="text-xs text-[#d8c3ad] my-3 leading-relaxed">
            {currentStats.recommendationText}
          </p>

          <button
            onClick={() => {
              setCurrentModule('calendario-contenido');
              showToast(`Programando publicación para ${currentStats.name} en el Calendario`);
            }}
            className="self-start text-xs font-semibold text-[#ffc640] hover:text-[#ffc174] flex items-center gap-1 transition-colors"
          >
            <span>Programar en {currentStats.name}</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>

        {/* Insight 2: Sentimiento y Percepción en la red */}
        <div className="rounded-xl bg-[#171f33] p-4 border border-[#222a3d] flex flex-col justify-between">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-base text-emerald-400">favorite</span>
              <span className="font-semibold text-xs text-[#dae2fd]">{currentStats.sentimentTitle}</span>
            </div>
            <span className="text-[11px] text-emerald-400 font-semibold">{currentStats.sentimentPositive}% positivo</span>
          </div>

          {/* Simple horizontal bar */}
          <div className="my-3 flex flex-col gap-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#dae2fd]">{currentStats.sentimentText}</span>
            </div>
            <div className="w-full bg-[#0b1326] rounded-full h-2 flex overflow-hidden">
              <div className="bg-emerald-400 h-full" style={{ width: `${currentStats.sentimentPositive}%` }}></div>
              <div className="bg-[#ffc640] h-full" style={{ width: `${currentStats.sentimentNeutral}%` }}></div>
            </div>
          </div>

          <button
            onClick={() => setCurrentModule('social-listening')}
            className="self-start text-xs font-semibold text-[#dae2fd] hover:text-[#ffc640] flex items-center gap-1 transition-colors"
          >
            <span>Ver menciones de {currentStats.name} en Social Listening</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>
      </section>

      {/* TOP PUBLICATIONS TABLE - Filtrada por canal */}
      <section className="rounded-xl bg-[#171f33] p-5 border border-[#222a3d] flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-sm sm:text-base font-semibold text-[#dae2fd]">
              Publicaciones Más Exitosas: {currentStats.name}
            </h2>
            <p className="text-xs text-[#8e98b0]">
              {activeChannelFilter === 'all'
                ? 'Impacto consolidado de la campaña del 21 de septiembre'
                : `Contenidos de ${currentStats.name} con mayor conversión y ventas`}
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-[#8e98b0]">Ordenar por:</span>
            <select
              value={selectedSort}
              onChange={(e) => setSelectedSort(e.target.value as 'roi' | 'reach' | 'er')}
              className="px-2.5 py-1 rounded bg-[#131b2e] border border-[#222a3d] text-[#dae2fd] text-xs focus:outline-none"
            >
              <option value="roi">Mayor Ingreso (S/)</option>
              <option value="reach">Mayor Alcance (Vistas)</option>
              <option value="er">Mayor Engagement</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="text-[#8e98b0] text-[11px] border-b border-[#222a3d]">
                <th className="py-2.5 px-3 font-medium">Contenido</th>
                <th className="py-2.5 px-3 font-medium">Canal</th>
                <th className="py-2.5 px-3 font-medium">Vistas / Alcance</th>
                <th className="py-2.5 px-3 font-medium">Engagement</th>
                <th className="py-2.5 px-3 font-medium">Ventas Generadas</th>
                <th className="py-2.5 px-3 font-medium text-right">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#222a3d]/40">
              {filteredPublications.map((pub) => (
                <tr key={pub.id} className="hover:bg-[#222a3d]/30 transition-colors">
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-3">
                      <img 
                        src={pub.image} 
                        alt={pub.title} 
                        className="w-10 h-10 rounded-lg object-cover shrink-0 bg-[#0b1326]" 
                      />
                      <div className="flex flex-col min-w-0 max-w-md">
                        <span className="font-medium text-[#dae2fd] truncate text-xs">{pub.title}</span>
                        <span className="text-[11px] text-[#8e98b0] truncate">{pub.sub}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <span className="text-xs text-[#d8c3ad] capitalize">{pub.channel}</span>
                  </td>
                  <td className="py-3 px-3 font-mono text-[#dae2fd] tabular-nums">
                    {pub.reach}
                  </td>
                  <td className="py-3 px-3 font-mono text-emerald-400 tabular-nums">
                    {pub.er}
                  </td>
                  <td className="py-3 px-3">
                    <span className="font-semibold text-[#ffc174] font-mono tabular-nums block">{pub.revenue}</span>
                    <span className="text-[10px] text-[#8e98b0]">{pub.orders}</span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={() => showToast(`Promocionando contenido de ${pub.channel}: ${pub.title}`)}
                      className="px-2.5 py-1 rounded bg-[#222a3d] hover:bg-[#2d3449] text-[#dae2fd] text-[11px] font-medium transition-colors"
                    >
                      Promocionar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
