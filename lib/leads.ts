// Saves website enquiries into the Tarang / Matrics Supabase project (table: web_leads).
// The publishable key is meant to be public: anonymous visitors can only call the
// `submit_web_lead` function, which validates input, de-duplicates by phone and
// rate-limits. They cannot read any lead or any other table.

const env = ((import.meta as unknown as { env?: Record<string, string | undefined> }).env) ?? {};

const SUPABASE_URL = env.VITE_SUPABASE_URL || 'https://iqinyjrdzevgmwrkfumy.supabase.co';
const SUPABASE_PUBLISHABLE_KEY =
  env.VITE_SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_pg3WedQRbTq208eRl4h6KA_jWL6GyrE';

export const LEAD_CONSENT_TEXT =
  'I agree that Tarang Solar / Matrics may call or WhatsApp me about my enquiry. ' +
  'मैं सहमत हूँ कि मेरी पूछताछ के बारे में मुझसे कॉल या WhatsApp पर संपर्क किया जा सकता है।';

export interface LeadInput {
  kind: 'SOLAR_AUDIT' | 'EARLY_ACCESS';
  name: string;
  phone: string;
  consentText: string;
  segment?: 'HOME' | 'BUSINESS';
  town?: string;
  billRange?: string;
  propertyType?: string;
  organisation?: string;
  message?: string;
  source?: string;
}

const FRIENDLY_ERRORS: Record<string, string> = {
  invalid_phone: 'Please enter a valid 10-digit mobile number.',
  invalid_name: 'Please enter your name.',
  consent_required: 'Please tick the consent box so we can contact you.',
  rate_limited: 'Too many requests right now. Please try again in a few minutes.',
};

export async function submitLead(input: LeadInput): Promise<void> {
  let response: Response;
  try {
    response = await fetch(`${SUPABASE_URL}/rest/v1/rpc/submit_web_lead`, {
      method: 'POST',
      headers: {
        apikey: SUPABASE_PUBLISHABLE_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        p_kind: input.kind,
        p_name: input.name,
        p_phone: input.phone,
        p_consent_text: input.consentText,
        p_segment: input.segment ?? null,
        p_town: input.town ?? null,
        p_bill_range: input.billRange ?? null,
        p_property_type: input.propertyType ?? null,
        p_organisation: input.organisation ?? null,
        p_message: input.message ?? null,
        p_source: input.source ?? 'website',
      }),
    });
  } catch {
    throw new Error('Could not reach the server. Please check your internet connection and try again.');
  }

  if (!response.ok) {
    let code = '';
    try {
      const body = await response.json();
      code = typeof body?.message === 'string' ? body.message : '';
    } catch {
      /* ignore non-JSON error bodies */
    }
    throw new Error(FRIENDLY_ERRORS[code] ?? 'Something went wrong. Please try again, or WhatsApp us directly.');
  }
}
