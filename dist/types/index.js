import { z } from 'zod';
export const DecideRequestSchema = z.object({
    cluster: z.enum(['b2b_saas', 'local_trades', 'care_health', 'regulatory_arbitrage', 'affiliate_media']).default('b2b_saas'),
    intentScore: z.number().min(0).max(100).default(75),
    recipientEmail: z.string().email().optional(),
    campaignType: z.enum(['money_mail', 'cold_outbound', 'dead_lead_revival', 'warm_nurture', 'transactional']).optional(),
    recentAssetVisited: z.string().optional()
});
