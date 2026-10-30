import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';

export const InboxComunitario: React.FC = () => {
  const { showToast } = useApp();

  const [activeTicketId, setActiveTicketId] = useState('t-1');
  const [ticketFilter, setTicketFilter] = useState('todos');
  const [networkFilter, setNetworkFilter] = useState('all');
  const [slaPriorityFilter, setSlaPriorityFilter] = useState('all');
  const [isReplyingNote, setIsReplyingNote] = useState(false);
  const [replyMessage, setReplyMessage] = useState('');
  const [copilotTone, setCopilotTone] = useState<'empatico' | 'corporativo'>('empatico');
  const [showGpsModal, setShowGpsModal] = useState(false);

  const copilotSuggestions: Record<'empatico' | 'corporativo', string> = {
    empatico:
      '¡Hola Mariana! Te entendemos al 100%, sabemos lo especial que es esta fecha de flores amarillas. Acabamos de comunicarnos directamente con el motorizado y está a solo 4 cuadras de la oficina en Miraflores (Av. José Pardo). Llegará antes de las 12:45 PM garantizado. Para compensar la angustia, te activamos un cupón de cortesía para tu próxima compra 💛🚚',
    corporativo:
      'Estimada Mariana: Le confirmamos que su orden #KB-8821 se encuentra en fase final de entrega por nuestro servicio express. El motorizado asignado (Edwin T.) se encuentra en la intersección de Av. José Pardo, proyectando su llegada en 7 minutos. Agradecemos su paciencia.'
  };

  const [tickets, setTickets] = useState([
    {
      id: 't-1',
      handle: '@mariana_flores_pe',
      name: 'Mariana Rivas',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCtfcPoh6_iI3XYsIqUPvyszC63LafU5xZ4vuFTnO645GS2H4wgZ3HijBApYl9NkLebg0xVwQrk3tmQYD46Emq5-OAkBvrjiYSdspDsf813znZ-CA1AUl5Ee7C7iy6p5NyK8_adVvdYrunKuwnyPwKXIoKeSV_l7aZVU_flYU4Na1chPID6IglaG8JdFQj_Ew5GtCMiu-niJ-hyJjPR8_DVNdlMNBmwJMkdUY4OQsPotydRkhoBMW7hwQ',
      channel: 'ig',
      channelText: 'Instagram DM',
      slaBadge: '2m SLA',
      isCriticalSla: true,
      subject: 'Flores Amarillas llegaron tarde a Miraflores',
      snippet: '"Hola! Pedí el ramo premium para las 11am y recién me avisan del courier..."',
      riskText: 'Riesgo Queja / Frustración 88%',
      timeAgo: 'Hace 6m',
      status: 'escalado',
      tier: 'Cliente Gold',
      ticketCode: '#TICK-8941',
      advisor: 'Diego V. (Ops)'
    },
    {
      id: 't-2',
      handle: '@carlos_peru_21',
      name: 'Carlos Mendoza',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD_DhNco_LH_FKzyHVSr8R001DWBKUk29hhI4XTcU0WdTAcYuqlW3yAm-zLN4JP-GrXt388BwwELWwTwtHTB-lliyzlIXN5BtF94CHjg3y4gvETzBNXFO0JJFhqlIstS6f-GTZTuiQ5zyIhHuyTB6ZBMLXUf96Vi2AkmZ2ArqJj8EXz9cj-vxel8A985QmdqvU8pfN2ffOJQrs7XXNfmzueqUCbuQRcJyzZa9hU4VU9pL8WwEoMhU3e4Q',
      channel: 'tiktok',
      channelText: 'Comentario TikTok',
      slaBadge: '8m SLA',
      isCriticalSla: false,
      subject: '¿Tienen stock para enviar hoy a San Borja?',
      snippet: '"Broder, vi el video del ramo gigante, me confirman si llega hoy a las 5pm?"',
      riskText: 'Intención Compra 95%',
      timeAgo: 'Hace 14m',
      status: 'nuevos',
      tier: 'Nuevo Prospecto',
      ticketCode: '#TICK-8942',
      advisor: 'Bot Kajel Auto'
    },
    {
      id: 't-3',
      handle: '@andrea_decoraciones',
      name: 'Andrea Beltrán',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBDMgTsuIkTALx2lNA14r5Qwu2A-ZTjD2ViF25nmaZo539R4Yi-VK1AmxFBqElNzzg7UzOyQ1k5cB-iidIvEkrMuYtmkhMQ35ISRVaN9d3TCfYHszTMW1QERaAGNvTqPoVAjv5Xu583cfaOaAu2hifiFKlY6LzZs_fzXKuoJCr9z_grrP51y9G4wRqkB_jU4Xgf_FYy1Jfbu-woQXBoyBCcsXanJjK-yNxsVCkcaT2sQhSYZWG0N96qzg',
      channel: 'pin',
      channelText: 'Pin Catálogo',
      slaBadge: '25m SLA',
      isCriticalSla: false,
      subject: 'Consulta sobre catálogo mayorista corporativo',
      snippet: '"Buenas tardes, requerimos 45 centros de mesa amarillos para corporativo en San Isidro..."',
      riskText: 'Lead B2B Cualificado',
      timeAgo: 'Hace 22m',
      status: 'en_proceso',
      tier: 'B2B Corporate',
      ticketCode: '#TICK-8943',
      advisor: 'Camila R.'
    },
    {
      id: 't-4',
      handle: '@lucas_urbano_lim',
      name: 'Lucas Vargas',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCTG2xrzTHP8EeUGBDUP-FsPOhkfjYZmbDrtFjxL-AKC7b6SopvlqoXI0eENoXW8l4DRYmG6OWB1DPp90-OBhUXuxG8PVaSL5gelaqTesrOHSo41RiNGakGzIDWNzxTqnrHuy0wGagG30ZzhccwiholmrJl-j7NkPTYjebLK01yFOfdJBsFsPMz9gPGgr9WbXOfQTaAV2cpne3b5-IUIw0jhFMaPkKmLL5cbzRbzKYBeWu4oVIkl_3a8w',
      channel: 'tiktok',
      channelText: 'TikTok Comentario',
      slaBadge: 'Resuelto',
      isCriticalSla: false,
      subject: 'El código de descuento de Valeria no me aplica',
      snippet: 'Macro automática #DESCUENTO-INFLUENCER aplicada con éxito.',
      riskText: 'Macro IA Ejecutada',
      timeAgo: 'Hace 35m',
      status: 'resueltos',
      tier: 'Standard',
      ticketCode: '#TICK-8939',
      advisor: 'Bot Kajel Auto'
    }
  ]);

  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      sender: 'Mariana Rivas',
      time: '11:42 AM',
      text: 'Hola chicos, hice el pedido #KB-8821 a las 8am para que llegue al mediodía a Miraflores por el 21 de septiembre. Mi flaca sale a la 1pm de su oficina. ¿Me confirman si el motorizado ya está cerca?',
      isBot: false,
      isPrivate: false,
      isCustomer: true
    },
    {
      id: 2,
      sender: 'Bot Kajel Dispatch',
      time: '11:43 AM',
      text: 'Hola Mariana 🌼 Consultando con el tracking de Chazki/Urbano Express... El courier reporta tráfico denso en Av. Javier Prado, pero tu ruta continúa activa con prioridad de entrega.',
      isBot: true,
      isPrivate: false,
      isCustomer: false
    },
    {
      id: 3,
      sender: 'Mariana Rivas',
      time: '11:51 AM',
      text: 'Pucha qué palta, si no llega antes de la 1pm ya no sirve porque ella se va a almorzar afuera. ¿Me pueden dar solución urgente? 😔',
      isBot: false,
      isPrivate: false,
      isCustomer: true,
      sentimentBadge: 'Tono: Frustrado'
    },
    {
      id: 4,
      sender: 'Nota Privada Interna (Diego V. - Lead Ops)',
      time: '11:53 AM',
      text: 'Contacté al supervisor de despacho. El motorizado Edwin está a 4 cuadras (Av. José Pardo). Si pasa de la 1:00pm aplicamos el cupón de compensación S/ 30 según protocolo "Flores Perdón".',
      isBot: false,
      isPrivate: true,
      isCustomer: false
    }
  ]);

  const handleSendReply = () => {
    if (!replyMessage.trim()) return;
    const newMsg = {
      id: Date.now(),
      sender: isReplyingNote ? 'Nota Interna (Tú)' : 'Kajel Support Team',
      time: new Date().toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' }),
      text: replyMessage,
      isBot: false,
      isPrivate: isReplyingNote,
      isCustomer: false
    };
    setChatMessages((prev) => [...prev, newMsg]);
    setReplyMessage('');
    showToast(isReplyingNote ? 'Nota interna guardada' : 'Respuesta enviada a @mariana_flores_pe');
  };

  const handleInsertCopilot = () => {
    setReplyMessage(copilotSuggestions[copilotTone]);
    showToast('Sugerencia del copiloto insertada en el campo de respuesta');
  };

  const handleIssueCoupon = () => {
    showToast('Cupón "PERDON-20-SET" emitido y notificado por SMS/WhatsApp');
  };

  const filteredTickets = tickets.filter((t) => {
    if (ticketFilter === 'nuevos' && t.status !== 'nuevos') return false;
    if (ticketFilter === 'en_proceso' && t.status !== 'en_proceso') return false;
    if (ticketFilter === 'escalado' && t.status !== 'escalado') return false;
    if (ticketFilter === 'resueltos' && t.status !== 'resueltos') return false;
    if (networkFilter !== 'all' && t.channel !== networkFilter) return false;
    return true;
  });

  return (
    <div className="flex flex-col w-full gap-6">
      {/* HEADER DEL MÓDULO & TELEMETRÍA */}
      <header className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-4 p-5 rounded-xl bg-[#131b2e] border border-[#222a3d] shadow-sm">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2 py-0.5 rounded bg-[#f59e0b] text-[#0b1326] text-[10px] tracking-wider uppercase font-bold font-mono">
              MÓDULO 05 • OMNI-SUPPORT
            </span>
            <span className="flex items-center gap-1.5 text-[11px] text-[#ffc640] font-mono">
              <span className="w-2 h-2 rounded-full bg-[#ffc640] animate-pulse"></span>
              LIVE WEBSOCKET SYNC 420ms
            </span>
            <span className="text-[#a08e7a] text-xs hidden md:inline">|</span>
            <span className="text-xs text-[#d8c3ad]">COLA MULTICANAL TIKTOK, IG & PINTEREST</span>
          </div>

          <h1 className="text-xl sm:text-2xl font-bold text-[#dae2fd] tracking-tight">
            Smart Universal Inbox & Helpdesk Comunitario
          </h1>

          {/* Telemetría en Vivo */}
          <div className="flex items-center gap-3 flex-wrap pt-1 text-xs text-[#d8c3ad]">
            <div className="flex items-center gap-1.5 bg-[#171f33] border border-[#222a3d] px-2.5 py-1 rounded">
              <span className="material-symbols-outlined text-sm text-[#ffc640]">database</span>
              <span>BullMQ Worker: <strong className="text-[#dae2fd]">Activa (0 pérdidas)</strong></span>
            </div>
            <div className="flex items-center gap-1.5 bg-[#171f33] border border-[#222a3d] px-2.5 py-1 rounded">
              <span className="material-symbols-outlined text-sm text-[#ffc174]">timer</span>
              <span>FRT Hoy: <strong className="text-[#dae2fd]">4.2 min</strong> <span className="text-[10px] text-[#d8c3ad]">(Meta &lt; 7m)</span></span>
            </div>
            <div className="flex items-center gap-1.5 bg-[#171f33] border border-[#222a3d] px-2.5 py-1 rounded">
              <span className="material-symbols-outlined text-sm text-[#ffc640]">sentiment_very_satisfied</span>
              <span>CSAT: <strong className="text-[#ffc640]">96.2%</strong> (38 consultas)</span>
            </div>
            <div className="flex items-center gap-1.5 bg-[#171f33] border border-[#222a3d] px-2.5 py-1 rounded">
              <span className="material-symbols-outlined text-sm text-[#d8c3ad]">support_agent</span>
              <span>Atención: <strong className="text-[#dae2fd]">2 activos</strong> (1 bot / 1 asesor)</span>
            </div>
          </div>
        </div>

        {/* Acciones en Cabecera */}
        <div className="flex items-center gap-2 w-full xl:w-auto flex-wrap sm:flex-nowrap">
          <button
            onClick={() => showToast('Políticas de servicio: SLA 7m para Lima Urbana, 15m para Provincias')}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-[#222a3d] hover:bg-[#31394d] text-[#dae2fd] text-xs font-semibold border border-[#222a3d]"
          >
            <span className="material-symbols-outlined text-base text-[#d8c3ad]">tune</span>
            <span>Macros & Políticas</span>
          </button>
          <button
            onClick={() => showToast('Simulador de Carga: Inyectando 50 conversaciones simultáneas')}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-[#222a3d] hover:bg-[#31394d] text-[#dae2fd] text-xs font-semibold border border-[#222a3d]"
          >
            <span className="material-symbols-outlined text-base text-[#d8c3ad]">bolt</span>
            <span>Simulador de Carga</span>
          </button>
          <button
            onClick={() => showToast('Modo Triage Asistido IA activado')}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#f59e0b] text-[#0b1326] hover:bg-[#ffc640] text-xs font-bold shadow-md transition-all"
          >
            <span className="material-symbols-outlined text-base font-bold">auto_awesome</span>
            <span>Modo Triage Asistido IA</span>
          </button>
        </div>
      </header>

      {/* FILTROS Y BÚSQUEDA OMNICANAL */}
      <section className="flex flex-col gap-3 p-4 rounded-xl bg-[#131b2e] border border-[#222a3d] shadow-sm">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
          {/* Omnisearch */}
          <div className="relative flex-1">
            <span className="material-symbols-outlined absolute left-3 top-2.5 text-[#d8c3ad] text-base">search</span>
            <input
              type="text"
              placeholder="Buscar por usuario, ID ticket, pedido Niubiz/Shopify o palabra clave (ej. demora, flores)..."
              className="w-full pl-9 pr-20 py-2 rounded-lg bg-[#060e20] border border-[#222a3d] text-xs text-[#dae2fd] focus:outline-none focus:border-[#f59e0b]"
            />
            <span className="absolute right-3 top-2 px-1.5 py-0.5 rounded bg-[#222a3d] text-[#d8c3ad] text-[10px] font-mono">
              Ctrl + K
            </span>
          </div>

          {/* Selectors */}
          <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
            <div className="flex items-center gap-1 bg-[#060e20] border border-[#222a3d] px-2.5 py-1 rounded-lg">
              <span className="material-symbols-outlined text-sm text-[#ffc640]">hub</span>
              <select
                value={networkFilter}
                onChange={(e) => setNetworkFilter(e.target.value)}
                className="bg-transparent text-[#dae2fd] text-xs focus:outline-none"
              >
                <option value="all">Todas las Redes</option>
                <option value="tiktok">TikTok Video & Live</option>
                <option value="ig">Instagram DMs & Reels</option>
                <option value="pin">Pinterest Pins</option>
              </select>
            </div>

            <div className="flex items-center gap-1 bg-[#060e20] border border-[#222a3d] px-2.5 py-1 rounded-lg">
              <span className="material-symbols-outlined text-sm text-red-400">priority_high</span>
              <select
                value={slaPriorityFilter}
                onChange={(e) => setSlaPriorityFilter(e.target.value)}
                className="bg-transparent text-[#dae2fd] text-xs focus:outline-none"
              >
                <option value="all">SLA: Todos los niveles</option>
                <option value="critica">Crítica (&lt; 10 min restantes)</option>
                <option value="alta">Alta (&lt; 30 min)</option>
                <option value="normal">Normal (Estándar SLA 2h)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Status Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {[
            { id: 'todos', label: 'Todos', count: 38 },
            { id: 'nuevos', label: 'Nuevos / Sin Asignar', count: 12, highlight: true },
            { id: 'en_proceso', label: 'En Proceso', count: 18 },
            { id: 'escalado', label: 'Escalados a Operaciones', count: 5, isError: true },
            { id: 'resueltos', label: 'Resueltos Hoy', count: 84 }
          ].map((pill) => (
            <button
              key={pill.id}
              onClick={() => setTicketFilter(pill.id)}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                ticketFilter === pill.id
                  ? pill.isError
                    ? 'bg-red-900/40 text-red-300 border border-red-500'
                    : 'bg-[#f59e0b] text-[#0b1326]'
                  : 'bg-[#171f33] border border-[#222a3d] text-[#d8c3ad] hover:text-[#dae2fd]'
              }`}
            >
              <span>{pill.label}</span>
              <span className="px-1.5 py-0.2 rounded-full bg-[#060e20] text-[10px] font-bold">
                {pill.count}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* LAYOUT DE 3 COLUMNAS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start w-full">
        {/* COLUMNA 1: COLA UNIFICADA (3 cols) */}
        <div className="lg:col-span-3 flex flex-col gap-2 bg-[#131b2e] border border-[#222a3d] p-3 rounded-xl shadow-sm">
          <div className="flex items-center justify-between px-1 py-1">
            <div className="flex items-center gap-1 text-xs font-semibold text-[#dae2fd]">
              <span className="material-symbols-outlined text-sm text-[#ffc640]">inbox</span>
              <span>Bandeja Unificada</span>
            </div>
            <span className="text-[10px] text-[#d8c3ad] font-mono">Orden: SLA Urgente</span>
          </div>

          <div className="space-y-2">
            {filteredTickets.map((t) => {
              const isSelected = activeTicketId === t.id;
              return (
                <article
                  key={t.id}
                  onClick={() => setActiveTicketId(t.id)}
                  className={`p-3 rounded-lg flex flex-col gap-2 cursor-pointer transition-all border ${
                    isSelected
                      ? 'bg-[#222a3d] border-[#f59e0b] shadow-md'
                      : 'bg-[#171f33] border-[#222a3d] hover:bg-[#222a3d]/60'
                  }`}
                >
                  <div className="flex items-start justify-between gap-1">
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <img src={t.avatar} alt={t.name} className="w-8 h-8 rounded-full object-cover" />
                        <span className="absolute -bottom-1 -right-1 px-1 rounded-full bg-[#060e20] text-[9px] font-bold text-[#ffc640]">
                          {t.channel.toUpperCase()}
                        </span>
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="font-semibold text-xs text-[#dae2fd] truncate">{t.handle}</span>
                        <span className="text-[10px] text-[#d8c3ad]">{t.channelText}</span>
                      </div>
                    </div>
                    <span
                      className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                        t.isCriticalSla
                          ? 'bg-red-500/20 text-red-400 animate-pulse'
                          : 'bg-[#2d3449] text-[#ffc640]'
                      }`}
                    >
                      {t.slaBadge}
                    </span>
                  </div>

                  <div className="flex flex-col gap-0.5">
                    <span className="font-semibold text-xs text-[#ffc174] line-clamp-1">{t.subject}</span>
                    <p className="text-[11px] text-[#d8c3ad] line-clamp-2">{t.snippet}</p>
                  </div>

                  <div className="flex items-center justify-between pt-1 border-t border-[#222a3d]/50 text-[10px]">
                    <span className={t.isCriticalSla ? 'text-red-400 font-semibold' : 'text-[#ffc640]'}>
                      {t.riskText}
                    </span>
                    <span className="text-[#d8c3ad]">{t.timeAgo}</span>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* COLUMNA 2: VISOR DE CONVERSACIÓN & COPILOTO IA (6 cols) */}
        <div className="lg:col-span-6 flex flex-col gap-4 bg-[#131b2e] border border-[#222a3d] p-4 rounded-xl shadow-sm">
          {/* Active Ticket Header */}
          <div className="flex flex-col gap-2 pb-2 bg-[#171f33] border border-[#222a3d] p-3 rounded-lg">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuA-LkZUUun3B4ti8WV_A0x6FS9kd8atPPwkX1nEiO1fMioX7jW3vyg31vAsx0-ZNvTW-844dJ76vqMrgtf70_FZmSzbHYfCQW_Oo6s64m_vtpgOHDRHLwE1I4OU3VYVOJMS3a_Cwd5wm_ZSLbVqkxSfzpvaQ4HvW_t-j8vEHZ6q2UPxRBrbsvYMTeSVGwY4hG4hRqBbxMJiH63HuvXowYjKmmOQGSq7VqJ59X5gWvIPI7qnKDAYLit75g"
                    alt="Mariana"
                    className="w-10 h-10 rounded-full object-cover ring-1 ring-[#f59e0b]"
                  />
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#ffc640]"></span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-[#dae2fd]">Mariana Rivas</span>
                    <span className="text-xs text-[#d8c3ad]">(@mariana_flores_pe)</span>
                    <span className="px-1.5 py-0.2 rounded bg-[#f59e0b]/20 text-[#ffc640] text-[10px] font-bold">
                      Cliente Gold
                    </span>
                  </div>
                  <span className="text-xs text-[#ffc640]">
                    Instagram DM vinculado al Reel: "Ramo Flores Amarillas 21 de Septiembre"
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-xs font-mono">
                <span className="px-2 py-0.5 rounded bg-red-500/20 text-red-400 font-bold">#TICK-8941</span>
                <span className="px-2 py-0.5 rounded bg-[#222a3d] text-[#d8c3ad]">Asesor: Diego V. (Ops)</span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2 pt-1 flex-wrap">
              <button
                onClick={() => showToast('Ticket transferido a Supervisor de Despacho')}
                className="px-2.5 py-1 rounded bg-[#222a3d] hover:bg-[#31394d] text-xs font-medium text-[#dae2fd] transition-colors"
              >
                Transferir Ticket
              </button>
              <button
                onClick={() => showToast('SLA en pausa por espera de confirmación de courier')}
                className="px-2.5 py-1 rounded bg-[#222a3d] hover:bg-[#31394d] text-xs font-medium text-[#ffc640] transition-colors"
              >
                Pausar SLA (Espera Courier)
              </button>
              <button
                onClick={() => showToast('Ticket #TICK-8941 marcado como resuelto')}
                className="px-3 py-1 rounded bg-[#f59e0b] hover:bg-[#ffc640] text-[#0b1326] text-xs font-bold transition-all shadow-sm"
              >
                Marcar Resuelto
              </button>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex flex-col gap-3 py-1 max-h-[340px] overflow-y-auto pr-1">
            {chatMessages.map((msg) => {
              if (msg.isPrivate) {
                return (
                  <div key={msg.id} className="p-3 rounded-xl bg-amber-950/20 border border-[#ffc640]/30 text-xs text-[#dae2fd]">
                    <div className="flex items-center justify-between text-[#ffc640] font-semibold mb-1">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">lock</span>
                        {msg.sender}
                      </span>
                      <span className="text-[10px] text-[#d8c3ad] font-mono">{msg.time}</span>
                    </div>
                    <p className="leading-relaxed">{msg.text}</p>
                  </div>
                );
              }

              return (
                <div
                  key={msg.id}
                  className={`flex flex-col gap-1 max-w-[85%] ${
                    msg.isCustomer ? 'items-start' : 'items-end self-end'
                  }`}
                >
                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-semibold text-[#dae2fd]">{msg.sender}</span>
                    {msg.sentimentBadge && (
                      <span className="px-1.5 py-0.2 rounded bg-red-500/20 text-red-400 text-[10px] font-bold">
                        {msg.sentimentBadge}
                      </span>
                    )}
                    <span className="text-[10px] text-[#d8c3ad] font-mono">{msg.time}</span>
                  </div>
                  <div
                    className={`p-3 rounded-xl text-xs leading-relaxed shadow-sm ${
                      msg.isCustomer
                        ? 'bg-[#222a3d] text-[#dae2fd] rounded-tl-none border border-[#222a3d]'
                        : 'bg-[#171f33] text-[#dae2fd] rounded-tr-none border border-[#f59e0b]/40'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Copiloto IA Sugerencia */}
          <section className="p-3.5 rounded-xl bg-[#171f33] border border-[#f59e0b]/40 flex flex-col gap-2.5 shadow-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-[#ffc640] text-xs font-bold">
                <span className="material-symbols-outlined text-base">psychology</span>
                <span>Copiloto IA Bloom • Sugerencia Contextual</span>
              </div>
              <div className="flex items-center gap-1 bg-[#060e20] p-0.5 rounded border border-[#222a3d]">
                <button
                  onClick={() => setCopilotTone('empatico')}
                  className={`px-2 py-0.5 rounded text-[10px] font-semibold transition-all ${
                    copilotTone === 'empatico'
                      ? 'bg-[#222a3d] text-[#ffc174]'
                      : 'text-[#d8c3ad] hover:text-[#dae2fd]'
                  }`}
                >
                  Empático Retail PE
                </button>
                <button
                  onClick={() => setCopilotTone('corporativo')}
                  className={`px-2 py-0.5 rounded text-[10px] font-semibold transition-all ${
                    copilotTone === 'corporativo'
                      ? 'bg-[#222a3d] text-[#ffc174]'
                      : 'text-[#d8c3ad] hover:text-[#dae2fd]'
                  }`}
                >
                  Corporativo Formal
                </button>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-[#060e20] text-xs text-[#dae2fd] leading-relaxed border border-[#222a3d]">
              {copilotSuggestions[copilotTone]}
            </div>

            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleInsertCopilot}
                  className="px-3 py-1 rounded bg-[#f59e0b] hover:bg-[#ffc640] text-[#0b1326] text-xs font-bold flex items-center gap-1 transition-all shadow-sm"
                >
                  <span className="material-symbols-outlined text-sm">send</span>
                  <span>Insertar y Enviar</span>
                </button>
                <button
                  onClick={() => setReplyMessage(copilotSuggestions[copilotTone])}
                  className="px-2.5 py-1 rounded bg-[#222a3d] text-[#dae2fd] text-xs font-semibold hover:bg-[#31394d]"
                >
                  Editar texto
                </button>
              </div>
              <button
                onClick={() => {
                  setCopilotTone((prev) => (prev === 'empatico' ? 'corporativo' : 'empatico'));
                  showToast('Variación regenerada con nuevo matiz de tono');
                }}
                className="text-[11px] text-[#ffc174] hover:underline flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-xs">autorenew</span>
                <span>Regenerar Variación</span>
              </button>
            </div>
          </section>

          {/* Reply Textarea */}
          <div className="flex flex-col gap-2 bg-[#171f33] border border-[#222a3d] p-3 rounded-xl">
            <div className="flex items-center justify-between pb-1">
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setIsReplyingNote(false)}
                  className={`px-2.5 py-0.5 rounded text-xs font-semibold transition-all ${
                    !isReplyingNote
                      ? 'bg-[#f59e0b] text-[#0b1326]'
                      : 'bg-[#060e20] text-[#d8c3ad] hover:text-[#dae2fd]'
                  }`}
                >
                  Respuesta Pública DM
                </button>
                <button
                  onClick={() => setIsReplyingNote(true)}
                  className={`px-2.5 py-0.5 rounded text-xs font-semibold transition-all ${
                    isReplyingNote
                      ? 'bg-[#ffc640] text-[#0b1326]'
                      : 'bg-[#060e20] text-[#d8c3ad] hover:text-[#dae2fd]'
                  }`}
                >
                  Nota Interna del Equipo
                </button>
              </div>

              <div className="flex items-center gap-1 text-[10px] text-[#d8c3ad] font-mono">
                <span>Atajos:</span>
                <button
                  onClick={() => setReplyMessage((prev) => `${prev} Hola Mariana, el pedido está en ruta con entrega garantizada hoy.`)}
                  className="px-1.5 py-0.5 bg-[#060e20] rounded hover:text-[#ffc174]"
                >
                  /envios
                </button>
                <button
                  onClick={() => setReplyMessage((prev) => `${prev} Te hemos activado un cupón de S/ 20 código: PERDON-20-SET.`)}
                  className="px-1.5 py-0.5 bg-[#060e20] rounded hover:text-[#ffc174]"
                >
                  /cupones
                </button>
              </div>
            </div>

            <textarea
              value={replyMessage}
              onChange={(e) => setReplyMessage(e.target.value)}
              placeholder="Escribe tu mensaje a Mariana o usa una macro... (Ctrl + Enter para enviar)"
              rows={3}
              className="w-full p-2.5 rounded-lg bg-[#060e20] border border-[#222a3d] text-xs text-[#dae2fd] focus:outline-none focus:border-[#f59e0b] resize-none"
            ></textarea>

            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-1 text-[#d8c3ad]">
                <button
                  onClick={() => showToast('Archivo adjunto seleccionado')}
                  className="p-1 hover:text-[#dae2fd]"
                  title="Adjuntar archivo"
                >
                  <span className="material-symbols-outlined text-base">attach_file</span>
                </button>
                <button
                  onClick={() => showToast('Catálogo de imágenes abierto')}
                  className="p-1 hover:text-[#dae2fd]"
                  title="Insertar imagen"
                >
                  <span className="material-symbols-outlined text-base">image</span>
                </button>
                <button
                  onClick={() => setReplyMessage((prev) => `${prev} 🌻💛✨`)}
                  className="p-1 hover:text-[#dae2fd]"
                  title="Emojis"
                >
                  <span className="material-symbols-outlined text-base">mood</span>
                </button>
              </div>

              <button
                onClick={handleSendReply}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-[#f59e0b] hover:bg-[#ffc640] text-[#0b1326] text-xs font-bold transition-all shadow-md"
              >
                <span>Enviar Respuesta</span>
                <span className="material-symbols-outlined text-sm">send</span>
              </button>
            </div>
          </div>
        </div>

        {/* COLUMNA 3: CLIENTE 360° & CONTEXTO (3 cols) */}
        <div className="lg:col-span-3 flex flex-col gap-4">
          {/* Perfil 360° */}
          <section className="flex flex-col gap-3 bg-[#131b2e] border border-[#222a3d] p-4 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-[#d8c3ad] uppercase tracking-wider font-semibold">
                Perfil del Cliente 360°
              </span>
              <span className="material-symbols-outlined text-sm text-[#ffc640]">verified</span>
            </div>

            <div className="flex items-center gap-3">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAmpQ92gCtuGKYjKJGRS1q2mz5N8eUynJelhRaf0DVIKgAShuq18YTvJfm9WZP7x7r5HOuTT3XHAMULnubmrfEtOnrVH1idQAsipMN3WlimYjLBT98O5VMJ6ZF1s9jU-wZBvxsWGDbvpaPQTO9yJZyjZ8hBYcr5CeDfo0z5MSypQ195gtdAeF9Y6r2eSn1tD62t8F5C56vWzw4WKQi6VRfc2TZN2p1I2uSgR0Izf6EAfbezVPcAsq8eMw"
                alt="Mariana"
                className="w-12 h-12 rounded-full object-cover ring-2 ring-[#ffc640]/40"
              />
              <div className="flex flex-col">
                <span className="font-bold text-sm text-[#dae2fd]">Mariana Rivas</span>
                <span className="text-xs text-[#d8c3ad]">Miraflores, Lima • Perú</span>
                <span className="text-[10px] text-[#ffc640] font-semibold mt-0.5">Tier: Gold Flower Member</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-1.5 pt-1 text-center font-metric">
              <div className="p-2 rounded bg-[#060e20] border border-[#222a3d]">
                <span className="text-[10px] text-[#d8c3ad] block font-sans">Gasto Total</span>
                <span className="text-xs font-bold text-[#ffc174]">S/ 840</span>
              </div>
              <div className="p-2 rounded bg-[#060e20] border border-[#222a3d]">
                <span className="text-[10px] text-[#d8c3ad] block font-sans">Pedidos</span>
                <span className="text-xs font-bold text-[#dae2fd]">3 ord.</span>
              </div>
              <div className="p-2 rounded bg-[#060e20] border border-[#222a3d]">
                <span className="text-[10px] text-[#d8c3ad] block font-sans">Quejas</span>
                <span className="text-xs font-bold text-red-400">1ra vez</span>
              </div>
            </div>
          </section>

          {/* Pedido Activo Shopify */}
          <section className="flex flex-col gap-2 bg-[#131b2e] border border-[#222a3d] p-4 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-[#d8c3ad] uppercase tracking-wider font-semibold">
                Pedido Activo Shopify
              </span>
              <span className="px-1.5 py-0.2 rounded bg-[#f59e0b] text-[#0b1326] text-[10px] font-bold">
                #KB-8821
              </span>
            </div>

            <div className="flex flex-col gap-1 text-xs">
              <div className="flex justify-between font-semibold text-[#dae2fd]">
                <span>Ramo Premium 36 Flores Amarillas</span>
                <span className="text-[#ffc174]">S/ 185.00</span>
              </div>
              <span className="text-[10px] text-[#d8c3ad]">+ Dedicatoria personalizada impresa</span>
              <div className="flex items-center gap-1 text-[11px] text-[#ffc640]">
                <span className="material-symbols-outlined text-xs">check</span>
                <span>Pagado vía Niubiz / Yape</span>
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-[#060e20] border border-[#222a3d] flex flex-col gap-1.5 mt-1 text-xs">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-[#d8c3ad]">Motorizado:</span>
                <span className="text-[#dae2fd] font-semibold">Edwin T. (Placa 4810-7B)</span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-[#d8c3ad]">Distancia a destino:</span>
                <span className="text-[#ffc640] font-bold">4 cuadras (~7 mins)</span>
              </div>

              <button
                onClick={() => setShowGpsModal(true)}
                className="w-full py-1.5 rounded bg-[#222a3d] hover:bg-[#31394d] text-[#dae2fd] text-xs font-semibold flex items-center justify-center gap-1 transition-colors mt-1"
              >
                <span className="material-symbols-outlined text-sm text-[#ffc640]">location_on</span>
                <span>Ver Tracking en Vivo GPS Chazki</span>
              </button>
            </div>
          </section>

          {/* Sentinel NLP Riesgo */}
          <section className="flex flex-col gap-2 bg-[#131b2e] border border-[#222a3d] p-4 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-red-400 uppercase tracking-wider font-semibold flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">radar</span>
                Sentinel NLP Riesgo
              </span>
              <span className="px-1.5 py-0.2 rounded bg-red-500/20 text-red-400 text-[10px] font-bold">
                Alto 82%
              </span>
            </div>
            <p className="text-[11px] text-[#d8c3ad]">
              Probabilidad alta de escrache en TikTok/IG si excede las 1:00 PM.
            </p>
            <div className="flex items-center gap-1.5 text-[10px] text-[#d8c3ad]">
              <span>Jerga detectada:</span>
              <span className="px-1 rounded bg-red-500/20 text-red-300 font-mono font-bold">'palta'</span>
              <span className="px-1 rounded bg-red-500/20 text-red-300 font-mono font-bold">'urgente'</span>
            </div>
          </section>

          {/* Acciones Rápidas de Compensación */}
          <section className="flex flex-col gap-2 bg-[#131b2e] border border-[#222a3d] p-4 rounded-xl shadow-sm">
            <span className="text-[10px] text-[#d8c3ad] uppercase tracking-wider font-semibold">
              Acciones de Retención
            </span>
            <button
              onClick={handleIssueCoupon}
              className="w-full py-2 rounded-lg bg-[#222a3d] hover:bg-[#31394d] text-[#ffc174] text-xs font-semibold flex items-center justify-center gap-1.5 border border-[#ffc174]/30 transition-all"
            >
              <span className="material-symbols-outlined text-sm">confirmation_number</span>
              <span>Emitir Cupón S/ 30 ("Flores Perdón")</span>
            </button>
            <button
              onClick={() => showToast('Mensaje de seguimiento despachado a +51 987 654 321 vía WhatsApp API')}
              className="w-full py-2 rounded-lg bg-[#222a3d] hover:bg-[#31394d] text-[#dae2fd] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <span className="material-symbols-outlined text-sm text-emerald-400">chat</span>
              <span>Reenviar Notificación WhatsApp</span>
            </button>
          </section>
        </div>
      </div>

      {/* GPS Tracking Modal */}
      {showGpsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-[#171f33] border border-[#222a3d] rounded-2xl p-6 shadow-2xl flex flex-col gap-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#222a3d]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#ffc640]">location_on</span>
                <h3 className="text-sm font-bold text-[#dae2fd]">Tracking Satelital en Vivo Chazki / Urbano</h3>
              </div>
              <button
                onClick={() => setShowGpsModal(false)}
                className="text-[#d8c3ad] hover:text-[#dae2fd]"
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>

            <div className="relative w-full h-48 rounded-xl bg-[#060e20] border border-[#222a3d] flex flex-col items-center justify-center p-4 text-center overflow-hidden">
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ffc640_1px,transparent_1px)] [background-size:16px_16px]"></div>
              <div className="w-12 h-12 rounded-full bg-[#f59e0b]/20 text-[#ffc640] flex items-center justify-center animate-bounce mb-2">
                <span className="material-symbols-outlined text-2xl">two_wheeler</span>
              </div>
              <span className="text-xs font-bold text-white z-10">Edwin T. • Motocicleta Honda 150</span>
              <span className="text-[11px] text-[#ffc174] z-10 font-mono">Ubicación: Av. José Pardo cdra 4, Miraflores</span>
              <span className="text-[10px] text-emerald-400 mt-1 z-10 font-bold">Llegada estimada: 12:43 PM (En horario)</span>
            </div>

            <div className="flex justify-end gap-2 pt-1">
              <button
                onClick={() => setShowGpsModal(false)}
                className="px-4 py-2 rounded-lg bg-[#f59e0b] hover:bg-[#ffc640] text-[#0b1326] text-xs font-bold"
              >
                Cerrar Mapa
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer Status Bar */}
      <footer className="flex items-center justify-between flex-wrap gap-2 p-3 rounded-lg bg-[#060e20] text-[#d8c3ad] text-[11px] border border-[#222a3d]/60">
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-1.5 text-[#ffc640]">
            <span className="w-2 h-2 rounded-full bg-[#ffc640]"></span>
            <span>WebSocket: Conectado (latencia 12ms)</span>
          </div>
          <span>|</span>
          <span>SLA Cumplimiento 24h: <strong className="text-[#dae2fd]">96.8%</strong></span>
          <span>|</span>
          <span>Tiempo Primera Respuesta (FRT): <strong className="text-[#ffc174]">4.2 min</strong></span>
          <span>|</span>
          <span>Tickets Resueltos Hoy: <strong className="text-[#dae2fd]">142</strong></span>
        </div>
        <div className="flex items-center gap-2">
          <span>Kajel Bloom Helpdesk v2.4 Pro</span>
          <span className="px-1.5 py-0.2 rounded bg-[#222a3d] text-[#ffc174] font-bold font-mono">Cluster Lima-PE</span>
        </div>
      </footer>
    </div>
  );
};
