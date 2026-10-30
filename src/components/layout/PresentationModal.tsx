import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';

export const PresentationModal: React.FC = () => {
  const { isPresentationOpen, setIsPresentationOpen } = useApp();
  const [currentSlide, setCurrentSlide] = useState(1);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [showNotes, setShowNotes] = useState(true);

  const totalSlides = 5;

  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && isPresentationOpen) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, isPresentationOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isPresentationOpen) return;
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        setCurrentSlide((prev) => (prev < totalSlides ? prev + 1 : prev));
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setCurrentSlide((prev) => (prev > 1 ? prev - 1 : prev));
      } else if (e.key === 'Escape') {
        setIsPresentationOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPresentationOpen]);

  if (!isPresentationOpen) return null;

  const formatTimer = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60).toString().padStart(2, '0');
    const secs = (totalSecs % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  const scripts: Record<number, { time: string; text: string }> = {
    1: {
      time: 'Minuto 0:00 - 1:00 (Hook & Diagnóstico)',
      text: '"Buenas tardes profesor y miembros del jurado. En el Perú actual, una marca de consumo o retail gasta más de 25 horas semanales saltando caóticamente entre TikTok, Instagram y Pinterest. Cuando una publicación se vuelve viral o surge un reclamo crítico en Lima o Arequipa, tardan horas en enterarse. Las marcas están ciegas en omnicanalidad visual y derrochan miles de soles en colaboraciones sin métricas reales de conversión."'
    },
    2: {
      time: 'Minuto 1:00 - 2:00 (La Solución Kajel Bloom)',
      text: '"Por eso creamos Kajel Bloom, la plataforma de Social Ops que hace florecer las comunidades digitales de las empresas peruanas. Centralizamos el ciclo completo: desde la planificación en un calendario unificado hasta la escucha social en tiempo real y el cálculo matemático del ROI de creadores. Todo en una sola pantalla con inteligencia artificial asistida."'
    },
    3: {
      time: 'Minuto 2:00 - 3:30 (Arquitectura de Software)',
      text: '"A nivel de ingeniería, construimos una arquitectura moderna y escalable: en el Frontend, React y Tailwind CSS garantizan una interfaz fluida e intuitiva; en el Backend, Node.js y Express gestionan la concurrencia a través de colas con Redis y BullMQ para publicar puntualmente en TikTok, Instagram Graph API y Pinterest v5. Garantizamos seguridad de nivel bancario mediante OAuth 2.0 y cifrado AES-256 para los tokens corporativos."'
    },
    4: {
      time: 'Minuto 3:30 - 4:30 (Impacto Medible & Retorno)',
      text: '"Kajel Bloom reduce los costos operativos en un 65% y mitiga crisis de marca respondiendo en menos de 10 minutos. Transformamos \'likes\' y reproducciones en datos duros de conversión e ingresos comprobables para el retail y comercio electrónico en el país, como demostraremos ahora recorriendo los módulos del sistema."'
    },
    5: {
      time: 'Minuto 4:30 - 5:00 (Conclusiones & Sustentación)',
      text: '"La gestión digital ya no puede hacerse a ciegas. Con Kajel Bloom, la presencia digital de las empresas no solo crece, florece con bases de ingeniería sólidas y gobernanza estricta. Muchas gracias, quedamos atentos a sus preguntas y listos para profundizar en la arquitectura."'
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#070b14] text-slate-100 flex flex-col antialiased overflow-y-auto">
      {/* Top Bar Controls */}
      <header className="border-b border-[#1e2942] bg-[#0d1527]/95 backdrop-blur px-6 py-3 flex flex-wrap items-center justify-between sticky top-0 z-50 gap-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center text-slate-950 font-black shadow-lg">
            <span className="material-symbols-outlined text-slate-950 text-base font-bold">local_florist</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-white text-sm">Kajel Bloom Suite</span>
              <span className="text-[10px] font-mono uppercase bg-amber-500/10 text-amber-400 border border-amber-500/25 px-1.5 py-0.5 rounded">
                Taller Ing. Sistemas 2026
              </span>
            </div>
            <p className="text-[11px] text-slate-400">Sustentación de Arquitectura de Software & Pitch Final (5 Minutos)</p>
          </div>
        </div>

        {/* Slide Timeline Nav */}
        <div className="flex items-center bg-[#070b14]/80 border border-[#1e2942] rounded-xl p-1 gap-1 overflow-x-auto">
          {[
            { n: 1, title: 'El Problema' },
            { n: 2, title: 'Kajel Bloom' },
            { n: 3, title: 'Arquitectura' },
            { n: 4, title: 'Impacto & Demo' },
            { n: 5, title: 'Conclusiones' }
          ].map((item) => (
            <button
              key={item.n}
              onClick={() => setCurrentSlide(item.n)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all whitespace-nowrap ${
                currentSlide === item.n
                  ? 'bg-amber-500 text-slate-950 shadow font-bold'
                  : 'text-slate-300 hover:text-white hover:bg-[#111c34]'
              }`}
            >
              <span className="font-mono text-[10px] opacity-80">0{item.n}</span>
              <span>{item.title}</span>
            </button>
          ))}
        </div>

        {/* Presentation Timer & Close */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 bg-[#111c34] border border-[#1e2942] rounded-lg px-3 py-1.5 font-mono text-xs">
            <span className="material-symbols-outlined text-sm text-amber-400">timer</span>
            <span className="text-slate-400">Pitch:</span>
            <span className={`font-bold ${timerSeconds >= 300 ? 'text-red-400' : 'text-amber-300'}`}>
              {formatTimer(timerSeconds)}
            </span>
            <button
              onClick={() => setIsTimerRunning(!isTimerRunning)}
              className="ml-1 text-slate-400 hover:text-white"
            >
              <span className="material-symbols-outlined text-sm">
                {isTimerRunning ? 'pause' : 'play_arrow'}
              </span>
            </button>
          </div>

          <button
            onClick={() => setShowNotes(!showNotes)}
            className="px-3 py-1.5 rounded-lg bg-[#111c34] hover:bg-[#1e2942] border border-[#1e2942] text-xs text-slate-200 flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-sm text-amber-400">notes</span>
            <span>Notas</span>
          </button>

          <button
            onClick={() => setCurrentSlide((prev) => (prev > 1 ? prev - 1 : prev))}
            className="w-8 h-8 rounded-lg bg-[#111c34] hover:bg-[#1e2942] flex items-center justify-center text-slate-300 hover:text-white"
          >
            <span className="material-symbols-outlined text-sm">chevron_left</span>
          </button>
          <button
            onClick={() => setCurrentSlide((prev) => (prev < totalSlides ? prev + 1 : prev))}
            className="w-8 h-8 rounded-lg bg-[#111c34] hover:bg-[#1e2942] flex items-center justify-center text-slate-300 hover:text-white"
          >
            <span className="material-symbols-outlined text-sm">chevron_right</span>
          </button>

          <button
            onClick={() => setIsPresentationOpen(false)}
            className="p-1.5 rounded-lg bg-red-500/20 text-red-300 hover:bg-red-500 hover:text-white transition-colors ml-2"
            title="Cerrar Presentación"
          >
            <span className="material-symbols-outlined text-base">close</span>
          </button>
        </div>
      </header>

      {/* Main Slide Stage */}
      <main className="flex-1 p-6 max-w-7xl mx-auto w-full flex flex-col justify-center">
        {currentSlide === 1 && (
          <div className="grid grid-cols-12 gap-6 items-stretch animate-in fade-in zoom-in-95 duration-200">
            <div className="col-span-12 lg:col-span-7 bg-[#0d1527] border border-[#1e2942] rounded-2xl p-8 relative overflow-hidden flex flex-col justify-between shadow-2xl">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="font-mono text-xs font-bold text-amber-400 tracking-wider uppercase bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-md">
                    Minuto 0:00 - 1:00 • Hook & Diagnóstico de Mercado
                  </span>
                  <span className="text-xs text-slate-400">Contexto Retail Perú 2026</span>
                </div>
                <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight mb-4">
                  La Crisis de la <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">Omnicanalidad Visual</span> en las Marcas Peruanas
                </h1>
                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                  Las marcas de retail, moda y florerías en Perú pierden más de <strong>25 horas hombre semanales</strong> saltando caóticamente entre TikTok Creator Hub, Meta Business Suite y Pinterest. Durante hitos de viralidad masiva (como el fenómeno de las Flores Amarillas), operan con <strong>ceguera de datos, riesgo de linchamiento digital y gasto a ciegas en creadores</strong>.
                </p>
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="bg-[#111c34]/80 border border-red-500/20 rounded-xl p-3.5 flex items-start gap-3">
                    <span className="material-symbols-outlined text-red-400 text-xl">history</span>
                    <div>
                      <h4 className="text-xs font-bold text-white">Dispersión Operativa</h4>
                      <p className="text-[11px] text-slate-400 mt-0.5">4.5 hrs diarias perdidas en duplicar posteos y reportes manuales.</p>
                    </div>
                  </div>
                  <div className="bg-[#111c34]/80 border border-amber-500/20 rounded-xl p-3.5 flex items-start gap-3">
                    <span className="material-symbols-outlined text-amber-400 text-xl">crisis_alert</span>
                    <div>
                      <h4 className="text-xs font-bold text-white">Crisis No Detectadas</h4>
                      <p className="text-[11px] text-slate-400 mt-0.5">Demoras de courier en Lima escalan a Indecopi antes de enterarse.</p>
                    </div>
                  </div>
                  <div className="bg-[#111c34]/80 border border-rose-500/20 rounded-xl p-3.5 flex items-start gap-3">
                    <span className="material-symbols-outlined text-rose-400 text-xl">money_off</span>
                    <div>
                      <h4 className="text-xs font-bold text-white">ROI Fantasma en Creadores</h4>
                      <p className="text-[11px] text-slate-400 mt-0.5">Presupuestos asignados con capturas de pantalla, sin trazabilidad UTM.</p>
                    </div>
                  </div>
                  <div className="bg-[#111c34]/80 border border-blue-500/20 rounded-xl p-3.5 flex items-start gap-3">
                    <span className="material-symbols-outlined text-blue-400 text-xl">link_off</span>
                    <div>
                      <h4 className="text-xs font-bold text-white">Desconexión Pinterest</h4>
                      <p className="text-[11px] text-slate-400 mt-0.5">Alta intención de compra desaprovechada por falta de sync de catálogo.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pt-6 border-t border-[#1e2942] mt-6 flex items-center justify-between text-xs font-mono text-slate-400">
                <span>Fuente: Auditoría Retail Lima & Callao Q1-2026</span>
                <span className="text-amber-400">Nivel de Impacto: Crítico para P&L</span>
              </div>
            </div>

            <div className="col-span-12 lg:col-span-5 flex flex-col gap-4">
              <div className="bg-gradient-to-br from-[#0d1527] to-[#111c34] border border-[#1e2942] rounded-2xl p-6 shadow-xl">
                <span className="text-xs font-mono uppercase text-slate-400">El Costo de la Ineficiencia</span>
                <div className="mt-2 flex items-baseline gap-3">
                  <span className="text-5xl font-black text-amber-400 tracking-tight">-65%</span>
                  <span className="text-xs text-slate-300 font-medium">Margen operativo comprometido en responder quejas tardías</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full mt-4 overflow-hidden">
                  <div className="bg-amber-400 h-full rounded-full w-[78%]"></div>
                </div>
                <div className="flex justify-between text-[11px] font-mono text-slate-400 mt-2">
                  <span>Tiempo Reacción: 48 min</span>
                  <span className="text-red-400">Límite Crisis Viral: &lt;10 min</span>
                </div>
              </div>

              <div className="bg-[#0d1527] border border-[#1e2942] rounded-2xl p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-slate-200 uppercase tracking-wide flex items-center gap-2">
                      <span className="material-symbols-outlined text-sm text-amber-400">campaign</span>
                      Caso Real: Flores Amarillas 21 Septiembre
                    </span>
                    <span className="text-[10px] bg-red-500/20 text-red-300 font-mono px-2 py-0.5 rounded">Riesgo Real</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Durante el 21 de septiembre en Lima, el volumen de mensajes privados y menciones en TikTok creció <strong className="text-white">+340%</strong>. Sin una plataforma unificada, una sola queja sobre demoras en Miraflores y San Miguel generó un efecto bola de nieve en redes con menciones a @indecopi antes de que el equipo pudiera responder.
                  </p>
                </div>
                <div className="mt-4 p-3 bg-[#111c34]/90 border border-[#1e2942] rounded-xl flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-sm shrink-0">
                    KB
                  </div>
                  <div className="text-xs">
                    <span className="font-bold text-white block">La Solución requerida:</span>
                    <span className="text-slate-400 text-[11px]">Unificar ingesta de APIs oficiales, alertas algorítmicas y triage con IA.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentSlide === 2 && (
          <div className="grid grid-cols-12 gap-6 items-stretch animate-in fade-in zoom-in-95 duration-200">
            <div className="col-span-12 lg:col-span-5 bg-[#0d1527] border border-[#1e2942] rounded-2xl p-8 flex flex-col justify-between shadow-2xl">
              <div>
                <span className="font-mono text-xs font-bold text-amber-400 tracking-wider uppercase bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-md">
                  Minuto 1:00 - 2:00 • La Solución
                </span>
                <h2 className="text-2xl font-black text-white tracking-tight mt-3 mb-2">Kajel Bloom Suite</h2>
                <p className="text-xs text-amber-400/90 font-medium mb-4">Social Intelligence & Omni-Community Platform</p>
                <p className="text-xs text-slate-300 leading-relaxed mb-6">
                  Inspirado en el fenómeno cultural de viralidad masiva en el Perú combinado con la robustez de ingeniería de Kajel. Una suite unificada que transforma interacciones en conversiones e-commerce auditables en Soles (PEN).
                </p>
                <div className="space-y-3">
                  <div className="p-3 bg-[#111c34] rounded-xl border border-[#1e2942] flex items-center gap-3">
                    <span className="material-symbols-outlined text-amber-400">hub</span>
                    <div>
                      <h4 className="text-xs font-bold text-white">Centralización Omnicanal</h4>
                      <p className="text-[11px] text-slate-400">TikTok Video API + Meta Graph v20 + Pinterest v5.</p>
                    </div>
                  </div>
                  <div className="p-3 bg-[#111c34] rounded-xl border border-[#1e2942] flex items-center gap-3">
                    <span className="material-symbols-outlined text-amber-400">psychology</span>
                    <div>
                      <h4 className="text-xs font-bold text-white">Copiloto IA Perú</h4>
                      <p className="text-[11px] text-slate-400">NLP entrenado para detectar jerga local limeña (*palta, ya fuiste, broder*).</p>
                    </div>
                  </div>
                  <div className="p-3 bg-[#111c34] rounded-xl border border-[#1e2942] flex items-center gap-3">
                    <span className="material-symbols-outlined text-amber-400">paid</span>
                    <div>
                      <h4 className="text-xs font-bold text-white">Atribución Económica Real</h4>
                      <p className="text-[11px] text-slate-400">EMV en Soles (PEN) y conciliación automática con Shopify / Niubiz / Yape.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-12 lg:col-span-7 bg-[#0d1527] border border-[#1e2942] rounded-2xl p-8 flex flex-col justify-between shadow-2xl">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-bold text-white">Mapa de Módulos Funcionales Construidos</h3>
                  <span className="text-xs font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded">100% Funcional & Diseñado</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  <div className="bg-[#111c34] border border-[#1e2942] rounded-xl p-4">
                    <span className="text-[10px] font-mono text-amber-400 font-bold uppercase">Módulo 01</span>
                    <h4 className="text-sm font-bold text-white mt-1">Calendario Drag & Drop</h4>
                    <p className="text-xs text-slate-400 mt-1">Planificación visual multi-ratio (9:16 y 2:3) con optimizador de copies y hashtags peruanos.</p>
                  </div>
                  <div className="bg-[#111c34] border border-[#1e2942] rounded-xl p-4">
                    <span className="text-[10px] font-mono text-amber-400 font-bold uppercase">Módulo 02</span>
                    <h4 className="text-sm font-bold text-white mt-1">Sentinel Crisis & Listening</h4>
                    <p className="text-xs text-slate-400 mt-1">Radar 24/7 con detección de anomalías de sentimiento y kill-switch de pauta.</p>
                  </div>
                  <div className="bg-[#111c34] border border-[#1e2942] rounded-xl p-4">
                    <span className="text-[10px] font-mono text-amber-400 font-bold uppercase">Módulo 03</span>
                    <h4 className="text-sm font-bold text-white mt-1">Tablero Analítico Ejecutivo</h4>
                    <p className="text-xs text-slate-400 mt-1">Métricas normalizadas entre plataformas, share of voice y proyecciones de alcance.</p>
                  </div>
                  <div className="bg-[#111c34] border border-[#1e2942] rounded-xl p-4">
                    <span className="text-[10px] font-mono text-amber-400 font-bold uppercase">Módulo 04</span>
                    <h4 className="text-sm font-bold text-white mt-1">Influencers & Calculadora ROI</h4>
                    <p className="text-xs text-slate-400 mt-1">Auditoría antifraude de creadores locales, simulación de EMV y tracking UTM con Shopify.</p>
                  </div>
                  <div className="col-span-1 md:col-span-2 bg-gradient-to-r from-[#111c34] to-amber-950/20 border border-amber-500/30 rounded-xl p-4">
                    <span className="text-[10px] font-mono text-amber-400 font-bold uppercase">Módulo 05 • Core Operativo</span>
                    <h4 className="text-sm font-bold text-white mt-1">Smart Universal Inbox & Helpdesk</h4>
                    <p className="text-xs text-slate-300 mt-1">Bandeja unificada con triage por IA, visión 360° del cliente con integración de envíos y SLA en menos de 7 minutos.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentSlide === 3 && (
          <div className="bg-[#0d1527] border border-[#1e2942] rounded-2xl p-8 shadow-2xl flex flex-col justify-between animate-in fade-in zoom-in-95 duration-200">
            <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-[#1e2942] mb-6 gap-2">
              <div>
                <span className="font-mono text-xs font-bold text-amber-400 tracking-wider uppercase bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-md">
                  Minuto 2:00 - 3:30 • Arquitectura de Software
                </span>
                <h2 className="text-2xl font-black text-white mt-1">Ecosistema Tecnológico de Alta Disponibilidad</h2>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono">
                <span className="px-2.5 py-1 bg-[#111c34] border border-emerald-500/30 text-emerald-400 rounded-lg flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> mTLS Enforced
                </span>
                <span className="px-2.5 py-1 bg-[#111c34] border border-[#1e2942] text-slate-300 rounded-lg">
                  OAuth 2.0 PKCE
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-[#111c34] border border-[#1e2942] rounded-xl p-4">
                <span className="bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[10px] font-mono font-bold px-2 py-0.5 rounded">
                  CAPA 1: CLIENTE
                </span>
                <h4 className="font-bold text-white text-sm mt-3 mb-2">React 19 + Tailwind</h4>
                <p className="text-xs text-slate-300">TanStack Query v5 para sincronización en caché, WebSockets en vivo para streaming y Dnd-kit accesible.</p>
                <div className="mt-4 pt-3 border-t border-[#1e2942] text-[11px] font-mono text-slate-400">Latencia UI: &lt;16ms</div>
              </div>
              <div className="bg-[#111c34] border border-[#1e2942] rounded-xl p-4">
                <span className="bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[10px] font-mono font-bold px-2 py-0.5 rounded">
                  CAPA 2: GATEWAY
                </span>
                <h4 className="font-bold text-white text-sm mt-3 mb-2">Node.js + Express (TS)</h4>
                <p className="text-xs text-slate-300">Tokens JWT con firma RS256, rate limiter adaptativo en token bucket y validación de firmas HMAC-SHA256.</p>
                <div className="mt-4 pt-3 border-t border-[#1e2942] text-[11px] font-mono text-slate-400">Throughput: 840 ops/s</div>
              </div>
              <div className="bg-[#111c34] border border-[#1e2942] rounded-xl p-4">
                <span className="bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[10px] font-mono font-bold px-2 py-0.5 rounded">
                  CAPA 3: ASYNC JOBS
                </span>
                <h4 className="font-bold text-white text-sm mt-3 mb-2">Redis + BullMQ</h4>
                <p className="text-xs text-slate-300">Worker pool concurrente tolerante a caídas, colas prioritarias para alertas y caché in-memory de KPIs.</p>
                <div className="mt-4 pt-3 border-t border-[#1e2942] text-[11px] font-mono text-slate-400">Latencia Redis: 12ms</div>
              </div>
              <div className="bg-[#111c34] border border-[#1e2942] rounded-xl p-4">
                <span className="bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[10px] font-mono font-bold px-2 py-0.5 rounded">
                  CAPA 4: SEGURIDAD
                </span>
                <h4 className="font-bold text-white text-sm mt-3 mb-2">PostgreSQL + Vault KMS</h4>
                <p className="text-xs text-slate-300">Cifrado de credenciales con AES-256-GCM y cumplimiento con la Ley N° 29733 (Datos Personales PE).</p>
                <div className="mt-4 pt-3 border-t border-[#1e2942] text-[11px] font-mono text-slate-400">Seguridad: ISO/IEC 27001</div>
              </div>
            </div>
          </div>
        )}

        {currentSlide === 4 && (
          <div className="grid grid-cols-12 gap-6 items-stretch animate-in fade-in zoom-in-95 duration-200">
            <div className="col-span-12 lg:col-span-6 bg-[#0d1527] border border-[#1e2942] rounded-2xl p-8 flex flex-col justify-between shadow-2xl">
              <div>
                <span className="font-mono text-xs font-bold text-amber-400 tracking-wider uppercase bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-md">
                  Minuto 3:30 - 4:30 • Retorno de Inversión
                </span>
                <h2 className="text-3xl font-black text-white tracking-tight mt-3 mb-4">Impacto Medible en Retail & E-Commerce</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#111c34] border border-[#1e2942] rounded-xl p-4">
                    <span className="text-[11px] font-mono text-slate-400 uppercase">Ahorro de Tiempo</span>
                    <div className="text-3xl font-black text-amber-400 mt-1">65%</div>
                    <p className="text-[11px] text-slate-300 mt-1">De 4.5 horas a 1.5 horas diarias por community manager.</p>
                  </div>
                  <div className="bg-[#111c34] border border-[#1e2942] rounded-xl p-4">
                    <span className="text-[11px] font-mono text-slate-400 uppercase">First Response Time</span>
                    <div className="text-3xl font-black text-emerald-400 mt-1">4.2 min</div>
                    <p className="text-[11px] text-slate-300 mt-1">Meta &lt; 7 min; promedio del mercado: 48 min.</p>
                  </div>
                  <div className="bg-[#111c34] border border-[#1e2942] rounded-xl p-4">
                    <span className="text-[11px] font-mono text-slate-400 uppercase">Multiplicador EMV / ROAS</span>
                    <div className="text-3xl font-black text-amber-400 mt-1">4.8x</div>
                    <p className="text-[11px] text-slate-300 mt-1">S/ 980 PEN de valor generado con S/ 150 invertidos en alianzas.</p>
                  </div>
                  <div className="bg-[#111c34] border border-[#1e2942] rounded-xl p-4">
                    <span className="text-[11px] font-mono text-slate-400 uppercase">Satisfacción (CSAT)</span>
                    <div className="text-3xl font-black text-emerald-400 mt-1">96.2%</div>
                    <p className="text-[11px] text-slate-300 mt-1">38 consultas atendidas con copiloto empático.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-12 lg:col-span-6 bg-[#0d1527] border border-[#1e2942] rounded-2xl p-8 flex flex-col justify-between shadow-2xl">
              <div>
                <h3 className="text-base font-bold text-white mb-2">Exploración Interactiva de la App</h3>
                <p className="text-xs text-slate-300 mb-4">Haz clic para ir directamente al módulo funcional correspondiente:</p>
                <div className="space-y-2">
                  {[
                    { id: 'tablero-analitico', title: 'Módulo 3: Tablero Analítico Ejecutivo', desc: 'KPIs en vivo, gráfica de evolución y atribución multicanal' },
                    { id: 'calendario-contenido', title: 'Módulo 1: Calendario Drag & Drop', desc: 'Programador con inspector multi-asset y copywriter IA' },
                    { id: 'social-listening', title: 'Módulo 2: Sentinel Crisis & Listening', desc: 'Radar de modismos peruanos y protocolo de mitigación' },
                    { id: 'directorio-influencers', title: 'Módulo 4: Creadores & Calculadora ROI / EMV', desc: 'Simulador en tiempo real y trazabilidad UTM' },
                    { id: 'inbox-comunitario', title: 'Módulo 5: Smart Universal Inbox', desc: 'Helpdesk 360°, motorizado en ruta y cupón Flores Perdón' }
                  ].map((m) => (
                    <button
                      key={m.id}
                      onClick={() => {
                        useApp().setCurrentModule(m.id as any);
                        setIsPresentationOpen(false);
                      }}
                      className="w-full text-left p-3 bg-[#111c34] hover:bg-amber-500/10 border border-[#1e2942] hover:border-amber-500/40 rounded-xl transition flex items-center justify-between"
                    >
                      <div>
                        <h4 className="text-xs font-bold text-white">{m.title}</h4>
                        <p className="text-[11px] text-slate-400">{m.desc}</p>
                      </div>
                      <span className="material-symbols-outlined text-sm text-amber-400">arrow_forward</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {currentSlide === 5 && (
          <div className="grid grid-cols-12 gap-6 items-stretch animate-in fade-in zoom-in-95 duration-200">
            <div className="col-span-12 lg:col-span-7 bg-[#0d1527] border border-[#1e2942] rounded-2xl p-8 flex flex-col justify-between shadow-2xl">
              <div>
                <span className="font-mono text-xs font-bold text-amber-400 tracking-wider uppercase bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-md">
                  Minuto 4:30 - 5:00 • Cierre & Sustentación
                </span>
                <h2 className="text-3xl font-black text-white tracking-tight mt-3 mb-4">
                  Ingeniería Aplicada al Crecimiento Digital
                </h2>
                <p className="text-xs text-slate-300 leading-relaxed mb-6">
                  <strong>Kajel Bloom Suite</strong> demuestra que la gestión de redes sociales y omnicanalidad no debe ser un proceso artesanal ni fragmentado. Aplicando principios formales de arquitectura de software, colas concurrentes y modelos de NLP adaptativos, transformamos el caos operativo en un sistema con gobernanza estricta, alta disponibilidad y retorno tangible.
                </p>
                <div className="space-y-3">
                  <div className="p-3 bg-[#111c34] border border-emerald-500/20 rounded-xl flex items-start gap-3">
                    <span className="material-symbols-outlined text-emerald-400 text-base">verified</span>
                    <div>
                      <h4 className="text-xs font-bold text-white">Viabilidad Técnica Comprobada</h4>
                      <p className="text-[11px] text-slate-400">Latencia &lt; 800 ms y 0% pérdida de webhooks durante picos virales.</p>
                    </div>
                  </div>
                  <div className="p-3 bg-[#111c34] border border-amber-500/20 rounded-xl flex items-start gap-3">
                    <span className="material-symbols-outlined text-amber-400 text-base">verified</span>
                    <div>
                      <h4 className="text-xs font-bold text-white">Aporte de Negocio Local</h4>
                      <p className="text-[11px] text-slate-400">Resuelve la brecha de retail peruano conectando TikTok/IG con pasarelas Niubiz/Yape.</p>
                    </div>
                  </div>
                  <div className="p-3 bg-[#111c34] border border-blue-500/20 rounded-xl flex items-start gap-3">
                    <span className="material-symbols-outlined text-blue-400 text-base">verified</span>
                    <div>
                      <h4 className="text-xs font-bold text-white">Gobernanza y Privacidad</h4>
                      <p className="text-[11px] text-slate-400">Bóveda KMS con AES-256-GCM y cumplimiento normativo estricto Ley N° 29733.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-12 lg:col-span-5 bg-[#0d1527] border border-[#1e2942] rounded-2xl p-8 flex flex-col justify-between shadow-2xl">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <span className="material-symbols-outlined text-amber-400 text-base">quiz</span>
                    Banco de Respuestas (Jurado)
                  </h3>
                  <span className="text-[10px] bg-amber-500/10 text-amber-300 font-mono px-2 py-0.5 rounded">Q&A Shield</span>
                </div>
                <div className="space-y-3">
                  <div className="p-3 bg-[#111c34] border border-[#1e2942] rounded-xl">
                    <span className="text-[10px] font-bold font-mono text-amber-400 uppercase block">P1: ¿Cómo toleran rate limits de Meta y TikTok?</span>
                    <p className="text-[11px] text-slate-300 mt-1">Implementamos un Leaky Bucket en Redis. Los pedidos se encolan en BullMQ y se despachan respetando el cupo del 70%.</p>
                  </div>
                  <div className="p-3 bg-[#111c34] border border-[#1e2942] rounded-xl">
                    <span className="text-[10px] font-bold font-mono text-amber-400 uppercase block">P2: ¿Cómo calculan el EMV de creadores?</span>
                    <p className="text-[11px] text-slate-300 mt-1">Fórmula estandarizada de IAB Perú (Impresiones × CPM sectorial + Interacciones × CPE ponderado), multiplicada por autenticidad.</p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsPresentationOpen(false)}
                className="mt-4 w-full py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition shadow-lg"
              >
                Volver a la Aplicación Principal
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Speaker Notes Drawer */}
      {showNotes && (
        <aside className="border-t border-[#1e2942] bg-[#0d1527] px-6 py-4">
          <div className="max-w-7xl mx-auto flex items-start gap-4">
            <span className="material-symbols-outlined text-amber-400 text-lg mt-0.5">mic</span>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-white uppercase font-mono">Guion del Orador</span>
                <span className="text-[11px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">
                  {scripts[currentSlide].time}
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed bg-[#111c34] border border-[#1e2942] p-3 rounded-xl font-sans">
                {scripts[currentSlide].text}
              </p>
            </div>
          </div>
        </aside>
      )}
    </div>
  );
};
