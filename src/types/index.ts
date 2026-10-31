export type NavigationModule = 
  | 'tablero-analitico' 
  | 'calendario-contenido' 
  | 'social-listening' 
  | 'directorio-influencers' 
  | 'inbox-comunitario' 
  | 'configuracion-apis';

export interface UserProfile {
  userId: string;
  email: string;
  displayName: string;
  role: 'Brand Manager' | 'Community Lead' | 'Content Creator' | 'Operations Lead' | 'Growth Strategist';
  region: string;
  assignedCampaign: string;
  avatarUrl: string;
  notificationsEnabled: boolean;
  phone?: string;
  team?: string;
  updatedAt?: string;
}

export interface KPIStats {
  alcanceTotal: number;
  alcanceDelta: string;
  engagementRate: number;
  engagementTarget: number;
  emvTotalSoles: number;
  emvDelta: string;
  roasMultiplier: number;
  sentinelSlaMin: number;
  activeCrisisCount: number;
  aiContainmentRate: number;
}

export interface CalendarPostItem {
  id: string;
  title: string;
  hook: string;
  platform: 'tiktok' | 'instagram' | 'facebook';
  format: string;
  scheduledTime: string;
  day: string;
  dateNumber: number;
  timeSlot: 'matutina' | 'tarde' | 'primetime';
  status: 'Borrador' | 'En Revisión' | 'Aprobado' | 'Publicado';
  author: string;
  aspectRatio: '9:16' | '2:3' | '1:1';
  tags: string[];
  copy: string;
  thumbnailUrl: string;
  audioInfo?: string;
  queueStatus?: string;
  isPeakDay?: boolean;
}

export interface SupportTicketItem {
  id: string;
  clientHandle: string;
  clientName: string;
  clientAvatar: string;
  tier: 'Gold Flower Member' | 'Silver Member' | 'Standard';
  platform: 'ig' | 'tiktok' | 'fb';
  status: 'Nuevo' | 'En Proceso' | 'Escalado' | 'Resuelto';
  slaMinutesRemaining: number;
  title: string;
  lastMessage: string;
  sentiment: 'Negativo' | 'Neutral' | 'Positivo' | 'Intención de Compra';
  riskPercent: number;
  orderId?: string;
  assignedAgent: string;
  timeAgo: string;
  messages: Array<{
    sender: string;
    text: string;
    time: string;
    isBot?: boolean;
    isPrivateNote?: boolean;
    isCustomer?: boolean;
  }>;
  orderSummary?: {
    productName: string;
    amount: string;
    paidVia: string;
    courierName: string;
    motorizedPlate: string;
    etaMinutes: number;
  };
}

export interface CreatorItem {
  id: string;
  name: string;
  handle: string;
  avatarUrl: string;
  badgeIcon: string;
  niche: string;
  platforms: { [key: string]: string };
  authenticityScore: number;
  botsPercent: number;
  erPercent: number;
  erBenchmark: string;
  contractedFee: number;
  deliverables: string;
  emvGenerated: number;
  emvMultiplier: string;
  attributedSales: number;
  ordersCount: number;
  utmCode: string;
  campaignTag: string;
  status: 'Campaña Activa' | 'Micro-Influencer' | 'Renovación Q2' | 'Pausado';
  statusNote: string;
}

export interface CrisisAlertItem {
  id: string;
  level: number;
  title: string;
  campaign: string;
  channelDesc: string;
  increasePercent: string;
  affectedDistricts: string;
  status: 'active' | 'mitigated' | 'silenced';
  timestamp: string;
}
