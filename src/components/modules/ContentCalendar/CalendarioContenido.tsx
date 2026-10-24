import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';

export const CalendarioContenido: React.FC = () => {
  const { showToast, setCurrentModule } = useApp();

  const [activeView, setActiveView] = useState<'mes' | 'semana' | 'dia' | 'lista'>('semana');
  const [selectedNetwork, setSelectedNetwork] = useState<string>('todas');
  const [selectedStatus, setSelectedStatus] = useState<string>('todos');
  const [selectedAspectRatio, setSelectedAspectRatio] = useState<'9:16' | '2:3'>('9:16');
  const [copyTone, setCopyTone] = useState('casual');
  const [copyText, setCopyText] = useState(
    '¡Este 21 de marzo que no se te pase el detalle! 💛🌻 Llegamos a todo Lima y provincias con delivery express garantizado. Haz tu pedido al toque en el link de la bio antes que vuelen los ramos. 🛵✨'
  );
  const [isEnqueueing, setIsEnqueueing] = useState(false);
  const [showNewPostModal, setShowNewPostModal] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostPlatform, setNewPostPlatform] = useState('tiktok');

  const copyVariations: Record<string, string[]> = {
    casual: [
      '¡Este 21 de marzo que no se te pase el detalle! 💛🌻 Llegamos a todo Lima y provincias con delivery express garantizado. Haz tu pedido al toque en el link de la bio antes que vuelen los ramos. 🛵✨',
      '¿A ti ya te enviaron tus flores amarillas o todavía esperando? 🌻👀 Si no te llega nada, auto-regálate el mejor ramo premium con 20% off usando el link en bio. ¡Pilas que se agotan al toque! 💛'
    ],
    estetico: [
      'La elegancia del amarillo en su máxima expresión botánica. Girasoles seleccionados a mano en los valles de Carabayllo con envoltura Kraft artesanal y lazo de seda. Disponible para Lima y provincias. 🌿✨',
      'Luz, calidez y nuevos comienzos. Diseños florales curados para transformar tu espacio esta temporada de primavera. Enlace directo al catálogo en Pinterest y web oficial. 💛🥂'
    ],
    corporativo: [
      'Potencie el clima laboral y el reconocimiento de su equipo con arreglos florales corporativos de estación. Facturación inmediata, crédito a 30 días y entregas programadas en San Isidro y Miraflores. 💼💐'
    ]
  };

  const handleRegenerateCopy = () => {
    const list = copyVariations[copyTone] || copyVariations.casual;
    const nextCopy = list[Math.floor(Math.random() * list.length)];
    setCopyText(nextCopy);
    showToast('Copy optimizado con jerga y tono local peruano');
  };

  const handleAddHashtag = (tag: string) => {
    if (!copyText.includes(tag)) {
      setCopyText((prev) => `${prev} ${tag}`);
      showToast(`Hashtag ${tag} añadido al copy`);
    }
  };

  const handleAddAllHashtags = () => {
    const tags = ['#FloresAmarillasPeru', '#LimaTrend', '#KajelBloom', '#RegalosPeru', '#SpringVibesLima'];
    let updated = copyText;
    tags.forEach((t) => {
      if (!updated.includes(t)) updated += ` ${t}`;
    });
    setCopyText(updated);
    showToast('Todos los hashtags de alta conversión añadidos');
  };

  const handleEnqueueBullMQ = () => {
    setIsEnqueueing(true);
    setTimeout(() => {
      setIsEnqueueing(false);
      showToast('Publicación #KB-2026-03-JUE19 encolada con éxito en BullMQ (Job ID #9821)');
    }, 1000);
  };

  return (
    <div className="flex flex-col w-full gap-6">
      {/* Top Command & Filter Bar */}
      <section className="flex flex-col gap-4">
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl sm:text-3xl font-bold text-[#dae2fd] tracking-tight">
                Calendario de Contenidos & Programador Multiplataforma
              </h1>
              <span className="px-2 py-0.5 rounded bg-[#222a3d] text-[#ffc174] text-[11px] font-mono uppercase tracking-wide">
                RF-1.1 Master Grid
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-xs text-[#d8c3ad]">
              <div className="flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ffc640] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ffc640]"></span>
                </span>
                <span>Sincronización activa con BullMQ Worker Pool</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1 text-[#dae2fd]">
                <span className="material-symbols-outlined text-sm text-[#ffc174]">event_available</span>
                <span className="font-semibold">18 publicaciones programadas</span>
                <span>para Marzo 2026</span>
              </div>
              <span>•</span>
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#e3aa00]/20 text-[#ffc640] text-[11px] font-bold">
                <span className="material-symbols-outlined text-xs">local_fire_department</span>
                <span>Semana Pico Flores Amarillas (21M)</span>
              </div>
            </div>
          </div>

          {/* Main Action Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => showToast('3 publicaciones pendientes de aprobación del Lead de Marca')}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#171f33] text-[#dae2fd] hover:bg-[#222a3d] transition-colors text-xs font-semibold border border-[#222a3d]"
            >
              <span className="material-symbols-outlined text-base text-[#ffc640]">verified_user</span>
              <span>Aprobaciones Pendientes</span>
              <span className="w-4 h-4 flex items-center justify-center rounded-full bg-[#2d3449] text-[#ffc174] text-[10px] font-bold">
                3
              </span>
            </button>
            <button
              onClick={handleRegenerateCopy}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#171f33] text-[#dae2fd] hover:bg-[#222a3d] transition-colors text-xs font-semibold border border-[#222a3d]"
            >
              <span className="material-symbols-outlined text-base text-[#ffc174]">auto_awesome</span>
              <span>Optimizador IA de Copys</span>
            </button>
            <button
              onClick={() => setShowNewPostModal(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#f59e0b] text-[#0b1326] hover:bg-[#ffc640] text-xs font-bold shadow-md transition-all"
            >
              <span className="material-symbols-outlined text-base font-bold">add_circle</span>
              <span>Nueva Publicación Multi-Asset</span>
            </button>
          </div>
        </div>

        {/* Filter & View Ribbon */}
        <div className="p-3.5 rounded-xl bg-[#131b2e] border border-[#222a3d]/60 flex flex-col lg:flex-row lg:items-center justify-between gap-3 shadow-sm">
          <div className="flex flex-wrap items-center gap-3">
            {/* View Toggle */}
            <div className="flex items-center p-0.5 rounded-lg bg-[#060e20] border border-[#222a3d]">
              {(['mes', 'semana', 'dia', 'lista'] as const).map((v) => (
                <button
                  key={v}
                  onClick={() => setActiveView(v)}
                  className={`px-3 py-1 rounded text-xs font-semibold capitalize transition-all ${
                    activeView === v
                      ? 'bg-[#222a3d] text-[#ffc174] shadow-sm'
                      : 'text-[#d8c3ad] hover:text-[#dae2fd]'
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>

            {/* Date Stepper */}
            <div className="flex items-center gap-1 bg-[#171f33] px-2 py-1 rounded-lg border border-[#222a3d]">
              <button
                onClick={() => showToast('Semana anterior cargada')}
                className="p-0.5 text-[#d8c3ad] hover:text-[#dae2fd]"
              >
                <span className="material-symbols-outlined text-base">chevron_left</span>
              </button>
              <div className="flex items-center gap-1.5 px-2 text-xs font-semibold text-[#dae2fd]">
                <span className="material-symbols-outlined text-sm text-[#ffc640]">calendar_today</span>
                <span>Semana del 16 al 22 de Marzo 2026</span>
              </div>
              <button
                onClick={() => showToast('Semana siguiente cargada')}
                className="p-0.5 text-[#d8c3ad] hover:text-[#dae2fd]"
              >
                <span className="material-symbols-outlined text-base">chevron_right</span>
              </button>
            </div>

            <button
              onClick={() => showToast('Foco en día de hoy: Jueves 19')}
              className="px-2.5 py-1 rounded bg-[#222a3d] text-[#d8c3ad] hover:text-[#dae2fd] text-xs font-semibold"
            >
              Hoy
            </button>
          </div>

          {/* Network and Status Quick Filters */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] text-[#d8c3ad] uppercase tracking-wider font-mono">Red:</span>
            <div className="flex items-center gap-1">
              {[
                { id: 'todas', label: 'Todas' },
                { id: 'tiktok', label: 'TikTok', dot: 'bg-[#22d3ee]' },
                { id: 'instagram', label: 'Instagram', dot: 'bg-[#f43f5e]' },
                { id: 'pinterest', label: 'Pinterest', dot: 'bg-[#f87171]' }
              ].map((n) => (
                <button
                  key={n.id}
                  onClick={() => setSelectedNetwork(n.id)}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium transition-all ${
                    selectedNetwork === n.id
                      ? 'bg-[#f59e0b] text-[#0b1326] font-bold'
                      : 'bg-[#171f33] text-[#d8c3ad] hover:bg-[#222a3d]'
                  }`}
                >
                  {n.dot && <span className={`w-1.5 h-1.5 rounded-full ${n.dot}`}></span>}
                  <span>{n.label}</span>
                </button>
              ))}
            </div>

            <div className="h-4 w-px bg-[#222a3d] mx-1"></div>

            <span className="text-[11px] text-[#d8c3ad] uppercase tracking-wider font-mono">Estado:</span>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-[#171f33] border border-[#222a3d] text-[#dae2fd] text-xs px-2.5 py-1 rounded-lg focus:outline-none focus:border-[#f59e0b]"
            >
              <option value="todos">Todos los estados</option>
              <option value="borrador">Borrador</option>
              <option value="revision">En Revisión</option>
              <option value="aprobado">Aprobado</option>
              <option value="publicado">Publicado</option>
            </select>
          </div>
        </div>
      </section>

      {/* 2-Column Master Layout (Grid 70% + Inspector/Copiloto 30%) */}
      <section className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* Left Column: Weekly Master Grid (approx 70%) */}
        <div className="xl:col-span-8 flex flex-col gap-4">
          {/* Day Headers Bar */}
          <div className="grid grid-cols-7 gap-1.5 text-center">
            {[
              { day: 'Lun', date: 16, peak: 'Pico 8:00 PM' },
              { day: 'Mar', date: 17, peak: 'Pico 6:30 PM' },
              { day: 'Mié', date: 18, peak: 'Pico 1:15 PM' },
              { day: 'Jue', date: 19, peak: 'Pico 7:45 PM', isToday: true },
              { day: 'Vie', date: 20, peak: 'Pico 6:30 PM', isHighlight: true },
              { day: 'Sáb', date: 21, peak: 'Tráfico Extremo', isKeyDay: true },
              { day: 'Dom', date: 22, peak: 'Pico 9:00 PM' }
            ].map((d) => (
              <div
                key={d.date}
                className={`p-2.5 rounded-lg flex flex-col items-center relative overflow-hidden transition-all ${
                  d.isKeyDay
                    ? 'bg-[#e3aa00]/20 border border-[#ffc640]/50 shadow-md'
                    : d.isToday
                    ? 'bg-[#131b2e] border border-[#ffc174]/50'
                    : 'bg-[#060e20] border border-[#222a3d]/40'
                }`}
              >
                {d.isKeyDay && (
                  <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-[#ffc640]/30 blur-sm"></div>
                )}
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider ${
                    d.isKeyDay
                      ? 'text-[#ffc640] flex items-center gap-0.5'
                      : d.isToday
                      ? 'text-[#ffc174]'
                      : 'text-[#d8c3ad]'
                  }`}
                >
                  {d.isKeyDay && <span className="material-symbols-outlined text-[10px]">local_fire_department</span>}
                  {d.day} {d.date}
                </span>
                <span
                  className={`text-lg font-bold font-metric mt-0.5 ${
                    d.isKeyDay ? 'text-[#ffc640]' : d.isToday ? 'text-[#ffc174]' : 'text-[#dae2fd]'
                  }`}
                >
                  {d.date}
                </span>
                <span
                  className={`text-[9px] font-mono mt-1 ${
                    d.isKeyDay ? 'text-[#f59e0b] font-bold' : 'text-[#d8c3ad]/70'
                  }`}
                >
                  {d.peak}
                </span>
              </div>
            ))}
          </div>

          {/* Time Slot Canvas */}
          <div className="space-y-4">
            {/* Slot: Franja Matutina (09:00 - 12:00) */}
            <div className="rounded-xl bg-[#060e20] p-4 flex flex-col gap-3 border border-[#222a3d]/60">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-base text-[#ffc174]">wb_twilight</span>
                  <span className="text-[11px] uppercase tracking-wider font-semibold text-[#d8c3ad]">
                    Franja Matutina • 09:00 - 12:00 PET
                  </span>
                </div>
                <span className="text-[10px] text-[#d8c3ad]/60 font-mono">2 Publicaciones programadas</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {/* Drop Zone Placeholder on Wednesday */}
                <div
                  onClick={() => {
                    setShowNewPostModal(true);
                    setNewPostTitle('Nuevo Post Mié 18 • 10:30 AM');
                  }}
                  className="p-4 rounded-lg bg-[#131b2e]/40 border border-dashed border-[#222a3d] hover:border-[#ffc174]/50 flex flex-col items-center justify-center text-center gap-1 transition-colors cursor-pointer group"
                >
                  <span className="material-symbols-outlined text-xl text-[#ffc174]/70 group-hover:scale-110 transition-transform">
                    add_circle_outline
                  </span>
                  <span className="text-xs text-[#d8c3ad]">Soltar post para Mié 18 • 10:30 AM</span>
                  <span className="text-[10px] text-[#ffc640] font-mono">Horario sugerido (+34% interacción)</span>
                </div>

                {/* Card: Sábado 21 - Pinterest 09:00 AM */}
                <div className="rounded-lg bg-[#171f33] p-3.5 flex flex-col gap-2.5 border border-[#222a3d] shadow-md hover:bg-[#222a3d]/70 transition-all cursor-pointer relative overflow-hidden group">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-[#f87171]"></div>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-base text-[#d8c3ad]/60">drag_indicator</span>
                      <span className="px-1.5 py-0.5 rounded bg-red-500/15 text-red-400 text-[10px] font-bold">
                        Pinterest Pin 2:3
                      </span>
                      <span className="text-[11px] text-[#d8c3ad] font-mono">09:00 AM</span>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-[#222a3d] text-[#ffc640] text-[10px] font-semibold">
                      Aprobado
                    </span>
                  </div>
                  <div className="flex gap-2.5 items-center">
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDK74hcWdfJd_z2rxkRzADLoNft6X7uRD83O84I8i23qq8W243QR0DW074nJmVqIomQDHYRAb1-e3N3Xmapg-uvNcFxAcoLaiBBu8krXs4Zbawo4UT7qoEDyqdpEU9XfnvIzv0wuL1uyt_PcjNffdD4LsJ4QATspuihYq1Ne57IM1hx9JddAV1J6xzaBCTpzlIPiXSfZ2mvf_dR_XJQe5rSd76xdYvi4A_54_EvUxArtYAnHcm2zWz48A"
                      alt="Guía de Regalos"
                      className="w-12 h-16 rounded object-cover shrink-0"
                    />
                    <div className="flex flex-col min-w-0">
                      <h4 className="font-semibold text-xs text-[#dae2fd] truncate group-hover:text-[#ffc174] transition-colors">
                        Guía de Regalos Flores Amarillas 2026
                      </h4>
                      <p className="text-[11px] text-[#d8c3ad] truncate">Enlace directo a Shopify & Niubiz...</p>
                      <span className="text-[10px] text-[#d8c3ad]/70 mt-1">Autor: Rodrigo Paz • Retail Merch</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-1 border-t border-[#222a3d]/50 text-[10px] text-[#d8c3ad]">
                    <span className="flex items-center gap-1 text-[#ffc640]">
                      <span className="material-symbols-outlined text-xs">storefront</span> Catálogo Listo
                    </span>
                    <span>Cola BullMQ #2940</span>
                  </div>
                </div>

                {/* Card: Lunes 16 - TikTok Draft */}
                <div className="rounded-lg bg-[#171f33] p-3.5 flex flex-col gap-2.5 border border-[#222a3d] shadow-md hover:bg-[#222a3d]/70 transition-all cursor-pointer">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-base text-[#d8c3ad]/60">drag_indicator</span>
                      <span className="px-1.5 py-0.5 rounded bg-cyan-500/15 text-cyan-300 text-[10px] font-bold">
                        TikTok 9:16
                      </span>
                      <span className="text-[11px] text-[#d8c3ad] font-mono">11:15 AM</span>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-[#222a3d] text-[#d8c3ad] text-[10px] font-semibold">
                      Borrador
                    </span>
                  </div>
                  <div className="flex gap-2.5 items-center">
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBBqO4M3lUd1F9rbJQs0g6PjymSsAtvG2s7PwLMDrU2R4OECIvM4niabeWupiXODVHwAMHZaN47HuLNDvLg3nLr0X1-4WxBKzPdbzmnATfSStIdZPe3Yixw0o1PDt9GmO80v-UQaRWtzeFodhFPx625ZeEbzLqWrn5xHo-3ZYm56tIHj1Sfv_duqTSRZeB9DkDvbJeyR2Cto7JhxyVwvq7lXWZ2s3hxnEmez9rBH2lJZV_VsoIB4uMaSg"
                      alt="Detrás de cámaras"
                      className="w-12 h-16 rounded object-cover shrink-0"
                    />
                    <div className="flex flex-col min-w-0">
                      <h4 className="font-semibold text-xs text-[#dae2fd] truncate">Detrás de cámaras: Armado de 500 ramos</h4>
                      <p className="text-[11px] text-[#d8c3ad] truncate">Floricienta Remix Lo-Fi</p>
                      <span className="text-[10px] text-[#d8c3ad]/70 mt-1">Autor: Camila R. (Diseñadora)</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-1 border-t border-[#222a3d]/50 text-[10px] text-[#d8c3ad]">
                    <span className="flex items-center gap-1 text-[#ffb4ab]">
                      <span className="material-symbols-outlined text-xs">pending</span> Falta Audio Licenciado
                    </span>
                    <span>Modif. hace 1h</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Slot: Franja Tarde (13:00 - 17:00) */}
            <div className="rounded-xl bg-[#060e20] p-4 flex flex-col gap-3 border border-[#222a3d]/60">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-base text-[#ffc640]">wb_sunny</span>
                  <span className="text-[11px] uppercase tracking-wider font-semibold text-[#d8c3ad]">
                    Franja Tarde • 13:00 - 17:00 PET
                  </span>
                </div>
                <span className="text-[10px] text-[#d8c3ad]/60 font-mono">3 Publicaciones en timeline</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {/* Card: Sábado 21 - TikTok UGC Colab */}
                <div className="rounded-lg bg-[#171f33] p-3.5 flex flex-col gap-2.5 border border-[#222a3d] shadow-md hover:bg-[#222a3d]/70 transition-all cursor-pointer relative overflow-hidden group">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-[#22d3ee]"></div>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-base text-[#d8c3ad]/60">drag_indicator</span>
                      <span className="px-1.5 py-0.5 rounded bg-cyan-500/15 text-cyan-300 text-[10px] font-bold">
                        TikTok UGC 9:16
                      </span>
                      <span className="text-[11px] text-[#d8c3ad] font-mono">03:00 PM</span>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-[#222a3d] text-[#ffc640] text-[10px] font-semibold">
                      Aprobado
                    </span>
                  </div>
                  <div className="flex gap-2.5 items-center">
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuB4IeNsLGJkuTvvfxm5JYOyblP16YweePcuxerbwmL3FnOpooiq-a7JvUFkWbEEpuAtgkBhbppVxEe1_FlhxcSnCxCRbpmsYnA6MtAs6L5DiKZFIrOqVzbgmdkvdpTRT9wyRUxxJLmjZoWMMbna-REeP47FNndX-kdjNWRl72eZY_Mq3ar60C3Kug0WmmSGTK_G6r6xbZUTEIOQCEs1m9bw15avIkMPgEX7Ma6zB4-lzf1G5oLJZA5aJw"
                      alt="UGC Colab"
                      className="w-12 h-16 rounded object-cover shrink-0"
                    />
                    <div className="flex flex-col min-w-0">
                      <h4 className="font-semibold text-xs text-[#dae2fd] truncate group-hover:text-[#ffc174] transition-colors">
                        UGC Colab: @valeria.lifestyle
                      </h4>
                      <p className="text-[11px] text-[#d8c3ad] truncate">"¿A ti ya te mandaron tus flores amarillas hoy? 🌻💛"</p>
                      <span className="text-[10px] text-[#d8c3ad]/70 mt-1">Asignado: Diego V. (Lead de Marca)</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-1 border-t border-[#222a3d]/50 text-[10px] text-[#d8c3ad]">
                    <span className="flex items-center gap-1 text-[#ffc174]">
                      <span className="material-symbols-outlined text-xs">record_voice_over</span> Creador Confirmado
                    </span>
                    <span>Listo en Worker</span>
                  </div>
                </div>

                {/* Card: Jueves 19 - Instagram Story */}
                <div className="rounded-lg bg-[#171f33] p-3.5 flex flex-col gap-2.5 border border-[#222a3d] shadow-md hover:bg-[#222a3d]/70 transition-all cursor-pointer">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-base text-[#d8c3ad]/60">drag_indicator</span>
                      <span className="px-1.5 py-0.5 rounded bg-rose-500/15 text-rose-300 text-[10px] font-bold">
                        Instagram Story
                      </span>
                      <span className="text-[11px] text-[#d8c3ad] font-mono">04:30 PM</span>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-[#222a3d] text-[#ffc640] text-[10px] font-semibold">
                      Aprobado
                    </span>
                  </div>
                  <div className="flex gap-2.5 items-center">
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCqREn3BDLpzICDhTU1JZOktVoFV4qz7uD57ra51Oz5ulbmgGUqC8CnLiDNS3Nv3TLX658-NAsbqYY7DUCGXbon9BIVFIvoeYuUeBKtzGFdZYIwaMhpEBnn4Ae9QJ-245ki2ODrLYwO68-kIWd-edK-Fz3t9sJWcBCxHfn_ddJ4k1fwJYcD8yDm4_-AdIDT3d-n378sapOC56lKwX_YyZ6Jbh4fQtFLsR-mV3vrpTgfsdkoAIqFDyD6xQ"
                      alt="Cuenta Regresiva"
                      className="w-12 h-16 rounded object-cover shrink-0"
                    />
                    <div className="flex flex-col min-w-0">
                      <h4 className="font-semibold text-xs text-[#dae2fd] truncate">Cuenta Regresiva: Asegura tu ramo</h4>
                      <p className="text-[11px] text-[#d8c3ad] truncate">Sticker interactivo Yape/Plin</p>
                      <span className="text-[10px] text-[#d8c3ad]/70 mt-1">Autor: Camila R. (Diseñadora)</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-1 border-t border-[#222a3d]/50 text-[10px] text-[#d8c3ad]">
                    <span className="flex items-center gap-1 text-[#ffc640]">
                      <span className="material-symbols-outlined text-xs">link</span> Enlace con UTM
                    </span>
                    <span>Disparo autom.</span>
                  </div>
                </div>

                {/* Drop Zone */}
                <div
                  onClick={() => {
                    setShowNewPostModal(true);
                    setNewPostTitle('Programar contenido de media tarde');
                  }}
                  className="p-4 rounded-lg bg-[#131b2e]/40 border border-dashed border-[#222a3d] hover:border-[#ffc174]/50 flex flex-col items-center justify-center text-center gap-1 transition-colors cursor-pointer group"
                >
                  <span className="material-symbols-outlined text-xl text-[#ffc174]/70 group-hover:scale-110 transition-transform">
                    add_circle_outline
                  </span>
                  <span className="text-xs text-[#d8c3ad]">Programar contenido de media tarde</span>
                  <span className="text-[10px] text-[#d8c3ad]/60">Ideal para stories de stock en tiempo real</span>
                </div>
              </div>
            </div>

            {/* Slot: Prime Time Perú (18:00 - 21:30) */}
            <div className="rounded-xl bg-[#060e20] p-4 flex flex-col gap-3 border border-[#222a3d]/60">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-base text-[#ffc174]">nights_stay</span>
                  <span className="text-[11px] uppercase tracking-wider font-semibold text-[#d8c3ad]">
                    Prime Time Perú • 18:00 - 21:30 PET (Mayor Retención)
                  </span>
                </div>
                <span className="text-[10px] text-[#ffc640] font-bold">Horario de Alta Conversión</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {/* Active Card: Jueves 19 Tutorial */}
                <div className="rounded-lg bg-[#222a3d] p-3.5 flex flex-col gap-2.5 border border-[#f59e0b] shadow-lg ring-1 ring-[#f59e0b] relative overflow-hidden cursor-pointer">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-[#f59e0b]"></div>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-base text-[#ffc174]">drag_indicator</span>
                      <span className="px-1.5 py-0.5 rounded bg-cyan-500/15 text-cyan-300 text-[10px] font-bold">
                        TikTok Video 9:16
                      </span>
                      <span className="text-[11px] text-[#ffc174] font-bold font-mono">07:45 PM</span>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-[#f59e0b]/20 text-[#ffc640] text-[10px] font-bold">
                      En Inspector
                    </span>
                  </div>
                  <div className="flex gap-2.5 items-center">
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuC7pEhFTXk-GfKTTZJByFWpoR4ujDz5eOa7GUisOrZF3nHUW9mT12sUc3tNGZ3THDJa2oQ51inoQDLK0RSfJFyhBr6lGRd0UBtg5a-Iaf7NkGOG_cKR-8RQ6PG0a3sU9-xSgKCx5XclHEQ7RqFqFIDZLS49uwk6tMsOlMW7KFBW-dQE-q090dKrrAJRfY6qDoGqsTfJuGp3VtzQAYMbAEfv4zaVLpgEhEd9kKmcxIBth7ZalOnZkQ17MQ"
                      alt="Tutorial"
                      className="w-12 h-16 rounded object-cover shrink-0"
                    />
                    <div className="flex flex-col min-w-0">
                      <h4 className="font-semibold text-xs text-[#dae2fd] truncate">Tutorial: 3 Formas de envolver Ramos</h4>
                      <p className="text-[11px] text-[#d8c3ad] truncate">"El truco para que duren 10 días frescos..."</p>
                      <span className="text-[10px] text-[#d8c3ad]/70 mt-1">Aprobado por: Diego V. (Lead de Marca)</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-1 border-t border-[#222a3d] text-[10px] text-[#d8c3ad]">
                    <span className="flex items-center gap-1 text-[#ffc640]">
                      <span className="material-symbols-outlined text-xs">auto_graph</span> Pico 7:45 PM
                    </span>
                    <span className="text-emerald-400 font-semibold flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs">task_alt</span> Transcodificado OK
                    </span>
                  </div>
                </div>

                {/* Card 2: Viernes 20 Lookbook */}
                <div className="rounded-lg bg-[#171f33] p-3.5 flex flex-col gap-2.5 border border-[#222a3d] shadow-md hover:bg-[#222a3d]/70 transition-all cursor-pointer relative overflow-hidden group">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-[#f43f5e]"></div>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-base text-[#d8c3ad]/60">drag_indicator</span>
                      <span className="px-1.5 py-0.5 rounded bg-rose-500/15 text-rose-300 text-[10px] font-bold">
                        Instagram Reel 9:16
                      </span>
                      <span className="text-[11px] text-[#d8c3ad] font-mono">06:30 PM</span>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-[#222a3d] text-[#ff9837] text-[10px] font-semibold">
                      En Revisión
                    </span>
                  </div>
                  <div className="flex gap-2.5 items-center">
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDhua4uhLnTkhT94j7keVqFWc43fY3MUTwMCBvcJK_aMLITttZq26O_BBoQWH2UgwvIj92RJbWD7X7fg_ibYlOIRkvmGMnnWvti4snDSm_ELszIn7SIuLQwvL-gXBsvyJx13Iecx7UnNEz1d0bGHWCp1igbqHnhCOuFwT6L8myb-S_M3RI6va_8ckjlKbBmn5d5RftqXqbL7cnqoUEiqW2J3weSMtJJ_nqADxojoDf8-3AUxb-lwsuiVw"
                      alt="Lookbook"
                      className="w-12 h-16 rounded object-cover shrink-0"
                    />
                    <div className="flex flex-col min-w-0">
                      <h4 className="font-semibold text-xs text-[#dae2fd] truncate group-hover:text-[#ffc174] transition-colors">
                        Lookbook Primavera: Oficina & Casual
                      </h4>
                      <p className="text-[11px] text-[#d8c3ad] truncate">Carrusel + audio trending</p>
                      <span className="text-[10px] text-[#d8c3ad]/70 mt-1">Autor: Camila R. (Diseñadora)</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-1 border-t border-[#222a3d]/50 text-[10px] text-[#d8c3ad]">
                    <span className="flex items-center gap-1 text-[#ff9837]">
                      <span className="material-symbols-outlined text-xs">rate_review</span> Pendiente Visto Bueno
                    </span>
                    <span>Copy 90%</span>
                  </div>
                </div>

                {/* Card 3: Sábado 21 Reacción Sorpresa */}
                <div className="rounded-lg bg-[#171f33] p-3.5 flex flex-col gap-2.5 border border-[#222a3d] shadow-md hover:bg-[#222a3d]/70 transition-all cursor-pointer relative overflow-hidden group">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-[#ffc640]"></div>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-base text-[#d8c3ad]/60">drag_indicator</span>
                      <span className="px-1.5 py-0.5 rounded bg-rose-500/15 text-rose-300 text-[10px] font-bold">
                        Instagram Reel 9:16
                      </span>
                      <span className="text-[11px] text-[#ffc640] font-bold font-mono">07:00 PM</span>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-[#222a3d] text-[#ffc640] text-[10px] font-semibold">
                      Aprobado
                    </span>
                  </div>
                  <div className="flex gap-2.5 items-center">
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAUkNsRONZXVT6HtdlISR2FfWctDmW5RcmAsMydCnHPJgdQSFncDzvQlAxO2ccxIxjpZBVcGMRpWMksIZNWk8T0MX_c53_ylRMvdavepSeDjJCQKKlFNMncoiMTn9wh47OF7I1Pb13HKxfX5oPB3kLgbnldTPhCO5BnKv_CiyVRiHyiGeWGuesDwHmomyBxX4ENSmsyew5DBGvVmnsT8orkoMyvKRWz3Kw9MzgeEmabMP3ZZaMjNTGvnQ"
                      alt="Reacción sorpresa"
                      className="w-12 h-16 rounded object-cover shrink-0"
                    />
                    <div className="flex flex-col min-w-0">
                      <h4 className="font-semibold text-xs text-[#dae2fd] truncate group-hover:text-[#ffc174] transition-colors">
                        Reacción sorpresa entrega express
                      </h4>
                      <p className="text-[11px] text-[#d8c3ad] truncate">Grabado en vivo en San Isidro y Miraflores</p>
                      <span className="text-[10px] text-[#d8c3ad]/70 mt-1">Aprobado por: Diego V. (Lead de Marca)</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-1 border-t border-[#222a3d]/50 text-[10px] text-[#d8c3ad]">
                    <span className="flex items-center gap-1 text-[#ffc640]">
                      <span className="material-symbols-outlined text-xs">local_shipping</span> Cobertura Lima Top
                    </span>
                    <span>Cola Meta API v19</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Dockable Quick Inspector & Copilot IA (approx 30%) */}
        <div className="xl:col-span-4 flex flex-col gap-4">
          <div className="p-5 rounded-xl bg-[#131b2e] border border-[#222a3d] flex flex-col gap-4 shadow-xl sticky top-20">
            {/* Inspector Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#222a3d]">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-[#f59e0b]/20 text-[#f59e0b] flex items-center justify-center">
                  <span className="material-symbols-outlined text-lg">tune</span>
                </span>
                <div>
                  <h3 className="font-bold text-sm text-[#dae2fd]">Inspector & Copiloto IA</h3>
                  <p className="text-[11px] text-[#d8c3ad] font-mono">Post ID: #KB-2026-03-JUE19</p>
                </div>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-[#f59e0b]/20 text-[#ffc640] font-mono font-bold">
                JUE 19 • 7:45 PM
              </span>
            </div>

            {/* Video Preview & Ratio Selector */}
            <div className="flex flex-col gap-2 p-3 rounded-lg bg-[#060e20] border border-[#222a3d]">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[10px] uppercase tracking-wider text-[#d8c3ad] font-semibold">
                  Transcodificación Multi-Asset
                </span>
                <span className="text-[10px] text-[#ffc640] font-mono flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs">bolt</span> GPU Worker Ready
                </span>
              </div>

              {/* Video Mockup Preview */}
              <div className="relative w-full aspect-[9/10] rounded-lg overflow-hidden bg-[#171f33] border border-[#222a3d] flex items-center justify-center group">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAoiDyXqzP4hkh_mkezDsXlkJ-PK8atuju4aNSfjggS_xqoSuX2Jk-zeMDsjsyHNP2F1cUe-f2QkrOxbi1S1j3ZNYLrV9Hq4St9BM7N8nOBMjqNEMv51YXSe_nmRMHgIMU9aN5eMT69kDTE02z8DSZ1pjAm64H3MQz32bw-jj8-wtkK2k7iPo7xRlwYVuBrvaYgfNig7hI_YNBvCImLm_4_a62ImAxfUBxPPGO5rOVmGTCQI5CItUxIvg"
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060e20]/90 via-transparent to-transparent"></div>
                <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[#dae2fd]">
                  <div className="flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded bg-[#060e20]/80 backdrop-blur text-[10px] font-mono">00:34s</span>
                    <span className="px-2 py-0.5 rounded bg-[#060e20]/80 backdrop-blur text-[10px] text-[#ffc174] font-mono font-semibold">
                      {selectedAspectRatio === '9:16' ? '1080x1920 (9:16)' : '1000x1500 (2:3)'}
                    </span>
                  </div>
                  <button
                    onClick={() => showToast('Reproduciendo render de video')}
                    className="w-7 h-7 rounded-full bg-[#f59e0b] text-[#0b1326] flex items-center justify-center hover:bg-[#ffc640] transition-colors"
                  >
                    <span className="material-symbols-outlined text-base">play_arrow</span>
                  </button>
                </div>
              </div>

              {/* Aspect Ratio Toggle */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={() => setSelectedAspectRatio('9:16')}
                  className={`flex items-center justify-center gap-1 py-1 rounded text-xs font-semibold transition-all ${
                    selectedAspectRatio === '9:16'
                      ? 'bg-[#222a3d] text-[#ffc174] border border-[#ffc174]/40'
                      : 'bg-[#171f33] text-[#d8c3ad] hover:text-[#dae2fd]'
                  }`}
                >
                  <span className="material-symbols-outlined text-xs">smartphone</span>
                  <span>9:16 (TikTok/Reel)</span>
                </button>
                <button
                  onClick={() => setSelectedAspectRatio('2:3')}
                  className={`flex items-center justify-center gap-1 py-1 rounded text-xs font-semibold transition-all ${
                    selectedAspectRatio === '2:3'
                      ? 'bg-[#222a3d] text-[#ffc174] border border-[#ffc174]/40'
                      : 'bg-[#171f33] text-[#d8c3ad] hover:text-[#dae2fd]'
                  }`}
                >
                  <span className="material-symbols-outlined text-xs">crop_portrait</span>
                  <span>2:3 (Pinterest Pin)</span>
                </button>
              </div>
            </div>

            {/* Copiloto Copywriting Peruano */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-wider text-[#d8c3ad] font-semibold">
                  Copy & Asistente Cultural IA
                </span>
                <select
                  value={copyTone}
                  onChange={(e) => setCopyTone(e.target.value)}
                  className="bg-[#060e20] border border-[#222a3d] text-[#dae2fd] text-[11px] px-2 py-0.5 rounded focus:outline-none focus:border-[#f59e0b]"
                >
                  <option value="casual">Casual / Jerga sutil (Pilas/Pata)</option>
                  <option value="estetico">Estético Pinterest / Minimal</option>
                  <option value="corporativo">Corporativo / Retail Niubiz</option>
                </select>
              </div>

              <div className="p-2.5 rounded-lg bg-[#060e20] border border-[#222a3d] flex flex-col gap-2">
                <div className="flex items-center justify-between text-[#d8c3ad] text-[11px]">
                  <span className="flex items-center gap-1 text-[#ffc174]">
                    <span className="material-symbols-outlined text-xs">auto_awesome</span> Sugerencia IA
                  </span>
                  <span className="font-mono">{copyText.length}/2200 car.</span>
                </div>
                <textarea
                  value={copyText}
                  onChange={(e) => setCopyText(e.target.value)}
                  rows={4}
                  className="w-full bg-transparent text-[#dae2fd] text-xs resize-none focus:outline-none leading-relaxed"
                ></textarea>
                <div className="flex justify-end gap-1">
                  <button
                    onClick={handleRegenerateCopy}
                    className="px-2.5 py-1 rounded bg-[#171f33] hover:bg-[#222a3d] text-[#ffc174] text-[11px] font-semibold flex items-center gap-1 transition-colors"
                  >
                    <span className="material-symbols-outlined text-xs">refresh</span> Regenerar
                  </button>
                </div>
              </div>

              {/* Hashtag Cloud */}
              <div className="flex flex-col gap-1.5 pt-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-[#d8c3ad] uppercase tracking-wider font-semibold">
                    Hashtags de Alta Conversión PE
                  </span>
                  <button
                    onClick={handleAddAllHashtags}
                    className="text-[11px] text-[#ffc174] hover:underline font-semibold"
                  >
                    + Añadir todos
                  </button>
                </div>
                <div className="flex flex-wrap gap-1">
                  {[
                    { tag: '#FloresAmarillasPeru', metric: '12.4M', isGold: true },
                    { tag: '#LimaTrend', metric: '840K' },
                    { tag: '#KajelBloom', metric: 'Oficial', isGold: true },
                    { tag: '#RegalosPeru', metric: '320K' },
                    { tag: '#SpringVibesLima', metric: '190K' }
                  ].map((h) => (
                    <button
                      key={h.tag}
                      onClick={() => handleAddHashtag(h.tag)}
                      className="px-2.5 py-1 rounded-full bg-[#060e20] border border-[#222a3d] text-[#dae2fd] hover:bg-[#222a3d] text-[11px] flex items-center gap-1 transition-colors"
                    >
                      <span>{h.tag}</span>
                      <span className={h.isGold ? 'text-[#ffc640] font-bold' : 'text-[#d8c3ad]'}>{h.metric}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Hierarchical Approval Flow */}
            <div className="flex flex-col gap-2 pt-2 border-t border-[#222a3d]">
              <span className="text-[10px] uppercase tracking-wider text-[#d8c3ad] font-semibold">
                Flujo Jerárquico de Aprobación
              </span>
              <div className="flex flex-col gap-1.5 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-[#ffc640]/20 text-[#ffc640] flex items-center justify-center text-[10px]">
                    ✓
                  </span>
                  <div>
                    <span className="font-semibold text-[#dae2fd] block">Creado por Camila R. (Diseñadora)</span>
                    <span className="text-[10px] text-[#d8c3ad]">14 Mar, 10:20 AM • Asset exportado</span>
                  </div>
                </div>
                <div className="w-0.5 h-2 bg-[#ffc640]/30 ml-2"></div>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-[#ffc640]/20 text-[#ffc640] flex items-center justify-center text-[10px]">
                    ✓
                  </span>
                  <div>
                    <span className="font-semibold text-[#dae2fd] block">Revisado por Redacción & Copy</span>
                    <span className="text-[10px] text-[#d8c3ad]">15 Mar, 04:15 PM • Tono verificado</span>
                  </div>
                </div>
                <div className="w-0.5 h-2 bg-[#ffc640]/30 ml-2"></div>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-[#f59e0b] text-[#0b1326] flex items-center justify-center text-[10px] font-bold">
                    ✓
                  </span>
                  <div>
                    <span className="font-semibold text-[#ffc174] block">Aprobado por Diego V. (Lead de Marca)</span>
                    <span className="text-[10px] text-[#ffc640]">16 Mar, 09:30 AM • Listo para disparo</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-3">
                <button
                  onClick={() => showToast('Solicitud de cambio enviada al diseñador')}
                  className="py-2 rounded-lg bg-[#171f33] border border-[#222a3d] hover:bg-[#222a3d] text-xs font-semibold text-[#dae2fd] transition-colors"
                >
                  Solicitar Cambios
                </button>
                <button
                  onClick={handleEnqueueBullMQ}
                  disabled={isEnqueueing}
                  className="py-2 rounded-lg bg-[#f59e0b] hover:bg-[#ffc640] text-[#0b1326] text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1.5"
                >
                  <span className={`material-symbols-outlined text-sm ${isEnqueueing ? 'animate-spin' : ''}`}>
                    {isEnqueueing ? 'sync' : 'send'}
                  </span>
                  <span>{isEnqueueing ? 'Encolando...' : 'Encolar BullMQ'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* New Post Modal */}
      {showNewPostModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-md bg-[#171f33] border border-[#222a3d] rounded-2xl p-6 shadow-2xl flex flex-col gap-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#222a3d]">
              <h3 className="text-sm font-bold text-[#dae2fd]">Nueva Publicación Multi-Asset</h3>
              <button
                onClick={() => setShowNewPostModal(false)}
                className="text-[#d8c3ad] hover:text-[#dae2fd]"
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>
            <div>
              <label className="text-xs text-[#d8c3ad] block mb-1">Título o Concepto</label>
              <input
                type="text"
                value={newPostTitle}
                onChange={(e) => setNewPostTitle(e.target.value)}
                placeholder="Ej. Oferta Flash Flores Amarillas 21 Marzo..."
                className="w-full px-3 py-2 rounded-lg bg-[#060e20] border border-[#222a3d] text-xs text-[#dae2fd] focus:outline-none focus:border-[#f59e0b]"
              />
            </div>
            <div>
              <label className="text-xs text-[#d8c3ad] block mb-1">Canal de Publicación</label>
              <select
                value={newPostPlatform}
                onChange={(e) => setNewPostPlatform(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#060e20] border border-[#222a3d] text-xs text-[#dae2fd] focus:outline-none focus:border-[#f59e0b]"
              >
                <option value="tiktok">TikTok Video (9:16)</option>
                <option value="instagram">Instagram Reel / Carrusel</option>
                <option value="pinterest">Pinterest Pin de Catálogo (2:3)</option>
              </select>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowNewPostModal(false)}
                className="px-3 py-1.5 rounded-lg bg-[#222a3d] text-xs text-[#dae2fd]"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => {
                  showToast(`Publicación "${newPostTitle || 'Nuevo Post'}" agregada al calendario`);
                  setShowNewPostModal(false);
                }}
                className="px-4 py-1.5 rounded-lg bg-[#f59e0b] hover:bg-[#ffc640] text-[#0b1326] text-xs font-bold"
              >
                Crear Borrador
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer Status Bar */}
      <footer className="p-3.5 rounded-xl bg-[#060e20] border border-[#222a3d]/60 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-[#d8c3ad]">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ffc640] animate-pulse"></span>
            <span className="font-semibold text-[#dae2fd]">Colas BullMQ: Redis Cluster Activo</span>
          </div>
          <span>•</span>
          <span>0 fallos de renderizado • Tasa de éxito 99.8%</span>
          <span>•</span>
          <div className="flex items-center gap-1 text-[#ffc174]">
            <span className="material-symbols-outlined text-sm">schedule</span>
            <span>Próximo disparo en <strong>2h 14m</strong> vía Meta Graph API v19</span>
          </div>
        </div>
        <button
          onClick={() => setCurrentModule('tablero-analitico')}
          className="flex items-center gap-1 text-[#ffc174] hover:text-[#ffc640] font-semibold"
        >
          <span>Ver métricas en Tablero Analítico</span>
          <span className="material-symbols-outlined text-base">arrow_forward</span>
        </button>
      </footer>
    </div>
  );
};
