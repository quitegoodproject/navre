import { z } from 'zod';
export type PortfolioCluster = 'b2b_saas' | 'local_trades' | 'care_health' | 'regulatory_arbitrage' | 'affiliate_media';
export type OfferSourceType = 'in_house_sister_asset' | 'awin_affiliate' | 'bark_cpl_exchange' | 'direct_commercial_partner';
export type NavreDeliverabilityMode = 'full_card' | 'plain_text_only' | 'auto_muted';
export interface NavreActionCard {
    id: string;
    category: 'statutory_subsidy' | 'b2b_deduction' | 'high_ticket_cpa' | 'viral_cashback';
    headline: string;
    subheadline: string;
    ctaText: string;
    badgeText: string;
    estimatedValueGbp: number;
    hostYieldShareGbp: number;
    destinationUrl: string;
    vertical: string;
}
export interface NavreOfferMetadata {
    sourceType: OfferSourceType;
    networkName: 'In-House' | 'AWIN UK' | 'Bark.com' | 'Impact Radius' | 'Direct Commercial';
    commissionModel: '100% Retained Equity' | 'CPA (£75 - £250)' | 'CPL (£25 - £45)' | 'Revenue Share (30%)';
    rawTrackingUrl?: string;
    firstPartyCloakedUrl: string;
}
export interface NavreDeliverabilityAudit {
    mode: NavreDeliverabilityMode;
    safetyScore: number;
    riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
    actionReason: string;
    enterpriseFirewallDetected: boolean;
    isColdOutreach: boolean;
    cloakingApplied: boolean;
}
export interface NavreSubscriberIntelligence {
    contactId?: string;
    recipientEmail?: string;
    cluster: PortfolioCluster;
    intentScore: number;
    campaignType?: 'money_mail' | 'cold_outbound' | 'dead_lead_revival' | 'warm_nurture' | 'transactional';
    sendingDomainHealth?: number;
    recentAssetVisited?: string;
    legalTier?: string;
    geoRegion?: string;
}
export interface NavreDecisionPayload {
    decisionId: string;
    bayesianConfidence: number;
    selectedSisterAsset: string;
    offerMetadata: NavreOfferMetadata;
    editorialPencilHook: string;
    actionLabel: string;
    destinationUrl: string;
    categoryBadge: string;
    editorialSummary: string;
    plainText: string;
    editorialHtml: string;
    deliverabilityAudit: NavreDeliverabilityAudit;
    executionMs: number;
}
export declare const DecideRequestSchema: z.ZodObject<{
    cluster: z.ZodDefault<z.ZodEnum<["b2b_saas", "local_trades", "care_health", "regulatory_arbitrage", "affiliate_media"]>>;
    intentScore: z.ZodDefault<z.ZodNumber>;
    recipientEmail: z.ZodOptional<z.ZodString>;
    campaignType: z.ZodOptional<z.ZodEnum<["money_mail", "cold_outbound", "dead_lead_revival", "warm_nurture", "transactional"]>>;
    recentAssetVisited: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    cluster: "b2b_saas" | "local_trades" | "care_health" | "regulatory_arbitrage" | "affiliate_media";
    intentScore: number;
    recipientEmail?: string | undefined;
    campaignType?: "money_mail" | "cold_outbound" | "dead_lead_revival" | "warm_nurture" | "transactional" | undefined;
    recentAssetVisited?: string | undefined;
}, {
    cluster?: "b2b_saas" | "local_trades" | "care_health" | "regulatory_arbitrage" | "affiliate_media" | undefined;
    intentScore?: number | undefined;
    recipientEmail?: string | undefined;
    campaignType?: "money_mail" | "cold_outbound" | "dead_lead_revival" | "warm_nurture" | "transactional" | undefined;
    recentAssetVisited?: string | undefined;
}>;
