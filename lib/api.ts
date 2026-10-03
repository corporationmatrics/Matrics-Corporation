// Connection to the Tarang case-management app (leads + live subsidy figures).
// Override with VITE_APP_URL in .env for staging.

export const APP_URL: string = (import.meta.env.VITE_APP_URL as string | undefined) || 'https://tarang-solar.vercel.app';

export const LEAD_CONSENT_LABEL =
  'I agree that Tarang Solar may contact me by phone/WhatsApp about rooftop solar and store these details for that purpose.';

export interface LeadInput {
  kind: 'SOLAR_AUDIT' | 'EARLY_ACCESS';
  segment?: 'HOME' | 'BUSINESS';
  name: string;
  phone: string;
  town?: string;
  billRange?: string;
  propertyType?: string;
  organisation?: string;
  message?: string;
  consent: boolean;
  /** Honeypot — must stay empty. */
  website?: string;
}

/** Sends a form to the app's lead queue. Resolves to an error message, or null on success. */
export async function submitLead(lead: LeadInput): Promise<string | null> {
  try {
    const res = await fetch(`${APP_URL}/api/public/leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...lead, source: `website:${window.location.pathname}` }),
    });
    const json = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
    if (res.ok && json.ok) return null;
    return json.error || 'Something went wrong. Please call or WhatsApp us instead.';
  } catch {
    return 'Could not reach our server. Please check your connection or call us.';
  }
}

export interface SubsidyRow { kw: number; central: number; state: number; total: number }

/** Current PM Surya Ghar central subsidy + Chhattisgarh top-up for homes (from the app's settings). */
export const FALLBACK_SUBSIDY: SubsidyRow[] = [
  { kw: 1, central: 30000, state: 15000, total: 45000 },
  { kw: 2, central: 60000, state: 30000, total: 90000 },
  { kw: 3, central: 78000, state: 30000, total: 108000 },
];

export async function fetchSubsidy(): Promise<SubsidyRow[]> {
  try {
    const res = await fetch(`${APP_URL}/api/public/subsidy`);
    if (!res.ok) return FALLBACK_SUBSIDY;
    const json = (await res.json()) as { homes?: SubsidyRow[] };
    return json.homes?.length ? json.homes : FALLBACK_SUBSIDY;
  } catch {
    return FALLBACK_SUBSIDY;
  }
}

export const inr = (n: number) => '₹' + n.toLocaleString('en-IN');
