import React, { useState, useEffect } from 'react';
import { useApp } from '../../../context/AppContext';

export const ConfiguracionApis: React.FC = () => {
  const { showToast } = useApp();

  const [allRevealed, setAllRevealed] = useState(false);
  const [streamPaused, setStreamPaused] = useState(false);
  const [filterCode, setFilterCode] = useState<'all' | '2xx' | '4xx'>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const secretsData = [
    {
      id: 'TIKTOK_CLIENT_SECRET_PROD',
      type: 'OAuth Client Secret',
      crypto: 'AES-256-GCM (HMAC)',
      rotation: '14 Mar 2026, 04:12 PET',
      masked: '••••••••••••••••3F9A',
      raw: 'tk_sec_live_9038af81e7d9c0b24e'
    },
    {
      id: 'META_APP_SECRET_AES',
      type: 'App Proof Signature Secret',
      crypto: 'AES-256-GCM (HMAC)',
      rotation: '01 Mar 2026, 00:00 PET',
      masked: '••••••••••••••••88B1',
      raw: 'meta_app_sec_48a1290bb34e819cd'
    },
    {
      id: 'REDIS_CACHE_AUTH_KEY',
      type: 'Internal Redis Cluster Auth',
      crypto: 'Argon2id Hash',
      rotation: '10 Feb 2026, 12:30 PET',
      masked: '••••••••••••••••91C0',
      raw: 'red_auth_77a98210feeb3120aa'
    },
    {
      id: 'OPENAI_NLP_WORKER_KEY',
      type: 'Bearer Token (Sentiment IA)',
      crypto: 'AES-256-GCM (HMAC)',
      rotation: '18 Mar 2026, 09:15 PET',
      masked: '••••••••••••••••7F22',
      raw: 'sk-live-kajel-nlp-worker-99321'
    }
  ];

  const [logs, setLogs] = useState([
    {
      code: '200 OK',
      statusClass: 'text-emerald-400',
      time: '14:32:01.402',
      method: 'POST',
      endpoint: '/webhooks/meta-graph',
      detail: 'Event: instagram_comment_create (User: @mariana_flores_pe)',
      latency: '180ms [ACK]'
    },
    {
      code: '200 OK',
      statusClass: 'text-emerald-400',
      time: '14:31:45.110',
      method: 'POST',
      endpoint: '/webhooks/tiktok',
      detail: 'Event: video_transcode_ready (Post: #KB-2026-03-JUE19)',
      latency: '410ms [ACK]'
    },
    {
      code: '200 OK',
      statusClass: 'text-[#1877F2]',
      time: '14:30:10.892',
      method: 'GET',
      endpoint: '/api/v20.0/facebook/catalogs/sync',
      detail: '248 items actualizados en Catálogo Meta / Facebook Tienda',
      latency: '520ms [DONE]'
    },
    {
      code: '200 OK',
      statusClass: 'text-emerald-400',
      time: '14:28:55.004',
      method: 'POST',
      endpoint: '/webhooks/shopify',
      detail: 'Order #KB-8821 paid S/ 185.00 via Niubiz Yape QR (Flores Amarillas)',
      latency: '95ms [SYNC]'
    },
    {
      code: '200 OK',
      statusClass: 'text-[#dae2fd]',
      time: '14:27:12.190',
      method: 'POST',
      endpoint: '/webhooks/meta-graph',
      detail: 'Event: instagram_story_insights (Story ID: 1802910283)',
      latency: '220ms [ACK]'
    }
  ]);

  useEffect(() => {
    if (streamPaused) return;

    const interval = setInterval(() => {
      const now = new Date();
      const timeStr = now.toTimeString().split(' ')[0] + '.' + String(now.getMilliseconds()).padStart(3, '0');
      const endpoints = [
        { method: 'POST', endpoint: '/webhooks/tiktok', detail: 'Event: video_engagement_metric (Views +1,420)' },
        { method: 'POST', endpoint: '/webhooks/shopify', detail: 'Order #KB-8824 paid S/ 210.00 via Niubiz' },
        { method: 'POST', endpoint: '/webhooks/meta-graph', detail: 'Event: direct_message_received (@diego_lima_trends)' }
      ];
      const selected = endpoints[Math.floor(Math.random() * endpoints.length)];

      setLogs((prev) => [
        {
          code: '200 OK',
          statusClass: 'text-emerald-400',
          time: timeStr,
          method: selected.method,
          endpoint: selected.endpoint,
          detail: selected.detail,
          latency: `${Math.floor(Math.random() * 150 + 60)}ms [ACK]`
        },
        ...prev.slice(0, 7)
      ]);
    }, 4500);

    return () => clearInterval(interval);
  }, [streamPaused]);

  const handleCopySecret = (id: string, text: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
    }
    setCopiedId(id);
    showToast(`Secreto ${id} copiado al portapapeles`);
    setTimeout(() => setCopiedId(null), 1800);
  };

  const handleRotateKey = (id: string) => {
    showToast(`Llave ${id} rotada en Vault HSM. Nuevo checksum generado.`);
  };

  const handlePingWebhooks = () => {
    showToast('Ping enviado a todos los Webhook Ingress: Latencia media 312ms [OK]');
  };

  const handleDownloadLogs = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(logs, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', 'Kajel_Bloom_Webhooks_Telemetry.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Registro de telemetría exportado en JSON');
  };

  return (
    <div className="flex flex-col w-full gap-6">
      {/* Sub-header / Technical Governance Hero */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 bg-[#131b2e] border border-[#222a3d] p-5 rounded-xl shadow-md">
        <div className="flex flex-col gap-1 max-w-4xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-1 rounded bg-[#222a3d] text-[#ffc174] text-[10px] font-mono uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
              <span className="material-symbols-outlined text-sm">security</span>
              Sección Técnica & Gobernanza • Arquitectura de Integraciones v2.4
            </span>
            <span className="px-2.5 py-1 rounded-full bg-[#ffc640]/10 text-[#ffc640] text-[10px] font-semibold flex items-center gap-1.5 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#ffc640] animate-pulse"></span>
              Sistema Operativo: 100% Sincronizado
            </span>
            <span className="px-2 py-0.5 rounded bg-[#171f33] text-[#d8c3ad] text-[10px] font-mono border border-[#222a3d]">
              TLS 1.3 / mTLS Enforced
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-[#dae2fd] tracking-tight mt-1">
            Conexión de APIs Oficiales & Gobernanza de Credenciales
          </h1>
          <p className="text-xs sm:text-sm text-[#d8c3ad] leading-relaxed">
            Gestión centralizada de credenciales OAuth 2.0 PKCE, tokens cifrados AES-256-GCM en PostgreSQL Vault, suscripción de Webhooks en tiempo real y cuotas de consumo por plataforma para Retail Perú 2026.
          </p>
        </div>

        {/* Quick Action Toolbar */}
        <div className="flex flex-wrap items-center gap-2 self-start xl:self-center">
          <button
            onClick={handlePingWebhooks}
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-lg bg-[#222a3d] text-[#dae2fd] hover:bg-[#31394d] transition-colors text-xs font-semibold shadow-sm border border-[#222a3d]"
          >
            <span className="material-symbols-outlined text-base text-[#ffc174]">cell_tower</span>
            <span>Probar Salud (Ping)</span>
          </button>
          <button
            onClick={() => showToast('Iniciando proceso de rotación automática de llaves')}
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-lg bg-[#222a3d] text-[#dae2fd] hover:bg-[#31394d] transition-colors text-xs font-semibold shadow-sm border border-[#222a3d]"
          >
            <span className="material-symbols-outlined text-base text-[#ffc640]">sync_lock</span>
            <span>Regenerar Secret Keys</span>
          </button>
          <button
            onClick={() => showToast('Asistente de conexión OAuth 2.0 PKCE abierto')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#f59e0b] text-[#0b1326] text-xs font-bold hover:bg-[#ffc640] transition-all shadow-md"
          >
            <span className="material-symbols-outlined text-base font-bold">add_link</span>
            <span>+ Conectar Nueva Red</span>
          </button>
        </div>
      </div>

      {/* Telemetry Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1 */}
        <div className="flex flex-col justify-between p-4 bg-[#131b2e] border border-[#222a3d] rounded-xl shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#d8c3ad]">Cuota Mensual Consumida</span>
            <span className="px-2 py-0.5 rounded bg-[#171f33] text-[#ffc174] text-[10px] font-mono">Global Gateway</span>
          </div>
          <div className="flex items-baseline gap-2 my-1">
            <span className="text-2xl font-extrabold text-[#dae2fd] font-metric">84.2%</span>
            <span className="text-xs text-[#d8c3ad] font-mono">1.68M / 2.00M req</span>
          </div>
          <div className="flex flex-col gap-1.5 mt-2">
            <div className="w-full bg-[#2d3449] rounded-full h-1.5 overflow-hidden">
              <div className="bg-[#f59e0b] h-1.5 rounded-full" style={{ width: '84.2%' }}></div>
            </div>
            <div className="flex justify-between text-[10px] text-[#d8c3ad] font-mono">
              <span>Reserva: 316,000 req</span>
              <span className="text-[#ffc640]">Reinicio en 12d</span>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="flex flex-col justify-between p-4 bg-[#131b2e] border border-[#222a3d] rounded-xl shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#d8c3ad]">Latencia Media Webhooks</span>
            <span className="flex items-center gap-1 text-[#ffc640] text-[10px] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ffc640]"></span> Óptimo
            </span>
          </div>
          <div className="flex items-baseline gap-2 my-1">
            <span className="text-2xl font-extrabold text-[#dae2fd] font-metric">312<span className="text-xs text-[#d8c3ad] ml-1">ms</span></span>
            <span className="text-xs text-emerald-400 font-mono">-14ms vs ayer</span>
          </div>
          <div className="flex items-center justify-between pt-1 text-[10px] text-[#d8c3ad]">
            <span>SLA estricto &lt; 800ms</span>
            <span className="text-emerald-400 font-semibold">Saludable</span>
          </div>
        </div>

        {/* Card 3 */}
        <div className="flex flex-col justify-between p-4 bg-[#131b2e] border border-[#222a3d] rounded-xl shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#d8c3ad]">Tokens Activos Cifrados</span>
            <span className="material-symbols-outlined text-base text-[#ffc174]">verified_user</span>
          </div>
          <div className="flex items-baseline gap-2 my-1">
            <span className="text-2xl font-extrabold text-[#dae2fd] font-metric">6 <span className="text-xs text-[#d8c3ad]">Cuentas</span></span>
            <span className="text-xs text-emerald-400 font-mono">0 revocados</span>
          </div>
          <div className="flex items-center justify-between text-[10px] text-[#d8c3ad] pt-1 font-mono">
            <span>AES-256-GCM Vault</span>
            <span className="text-[#dae2fd]">KMS Activo</span>
          </div>
        </div>

        {/* Card 4 */}
        <div className="flex flex-col justify-between p-4 bg-[#131b2e] border border-[#222a3d] rounded-xl shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#d8c3ad]">Worker Pool BullMQ</span>
            <span className="px-2 py-0.5 rounded bg-[#171f33] text-[#ffc640] text-[10px] font-mono">Redis Clúster</span>
          </div>
          <div className="flex items-baseline gap-2 my-1">
            <span className="text-2xl font-extrabold text-[#dae2fd] font-metric">12 <span className="text-xs text-[#d8c3ad]">Workers</span></span>
            <span className="text-xs text-emerald-400 font-mono">0 Fallos / 100%</span>
          </div>
          <div className="flex items-center justify-between text-[10px] text-[#d8c3ad] pt-1 font-mono">
            <span>Throughput: 840 ops/s</span>
            <span className="text-[#ffc640]">0 en cola</span>
          </div>
        </div>
      </div>

      {/* Main Connectors Grid */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#ffc174] text-xl">hub</span>
            <h2 className="text-base font-bold text-[#dae2fd]">Conectores de Redes & Pasarelas Activas</h2>
            <span className="px-2 py-0.5 rounded bg-[#222a3d] text-[#d8c3ad] text-[10px] font-mono">4 Canales Sincronizados</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-[#d8c3ad]">
            <span className="material-symbols-outlined text-sm text-[#ffc640]">autorenew</span>
            <span>Polling de estado cada 30 segundos</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Card 1: TikTok */}
          <div className="flex flex-col justify-between p-5 bg-[#131b2e] border border-[#222a3d] rounded-xl shadow-md">
            <div className="flex flex-col gap-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#222a3d] flex items-center justify-center text-white font-bold text-lg">
                    TT
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-sm text-[#dae2fd]">TikTok for Business & Creator API</h3>
                      <span className="px-2 py-0.5 rounded bg-[#2d3449] text-[#ffc640] text-[10px] font-mono">v1.3 Display</span>
                    </div>
                    <span className="text-xs text-[#d8c3ad] font-mono">Client ID: tk_prod_peru_retail_99182</span>
                  </div>
                </div>
                <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#171f33] text-[#ffc640] text-[10px] font-semibold">
                  <span className="w-2 h-2 rounded-full bg-[#ffc640] animate-pulse"></span> Conectado
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 bg-[#171f33] p-3 rounded-lg border border-[#222a3d]/60 text-xs">
                <div>
                  <span className="text-[10px] text-[#d8c3ad] uppercase font-semibold">Protocolo & Vencimiento</span>
                  <p className="text-[#dae2fd] font-semibold mt-0.5">OAuth 2.0 PKCE • Expira en 48d</p>
                  <span className="text-[10px] text-[#ffc640]">Auto-refresh vía cron diario</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#d8c3ad] uppercase font-semibold">Rate Limit</span>
                  <div className="flex justify-between font-mono text-[11px] text-[#dae2fd]">
                    <span>42,500 / 60,000 req/h</span>
                    <span className="text-[#ffc174] font-bold">70.8%</span>
                  </div>
                  <div className="w-full bg-[#2d3449] rounded-full h-1 overflow-hidden mt-1">
                    <div className="bg-[#f59e0b] h-1 rounded-full" style={{ width: '70.8%' }}></div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-[10px] text-[#d8c3ad] uppercase font-semibold">Permisos & Scopes</span>
                <div className="flex flex-wrap gap-1 font-mono text-[10px]">
                  <span className="px-2 py-0.5 rounded bg-[#222a3d] text-[#dae2fd]">video.upload</span>
                  <span className="px-2 py-0.5 rounded bg-[#222a3d] text-[#dae2fd]">user.info.stats</span>
                  <span className="px-2 py-0.5 rounded bg-[#222a3d] text-[#dae2fd]">comment.list</span>
                  <span className="px-2 py-0.5 rounded bg-[#222a3d] text-[#dae2fd]">comment.reply</span>
                </div>
              </div>

              <div className="p-2 rounded bg-[#060e20] border border-[#222a3d] font-mono text-xs">
                <div className="flex justify-between text-[10px] text-[#d8c3ad] mb-0.5">
                  <span>Webhook Ingress (HMAC-SHA256)</span>
                  <span className="text-[#ffc640]">3 eventos suscritos</span>
                </div>
                <span className="text-[#dae2fd] text-[11px] truncate block select-all">https://api.kajelbloom.pe/v1/webhooks/tiktok-events</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 mt-3 border-t border-[#222a3d]">
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => showToast('Permisos de TikTok auditados: Todos vigentes')}
                  className="px-3 py-1.5 rounded-lg bg-[#222a3d] hover:bg-[#31394d] text-[#dae2fd] text-xs font-semibold"
                >
                  Configurar Scopes
                </button>
                <button
                  onClick={handlePingWebhooks}
                  className="px-3 py-1.5 rounded-lg bg-[#222a3d] hover:bg-[#31394d] text-[#ffc174] text-xs font-semibold flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-sm">network_ping</span>
                  <span>Test Webhook</span>
                </button>
              </div>
              <button
                onClick={() => showToast('Para desconectar TikTok, contacte al Superadmin')}
                className="text-xs text-red-400 hover:underline flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-sm">link_off</span> Desconectar
              </button>
            </div>
          </div>

          {/* Card 2: Instagram */}
          <div className="flex flex-col justify-between p-5 bg-[#131b2e] border border-[#222a3d] rounded-xl shadow-md">
            <div className="flex flex-col gap-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#222a3d] flex items-center justify-center text-[#f43f5e] font-bold text-lg">
                    IG
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-sm text-[#dae2fd]">Instagram Graph API v20.0</h3>
                      <span className="px-2 py-0.5 rounded bg-[#2d3449] text-[#ffc640] text-[10px] font-mono">Meta Verified</span>
                    </div>
                    <span className="text-xs text-[#d8c3ad] font-mono">Cuenta: @kajelbloom_pe • ID: 4920199201</span>
                  </div>
                </div>
                <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#171f33] text-emerald-400 text-[10px] font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> Verificado
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 bg-[#171f33] p-3 rounded-lg border border-[#222a3d]/60 text-xs">
                <div>
                  <span className="text-[10px] text-[#d8c3ad] uppercase font-semibold">Tipo de Token</span>
                  <p className="text-[#dae2fd] font-semibold mt-0.5">System User Token (Long-Lived)</p>
                  <span className="text-[10px] text-[#d8c3ad]">Rotación semestral</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#d8c3ad] uppercase font-semibold">Latencia Media Entrega</span>
                  <div className="flex justify-between font-mono text-[11px] text-[#dae2fd]">
                    <span>Webhook Ack: 280 ms</span>
                    <span className="text-emerald-400 font-bold">Excelente</span>
                  </div>
                  <div className="w-full bg-[#2d3449] rounded-full h-1 overflow-hidden mt-1">
                    <div className="bg-emerald-400 h-1 rounded-full" style={{ width: '92%' }}></div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-[10px] text-[#d8c3ad] uppercase font-semibold">Permisos de Graph API</span>
                <div className="flex flex-wrap gap-1 font-mono text-[10px]">
                  <span className="px-2 py-0.5 rounded bg-[#222a3d] text-[#dae2fd]">instagram_basic</span>
                  <span className="px-2 py-0.5 rounded bg-[#222a3d] text-[#dae2fd]">instagram_content_publish</span>
                  <span className="px-2 py-0.5 rounded bg-[#222a3d] text-[#dae2fd]">instagram_manage_messages</span>
                </div>
              </div>

              <div className="p-2 rounded bg-[#060e20] border border-[#222a3d] font-mono text-xs">
                <div className="flex justify-between text-[10px] text-[#d8c3ad] mb-0.5">
                  <span>Meta Graph Webhook (SHA1 Signature)</span>
                  <span className="text-emerald-400">Mentions, DMs, Comments</span>
                </div>
                <span className="text-[#dae2fd] text-[11px] truncate block select-all">https://api.kajelbloom.pe/v1/webhooks/meta-graph</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 mt-3 border-t border-[#222a3d]">
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => showToast('Permisos de Meta Graph auditados')}
                  className="px-3 py-1.5 rounded-lg bg-[#222a3d] hover:bg-[#31394d] text-[#dae2fd] text-xs font-semibold"
                >
                  Auditar Permisos
                </button>
                <button
                  onClick={() => showToast('Logs de tráfico de Meta filtrados en consola')}
                  className="px-3 py-1.5 rounded-lg bg-[#222a3d] hover:bg-[#31394d] text-[#ffc174] text-xs font-semibold flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-sm">history</span>
                  <span>Logs de Tráfico</span>
                </button>
              </div>
              <button
                onClick={() => showToast('Token de Meta refrescado con éxito')}
                className="text-xs text-[#ffc174] hover:underline flex items-center gap-1 font-semibold"
              >
                <span className="material-symbols-outlined text-sm">refresh</span> Re-autenticar
              </button>
            </div>
          </div>

          {/* Card 3: Facebook */}
          <div className="flex flex-col justify-between p-5 bg-[#131b2e] border border-[#222a3d] rounded-xl shadow-md">
            <div className="flex flex-col gap-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#222a3d] flex items-center justify-center text-[#1877F2] font-bold text-lg">
                    FB
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-sm text-[#dae2fd]">Facebook Graph & Messenger API v20.0</h3>
                      <span className="px-2 py-0.5 rounded bg-[#2d3449] text-[#1877F2] text-[10px] font-mono">Páginas & Messenger</span>
                    </div>
                    <span className="text-xs text-[#d8c3ad] font-mono">Page ID: 104829104819024</span>
                  </div>
                </div>
                <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#171f33] text-emerald-400 text-[10px] font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span> Conectado
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 bg-[#171f33] p-3 rounded-lg border border-[#222a3d]/60 text-xs">
                <div>
                  <span className="text-[10px] text-[#d8c3ad] uppercase font-semibold">Sync de Catálogo Flores</span>
                  <p className="text-[#dae2fd] font-semibold mt-0.5">Automático c/ 6 horas</p>
                  <span className="text-[10px] text-emerald-400">248 productos sincronizados</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#d8c3ad] uppercase font-semibold">Messenger & Webhooks</span>
                  <p className="text-[#dae2fd] font-mono font-semibold mt-0.5">Página Oficial Activa</p>
                  <span className="text-[10px] text-[#d8c3ad]">Atención y DMs en tiempo real</span>
                </div>
              </div>

              <div className="p-2 rounded bg-[#060e20] border border-[#222a3d] font-mono text-xs">
                <div className="flex justify-between text-[10px] text-[#d8c3ad] mb-0.5">
                  <span>Endpoint Webhook Messenger / Post Comments</span>
                  <span className="text-emerald-400">200 OK</span>
                </div>
                <span className="text-[#dae2fd] text-[11px] truncate block select-all">https://api.kajelbloom.pe/v1/webhooks/facebook-messenger</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 mt-3 border-t border-[#222a3d]">
              <button
                onClick={() => showToast('Sincronización forzada de catálogo iniciada con Facebook Graph API')}
                className="px-3 py-1.5 rounded-lg bg-[#222a3d] hover:bg-[#31394d] text-[#ffc174] text-xs font-semibold flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-sm">cached</span>
                <span>Forzar Sync Catálogo</span>
              </button>
              <span className="text-[10px] text-[#d8c3ad] font-mono">Último sync: Hace 42m</span>
            </div>
          </div>

          {/* Card 4: Shopify + Niubiz / Yape */}
          <div className="flex flex-col justify-between p-5 bg-[#131b2e] border border-[#222a3d] rounded-xl shadow-md">
            <div className="flex flex-col gap-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#222a3d] flex items-center justify-center text-[#ffc640] font-bold text-lg">
                    🛒
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-sm text-[#dae2fd]">Shopify Perú + Niubiz / Yape Gateway</h3>
                      <span className="px-2 py-0.5 rounded bg-[#2d3449] text-[#ffc640] text-[10px] font-mono">Conversiones UTM</span>
                    </div>
                    <span className="text-xs text-[#d8c3ad] font-mono">Store: kajel-bloom.myshopify.com</span>
                  </div>
                </div>
                <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#171f33] text-emerald-400 text-[10px] font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> Activo
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 bg-[#171f33] p-3 rounded-lg border border-[#222a3d]/60 text-xs">
                <div>
                  <span className="text-[10px] text-[#d8c3ad] uppercase font-semibold">Atribución de Creadores</span>
                  <p className="text-[#dae2fd] font-semibold mt-0.5">Pixel & Server-Side CAPI</p>
                  <span className="text-[10px] text-[#ffc640]">Campaña: Flores Amarillas</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#d8c3ad] uppercase font-semibold">Eventos de Pago Sincronizados</span>
                  <p className="text-[#dae2fd] font-mono font-semibold mt-0.5">1,248 pedidos/sem</p>
                  <span className="text-[10px] text-[#d8c3ad]">Niubiz • Yape QR • POS</span>
                </div>
              </div>

              <div className="p-2 rounded bg-[#060e20] border border-[#222a3d] font-mono text-xs">
                <div className="flex justify-between text-[10px] text-[#d8c3ad] mb-0.5">
                  <span>Webhook Signature (HMAC-SHA256)</span>
                  <span className="text-emerald-400">Verificación 100% Ok</span>
                </div>
                <span className="text-[#dae2fd] text-[11px] truncate block select-all">https://api.kajelbloom.pe/v1/webhooks/shopify-orders</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 mt-3 border-t border-[#222a3d]">
              <button
                onClick={() => showToast('Simulación de compra de S/ 185.00 despachada con UTM de prueba')}
                className="px-3 py-1.5 rounded-lg bg-[#222a3d] hover:bg-[#31394d] text-[#dae2fd] text-xs font-semibold"
              >
                Probar Simulación de Compra
              </button>
              <span className="text-[10px] text-[#ffc640] font-mono">Latencia Gateway: 95ms</span>
            </div>
          </div>
        </div>
      </div>

      {/* BÓVEDA CRIPTOGRÁFICA DE SECRETOS */}
      <div className="flex flex-col gap-4 bg-[#131b2e] border border-[#222a3d] p-5 rounded-xl shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-[#ffc174] text-xl">vpn_key</span>
            <div>
              <h2 className="text-base font-bold text-[#dae2fd]">Bóveda Criptográfica de Credenciales & Secretos</h2>
              <p className="text-xs text-[#d8c3ad]">
                Almacenamiento cifrado en hardware HSM con clave maestra rotada cada 90 días.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setAllRevealed(!allRevealed);
                showToast(allRevealed ? 'Secretos enmascarados' : 'Secretos revelados por 5 segundos');
                if (!allRevealed) {
                  setTimeout(() => setAllRevealed(false), 5000);
                }
              }}
              className="px-3 py-1.5 rounded-lg bg-[#222a3d] hover:bg-[#31394d] text-[#dae2fd] text-xs font-semibold flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-sm">
                {allRevealed ? 'visibility_off' : 'visibility'}
              </span>
              <span>{allRevealed ? 'Ocultar Secretos' : 'Revelar Todo (5 seg)'}</span>
            </button>
            <button
              onClick={() => showToast('Formulario para registrar nueva API Key abierto')}
              className="px-3 py-1.5 rounded-lg bg-[#f59e0b] hover:bg-[#ffc640] text-[#0b1326] text-xs font-bold shadow-sm flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-sm font-bold">add_moderator</span>
              <span>+ Agregar Nueva Llave</span>
            </button>
          </div>
        </div>

        {/* Credentials Table */}
        <div className="overflow-x-auto rounded-lg border border-[#222a3d]">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#060e20] text-[#d8c3ad] uppercase text-[10px] font-mono tracking-wider border-b border-[#222a3d]">
              <tr>
                <th className="py-2.5 px-4">Identificador de Llave / Secreto</th>
                <th className="py-2.5 px-4">Tipo & Protocolo</th>
                <th className="py-2.5 px-4">Esquema Criptográfico</th>
                <th className="py-2.5 px-4">Última Rotación</th>
                <th className="py-2.5 px-4">Valor del Secreto</th>
                <th className="py-2.5 px-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#222a3d]/50 font-mono">
              {secretsData.map((s) => (
                <tr key={s.id} className="hover:bg-[#222a3d]/40 transition-colors">
                  <td className="py-3 px-4 font-semibold text-[#ffc174] flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm text-[#ffc640]">lock</span>
                    <span>{s.id}</span>
                  </td>
                  <td className="py-3 px-4 text-[#d8c3ad] font-sans">{s.type}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded bg-[#171f33] text-[#ffc640] text-[10px] border border-[#222a3d]">
                      {s.crypto}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-[#d8c3ad] text-[11px]">{s.rotation}</td>
                  <td className="py-3 px-4">
                    <span className={allRevealed ? 'text-[#ffc640] font-bold' : 'text-[#dae2fd]'}>
                      {allRevealed ? s.raw : s.masked}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1 font-sans">
                      <button
                        onClick={() => handleCopySecret(s.id, s.raw)}
                        className="p-1.5 rounded hover:bg-[#222a3d] text-[#d8c3ad] hover:text-[#dae2fd] transition-colors"
                        title="Copiar secreto cifrado"
                      >
                        <span className="material-symbols-outlined text-sm">
                          {copiedId === s.id ? 'check' : 'content_copy'}
                        </span>
                      </button>
                      <button
                        onClick={() => handleRotateKey(s.id)}
                        className="p-1.5 rounded hover:bg-[#222a3d] text-[#d8c3ad] hover:text-[#ffc174] transition-colors"
                        title="Rotar Llave"
                      >
                        <span className="material-symbols-outlined text-sm">published_with_changes</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* TELEMETRÍA DE WEBHOOKS EN VIVO */}
      <div className="flex flex-col gap-4 bg-[#131b2e] border border-[#222a3d] p-5 rounded-xl shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-[#ffc174] text-xl">terminal</span>
            <div>
              <h2 className="text-base font-bold text-[#dae2fd]">Telemetría de Webhooks & Registro en Vivo</h2>
              <p className="text-xs text-[#d8c3ad]">Consola de streaming directo de sockets de eventos entrantes y respuestas del API Gateway.</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            <div className="flex items-center bg-[#060e20] rounded-lg p-0.5 border border-[#222a3d]">
              <button
                onClick={() => setFilterCode('all')}
                className={`px-2.5 py-1 rounded text-xs font-semibold ${
                  filterCode === 'all' ? 'bg-[#f59e0b] text-[#0b1326]' : 'text-[#d8c3ad]'
                }`}
              >
                Todos
              </button>
              <button
                onClick={() => setFilterCode('2xx')}
                className={`px-2.5 py-1 rounded text-xs font-semibold ${
                  filterCode === '2xx' ? 'bg-[#222a3d] text-[#dae2fd]' : 'text-[#d8c3ad]'
                }`}
              >
                2xx OK
              </button>
            </div>

            <button
              onClick={() => {
                setStreamPaused(!streamPaused);
                showToast(streamPaused ? 'Streaming de telemetría reanudado' : 'Streaming pausado');
              }}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#222a3d] hover:bg-[#31394d] text-[#dae2fd] transition-colors"
            >
              <span className="material-symbols-outlined text-sm text-[#ffc640]">
                {streamPaused ? 'play_arrow' : 'pause'}
              </span>
              <span>{streamPaused ? 'Reanudar Stream' : 'Pausar Stream'}</span>
            </button>

            <button
              onClick={handleDownloadLogs}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#222a3d] hover:bg-[#31394d] text-[#ffc174] transition-colors font-semibold"
            >
              <span className="material-symbols-outlined text-sm">file_download</span>
              <span>Descargar JSON</span>
            </button>
          </div>
        </div>

        {/* Terminal Window */}
        <div className="bg-[#060e20] p-4 rounded-xl font-mono text-xs text-[#dae2fd] border border-[#222a3d]/80 shadow-inner">
          <div className="flex items-center justify-between pb-2 mb-2 text-[#d8c3ad] text-[10px] border-b border-[#222a3d]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#ffc640]"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
              <span className="ml-2 font-mono">kajel-api-gateway@node-peru-prod-01:~$ tail -f /var/log/webhooks/ingress.log</span>
            </div>
            <span className="flex items-center gap-1 text-[#ffc640]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ffc640] animate-ping"></span>
              {streamPaused ? 'STREAM PAUSADO' : 'STREAMING ACTIVO'}
            </span>
          </div>

          <div className="flex flex-col gap-1.5">
            {logs.map((log, idx) => (
              <div key={idx} className="flex flex-wrap items-center gap-2 text-xs">
                <span className={`px-1.5 py-0.2 rounded bg-emerald-500/15 font-bold ${log.statusClass}`}>
                  [{log.code}]
                </span>
                <span className="text-[#d8c3ad]">{log.time}</span>
                <span className="text-[#ffc174] font-bold">{log.method}</span>
                <span className="text-[#dae2fd] font-semibold">{log.endpoint}</span>
                <span className="text-[#a08e7a]">-</span>
                <span className="text-[#dae2fd]">{log.detail}</span>
                <span className="text-[#ffc640] font-bold ml-auto">{log.latency}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Compliance */}
      <footer className="flex flex-col sm:flex-row items-center justify-between p-4 bg-[#131b2e] border border-[#222a3d] rounded-xl text-xs text-[#d8c3ad]">
        <div className="flex flex-wrap items-center gap-3">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#ffc640]"></span>
            BullMQ Worker Pool: 100% Saludable
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-sm text-[#ffc174]">speed</span>
            Clúster Redis: 12ms Latencia
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-sm text-[#ffc640]">verified</span>
            OAuth Token Server: RS256 Seguro
          </span>
        </div>
        <div className="flex items-center gap-2 mt-2 sm:mt-0 text-[10px] font-mono">
          <span className="px-2 py-0.5 rounded bg-[#171f33] text-[#d8c3ad] border border-[#222a3d]">
            ISO/IEC 27001 Certified
          </span>
          <span className="px-2 py-0.5 rounded bg-[#171f33] text-[#ffc174] border border-[#ffc174]/30">
            Ley N° 29733 (Perú Protec. Datos)
          </span>
        </div>
      </footer>
    </div>
  );
};
