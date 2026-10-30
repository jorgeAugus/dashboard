import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';

export const DirectorioInfluencers: React.FC = () => {
  const { showToast, searchQuery } = useApp();

  // Interactive Simulator State - Escala Micro-Creadores Lima
  const [simReach, setSimReach] = useState(8500);
  const [simER, setSimER] = useState(7.2);
  const [simFee, setSimFee] = useState(90);
  const [simCVR, setSimCVR] = useState(2.4);
  const [simModel, setSimModel] = useState<'standard' | 'cpm' | 'cpa'>('standard');

  // Directory filter state
  const [nicheFilter, setNicheFilter] = useState('todos');
  const [platformFilter, setPlatformFilter] = useState('todas');
  const [sortBy, setSortBy] = useState('emv');

  // Calculate EMV based on standard Peruvian retail IAB formula
  const multiplier = simModel === 'cpm' ? 0.32 : simModel === 'cpa' ? 0.44 : 0.38;
  const calculatedEMV = Math.round((simReach * (simER / 100) * multiplier) + ((simReach * 0.02) * (simCVR / 100) * 68));
  const calculatedNet = calculatedEMV - simFee;
  const calculatedROI = Math.round((calculatedNet / (simFee || 1)) * 100);

  const creators = [
    {
      id: 'c-1',
      name: 'Valeria Morales',
      handle: '@valeria.lifestyle',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDs10ew7_fQ2xi3TQm8zn-RwoID2hgHvhHM3t2hvueqApDQtScRWT3fYV30ZQNz0Kn-7CDRL0Gut6nftjKm-R36yfYz5ECMQprSmyqVXc7Yk4Ewxfa4z5UClsrGiL-ZHIuhUUpXSIcB4iyVgHgoLer_gwJdWt1s3kNvxE6qN2mCCfHnL1TxIgNotcB_gIOfJ_kTktViwHJW-RPYmLGQHOlkmeDF41ydLobG7_tOv87cXW506qV36mzv1Q',
      badgeIcon: '★',
      badgeColor: 'bg-[#ffc640] text-[#060e20]',
      niche: 'moda',
      nicheText: 'Moda & Lifestyle • Lima',
      status: 'Campaña Activa',
      statusNote: 'Sobrecumplimiento',
      platforms: [{ name: 'IG 14K', color: 'text-[#f43f5e]' }, { name: 'TT 18K', color: 'text-[#22d3ee]' }],
      authenticity: 96.4,
      botsPercent: 3.6,
      er: 8.4,
      erBench: 'vs 4.1% cat.',
      fee: 'Canje Ramo + S/ 50',
      deliverables: '1 Reel + 2 Stories',
      emv: 'S/ 420',
      emvRaw: 420,
      returnMult: '4.8x',
      attributedSales: 'S/ 380',
      ordersCount: 4,
      utmCode: '?utm_source=valeria_set21',
      campaignProduct: 'Flores Amarillas Boutique',
      lastAudit: '19 Set 10:30 AM'
    },
    {
      id: 'c-2',
      name: 'Diego Lima Trends',
      handle: '@diego_lima_trends',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB4bTxAUOpI7D9VxzzOs7_v3S8kaAWaE4jjDL68SjZQnSy5j8-tUM5Gxe_dRPlGt-Rbot6hPsHdWS2IUlmZXOhNynTmdQboSKTLQ4u-9MzyQttVcA1_amp69BCZ6iYzCvWl3Tq-B4kJVMLPH64XBPMs_z3_OqMRnjrGAzk1Xg84hc0IUDbC8rP1cndcqqOhRXeNKhpjY1Ttba1viOmv7ZDlh6ec7N3WWrnWiblWA2zot75O10eFdrpjCA',
      badgeIcon: '♪',
      badgeColor: 'bg-[#22d3ee] text-[#060e20]',
      niche: 'lifestyle',
      nicheText: 'Humor & Tendencias • Lima',
      status: 'Campaña Activa',
      statusNote: 'TikTok Viral Focus',
      platforms: [{ name: 'TT 12K', color: 'text-[#22d3ee]' }, { name: 'IG 4.5K', color: 'text-[#f43f5e]' }],
      authenticity: 94.2,
      botsPercent: 5.8,
      er: 7.8,
      erBench: 'Picos 14%',
      fee: 'Canje Ramo Premium',
      deliverables: '1 TikTok Orgánico',
      emv: 'S/ 290',
      emvRaw: 290,
      returnMult: '4.2x',
      attributedSales: 'S/ 240',
      ordersCount: 3,
      utmCode: '?utm_source=diego_set21',
      campaignProduct: 'Ramo Girasoles Viral',
      lastAudit: '20 Set 06:15 PM'
    },
    {
      id: 'c-3',
      name: 'Camila Salazar',
      handle: '@deco_peru',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDkq_tKPZsXQ-HBu7kXfU2qPdk4PN26mhUC6cAdshRGS5fwyennDiuK3T1ej82kMMY04k3yW-S-i1L7USg6ZubZdQkA01uU8YsVhorHZ8Ii7vgW_7pvnNjioDXWJrJOy4Ri2qV8SFLyIsFt1NxTZabf7lYx7aH8taHObwtZqz7x6jti9U8HoLnOyJIIwAXwRnVS8aeiWTIIzbcxolBYHx2UTPBwDjC3VZn8vTpWJk6973vXOoRZmSxKIQ',
      badgeIcon: '📌',
      badgeColor: 'bg-[#f87171] text-white',
      niche: 'lifestyle',
      nicheText: 'Decoración, Flores & Mesas • Lima',
      status: 'Campaña Activa',
      statusNote: 'Aesthetic Focus',
      platforms: [{ name: 'Pin 3.2K', color: 'text-[#f87171]' }, { name: 'IG 2.1K', color: 'text-[#f43f5e]' }],
      authenticity: 98.1,
      botsPercent: 1.9,
      er: 9.8,
      erBench: 'Alto Guardado',
      fee: 'Canje Centro de Mesa',
      deliverables: '2 Pins + 1 Story',
      emv: 'S/ 180',
      emvRaw: 180,
      returnMult: '4.0x',
      attributedSales: 'S/ 160',
      ordersCount: 2,
      utmCode: '?utm_source=deco_peru_set',
      campaignProduct: 'Arreglo de Mesa Primavera',
      lastAudit: '21 Set 09:00 AM'
    },
    {
      id: 'c-4',
      name: 'Rodrigo Paz',
      handle: '@rodrigo_citas_lima',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD0skp6MzjdQrhmsjVlsCn610PZ1D3PeTDAdEzHBlbwy6Y-M3Mx402rdLNwWINsApdeV2k7MY_dPiVjirEmkm7ad2muhHO2V1OCZDOXV37dPqp_94EF4tEyL5hQrr2xIaObN63JjltLFx_KywK6vXoTDby454kKTAiNdFZIqldEysnalY-YaM0xk8I6kcQw8IB771A10geQs8pHdl37FjFIYEMQ-RYbXcNm-G_pWizaYZ8fzXbxItljHw',
      badgeIcon: '⚡',
      badgeColor: 'bg-[#f59e0b] text-[#0b1326]',
      niche: 'foodie',
      nicheText: 'Planes, Citas & Detalles • Lima',
      status: 'Micro-Influencer',
      statusNote: 'Canje Local',
      platforms: [{ name: 'TT 4.8K', color: 'text-[#22d3ee]' }, { name: 'IG 1.8K', color: 'text-[#f43f5e]' }],
      authenticity: 95.0,
      botsPercent: 5.0,
      er: 11.2,
      erBench: 'Hyper Local',
      fee: 'Canje Combo Cita',
      deliverables: '1 Reseña + 1 Story',
      emv: 'S/ 110',
      emvRaw: 110,
      returnMult: '3.8x',
      attributedSales: 'S/ 90',
      ordersCount: 1,
      utmCode: '?utm_source=rodrigo_set21',
      campaignProduct: 'Combo Flores & Tarjeta',
      lastAudit: '21 Set 11:00 AM'
    }
  ];

  const filteredCreators = creators
    .filter((c) => {
      if (nicheFilter !== 'todos' && c.niche !== nicheFilter) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return c.name.toLowerCase().includes(q) || c.handle.toLowerCase().includes(q) || c.nicheText.toLowerCase().includes(q);
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'emv') return b.emvRaw - a.emvRaw;
      if (sortBy === 'autenticidad') return b.authenticity - a.authenticity;
      if (sortBy === 'er') return b.er - a.er;
      return 0;
    });

  return (
    <div className="flex flex-col w-full gap-6">
      {/* CABECERA DE MÓDULO & ACCIONES PRINCIPALES */}
      <section className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 pb-2">
        <div className="flex flex-col gap-1 max-w-3xl">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[11px] text-[#ffc174] uppercase tracking-widest bg-[#f59e0b]/20 px-2 py-0.5 rounded font-bold font-mono">
              MÓDULO 04 • CREATOR OPS & ATTRIBUTION
            </span>
            <span className="text-[11px] text-[#ffdf9f] bg-[#2d3449] px-2 py-0.5 rounded font-mono">
              PE-RETAIL ENGINE v3.2
            </span>
            <span className="flex items-center gap-1 text-[11px] text-[#d8c3ad]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ffc640] animate-pulse"></span> Live Attribution Sync
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#dae2fd] tracking-tight">
            Directorio de Creadores & Calculadora de ROI / EMV
          </h1>
          <p className="text-xs sm:text-sm text-[#d8c3ad] leading-relaxed">
            Auditoría algorítmica de autenticidad de audiencia, cálculo estandarizado de Earned Media Value (EMV) en Soles (PEN) y atribución directa con UTMs para Retail Perú.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap xl:self-end">
          <button
            onClick={() => showToast('Iniciando escaneo algorítmico de nuevo perfil de TikTok/Instagram')}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#222a3d] text-[#dae2fd] text-xs font-semibold hover:bg-[#31394d] transition-colors border border-[#222a3d]"
          >
            <span className="material-symbols-outlined text-base text-[#ffc174]">manage_search</span>
            <span>Auditar Nuevo Perfil</span>
          </button>
          <button
            onClick={() => showToast('Generador UTM: Parámetros &utm_campaign=flores_set21 generados')}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#222a3d] text-[#dae2fd] text-xs font-semibold hover:bg-[#31394d] transition-colors border border-[#222a3d]"
          >
            <span className="material-symbols-outlined text-base text-[#ffc640]">link</span>
            <span>Generador UTM</span>
          </button>
          <button
            onClick={() => showToast('Formulario de nueva colaboración abierto')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#f59e0b] text-[#0b1326] text-xs font-bold hover:bg-[#ffc640] transition-all shadow-md"
          >
            <span className="material-symbols-outlined text-base font-bold">add_circle</span>
            <span>+ Registrar Colaboración</span>
          </button>
        </div>
      </section>

      {/* FILA DE KPIS EJECUTIVOS - Escala Emprendimiento Kajel Bloom */}
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {/* KPI 1 */}
        <div className="p-4 rounded-xl bg-[#131b2e] border border-[#222a3d] flex flex-col justify-between shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#d8c3ad] uppercase tracking-wider">Inversión en Alianzas</span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-[#171f33] text-[#ffc174] font-semibold border border-[#222a3d]">
              Canje + Apoyo
            </span>
          </div>
          <div className="mt-2 flex flex-col">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl lg:text-3xl font-extrabold text-[#dae2fd] font-metric">S/ 150</span>
              <span className="text-xs text-[#d8c3ad] font-mono">PEN</span>
            </div>
            <div className="flex items-center justify-between text-[#d8c3ad] text-xs mt-1">
              <span>4 colaboraciones locales</span>
              <span className="text-[#ffc174] font-medium">100% entregado</span>
            </div>
          </div>
          <div className="w-full bg-[#2d3449] h-1.5 rounded-full mt-3 overflow-hidden">
            <div className="bg-[#f59e0b] h-full rounded-full" style={{ width: '85%' }}></div>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="p-4 rounded-xl bg-[#131b2e] border border-[#222a3d] flex flex-col justify-between shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#d8c3ad] uppercase tracking-wider">Valor Estimado (EMV)</span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-[#f59e0b]/20 text-[#ffc174] font-semibold">
              Difusión Orgánica
            </span>
          </div>
          <div className="mt-2 flex flex-col">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl lg:text-3xl font-extrabold text-[#ffc640] font-metric">S/ 980</span>
              <span className="text-xs text-[#d8c3ad] font-mono">PEN</span>
            </div>
            <div className="flex items-center justify-between text-[#d8c3ad] text-xs mt-1">
              <span>Multiplicador de Marca</span>
              <span className="text-[#ffc640] font-bold">4.8x Retorno</span>
            </div>
          </div>
          <div className="w-full bg-[#2d3449] h-1.5 rounded-full mt-3 overflow-hidden">
            <div className="bg-[#ffc640] h-full rounded-full" style={{ width: '88%' }}></div>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="p-4 rounded-xl bg-[#131b2e] border border-[#222a3d] flex flex-col justify-between shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#d8c3ad] uppercase tracking-wider">Ventas por Creadores</span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-[#171f33] text-[#ffc640] font-semibold border border-[#222a3d]">
              Enlaces UTM
            </span>
          </div>
          <div className="mt-2 flex flex-col">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl lg:text-3xl font-extrabold text-[#dae2fd] font-metric">S/ 780</span>
              <span className="text-xs text-[#d8c3ad] font-mono">PEN</span>
            </div>
            <div className="flex items-center justify-between text-[#d8c3ad] text-xs mt-1">
              <span>10 ramos comprados</span>
              <span className="text-[#dae2fd] font-medium">Yape / Plin / Web</span>
            </div>
          </div>
          <div className="w-full bg-[#2d3449] h-1.5 rounded-full mt-3 overflow-hidden">
            <div className="bg-[#ffb95f] h-full rounded-full" style={{ width: '74%' }}></div>
          </div>
        </div>

        {/* KPI 4 */}
        <div className="p-4 rounded-xl bg-[#131b2e] border border-[#222a3d] flex flex-col justify-between shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#d8c3ad] uppercase tracking-wider">Audiencia Legítima</span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-[#171f33] text-emerald-400 font-semibold border border-[#222a3d]">
              Seguridad Alta
            </span>
          </div>
          <div className="mt-2 flex flex-col">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl lg:text-3xl font-extrabold text-[#dae2fd] font-metric">94.2%</span>
              <span className="text-xs text-emerald-400 font-bold">Auténtica</span>
            </div>
            <div className="flex items-center justify-between text-[#d8c3ad] text-xs mt-1">
              <span>Tasa bot/fantasma: 5.8%</span>
              <span className="text-emerald-400 font-medium">Bajo Riesgo</span>
            </div>
          </div>
          <div className="w-full bg-[#2d3449] h-1.5 rounded-full mt-3 overflow-hidden">
            <div className="bg-emerald-400 h-full rounded-full" style={{ width: '94%' }}></div>
          </div>
        </div>
      </section>

      {/* SIMULADOR DINÁMICO DE EMV */}
      <section className="rounded-2xl bg-[#131b2e] p-6 border border-[#222a3d] shadow-md flex flex-col gap-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          <div className="flex flex-col gap-0.5">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#ffc174] text-xl">calculate</span>
              <h2 className="text-base font-bold text-[#dae2fd]">Simulador Dinámico de EMV & Proyección de Conversión</h2>
            </div>
            <p className="text-xs text-[#d8c3ad]">
              Ajuste las variables para pre-evaluar acuerdos comerciales antes de la emisión de órdenes de compra (OC Retail).
            </p>
          </div>

          {/* Model Switch */}
          <div className="flex items-center bg-[#060e20] p-1 rounded-lg border border-[#222a3d]">
            {[
              { id: 'standard', label: 'Fórmula Estándar Retail' },
              { id: 'cpm', label: 'CPM Spark TikTok' },
              { id: 'cpa', label: 'CPA Performance' }
            ].map((m) => (
              <button
                key={m.id}
                onClick={() => setSimModel(m.id as any)}
                className={`px-3 py-1 rounded text-xs font-semibold transition-all ${
                  simModel === m.id
                    ? 'bg-[#f59e0b] text-[#0b1326]'
                    : 'text-[#d8c3ad] hover:text-[#dae2fd]'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>

        {/* Sliders and Outcome */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Sliders (8 cols) */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-[#171f33] border border-[#222a3d]">
            {/* Reach */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs text-[#d8c3ad]">Alcance Estimado (Impresiones)</label>
                <span className="font-bold text-xs text-[#ffc640] font-metric">{simReach.toLocaleString('es-PE')} imp.</span>
              </div>
              <input
                type="range"
                min="1000"
                max="50000"
                step="500"
                value={simReach}
                onChange={(e) => setSimReach(Number(e.target.value))}
                className="w-full accent-[#f59e0b] h-1.5 bg-[#2d3449] rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#d8c3ad] font-mono">
                <span>1K</span>
                <span>25K</span>
                <span>50K</span>
              </div>
            </div>

            {/* ER */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs text-[#d8c3ad]">Tasa Engagement (ER) Proyectada</label>
                <span className="font-bold text-xs text-[#ffc640] font-metric">{simER.toFixed(1)}%</span>
              </div>
              <input
                type="range"
                min="1.0"
                max="15.0"
                step="0.2"
                value={simER}
                onChange={(e) => setSimER(Number(e.target.value))}
                className="w-full accent-[#f59e0b] h-1.5 bg-[#2d3449] rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#d8c3ad] font-mono">
                <span>1.0%</span>
                <span>8.0%</span>
                <span>15.0%</span>
              </div>
            </div>

            {/* Fee */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs text-[#d8c3ad]">Costo Fee Creador (Tarifa PEN)</label>
                <span className="font-bold text-xs text-[#dae2fd] font-metric">S/ {simFee.toLocaleString('es-PE')}</span>
              </div>
              <input
                type="range"
                min="30"
                max="500"
                step="10"
                value={simFee}
                onChange={(e) => setSimFee(Number(e.target.value))}
                className="w-full accent-[#f59e0b] h-1.5 bg-[#2d3449] rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#d8c3ad] font-mono">
                <span>S/ 30</span>
                <span>S/ 250</span>
                <span>S/ 500</span>
              </div>
            </div>

            {/* CVR */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs text-[#d8c3ad]">CVR Estimado Carrito / Web</label>
                <span className="font-bold text-xs text-[#dae2fd] font-metric">{simCVR.toFixed(1)}%</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="6.0"
                step="0.1"
                value={simCVR}
                onChange={(e) => setSimCVR(Number(e.target.value))}
                className="w-full accent-[#f59e0b] h-1.5 bg-[#2d3449] rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#d8c3ad] font-mono">
                <span>0.5%</span>
                <span>3.0%</span>
                <span>6.0%</span>
              </div>
            </div>
          </div>

          {/* Outcome Card (4 cols) */}
          <div className="lg:col-span-4 rounded-xl bg-gradient-to-br from-[#222a3d] via-[#171f33] to-[#131b2e] p-5 border border-[#ffc640]/40 flex flex-col justify-between shadow-xl">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-wider text-[#ffc640] font-bold">Proyección Algorítmica</span>
                <span className="px-2 py-0.5 rounded bg-[#f59e0b] text-[#0b1326] text-[10px] font-bold">
                  {calculatedROI > 200 ? 'ALTO RETORNO' : 'ESTÁNDAR'}
                </span>
              </div>
              <div className="pt-2">
                <span className="text-[11px] text-[#d8c3ad]">EMV PROYECTADO</span>
                <div className="text-2xl font-extrabold text-[#ffc174] font-metric tracking-tight">
                  S/ {calculatedEMV.toLocaleString('es-PE')} PEN
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2">
                <div className="p-2 rounded bg-[#060e20] border border-[#222a3d]">
                  <span className="text-[10px] text-[#d8c3ad] block">Beneficio Neto</span>
                  <span className={`text-sm font-bold ${calculatedNet >= 0 ? 'text-[#ffc640]' : 'text-red-400'}`}>
                    {calculatedNet >= 0 ? `+S/ ${calculatedNet.toLocaleString('es-PE')}` : `-S/ ${Math.abs(calculatedNet).toLocaleString('es-PE')}`}
                  </span>
                </div>
                <div className="p-2 rounded bg-[#060e20] border border-[#222a3d]">
                  <span className="text-[10px] text-[#d8c3ad] block">ROI Proyectado</span>
                  <span className="text-sm font-bold text-[#ffc174]">{calculatedROI}%</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => showToast('Parámetros de fee y proyección guardados en orden de compra')}
              className="mt-4 w-full py-2.5 rounded-lg bg-[#f59e0b] hover:bg-[#ffc640] text-[#0b1326] text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1.5"
            >
              <span className="material-symbols-outlined text-base">assignment_add</span>
              <span>Aplicar Parámetros a Contrato</span>
            </button>
          </div>
        </div>
      </section>

      {/* TABLERO DE EXPLORACIÓN DE CREADORES */}
      <section className="flex flex-col gap-4">
        {/* Toolbar de filtros */}
        <div className="p-3.5 rounded-xl bg-[#131b2e] border border-[#222a3d] flex flex-col xl:flex-row gap-3 items-stretch xl:items-center justify-between shadow-sm">
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'todos', label: 'Todos (14)' },
              { id: 'moda', label: 'Moda & Outfits (5)' },
              { id: 'lifestyle', label: 'Lifestyle & Flores (4)' },
              { id: 'foodie', label: 'Foodie & Momentos (3)' }
            ].map((n) => (
              <button
                key={n.id}
                onClick={() => setNicheFilter(n.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  nicheFilter === n.id
                    ? 'bg-[#f59e0b] text-[#0b1326]'
                    : 'bg-[#171f33] text-[#d8c3ad] hover:text-[#dae2fd]'
                }`}
              >
                {n.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <select
              value={platformFilter}
              onChange={(e) => setPlatformFilter(e.target.value)}
              className="px-3 py-1.5 rounded-lg bg-[#171f33] border border-[#222a3d] text-[#dae2fd] text-xs focus:outline-none"
            >
              <option value="todas">Todas las Plataformas</option>
              <option value="tiktok">TikTok</option>
              <option value="instagram">Instagram</option>
              <option value="pinterest">Pinterest</option>
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-1.5 rounded-lg bg-[#222a3d] border border-[#ffc174]/40 text-[#ffc640] text-xs focus:outline-none"
            >
              <option value="emv">Ordenar por: Mayor EMV</option>
              <option value="autenticidad">Tasa Autenticidad</option>
              <option value="er">Engagement Rate</option>
            </select>
          </div>
        </div>

        {/* Grid de Creadores */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredCreators.map((creator) => (
            <div
              key={creator.id}
              className="rounded-xl bg-[#131b2e] border border-[#222a3d] p-4 flex flex-col justify-between shadow-sm hover:bg-[#171f33] transition-all"
            >
              <div className="flex flex-col gap-3">
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img
                        src={creator.avatar}
                        alt={creator.name}
                        className="w-14 h-14 rounded-xl object-cover shadow-md"
                      />
                      <span className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${creator.badgeColor}`}>
                        {creator.badgeIcon}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-bold text-sm text-[#dae2fd]">{creator.name}</h3>
                        <span className="material-symbols-outlined text-sm text-[#ffc174]">verified</span>
                      </div>
                      <span className="text-xs text-[#d8c3ad] font-mono">{creator.handle}</span>
                      <span className="text-[11px] text-[#ffc174] mt-0.5">{creator.nicheText}</span>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-1">
                    <span className="px-2 py-0.5 rounded-full bg-[#f59e0b]/20 text-[#ffc640] text-[10px] font-bold">
                      {creator.status}
                    </span>
                    <span className="text-[10px] text-[#d8c3ad]">{creator.statusNote}</span>
                  </div>
                </div>

                {/* Platforms & Audience stats */}
                <div className="grid grid-cols-3 gap-2 p-2.5 rounded-lg bg-[#060e20] border border-[#222a3d]">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-[#d8c3ad]">Plataformas</span>
                    <div className="flex items-center gap-1 mt-0.5">
                      {creator.platforms.map((p, i) => (
                        <span key={i} className={`px-1.5 py-0.2 rounded bg-[#171f33] text-[10px] font-bold ${p.color}`}>
                          {p.name}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-[#d8c3ad]">Autenticidad</span>
                    <div className="flex items-baseline gap-1 mt-0.5">
                      <span className="text-xs font-bold text-emerald-400">{creator.authenticity}%</span>
                      <span className="text-[9px] text-[#d8c3ad]">Bots {creator.botsPercent}%</span>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-[#d8c3ad]">Engagement</span>
                    <div className="flex items-baseline gap-1 mt-0.5">
                      <span className="text-xs font-bold text-[#ffc640]">{creator.er}%</span>
                      <span className="text-[9px] text-[#ffc174]">{creator.erBench}</span>
                    </div>
                  </div>
                </div>

                {/* Financials & Attribution */}
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="p-2 rounded-lg bg-[#171f33] flex flex-col">
                    <span className="text-[10px] text-[#d8c3ad]">Fee Contratado</span>
                    <span className="font-bold text-[#dae2fd] mt-0.5">{creator.fee}</span>
                    <span className="text-[9px] text-[#d8c3ad] truncate">{creator.deliverables}</span>
                  </div>
                  <div className="p-2 rounded-lg bg-[#171f33] flex flex-col">
                    <span className="text-[10px] text-[#d8c3ad]">EMV Generado</span>
                    <span className="font-bold text-[#ffc640] mt-0.5">{creator.emv}</span>
                    <span className="text-[9px] text-[#ffc640]">Retorno: {creator.returnMult}</span>
                  </div>
                  <div className="p-2 rounded-lg bg-[#171f33] flex flex-col">
                    <span className="text-[10px] text-[#d8c3ad]">Ventas Atribuidas</span>
                    <span className="font-bold text-emerald-400 mt-0.5">{creator.attributedSales}</span>
                    <span className="text-[9px] text-emerald-400">{creator.ordersCount} pedidos</span>
                  </div>
                </div>

                {/* UTM Box */}
                <div className="p-2 rounded bg-[#060e20] border border-[#222a3d] flex items-center justify-between text-[11px] font-mono">
                  <div className="flex items-center gap-1 truncate text-[#d8c3ad]">
                    <span className="text-[#ffc640]">UTM:</span>
                    <span className="truncate">{creator.utmCode}</span>
                  </div>
                  <span className="text-[#ffc174] font-medium shrink-0 ml-2">{creator.campaignProduct}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 mt-2 border-t border-[#222a3d]/50 text-xs text-[#d8c3ad]">
                <span className="text-[11px]">Última auditoría: {creator.lastAudit}</span>
                <button
                  onClick={() => showToast(`Análisis profundo abierto para ${creator.name}`)}
                  className="text-[#ffc174] hover:text-[#ffc640] font-semibold flex items-center gap-1 transition-colors"
                >
                  <span>Ver Análisis Profundo</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PANEL DE TRAZABILIDAD UTM & AUDITORÍA ANTIFRAUDE */}
      <section className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Tabla de Enlaces UTM (8 cols) */}
        <div className="xl:col-span-8 rounded-xl bg-[#131b2e] border border-[#222a3d] p-4 flex flex-col gap-3 shadow-sm">
          <div className="flex items-center justify-between flex-wrap gap-2 pb-1 border-b border-[#222a3d]">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#ffc174] text-xl">qr_code_2</span>
              <div>
                <h3 className="font-bold text-sm text-[#dae2fd]">Trazabilidad de Enlaces UTM Activos</h3>
                <span className="text-xs text-[#d8c3ad]">Atribución de conversión directa de pasarela (Last-Click Model Perú)</span>
              </div>
            </div>
            <button
              onClick={() => showToast('Archivo UTM_Attribution_Peru.csv exportado')}
              className="px-3 py-1 rounded bg-[#222a3d] hover:bg-[#31394d] text-[#dae2fd] text-xs font-semibold flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-sm">download</span>
              <span>Exportar CSV</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-[#d8c3ad] text-[11px] font-mono uppercase tracking-wider bg-[#060e20]">
                  <th className="py-2.5 px-3">Código UTM & Producto</th>
                  <th className="py-2.5 px-3">Creador</th>
                  <th className="py-2.5 px-3">Clics Únicos</th>
                  <th className="py-2.5 px-3">Conv. %</th>
                  <th className="py-2.5 px-3">Ticket Prom.</th>
                  <th className="py-2.5 px-3">Revenue (PEN)</th>
                  <th className="py-2.5 px-3">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#222a3d]/50 font-mono">
                <tr className="hover:bg-[#222a3d]/40 transition-colors">
                  <td className="py-2.5 px-3 font-sans">
                    <span className="text-[#ffc640] font-mono text-[11px] block">?utm_source=valeria_marzo21</span>
                    <span className="text-[10px] text-[#d8c3ad]">Ramo Flores Amarillas Pro</span>
                  </td>
                  <td className="py-2.5 px-3 text-[#dae2fd] font-sans font-semibold">@valeria.lifestyle</td>
                  <td className="py-2.5 px-3 text-[#dae2fd]">12,420</td>
                  <td className="py-2.5 px-3 text-emerald-400 font-bold">3.88%</td>
                  <td className="py-2.5 px-3 text-[#d8c3ad]">S/ 72.20</td>
                  <td className="py-2.5 px-3 text-[#ffc640] font-bold">S/ 34,800</td>
                  <td className="py-2.5 px-3">
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">Activo</span>
                  </td>
                </tr>
                <tr className="hover:bg-[#222a3d]/40 transition-colors">
                  <td className="py-2.5 px-3 font-sans">
                    <span className="text-[#ffc640] font-mono text-[11px] block">?utm_source=diegotrends_express</span>
                    <span className="text-[10px] text-[#d8c3ad]">Delivery Express Primavera</span>
                  </td>
                  <td className="py-2.5 px-3 text-[#dae2fd] font-sans font-semibold">@diego_lima_trends</td>
                  <td className="py-2.5 px-3 text-[#dae2fd]">9,180</td>
                  <td className="py-2.5 px-3 text-emerald-400 font-bold">3.37%</td>
                  <td className="py-2.5 px-3 text-[#d8c3ad]">S/ 69.30</td>
                  <td className="py-2.5 px-3 text-[#ffc640] font-bold">S/ 21,500</td>
                  <td className="py-2.5 px-3">
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">Activo</span>
                  </td>
                </tr>
                <tr className="hover:bg-[#222a3d]/40 transition-colors">
                  <td className="py-2.5 px-3 font-sans">
                    <span className="text-[#ffc640] font-mono text-[11px] block">?utm_source=deco_peru_shop</span>
                    <span className="text-[10px] text-[#d8c3ad]">Centro de Mesa Especial</span>
                  </td>
                  <td className="py-2.5 px-3 text-[#dae2fd] font-sans font-semibold">@deco_peru</td>
                  <td className="py-2.5 px-3 text-[#dae2fd]">5,410</td>
                  <td className="py-2.5 px-3 text-emerald-400 font-bold">4.06%</td>
                  <td className="py-2.5 px-3 text-[#d8c3ad]">S/ 76.36</td>
                  <td className="py-2.5 px-3 text-[#ffc640] font-bold">S/ 16,800</td>
                  <td className="py-2.5 px-3">
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">Activo</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Auditoría Antifraude y Demografía (4 cols) */}
        <div className="xl:col-span-4 rounded-xl bg-[#131b2e] border border-[#222a3d] p-4 flex flex-col justify-between gap-3 shadow-sm">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#ffc174] text-xl">shield</span>
                <h3 className="font-bold text-sm text-[#dae2fd]">Auditoría Antifraude Perú</h3>
              </div>
              <span className="w-2 h-2 rounded-full bg-[#ffc640]"></span>
            </div>
            <p className="text-xs text-[#d8c3ad]">
              Detección en tiempo real de granjas de bots, tráfico spoofing y compras sospechosas de seguidores.
            </p>

            <div className="flex flex-col gap-2 pt-2">
              <span className="text-[10px] text-[#d8c3ad] uppercase tracking-wider font-semibold">
                Demografía Nacional Verificada
              </span>

              <div className="flex flex-col gap-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-[#dae2fd]">Lima Metropolitana</span>
                  <span className="text-[#ffc174] font-bold">65.0%</span>
                </div>
                <div className="w-full bg-[#2d3449] h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#f59e0b] h-full rounded-full" style={{ width: '65%' }}></div>
                </div>
              </div>

              <div className="flex flex-col gap-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-[#dae2fd]">Arequipa & Sur</span>
                  <span className="text-[#ffc640] font-bold">15.0%</span>
                </div>
                <div className="w-full bg-[#2d3449] h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#ffc640] h-full rounded-full" style={{ width: '15%' }}></div>
                </div>
              </div>

              <div className="flex flex-col gap-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-[#dae2fd]">La Libertad (Trujillo)</span>
                  <span className="text-[#ffdf9f] font-bold">10.0%</span>
                </div>
                <div className="w-full bg-[#2d3449] h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#ffdf9f] h-full rounded-full" style={{ width: '10%' }}></div>
                </div>
              </div>

              <div className="flex flex-col gap-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-[#dae2fd]">Otras Regiones Perú</span>
                  <span className="text-[#d8c3ad] font-bold">10.0%</span>
                </div>
                <div className="w-full bg-[#2d3449] h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#2d3449] h-full rounded-full" style={{ width: '10%' }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-[#060e20] border border-[#222a3d] flex flex-col gap-1">
            <div className="flex items-center gap-1.5 text-[#ffc174] text-xs font-semibold">
              <span className="material-symbols-outlined text-base">verified_user</span>
              <span>Red 100% Certificada Segura</span>
            </div>
            <p className="text-[11px] text-[#d8c3ad]">
              0 perfiles sancionados por compra de engagement inusual. Score de confianza global: <strong className="text-[#ffc640]">97.8/100</strong>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
