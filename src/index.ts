/**
 * NAVRE.ai Client SDK (RFC-001)
 * Author: The Quite Good Project (https://quitegoodproject.com)
 */

export interface NavreDecideOptions {
  cluster: 'b2b_saas' | 'local_trades' | 'care_health' | 'regulatory_arbitrage' | 'affiliate_media';
  intentScore?: number;
  recipientEmail?: string;
  apiUrl?: string;
}

export async function fetchNavreNextAction(options: NavreDecideOptions) {
  const base = options.apiUrl || 'https://navre.ai';
  const response = await fetch(`${base}/v1/decide`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      cluster: options.cluster,
      intentScore: options.intentScore ?? 75,
      recipientEmail: options.recipientEmail
    })
  });
  if (!response.ok) throw new Error(`NAVRE Error: ${response.statusText}`);
  return await response.json();
}
