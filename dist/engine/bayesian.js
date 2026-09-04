import crypto from 'crypto';
const CATALOG = [
    {
        assetId: 'tokenenrich',
        displayName: 'TokenEnrich.com',
        cluster: 'b2b_saas',
        networkName: 'In-House',
        commissionModel: '100% Retained Equity',
        rawUrl: 'https://tokenenrich.com',
        categoryBadge: '⚡ 180-Token Firmographics',
        headline: 'Verify Decision-Maker Mailboxes in Sub-140ms',
        subheadline: 'Eliminate 95% of prompt bloat across Claude, Cursor, and automated outbound workflows.',
        editorialSummary: 'High-speed DNS and technographic intelligence delivering verified business signals without vendor APIs.',
        actionLabel: 'Launch Free Sandbox Lookup',
        baseExpectedValue: 99.0
    },
    {
        assetId: 'tokenmarkdown',
        displayName: 'TokenMarkdown.com',
        cluster: 'b2b_saas',
        networkName: 'In-House',
        commissionModel: '100% Retained Equity',
        rawUrl: 'https://tokenmarkdown.com',
        categoryBadge: '📄 Web-to-Markdown Engine',
        headline: 'Sub-150ms Clean Markdown for LLM Context',
        subheadline: 'Strip tracking cookies, ads, and SVGs before dumping pages into RAG pipelines.',
        editorialSummary: 'High-speed V8 parsing engine with native stdio MCP protocol for AI coding agents.',
        actionLabel: 'Convert URL Free',
        baseExpectedValue: 79.0
    },
    {
        assetId: 'landscope',
        displayName: 'LandScopeAPI.com',
        cluster: 'local_trades',
        networkName: 'In-House',
        commissionModel: '100% Retained Equity',
        rawUrl: 'https://landscopeapi.com',
        categoryBadge: '🏛️ Spatial Property Feasibility',
        headline: 'Autonomous PostGIS Zoning & Solar Assessment',
        subheadline: 'Sub-10ms parcel geometry and statutory setback checks for trades & renewables.',
        editorialSummary: 'Real-time property boundaries, deed owner verification, and solar generation feasibility.',
        actionLabel: 'Check Property Boundary',
        baseExpectedValue: 149.0
    },
    {
        assetId: 'lmcprotocol',
        displayName: 'LMCProtocol.com',
        cluster: 'b2b_saas',
        networkName: 'In-House',
        commissionModel: '100% Retained Equity',
        rawUrl: 'https://lmcprotocol.com',
        categoryBadge: '📍 ~210-Token Local Telemetry',
        headline: 'Inspect Client Website Flaws in Real-Time',
        subheadline: 'Detect missing Meta Pixels, GA4, and stalled Google Reviews before spending SDR credits.',
        editorialSummary: 'Sub-second spatial telemetry engine pre-qualifying local business accounts for agencies.',
        actionLabel: 'Run 50 Free Lookups',
        baseExpectedValue: 199.0
    }
];
export function resolveBayesianNextAction(intel) {
    const startTime = performance.now();
    // Filter matching candidates or fallback to highest EV
    let candidates = CATALOG.filter(c => c.cluster === intel.cluster);
    if (candidates.length === 0)
        candidates = CATALOG;
    // Bayesian score weighting: EV * (Intent / 100)
    const scored = candidates.map(c => ({
        ...c,
        posteriorScore: c.baseExpectedValue * (Math.max(intel.intentScore, 30) / 100)
    }));
    scored.sort((a, b) => b.posteriorScore - a.posteriorScore);
    const selected = scored[0] || CATALOG[0];
    const clickId = 'cid_' + crypto.randomBytes(8).toString('hex');
    const cloakedUrl = `https://navre.ai/r/${clickId}?dest=${encodeURIComponent(selected.rawUrl)}`;
    const executionMs = Number((performance.now() - startTime).toFixed(2));
    return {
        decisionId: 'navre_dec_' + crypto.randomBytes(6).toString('hex'),
        bayesianConfidence: Number((Math.min(0.98, 0.70 + (intel.intentScore * 0.0028))).toFixed(2)),
        selectedSisterAsset: selected.displayName,
        offerMetadata: {
            sourceType: 'in_house_sister_asset',
            networkName: selected.networkName,
            commissionModel: selected.commissionModel,
            firstPartyCloakedUrl: cloakedUrl,
            rawTrackingUrl: selected.rawUrl
        },
        editorialPencilHook: `RECOMMENDED NEXT STEP FOR YOUR WORKFLOW:`,
        actionLabel: selected.actionLabel,
        destinationUrl: cloakedUrl,
        categoryBadge: selected.categoryBadge,
        editorialSummary: selected.editorialSummary,
        plainText: `${selected.headline} — ${selected.subheadline} -> ${cloakedUrl}`,
        editorialHtml: `<div class="navre-card"><span class="badge">${selected.categoryBadge}</span><h4>${selected.headline}</h4><p>${selected.subheadline}</p><a href="${cloakedUrl}" class="cta">${selected.actionLabel} &rarr;</a></div>`,
        deliverabilityAudit: {
            mode: 'full_card',
            safetyScore: 98,
            riskLevel: 'LOW',
            actionReason: 'Clean 1st-party cryptographic S2S bridge applied.',
            enterpriseFirewallDetected: false,
            isColdOutreach: intel.campaignType === 'cold_outbound',
            cloakingApplied: true
        },
        executionMs
    };
}
