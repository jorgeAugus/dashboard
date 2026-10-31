import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';

interface ChatMessage {
  id: number;
  sender: string;
  time: string;
  text: string;
  isBot: boolean;
  isPrivate: boolean;
  isCustomer: boolean;
  sentimentBadge?: string;
}

interface TicketItem {
  id: string;
  handle: string;
  name: string;
  avatar: string;
  channel: 'ig' | 'tiktok' | 'fb';
  channelText: string;
  slaBadge: string;
  isCriticalSla: boolean;
  subject: string;
  snippet: string;
  riskText: string;
  timeAgo: string;
  status: 'nuevos' | 'en_proceso' | 'escalado' | 'resueltos';
  tier: string;
  ticketCode: string;
  advisor: string;
  channelContext: string;
  location: string;
  totalSpent: string;
  orderCount: string;
  complaintHistory: string;
  orderCode?: string;
  orderProduct?: string;
  orderPrice?: string;
  orderExtra?: string;
  orderPayment?: string;
  hasCourier?: boolean;
  courierName?: string;
  courierVehicle?: string;
  courierLocation?: string;
  courierDistance?: string;
  courierEta?: string;
  nlpRiskLevel: string;
  nlpRiskPercent: string;
  nlpRiskSummary: string;
  nlpKeywords: string[];
  copilotSuggestions: {
    empatico: string;
    corporativo: string;
  };
}

