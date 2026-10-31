import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';

export const SocialListeningSentinel: React.FC = () => {
  const { showToast, setCurrentModule } = useApp();

  const [isAlertActive, setIsAlertActive] = useState(true);
  const [isSilenced, setIsSilenced] = useState(false);
  const [selectedPlatformTag, setSelectedPlatformTag] = useState('todas');
  const [showContingencyModal, setShowContingencyModal] = useState(false);
  const [showKillSwitchModal, setShowKillSwitchModal] = useState(false);
  const [killSwitchActivated, setKillSwitchActivated] = useState(false);

  const [mentions, setMentions] = useState([
    {
      id: 'm-1',
      platform: 'TikTok Video',
      platformColor: 'bg-cyan-500/10 text-cyan-400',
      handle: '@rodrigo_lima24',
      time: 'Hace 4 min',
      sentiment: 'Negativo (91%)',
      sentimentColor: 'bg-red-500/20 text-red-400',
      location: 'Surco, Lima',
      body: '"Oigan @kajelbloom mi pedido de flores amarillas para mi flaca en Surco todavía no llega y ya son las 6pm, qué palta en serio @indecopi"',
      nlpNote: 'NLP Detectó: "palta" (Fricción alta), "@indecopi" (Riesgo institucional)',
      isActioned: false
    },
    {
      id: 'm-2',
      platform: 'Instagram Reel',
      platformColor: 'bg-pink-500/10 text-pink-400',
      handle: '@mariana.lifestyle',
      time: 'Hace 18 min',
      sentiment: 'Muy Positivo (99%)',
      sentimentColor: 'bg-emerald-500/20 text-emerald-400',
      location: 'Miraflores, Lima',
      body: '"Amé la sorpresa de @kajelbloom, llegaron intactas las flores a Miraflores! 10/10 ✨💛"',
      nlpNote: 'NLP Detectó: Satisfacción total, Alto valor UGC orgánico.',
      isActioned: false
    },
    {
      id: 'm-3',
      platform: 'Facebook Post',
      platformColor: 'bg-blue-500/10 text-blue-400',
      handle: '@claudia_aqp',
      time: 'Hace 32 min',
      sentiment: 'Intención de Compra Alta',
      sentimentColor: 'bg-[#ffc640]/20 text-[#ffc640]',
      location: 'Arequipa',
      body: '"¿Tienen envío para Arequipa de este ramo floral para mañana? Urgente por favor!"',
      nlpNote: 'Lead Calificado • Oportunidad de Venta Express',
      isActioned: false
    },
    {
      id: 'm-4',
      platform: 'TikTok Comentario',
      platformColor: 'bg-cyan-500/10 text-cyan-400',
      handle: '@alerta_comunidad',
      time: 'Hace 45 min',
      sentiment: 'Alerta de Suplantación',
      sentimentColor: 'bg-red-500/30 text-red-300 font-bold',
      location: 'Ciberfraude',
      body: '"Ojo que vi una página falsa en FB que se hace pasar por Kajel pidiendo Yape con descuento del 50%, no caigan!"',
      nlpNote: 'Detección de Phishing Activo / Riesgo a Reputación de Marca',
      isActioned: false
    }
  ]);

  const handleSimulateCrisis = () => {
    showToast('Simulador de Crisis: Inyección de 25 menciones de prueba con modismos severos');
    setIsAlertActive(true);
    setIsSilenced(false);
  };

  const handleActionMention = (id: string, actionMsg: string) => {
    setMentions((prev) =>
      prev.map((m) => (m.id === id ? { ...m, isActioned: true } : m))
    );
    showToast(actionMsg);
  };

  return (
    <div className="flex flex-col w-full gap-6">
      {/* 1. ENCABEZADO Y BARRA DE ESTADO DEL CENTINELA */}
      <header className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 bg-[#131b2e] p-5 rounded-xl border border-[#222a3d] shadow-md">
        <div className="flex flex-col gap-1 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center p-1.5 rounded-lg bg-[#f59e0b]/20 text-[#f59e0b]">
              <span className="material-symbols-outlined text-xl">shield_with_heart</span>
            </span>
            <span className="text-[11px] uppercase tracking-wider font-semibold text-[#ffc640]">
              Módulo 02 • Sentinel Intelligence
            </span>
            <span className="px-2 py-0.5 rounded-full bg-[#222a3d] text-[#d8c3ad] text-[10px] font-mono">
              PE-NLP v4.2
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#dae2fd] tracking-tight">
            Sentinel Social Listening & Detección de Crisis
          </h1>
          <p className="text-xs sm:text-sm text-[#d8c3ad]">
            Monitoreo en tiempo real con NLP calibrado para Perú (Jerga y modismos), Radar de Crisis 24/7 y Webhooks automáticos.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleSimulateCrisis}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#222a3d] text-[#dae2fd] hover:text-[#ffc640] hover:bg-[#31394d] transition-colors text-xs font-semibold shadow-sm border border-[#222a3d]"
          >
            <span className="material-symbols-outlined text-base">science</span>
            <span>Simular Test de Crisis</span>
          </button>
          <button
            onClick={() => showToast('Umbral configurado: Alerta activa si negatividad > 5.0% en 30 minutos')}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#222a3d] text-[#dae2fd] hover:text-[#ffc640] hover:bg-[#31394d] transition-colors text-xs font-semibold shadow-sm border border-[#222a3d]"
          >
            <span className="material-symbols-outlined text-base">tune</span>
            <span>Configurar Reglas & Umbrales</span>
          </button>
          <button
            onClick={() => showToast('Informe de Escucha Social exportado en PDF')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#f59e0b] text-[#0b1326] text-xs font-bold hover:bg-[#ffc640] transition-all shadow-md"
          >
            <span className="material-symbols-outlined text-base font-bold">download</span>
            <span>Exportar Informe</span>
          </button>
        </div>
      </header>

      {/* Live Status Bar Ribbon */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 px-4 py-2.5 rounded-xl bg-[#171f33] text-[#d8c3ad] text-xs border border-[#222a3d] shadow-sm">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ffc640] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#ffc640]"></span>
            </span>
            <span className="font-semibold text-[#dae2fd]">Motor de Detección Activo</span>
          </div>
          <span className="text-[#a08e7a]">/</span>
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-sm text-[#ffc640]">speed</span> 18 menciones/hora
          </span>
          <span className="text-[#a08e7a]">/</span>
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-sm text-[#ffc174]">hub</span> Latencia Webhook 320ms
          </span>
          <span className="text-[#a08e7a]">/</span>
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-sm text-[#dae2fd]">verified_user</span> Modo Escudo: Vigilancia Estándar
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] text-[#d8c3ad]">
          <span className="w-2 h-2 rounded-full bg-[#ffc640]"></span>
          <span>Clusters Lima & Provincias Sincronizados</span>
        </div>
      </div>

      {/* 2. ALERTA CRÍTICA ACTIVA (BANNER NIVEL 2) */}
      {isAlertActive && (
        <section className={`relative overflow-hidden rounded-xl border p-5 shadow-xl transition-all ${
          isSilenced
            ? 'bg-[#131b2e] border-[#222a3d] opacity-75'
            : 'bg-gradient-to-r from-red-950/80 via-[#222a3d] to-[#131b2e] border-red-500/50'
        }`}>
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 relative z-10">
            <div className="flex items-start gap-3.5">
              <div className="p-3 rounded-xl bg-red-500/20 text-red-400 shrink-0 animate-pulse">
                <span className="material-symbols-outlined text-3xl">emergency_home</span>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-red-500 text-white text-[10px] font-bold uppercase tracking-wider">
                    {isSilenced ? 'Alerta Nivel 2 (Silenciada)' : 'Alerta Nivel 2: Umbral Superado'}
                  </span>
                  <span className="text-xs text-[#d8c3ad]">+34% incremento de quejas en últimos 45 min</span>
                  <span className="px-2 py-0.5 rounded bg-[#2d3449] text-[#ffc640] text-[10px] font-mono font-semibold">
                    Campaña: Flores Amarillas
                  </span>
                </div>
                <p className="font-bold text-base text-white">
                  Demoras en envíos express por 21 de Septiembre en Lima Norte / San Miguel.
                </p>
                <p className="text-xs text-[#d8c3ad] flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-sm text-[#ffc174]">forward_to_inbox</span>
                  Webhook despachado a canales <span className="text-[#dae2fd] font-semibold">#ops-alertas-express</span> (Slack) y WhatsApp Grupo Despacho Urgente.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full lg:w-auto justify-end">
              <button
                onClick={() => {
                  setIsSilenced(!isSilenced);
                  showToast(isSilenced ? 'Alerta reactivada' : 'Alerta silenciada por 30 minutos');
                }}
                className="px-3.5 py-2 rounded-lg bg-[#222a3d] hover:bg-[#31394d] text-xs font-semibold text-[#dae2fd] transition-colors"
              >
                {isSilenced ? 'Reactivar Alerta' : 'Silenciar 30m'}
              </button>
              <button
                onClick={() => setShowContingencyModal(true)}
                className="px-3.5 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-bold shadow-md flex items-center gap-1.5 transition-all"
              >
                <span className="material-symbols-outlined text-base">rocket_launch</span>
                <span>Desplegar Plan de Contingencia</span>
              </button>
            </div>
          </div>
        </section>
      )}

      {/* MATRIZ DE KPIS */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1 */}
        <div className="p-4 rounded-xl bg-[#131b2e] border border-[#222a3d] flex flex-col justify-between gap-2 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#d8c3ad] uppercase tracking-wider">Sentiment Health Score</span>
            <span className="material-symbols-outlined text-[#ffc640] text-lg">mood</span>
          </div>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-3xl font-extrabold text-[#dae2fd] font-metric">88.4</span>
            <span className="text-xs text-[#d8c3ad]">/ 100</span>
          </div>
          <div className="flex items-center justify-between text-xs pt-1">
            <span className="text-[#ffc640] font-semibold flex items-center gap-0.5">
              <span className="material-symbols-outlined text-xs">trending_flat</span> Neutra / Estable
            </span>
            <span className="text-[11px] text-[#d8c3ad]">Alerta temprana</span>
          </div>
          <div className="w-full bg-[#2d3449] rounded-full h-1.5 overflow-hidden">
            <div className="bg-[#ffc640] h-1.5 rounded-full" style={{ width: '88.4%' }}></div>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="p-4 rounded-xl bg-[#131b2e] border border-[#222a3d] flex flex-col justify-between gap-2 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#d8c3ad] uppercase tracking-wider">Menciones Totales 24h</span>
            <span className="material-symbols-outlined text-[#ffc174] text-lg">forum</span>
          </div>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-3xl font-extrabold text-[#dae2fd] font-metric">142</span>
            <span className="text-xs text-[#ffc174] font-bold">+112%</span>
          </div>
          <div className="flex items-center justify-between text-xs pt-1">
            <span className="text-[#ffc174] font-semibold flex items-center gap-0.5">
              <span className="material-symbols-outlined text-xs">arrow_upward</span> Pico estacional
            </span>
            <span className="text-[11px] text-[#d8c3ad]">Flores Amarillas</span>
          </div>
          <div className="w-full bg-[#2d3449] rounded-full h-1.5 overflow-hidden">
            <div className="bg-[#ffc174] h-1.5 rounded-full" style={{ width: '72%' }}></div>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="p-4 rounded-xl bg-[#131b2e] border border-[#222a3d] flex flex-col justify-between gap-2 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#d8c3ad] uppercase tracking-wider">Tasa Negatividad Crítica</span>
            <span className="material-symbols-outlined text-red-400 text-lg">crisis_alert</span>
          </div>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-3xl font-extrabold text-[#dae2fd] font-metric">3.8%</span>
            <span className="text-xs text-[#d8c3ad]">Límite 5.0%</span>
          </div>
          <div className="flex items-center justify-between text-xs pt-1">
            <span className="text-red-400 font-semibold flex items-center gap-0.5">
              <span className="material-symbols-outlined text-xs">arrow_upward</span> +0.9% en 1h
            </span>
            <span className="text-[11px] text-[#d8c3ad]">Zona Precaución</span>
          </div>
          <div className="w-full bg-[#2d3449] rounded-full h-1.5 overflow-hidden">
            <div className="bg-red-400 h-1.5 rounded-full" style={{ width: '76%' }}></div>
          </div>
        </div>

        {/* KPI 4 */}
        <div className="p-4 rounded-xl bg-[#131b2e] border border-[#222a3d] flex flex-col justify-between gap-2 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#d8c3ad] uppercase tracking-wider">First Response Time</span>
            <span className="material-symbols-outlined text-[#ffc640] text-lg">timer</span>
          </div>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-3xl font-extrabold text-[#dae2fd] font-metric">4.8 min</span>
            <span className="text-xs text-[#d8c3ad]">SLA &lt; 10m</span>
          </div>
          <div className="flex items-center justify-between text-xs pt-1">
            <span className="text-[#ffc640] font-semibold flex items-center gap-0.5">
              <span className="material-symbols-outlined text-xs">check_circle</span> 100% Cumplido
            </span>
            <span className="text-[11px] text-[#d8c3ad]">Bot + Agentes</span>
          </div>
          <div className="w-full bg-[#2d3449] rounded-full h-1.5 overflow-hidden">
            <div className="bg-[#ffc640] h-1.5 rounded-full" style={{ width: '48%' }}></div>
          </div>
        </div>
      </section>

      {/* 3. RADAR DE KEYWORDS & MODISMOS PERÚ */}
      <section className="rounded-xl bg-[#131b2e] p-5 border border-[#222a3d] shadow-md flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-lg bg-[#222a3d] text-[#ffc174]">
              <span className="material-symbols-outlined text-lg">radar</span>
            </span>
            <div>
              <h2 className="text-sm font-bold text-[#dae2fd]">Radar de Señales NLP • Diccionario Local Perú</h2>
              <p className="text-xs text-[#d8c3ad]">Filtro léxico entrenado con modismos limeños, quejas de courier y jerga local.</p>
            </div>
          </div>

          <div className="flex items-center gap-1 p-1 rounded-lg bg-[#222a3d] text-xs font-medium">
            {['todas', 'tiktok', 'instagram', 'facebook'].map((p) => (
              <button
                key={p}
                onClick={() => setSelectedPlatformTag(p)}
                className={`px-2.5 py-1 rounded capitalize transition-all ${
                  selectedPlatformTag === p
                    ? 'bg-[#f59e0b] text-[#0b1326] font-bold shadow-sm'
                    : 'text-[#d8c3ad] hover:text-[#dae2fd]'
                }`}
              >
                {p === 'todas' ? 'Todas' : p}
              </button>
            ))}
          </div>
        </div>

        {/* Chips Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-3 pt-1">
          <div className="p-3 rounded-lg bg-[#171f33] border border-[#222a3d] hover:border-[#ffc174]/40 transition-all flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-xs text-[#dae2fd] truncate">"Flores Amarillas"</span>
              <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">Pos 94%</span>
            </div>
            <div className="flex items-center justify-between text-[#d8c3ad] text-[11px]">
              <span>18.2K menciones</span>
              <span className="text-[#ffc640] font-bold">Tendencia #1</span>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-[#171f33] border border-red-500/30 hover:border-red-500/60 transition-all flex flex-col gap-1 ring-1 ring-red-500/20">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-xs text-red-400 truncate">"Repartidor / Courier"</span>
              <span className="px-1.5 py-0.5 rounded bg-red-500/20 text-red-400 text-[10px] font-bold">Neg 68%</span>
            </div>
            <div className="flex items-center justify-between text-[#d8c3ad] text-[11px]">
              <span>1.4K menciones</span>
              <span className="text-red-300 font-mono">palta, demorón</span>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-[#171f33] border border-red-500/40 hover:border-red-500/70 transition-all flex flex-col gap-1 ring-1 ring-red-500/30">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-xs text-red-400 flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">gavel</span> "Indecopi"
              </span>
              <span className="px-1.5 py-0.5 rounded bg-red-500 text-white text-[10px] font-bold">Crítico</span>
            </div>
            <div className="flex items-center justify-between text-[#d8c3ad] text-[11px]">
              <span>142 menciones</span>
              <span className="text-red-400 font-bold">Riesgo Legal</span>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-[#171f33] border border-[#222a3d] hover:border-[#ffc174]/40 transition-all flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-xs text-[#dae2fd] truncate">"Hermoso ramo / calidad"</span>
              <span className="px-1.5 py-0.5 rounded bg-[#ffc640]/20 text-[#ffc640] text-[10px] font-bold">Pos 98%</span>
            </div>
            <div className="flex items-center justify-between text-[#d8c3ad] text-[11px]">
              <span>9.1K menciones</span>
              <span className="text-[#ffc174]">UGC Viral</span>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-[#171f33] border border-[#222a3d] hover:border-[#ffc174]/40 transition-all flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-xs text-[#dae2fd] truncate">"Precios inbox / estafa"</span>
              <span className="px-1.5 py-0.5 rounded bg-[#2d3449] text-[#ffc174] text-[10px] font-bold">Mod 42%</span>
            </div>
            <div className="flex items-center justify-between text-[#d8c3ad] text-[11px]">
              <span>840 menciones</span>
              <span className="text-[#d8c3ad]">Fricción DMs</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. GRÁFICO DE ANOMALÍAS DE SENTIMIENTO (24H) */}
      <section className="rounded-xl bg-[#131b2e] p-5 border border-[#222a3d] shadow-md flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-lg bg-[#222a3d] text-[#ffc640]">
              <span className="material-symbols-outlined text-lg">show_chart</span>
            </span>
            <div>
              <h2 className="text-sm font-bold text-[#dae2fd]">Volumen de Menciones y Anomalías de Sentimiento (Últimas 24h)</h2>
              <p className="text-xs text-[#d8c3ad]">Correlación de menciones por canal con detección algorítmica de puntos de inflexión.</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-xs text-[#d8c3ad]">
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#ffc640]"></span> Positivo</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#a08e7a]"></span> Neutral</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-red-400"></span> Negativo Crítico</span>
          </div>
        </div>

        {/* SVG Chart Canvas */}
        <div className="relative w-full h-56 rounded-lg bg-[#060e20] p-4 flex flex-col justify-end overflow-hidden border border-[#222a3d]">
          <div className="absolute top-3 left-1/2 md:left-[68%] -translate-x-1/2 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-900/90 text-white text-xs border border-red-500/50 shadow-xl z-20">
            <span className="material-symbols-outlined text-sm text-red-300">warning</span>
            <span>17:30 hrs: Pico Logístico Lima (+34% quejas)</span>
          </div>

          <svg className="w-full h-40 overflow-visible" fill="none" preserveAspectRatio="none" viewBox="0 0 1000 160">
            <line stroke="#222a3d" strokeDasharray="4 4" strokeWidth="1" x1="0" x2="1000" y1="30" y2="30"></line>
            <line stroke="#222a3d" strokeDasharray="4 4" strokeWidth="1" x1="0" x2="1000" y1="80" y2="80"></line>
            <line stroke="#222a3d" strokeDasharray="4 4" strokeWidth="1" x1="0" x2="1000" y1="130" y2="130"></line>

            {/* Positive */}
            <path d="M0,110 C150,105 280,60 420,50 C560,40 650,85 750,45 C860,10 930,30 1000,35" stroke="#ffc640" strokeWidth="2.5"></path>
            {/* Critical negative spike */}
            <path d="M0,150 C300,150 500,145 620,140 C680,120 700,40 730,42 C760,45 800,130 900,145 C950,150 980,150 1000,150" stroke="#ffb4ab" strokeWidth="2.5"></path>
            
            <line stroke="#ffb4ab" strokeDasharray="3 3" strokeWidth="1.5" x1="720" x2="720" y1="0" y2="160"></line>
            <circle cx="720" cy="42" r="5" fill="#ffb4ab"></circle>
          </svg>

          <div className="flex justify-between text-[#d8c3ad] text-[11px] font-mono pt-2">
            <span>00:00</span>
            <span>04:00</span>
            <span>08:00</span>
            <span>12:00</span>
            <span className="text-red-400 font-bold">17:30 (Pico)</span>
            <span>20:00</span>
            <span>23:59 (Ahora)</span>
          </div>
        </div>
      </section>

      {/* 5. FEED EN VIVO & PROTOCOLO LATERAL */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Feed de Menciones (8 cols) */}
        <section className="lg:col-span-8 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#ffc640] text-xl">stream</span>
              <h2 className="font-bold text-sm text-[#dae2fd]">Feed en Vivo de Menciones Clave (Con Clasificación NLP)</h2>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-[#d8c3ad]">
              <span className="w-2 h-2 rounded-full bg-[#ffc640] animate-pulse"></span>
              <span>Streaming Activo</span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {mentions.map((m) => (
              <article
                key={m.id}
                className="p-4 rounded-xl bg-[#131b2e] border border-[#222a3d] hover:bg-[#171f33] transition-all flex flex-col gap-3 shadow-sm"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${m.platformColor}`}>
                      {m.platform}
                    </span>
                    <span className="font-semibold text-xs text-[#dae2fd]">{m.handle}</span>
                    <span className="text-[10px] text-[#d8c3ad]">{m.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${m.sentimentColor}`}>
                      {m.sentiment}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-[#222a3d] text-[#d8c3ad] text-[10px]">
                      {m.location}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-[#dae2fd] leading-relaxed">{m.body}</p>

                <div className="flex flex-wrap items-center justify-between gap-2 pt-2 bg-[#060e20] p-2.5 rounded-lg border border-[#222a3d]/50">
                  <div className="flex items-center gap-1.5 text-[11px] text-[#d8c3ad]">
                    <span className="material-symbols-outlined text-sm text-[#ffc174]">flag</span>
                    <span>{m.nlpNote}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => {
                        setCurrentModule('inbox-comunitario');
                        showToast(`Mención ${m.handle} transferida al Helpdesk Comunitario`);
                      }}
                      className="px-2.5 py-1 rounded bg-[#222a3d] hover:bg-[#31394d] text-xs text-[#ffc174] font-medium flex items-center gap-1 transition-colors"
                    >
                      <span className="material-symbols-outlined text-xs">support_agent</span>
                      <span>Escalar Helpdesk</span>
                    </button>
                    <button
                      onClick={() => handleActionMention(m.id, `Respuesta con empatía local despachada a ${m.handle}`)}
                      className="px-2.5 py-1 rounded bg-[#f59e0b] hover:bg-[#ffc640] text-[#0b1326] text-xs font-bold transition-all"
                    >
                      Respuesta Empatía IA
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* 6. PANEL LATERAL: PROTOCOLO DE CRISIS AUTOMATIZADO (4 cols) */}
        <aside className="lg:col-span-4 flex flex-col gap-4">
          <div className="p-5 rounded-xl bg-[#131b2e] border border-[#222a3d] flex flex-col gap-4 shadow-md">
            <div className="flex items-center gap-2.5 pb-2 border-b border-[#222a3d]">
              <span className="p-2 rounded-lg bg-[#222a3d] text-[#ffc640]">
                <span className="material-symbols-outlined text-xl">security</span>
              </span>
              <div>
                <h3 className="font-bold text-sm text-[#dae2fd]">Threat Shield Protocol</h3>
                <p className="text-xs text-[#d8c3ad]">Flujo automatizado de mitigación en 3 escalones.</p>
              </div>
            </div>

            <div className="flex flex-col gap-2.5">
              {/* Nivel 1 */}
              <div className="p-3 rounded-lg bg-[#171f33] border border-[#222a3d] flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded bg-[#f59e0b]/20 text-[#ffc174] text-[10px] font-bold">
                    Nivel 1 • Automático
                  </span>
                  <span className="text-emerald-400 text-[10px] font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs">check_circle</span> Activo
                  </span>
                </div>
                <span className="text-xs font-semibold text-[#dae2fd]">Auto-respuesta empática inmediata</span>
                <p className="text-[11px] text-[#d8c3ad]">
                  Envío contextual con geolocalización de courier y disculpas proactivas.
                </p>
              </div>

              {/* Nivel 2 */}
              <div className="p-3 rounded-lg bg-[#171f33] border border-[#f59e0b]/50 ring-1 ring-[#f59e0b]/30 flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded bg-[#f59e0b] text-[#0b1326] text-[10px] font-bold">
                    Nivel 2 • Escalamiento
                  </span>
                  <span className="text-[#ffc640] text-[10px] font-bold flex items-center gap-1">
                    <span className="animate-pulse w-1.5 h-1.5 rounded-full bg-[#ffc640]"></span> En Curso
                  </span>
                </div>
                <span className="text-xs font-semibold text-[#dae2fd]">Asignación a Supervisor de Operaciones</span>
                <p className="text-[11px] text-[#d8c3ad]">
                  Tickets con modismos severos son transferidos a agentes senior en &lt; 3 minutos.
                </p>
              </div>

              {/* Nivel 3 */}
              <div className={`p-3 rounded-lg border flex flex-col gap-1 transition-all ${
                killSwitchActivated
                  ? 'bg-red-950/40 border-red-500'
                  : 'bg-[#171f33] border-[#222a3d]'
              }`}>
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded bg-red-500/20 text-red-400 text-[10px] font-bold">
                    Nivel 3 • Freno de Emergencia
                  </span>
                  <span className={`text-[10px] font-mono ${killSwitchActivated ? 'text-red-400 font-bold animate-pulse' : 'text-[#d8c3ad]'}`}>
                    {killSwitchActivated ? 'KILL-SWITCH ACTIVO' : 'Standby'}
                  </span>
                </div>
                <span className="text-xs font-semibold text-[#dae2fd]">Kill-Switch de Ads Meta & TikTok</span>
                <p className="text-[11px] text-[#d8c3ad]">
                  Pausa automática de pauta publicitaria en campañas si la negatividad excede el 5.0%.
                </p>
              </div>
            </div>

            {/* Kill Switch Trigger Button */}
            <div className="pt-2 flex flex-col gap-1.5">
              <button
                onClick={() => setShowKillSwitchModal(true)}
                className={`w-full py-2.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-md ${
                  killSwitchActivated
                    ? 'bg-red-700 text-white'
                    : 'bg-red-600 hover:bg-red-500 text-white'
                }`}
              >
                <span className="material-symbols-outlined text-base">bolt</span>
                <span>{killSwitchActivated ? 'Restablecer Campañas Pausadas' : 'Activar Kill-Switch Manual de Campañas'}</span>
              </button>
              <span className="text-center text-[10px] text-[#d8c3ad]">
                Requiere credencial de Brand Manager o Director de Marketing
              </span>
            </div>
          </div>

          {/* Integración Webhooks */}
          <div className="p-4 rounded-xl bg-[#131b2e] border border-[#222a3d] flex flex-col gap-2.5 shadow-md">
            <span className="text-[11px] text-[#dae2fd] uppercase tracking-wider font-semibold">
              Integraciones de Notificación
            </span>
            <div className="flex flex-col gap-2 text-xs">
              <div className="flex items-center justify-between p-2 rounded bg-[#060e20] border border-[#222a3d]/50">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#ffc640] text-sm">chat</span>
                  <span className="text-[#dae2fd]">Slack #crisis-war-room</span>
                </div>
                <span className="text-emerald-400 text-[10px] font-semibold">Conectado</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-[#060e20] border border-[#222a3d]/50">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#ffc640] text-sm">send_to_mobile</span>
                  <span className="text-[#dae2fd]">WhatsApp Dispatch Ops</span>
                </div>
                <span className="text-emerald-400 text-[10px] font-semibold">Conectado</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-[#060e20] border border-[#222a3d]/50">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#ffc640] text-sm">integration_instructions</span>
                  <span className="text-[#dae2fd]">Jira Service Desk Escalation</span>
                </div>
                <span className="text-emerald-400 text-[10px] font-semibold">Sync Activo</span>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Contingency Modal */}
      {showContingencyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="w-full max-w-md bg-[#171f33] border border-red-500/40 rounded-2xl p-6 shadow-2xl flex flex-col gap-4">
            <div className="flex items-center gap-2.5 text-red-400 border-b border-[#222a3d] pb-2">
              <span className="material-symbols-outlined text-2xl">emergency</span>
              <h3 className="text-sm font-bold text-white">Desplegar Plan de Contingencia</h3>
            </div>
            <p className="text-xs text-[#dae2fd] leading-relaxed">
              El plan de contingencia enviará un broadcast automático a los 8 motorizados de Lima Norte, activará el cupón de disculpas <strong>S/ 30 ("Flores Perdón")</strong> y priorizará los pedidos con etiquetas de reclamo urgente.
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowContingencyModal(false)}
                className="px-3 py-1.5 rounded-lg bg-[#222a3d] text-xs text-[#dae2fd]"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  showToast('Plan de Contingencia desplegado en Slack & WhatsApp Dispatch');
                  setShowContingencyModal(false);
                }}
                className="px-4 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-bold"
              >
                Confirmar Despliegue
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Kill Switch Modal */}
      {showKillSwitchModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-[#171f33] border border-red-500 rounded-2xl p-6 shadow-2xl flex flex-col gap-4">
            <div className="flex items-center gap-2.5 text-red-400 border-b border-[#222a3d] pb-2">
              <span className="material-symbols-outlined text-2xl">warning</span>
              <h3 className="text-sm font-bold text-white">Confirmar Kill-Switch de Campañas</h3>
            </div>
            <p className="text-xs text-[#dae2fd] leading-relaxed">
              {killSwitchActivated
                ? '¿Desea reanudar la pauta publicitaria en TikTok Ads y Meta Ads para la campaña de Flores Amarillas?'
                : '¿Está seguro de pausar inmediatamente toda la pauta publicitaria en TikTok y Meta Ads para evitar fuga de ROI durante la contingencia logística?'}
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowKillSwitchModal(false)}
                className="px-3 py-1.5 rounded-lg bg-[#222a3d] text-xs text-[#dae2fd]"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  setKillSwitchActivated(!killSwitchActivated);
                  showToast(
                    killSwitchActivated
                      ? 'Pauta publicitaria reanudada con éxito'
                      : '¡Kill-Switch Activado! Campañas pausadas en TikTok y Meta Ads'
                  );
                  setShowKillSwitchModal(false);
                }}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold text-white ${
                  killSwitchActivated ? 'bg-emerald-600 hover:bg-emerald-500' : 'bg-red-600 hover:bg-red-500'
                }`}
              >
                {killSwitchActivated ? 'Reanudar Campañas' : 'Pausar Campañas Ahora'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