export const InboxComunitario: React.FC = () => {
  const { showToast } = useApp();

  const [activeTicketId, setActiveTicketId] = useState('t-1');
  const [ticketFilter, setTicketFilter] = useState('todos');
  const [networkFilter, setNetworkFilter] = useState('all');
  const [slaPriorityFilter, setSlaPriorityFilter] = useState('all');
  const [searchFilter, setSearchFilter] = useState('');
  const [mobileTab, setMobileTab] = useState<'inbox' | 'conversation'>('conversation');
  const [isReplyingNote, setIsReplyingNote] = useState(false);
  const [replyMessage, setReplyMessage] = useState('');
  const [copilotTone, setCopilotTone] = useState<'empatico' | 'corporativo'>('empatico');

  const [tickets, setTickets] = useState<TicketItem[]>([
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
      advisor: 'Diego V. (Ops)',
      channelContext: 'Instagram DM vinculado al Reel: "Ramo Flores Amarillas 21 de Septiembre"',
      location: 'Miraflores, Lima • Perú',
      totalSpent: 'S/ 840',
      orderCount: '3 ord.',
      complaintHistory: '1ra vez',
      orderCode: '#KB-8821',
      orderProduct: 'Ramo Premium 36 Flores Amarillas',
      orderPrice: 'S/ 185.00',
      orderExtra: '+ Dedicatoria personalizada impresa',
      orderPayment: 'Pagado vía Niubiz / Yape',
      hasCourier: true,
      courierName: 'Edwin T. (Placa 4810-7B)',
      courierVehicle: 'Motocicleta Honda 150',
      courierLocation: 'Av. José Pardo cdra 4, Miraflores',
      courierDistance: '4 cuadras (~7 mins)',
      courierEta: '12:43 PM (En horario)',
      nlpRiskLevel: 'Alto',
      nlpRiskPercent: '82%',
      nlpRiskSummary: 'Probabilidad alta de reclamo público si el despacho pasa de la 1:00 PM.',
      nlpKeywords: ['palta', 'urgente', 'almorzar', 'courier'],
      copilotSuggestions: {
        empatico:
          '¡Hola Mariana! Te entendemos al 100%, sabemos lo especial que es esta fecha de flores amarillas. Acabamos de comunicarnos directamente con el motorizado y está a solo 4 cuadras de la oficina en Miraflores (Av. José Pardo). Llegará antes de las 12:45 PM garantizado. Para compensar la angustia, te activamos un cupón de cortesía para tu próxima compra 💛🚚',
        corporativo:
          'Estimada Mariana: Le confirmamos que su orden #KB-8821 se encuentra en fase final de entrega por nuestro servicio express. El motorizado asignado (Edwin T.) se encuentra en la intersección de Av. José Pardo, proyectando su llegada en 7 minutos. Agradecemos su paciencia.'
      }
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
      advisor: 'Bot Kajel Auto',
      channelContext: 'TikTok Comentario en video viral "POV: Empacando ramos amarillos"',
      location: 'San Borja, Lima • Perú',
      totalSpent: 'S/ 0',
      orderCount: '0 ord.',
      complaintHistory: 'Ninguna',
      orderCode: '#COT-3320',
      orderProduct: 'Ramo Primaveral Girasoles Mini',
      orderPrice: 'S/ 89.00',
      orderExtra: 'Entrega express antes de las 5:00 PM',
      orderPayment: 'Pendiente de confirmación Yape',
      hasCourier: false,
      nlpRiskLevel: 'Bajo / Venta Express',
      nlpRiskPercent: '95% intención',
      nlpRiskSummary: 'Cliente potencial con alta intención de compra inmediata si se confirma delivery.',
      nlpKeywords: ['stock', 'yape', 'hoy', 'san borja'],
      copilotSuggestions: {
        empatico:
          '¡Hola Carlos! 🌻 Sí contamos con stock listo en taller para despacho hoy mismo a San Borja. Puedes yapear al 987-654-321 (Kajel Bloom Flores) por S/ 89. Envíanos tu comprobante y dedicatoria para sacarlo en la ruta de las 2:00 PM ✨💛',
        corporativo:
          'Estimado Carlos: Confirmamos disponibilidad de stock para despacho express a San Borja con entrega garantizada antes de las 5:00 PM. Aceptamos transferencias por Yape y Plin para procesar su dedicatoria de inmediato.'
      }
    },
    {
      id: 't-3',
      handle: '@andrea_decoraciones',
      name: 'Andrea Beltrán',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBDMgTsuIkTALx2lNA14r5Qwu2A-ZTjD2ViF25nmaZo539R4Yi-VK1AmxFBqElNzzg7UzOyQ1k5cB-iidIvEkrMuYtmkhMQ35ISRVaN9d3TCfYHszTMW1QERaAGNvTqPoVAjv5Xu583cfaOaAu2hifiFKlY6LzZs_fzXKuoJCr9z_grrP51y9G4wRqkB_jU4Xgf_FYy1Jfbu-woQXBoyBCcsXanJjK-yNxsVCkcaT2sQhSYZWG0N96qzg',
      channel: 'fb',
      channelText: 'Facebook Messenger',
      slaBadge: '25m SLA',
      isCriticalSla: false,
      subject: 'Consulta sobre catálogo mayorista corporativo',
      snippet: '"Buenas tardes, requerimos 45 centros de mesa amarillos para corporativo en San Isidro..."',
      riskText: 'Lead B2B Cualificado',
      timeAgo: 'Hace 22m',
      status: 'en_proceso',
      tier: 'B2B Corporate',
      ticketCode: '#TICK-8943',
      advisor: 'Camila R.',
      channelContext: 'Facebook Messenger / Post: "Catálogo Arreglos Florales Kraft Artesanal"',
      location: 'San Isidro, Lima • Perú',
      totalSpent: 'S/ 1,450',
      orderCount: '1 ord.',
      complaintHistory: 'Ninguna',
      orderCode: '#B2B-1049',
      orderProduct: '45 Centros de Mesa Kraft Amarillos',
      orderPrice: 'S/ 1,125.00',
      orderExtra: 'Requiere Factura Electrónica RUC 20',
      orderPayment: 'Transferencia Bancaria BCP / BBVA',
      hasCourier: false,
      nlpRiskLevel: 'Comercial Positivo',
      nlpRiskPercent: '12% fricción',
      nlpRiskSummary: 'Oportunidad B2B de alto volumen para oficinas corporativas en San Isidro.',
      nlpKeywords: ['mayorista', 'factura', 'ruc20', 'san isidro'],
      copilotSuggestions: {
        empatico:
          '¡Hola Andrea! Por supuesto, te adjuntamos nuestro catálogo institucional. Emitimos Factura Electrónica y para 45 centros de mesa te aplicamos un 18% de descuento corporativo con entrega puntual en San Isidro. ¿Te lo enviamos también por WhatsApp?',
        corporativo:
          'Estimada Andrea: Adjuntamos el tarifario corporativo para eventos empresariales. Confirmamos emisión de factura electrónica (RUC 20) y tarifas preferenciales por volumen para entregas en San Isidro.'
      }
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
      advisor: 'Bot Kajel Auto',
      channelContext: 'TikTok Comentario en colaboración con @valeria.lifestyle',
      location: 'Jesús María, Lima • Perú',
      totalSpent: 'S/ 89',
      orderCount: '1 ord.',
      complaintHistory: 'Resuelta',
      orderCode: '#KB-8820',
      orderProduct: 'Mini Ramo Kraft Girasol',
      orderPrice: 'S/ 80.10',
      orderExtra: 'Cupón VALERIA_SET21 (-10% descuento)',
      orderPayment: 'Pagado vía Yape QR',
      hasCourier: true,
      courierName: 'Diego S. (Placa 2940-1C)',
      courierVehicle: 'Motocicleta Yamaha FZ',
      courierLocation: 'En taller de confección (Lince)',
      courierDistance: 'Empacando para ruta Jesús María',
      courierEta: '3:15 PM',
      nlpRiskLevel: 'Neutral / Resuelto',
      nlpRiskPercent: '5% residual',
      nlpRiskSummary: 'Fricción resuelta con éxito mediante activación inmediata del cupón.',
      nlpKeywords: ['descuento', 'gracias', 'cupón', 'funcionó'],
      copilotSuggestions: {
        empatico:
          '¡Qué alegría Lucas! Ya vemos tu pedido confirmado en el sistema. Tu ramo con lazo amarillo va a quedar hermoso y te llegará una foto antes de salir de taller 🌻🙌',
        corporativo:
          'Estimado Lucas: Confirmamos la recepción conforme de su orden en nuestra pasarela de pagos. Procederemos con la confección y despacho respectivo.'
      }
    }
  ]);

  // Mensajes por conversación individual
  const [conversations, setConversations] = useState<Record<string, ChatMessage[]>>({
    't-1': [
      {
        id: 101,
        sender: 'Mariana Rivas',
        time: '11:42 AM',
        text: 'Hola chicos, hice el pedido #KB-8821 a las 8am para que llegue al mediodía a Miraflores por el 21 de septiembre. Mi flaca sale a la 1pm de su oficina. ¿Me confirman si el motorizado ya está cerca?',
        isBot: false,
        isPrivate: false,
        isCustomer: true
      },
      {
        id: 102,
        sender: 'Bot Kajel Dispatch',
        time: '11:43 AM',
        text: 'Hola Mariana 🌼 Consultando con el tracking de Chazki/Urbano Express... El courier reporta tráfico denso en Av. Javier Prado, pero tu ruta continúa activa con prioridad de entrega.',
        isBot: true,
        isPrivate: false,
        isCustomer: false
      },
      {
        id: 103,
        sender: 'Mariana Rivas',
        time: '11:51 AM',
        text: 'Pucha qué palta, si no llega antes de la 1pm ya no sirve porque ella se va a almorzar afuera. ¿Me pueden dar solución urgente? 😔',
        isBot: false,
        isPrivate: false,
        isCustomer: true,
        sentimentBadge: 'Tono: Frustrado'
      },
      {
        id: 104,
        sender: 'Nota Privada Interna (Diego V. - Lead Ops)',
        time: '11:53 AM',
        text: 'Contacté al supervisor de despacho. El motorizado Edwin está a 4 cuadras (Av. José Pardo). Si pasa de la 1:00pm aplicamos el cupón de compensación S/ 30 según protocolo "Flores Perdón".',
        isBot: false,
        isPrivate: true,
        isCustomer: false
      }
    ],
    't-2': [
      {
        id: 201,
        sender: 'Carlos Mendoza',
        time: '12:02 PM',
        text: 'Broder, vi el video del ramo de girasoles en TikTok, me confirman si tienen stock para enviar hoy mismo a San Borja antes de las 5pm?',
        isBot: false,
        isPrivate: false,
        isCustomer: true
      },
      {
        id: 202,
        sender: 'Bot Kajel Auto',
        time: '12:03 PM',
        text: '¡Hola Carlos! 🌻 Sí contamos con ramos primaverales listos para despacho express a San Borja hoy 21 de Septiembre.',
        isBot: true,
        isPrivate: false,
        isCustomer: false
      },
      {
        id: 203,
        sender: 'Carlos Mendoza',
        time: '12:05 PM',
        text: '¡Bacán! ¿Aceptan Yape o Plin directo para pagarlo ya mismo y asegurar la dedicatoria personalizada?',
        isBot: false,
        isPrivate: false,
        isCustomer: true,
        sentimentBadge: 'Intención Alta'
      },
      {
        id: 204,
        sender: 'Nota Privada Interna',
        time: '12:06 PM',
        text: 'Prospecto caliente detectado. Taller 2 tiene 3 ramos listos para entrega inmediata.',
        isBot: false,
        isPrivate: true,
        isCustomer: false
      }
    ],
    't-3': [
      {
        id: 301,
        sender: 'Andrea Beltrán',
        time: '11:20 AM',
        text: 'Buenas tardes, requerimos cotizar 45 centros de mesa amarillos con envoltura Kraft para un evento corporativo en San Isidro. ¿Manejan precio institucional?',
        isBot: false,
        isPrivate: false,
        isCustomer: true
      },
      {
        id: 302,
        sender: 'Camila R.',
        time: '11:28 AM',
        text: 'Buenas tardes Andrea, un gusto saludarte. Sí contamos con paquetes corporativos y dedicatorias con logo empresarial para empresas en San Isidro.',
        isBot: false,
        isPrivate: false,
        isCustomer: false
      },
      {
        id: 303,
        sender: 'Andrea Beltrán',
        time: '11:34 AM',
        text: '¿Me podrías enviar el catálogo corporativo en PDF y si emiten factura electrónica con RUC 20 para emitir la orden?',
        isBot: false,
        isPrivate: false,
        isCustomer: true,
        sentimentBadge: 'Lead B2B'
      }
    ],
    't-4': [
      {
        id: 401,
        sender: 'Lucas Vargas',
        time: '10:45 AM',
        text: 'Hola, estoy intentando comprar el Ramo Kraft con el cupón VALERIA_SET21 del video pero me sale "código inválido". ¿Me pueden ayudar?',
        isBot: false,
        isPrivate: false,
        isCustomer: true
      },
      {
        id: 402,
        sender: 'Bot Kajel Auto',
        time: '10:46 AM',
        text: 'Hola Lucas 🌼 Validando el cupón con la campaña de Valeria Morales... ¡Listo! Hemos reactivado la validez del 10% en el checkout para tu pedido.',
        isBot: true,
        isPrivate: false,
        isCustomer: false
      },
      {
        id: 403,
        sender: 'Lucas Vargas',
        time: '10:50 AM',
        text: '¡Excelente servicio! Ya me dejó pagar con Yape. Muchas gracias por la solución tan rápida 🙌💛',
        isBot: false,
        isPrivate: false,
        isCustomer: true,
        sentimentBadge: 'Satisfecho 100%'
      },
      {
        id: 404,
        sender: 'Nota Privada Interna',
        time: '10:52 AM',
        text: 'Ticket resuelto automáticamente con macro #DESCUENTO-INFLUENCER.',
        isBot: false,
        isPrivate: true,
        isCustomer: false
      }
    ]
  });

  const activeTicket = tickets.find((t) => t.id === activeTicketId) || tickets[0];
  const activeMessages = conversations[activeTicket.id] || [];

  const handleSelectTicket = (id: string) => {
    setActiveTicketId(id);
    setMobileTab('conversation');
    const selected = tickets.find((t) => t.id === id);
    if (selected) {
      showToast(`Conversación con ${selected.name} seleccionada`);
    }
  };

  const handleSendReply = () => {
    if (!replyMessage.trim()) return;
    const newMsg: ChatMessage = {
      id: Date.now(),
      sender: isReplyingNote ? 'Nota Interna (Tú)' : 'Kajel Support Team',
      time: new Date().toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' }),
      text: replyMessage,
      isBot: false,
      isPrivate: isReplyingNote,
      isCustomer: false
    };

    setConversations((prev) => ({
      ...prev,
      [activeTicket.id]: [...(prev[activeTicket.id] || []), newMsg]
    }));

    setReplyMessage('');
    showToast(isReplyingNote ? 'Nota interna guardada' : `Respuesta enviada a ${activeTicket.handle}`);
  };

  const handleInsertCopilot = () => {
    const suggestion = activeTicket.copilotSuggestions[copilotTone];
    setReplyMessage(suggestion);
    showToast('Sugerencia del copiloto insertada en el campo de respuesta');
  };

  const handleMarkResolved = () => {
    setTickets((prev) =>
      prev.map((t) => (t.id === activeTicket.id ? { ...t, status: 'resueltos', slaBadge: 'Resuelto' } : t))
    );

    const resolutionNote: ChatMessage = {
      id: Date.now(),
      sender: 'Sistema Kajel (Resolución)',
      time: new Date().toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' }),
      text: `Ticket #${activeTicket.ticketCode} marcado como RESUELTO por el operador.`,
      isBot: true,
      isPrivate: true,
      isCustomer: false
    };

    setConversations((prev) => ({
      ...prev,
      [activeTicket.id]: [...(prev[activeTicket.id] || []), resolutionNote]
    }));

    showToast(`Ticket #${activeTicket.ticketCode} marcado como resuelto`);
  };

  const filteredTickets = tickets.filter((t) => {
    if (ticketFilter === 'nuevos' && t.status !== 'nuevos') return false;
    if (ticketFilter === 'en_proceso' && t.status !== 'en_proceso') return false;
    if (ticketFilter === 'escalado' && t.status !== 'escalado') return false;
    if (ticketFilter === 'resueltos' && t.status !== 'resueltos') return false;
    if (networkFilter !== 'all' && t.channel !== networkFilter) return false;
    if (slaPriorityFilter === 'critica' && !t.isCriticalSla) return false;
    if (searchFilter) {
      const q = searchFilter.toLowerCase();
      return (
        t.name.toLowerCase().includes(q) ||
        t.handle.toLowerCase().includes(q) ||
        t.subject.toLowerCase().includes(q) ||
        t.ticketCode.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="flex flex-col w-full gap-5">
      {/* HEADER DEL MÓDULO & TELEMETRÍA */}
      <header className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-4 p-5 rounded-xl bg-[#131b2e] border border-[#222a3d] shadow-sm">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2 py-0.5 rounded bg-[#f59e0b] text-[#0b1326] text-[10px] tracking-wider uppercase font-bold font-mono">
              MÓDULO 05 • OMNI-SUPPORT
            </span>
            <span className="flex items-center gap-1.5 text-[11px] text-[#ffc640] font-mono">
              <span className="w-2 h-2 rounded-full bg-[#ffc640] animate-pulse"></span>
              LIVE WEBSOCKET SYNC
            </span>
            <span className="text-[#a08e7a] text-xs hidden md:inline">|</span>
            <span className="text-xs text-[#d8c3ad]">BANDEJA MULTICANAL TIKTOK, IG & FACEBOOK</span>
          </div>

          <h1 className="text-xl sm:text-2xl font-bold text-[#dae2fd] tracking-tight">
            Bandeja Comunitaria & Helpdesk Omnicanal
          </h1>

          {/* Telemetría en Vivo */}
          <div className="flex items-center gap-3 flex-wrap pt-1 text-xs text-[#d8c3ad]">
            <div className="flex items-center gap-1.5 bg-[#171f33] border border-[#222a3d] px-2.5 py-1 rounded">
              <span className="material-symbols-outlined text-sm text-[#ffc640]">timer</span>
              <span>FRT Hoy: <strong className="text-[#dae2fd]">4.2 min</strong></span>
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
            onClick={() => showToast('Políticas de servicio: SLA 7m para Lima Urbana')}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-[#222a3d] hover:bg-[#31394d] text-[#dae2fd] text-xs font-semibold border border-[#222a3d]"
          >
            <span className="material-symbols-outlined text-base text-[#d8c3ad]">tune</span>
            <span>Macros & SLA</span>
          </button>
          <button
            onClick={() => showToast('Modo Triage Asistido IA activado para respuestas rápidas')}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#f59e0b] text-[#0b1326] hover:bg-[#ffc640] text-xs font-bold shadow-md transition-all"
          >
            <span className="material-symbols-outlined text-base font-bold">auto_awesome</span>
            <span>Triage Asistido IA</span>
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
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Buscar por cliente, @usuario, ID ticket (#TICK) o palabra clave..."
              className="w-full pl-9 pr-20 py-2 rounded-lg bg-[#060e20] border border-[#222a3d] text-xs text-[#dae2fd] focus:outline-none focus:border-[#f59e0b]"
            />
            {searchFilter && (
              <button
                onClick={() => setSearchFilter('')}
                className="absolute right-3 top-2 text-xs text-[#d8c3ad] hover:text-white"
              >
                Limpiar
              </button>
            )}
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
                <option value="fb">Facebook Messenger & Posts</option>
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
              </select>
            </div>
          </div>
        </div>

        {/* Status Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {[
            { id: 'todos', label: 'Todos', count: tickets.length },
            { id: 'escalado', label: 'Urgente / Escalados', count: tickets.filter((t) => t.status === 'escalado').length, isError: true },
            { id: 'nuevos', label: 'Nuevos / Prospectos', count: tickets.filter((t) => t.status === 'nuevos').length },
            { id: 'en_proceso', label: 'En Proceso', count: tickets.filter((t) => t.status === 'en_proceso').length },
            { id: 'resueltos', label: 'Resueltos', count: tickets.filter((t) => t.status === 'resueltos').length }
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

      {/* MOBILE / TABLET NAVIGATION TABS (visible only on small screens) */}
      <div className="flex lg:hidden items-center p-1 rounded-xl bg-[#131b2e] border border-[#222a3d]">
        <button
          onClick={() => setMobileTab('inbox')}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all ${
            mobileTab === 'inbox' ? 'bg-[#f59e0b] text-[#0b1326] shadow' : 'text-[#d8c3ad] hover:text-[#dae2fd]'
          }`}
        >
          <span className="material-symbols-outlined text-sm">inbox</span>
          <span>Bandeja ({filteredTickets.length})</span>
        </button>
        <button
          onClick={() => setMobileTab('conversation')}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all ${
            mobileTab === 'conversation' ? 'bg-[#f59e0b] text-[#0b1326] shadow' : 'text-[#d8c3ad] hover:text-[#dae2fd]'
          }`}
        >
          <span className="material-symbols-outlined text-sm">chat</span>
          <span className="truncate">Chat: {activeTicket.name.split(' ')[0]}</span>
        </button>
      </div>

      {/* LAYOUT DE 2 COLUMNAS: BANDEJA Y CHAT EXTENDIDO */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start w-full">
        {/* COLUMNA 1: BANDEJA DE CONVERSACIONES (4 cols) */}
        <div
          className={`${
            mobileTab === 'inbox' ? 'flex' : 'hidden lg:flex'
          } lg:col-span-4 flex-col gap-2 bg-[#131b2e] border border-[#222a3d] p-3 rounded-xl shadow-sm`}
        >
          <div className="flex items-center justify-between px-1 py-1">
            <div className="flex items-center gap-1 text-xs font-semibold text-[#dae2fd]">
              <span className="material-symbols-outlined text-sm text-[#ffc640]">inbox</span>
              <span>Bandeja Comunitaria</span>
            </div>
            <span className="text-[10px] text-[#ffc174] font-mono font-semibold">
              {filteredTickets.length} activas
            </span>
          </div>

          <div className="space-y-2">
            {filteredTickets.length === 0 ? (
              <div className="p-6 text-center text-xs text-[#8e98b0] bg-[#171f33] rounded-lg">
                No hay conversaciones con los filtros seleccionados.
              </div>
            ) : (
              filteredTickets.map((t) => {
                const isSelected = activeTicketId === t.id;
                return (
                  <article
                    key={t.id}
                    onClick={() => handleSelectTicket(t.id)}
                    className={`p-3 rounded-lg flex flex-col gap-2 cursor-pointer transition-all border ${
                      isSelected
                        ? 'bg-[#222a3d] border-[#f59e0b] shadow-md ring-1 ring-[#f59e0b]/50'
                        : 'bg-[#171f33] border-[#222a3d] hover:bg-[#222a3d]/60 hover:border-[#2d3449]'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-1">
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="relative shrink-0">
                          <img src={t.avatar} alt={t.name} className="w-8 h-8 rounded-full object-cover" />
                          <span className="absolute -bottom-1 -right-1 px-1 rounded-full bg-[#060e20] text-[9px] font-bold text-[#ffc640]">
                            {t.channel.toUpperCase()}
                          </span>
                        </div>
                        <div className="flex flex-col min-w-0">
                          <div className="flex items-center gap-1">
                            <span className="font-semibold text-xs text-[#dae2fd] truncate">{t.name}</span>
                            {isSelected && (
                              <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b] animate-ping"></span>
                            )}
                          </div>
                          <span className="text-[10px] text-[#d8c3ad] truncate">{t.handle} · {t.channelText}</span>
                        </div>
                      </div>
                      <span
                        className={`px-1.5 py-0.5 rounded text-[10px] font-bold shrink-0 ${
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
                      <span className="text-[#d8c3ad] font-mono">{t.timeAgo}</span>
                    </div>
                  </article>
                );
              })
            )}
          </div>
        </div>

        {/* COLUMNA 2: VISOR DE CONVERSACIÓN & COPILOTO IA (8 cols) */}
        <div
          className={`${
            mobileTab === 'conversation' ? 'flex' : 'hidden lg:flex'
          } lg:col-span-8 flex-col gap-4 bg-[#131b2e] border border-[#222a3d] p-4 rounded-xl shadow-sm`}
        >
          {/* Mobile Back Button */}
          <div className="flex lg:hidden items-center pb-1 border-b border-[#222a3d]">
            <button
              onClick={() => setMobileTab('inbox')}
              className="flex items-center gap-1 text-xs text-[#ffc640] font-semibold"
            >
              <span className="material-symbols-outlined text-base">arrow_back</span>
              <span>Volver a la bandeja</span>
            </button>
          </div>

          {/* Active Ticket Dynamic Header */}
          <div className="flex flex-col gap-2 pb-2 bg-[#171f33] border border-[#222a3d] p-3 rounded-lg">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <img
                    src={activeTicket.avatar}
                    alt={activeTicket.name}
                    className="w-10 h-10 rounded-full object-cover ring-1 ring-[#f59e0b]"
                  />
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#ffc640]"></span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-[#dae2fd]">{activeTicket.name}</span>
                    <span className="text-xs text-[#d8c3ad]">({activeTicket.handle})</span>
                    <span className="px-1.5 py-0.2 rounded bg-[#f59e0b]/20 text-[#ffc640] text-[10px] font-bold">
                      {activeTicket.tier}
                    </span>
                  </div>
                  <span className="text-xs text-[#ffc640] block line-clamp-1">
                    {activeTicket.channelContext}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-xs font-mono">
                <span
                  className={`px-2 py-0.5 rounded font-bold ${
                    activeTicket.isCriticalSla ? 'bg-red-500/20 text-red-400' : 'bg-[#222a3d] text-[#ffc640]'
                  }`}
                >
                  {activeTicket.ticketCode}
                </span>
                <span className="px-2 py-0.5 rounded bg-[#222a3d] text-[#d8c3ad]">
                  Asesor: {activeTicket.advisor}
                </span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2 pt-1 flex-wrap">
              <button
                onClick={() => showToast(`Ticket transferido a Supervisor de Operaciones para ${activeTicket.name}`)}
                className="px-2.5 py-1 rounded bg-[#222a3d] hover:bg-[#31394d] text-xs font-medium text-[#dae2fd] transition-colors"
              >
                Transferir Ticket
              </button>
              <button
                onClick={() => showToast('SLA en pausa por espera de confirmación de courier')}
                className="px-2.5 py-1 rounded bg-[#222a3d] hover:bg-[#31394d] text-xs font-medium text-[#ffc640] transition-colors"
              >
                Pausar SLA
              </button>
              <button
                onClick={handleMarkResolved}
                className="px-3 py-1 rounded bg-[#f59e0b] hover:bg-[#ffc640] text-[#0b1326] text-xs font-bold transition-all shadow-sm"
              >
                Marcar Resuelto
              </button>
            </div>
          </div>

          {/* Dynamic Chat Messages */}
          <div className="flex flex-col gap-3 py-1 max-h-[360px] min-h-[220px] overflow-y-auto pr-1">
            {activeMessages.map((msg) => {
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

          {/* Copiloto IA Sugerencia Reactivo al Ticket */}
          <section className="p-3.5 rounded-xl bg-[#171f33] border border-[#f59e0b]/40 flex flex-col gap-2.5 shadow-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-[#ffc640] text-xs font-bold">
                <span className="material-symbols-outlined text-base">psychology</span>
                <span>Copiloto IA Bloom • Sugerencia para {activeTicket.name.split(' ')[0]}</span>
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
              {activeTicket.copilotSuggestions[copilotTone]}
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
                  onClick={() => setReplyMessage(activeTicket.copilotSuggestions[copilotTone])}
                  className="px-2.5 py-1 rounded bg-[#222a3d] text-[#dae2fd] text-xs font-semibold hover:bg-[#31394d]"
                >
                  Copiar al editor
                </button>
              </div>
              <button
                onClick={() => {
                  setCopilotTone((prev) => (prev === 'empatico' ? 'corporativo' : 'empatico'));
                  showToast('Tono de sugerencia alternado');
                }}
                className="text-[11px] text-[#ffc174] hover:underline flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-xs">autorenew</span>
                <span>Cambiar Tono</span>
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
                  Respuesta Pública {activeTicket.channelText}
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
                  onClick={() =>
                    setReplyMessage(
                      (prev) =>
                        `${prev} Hola ${activeTicket.name.split(' ')[0]}, confirmamos que tu solicitud de flores está siendo atendida de inmediato.`
                    )
                  }
                  className="px-1.5 py-0.5 bg-[#060e20] rounded hover:text-[#ffc174]"
                >
                  /saludo
                </button>
                <button
                  onClick={() =>
                    setReplyMessage(
                      (prev) => `${prev} Te hemos activado un cupón de cortesía código: FLORES-PERDON.`
                    )
                  }
                  className="px-1.5 py-0.5 bg-[#060e20] rounded hover:text-[#ffc174]"
                >
                  /cupones
                </button>
              </div>
            </div>

            <textarea
              value={replyMessage}
              onChange={(e) => setReplyMessage(e.target.value)}
              placeholder={`Escribe tu mensaje a ${activeTicket.name} o usa una macro...`}
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
      </div>

      {/* Footer Status Bar */}
      <footer className="flex items-center justify-between flex-wrap gap-2 p-3 rounded-lg bg-[#060e20] text-[#d8c3ad] text-[11px] border border-[#222a3d]/60">
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-1.5 text-[#ffc640]">
            <span className="w-2 h-2 rounded-full bg-[#ffc640]"></span>
            <span>WebSocket: Conectado</span>
          </div>
          <span>|</span>
          <span>SLA Cumplimiento 24h: <strong className="text-[#dae2fd]">96.8%</strong></span>
          <span>|</span>
          <span>Tiempo Primera Respuesta (FRT): <strong className="text-[#ffc174]">4.2 min</strong></span>
          <span>|</span>
          <span>Ticket en vista: <strong className="text-[#dae2fd]">{activeTicket.ticketCode} ({activeTicket.name})</strong></span>
        </div>
        <div className="flex items-center gap-2">
          <span>Kajel Bloom Helpdesk v2.4</span>
          <span className="px-1.5 py-0.2 rounded bg-[#222a3d] text-[#ffc174] font-bold font-mono">Lima-PE</span>
        </div>
      </footer>
    </div>
  );
};
