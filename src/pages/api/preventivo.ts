export const prerender = false;

import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  const json = (data: object, status = 200) =>
    new Response(JSON.stringify(data), {
      status,
      headers: { 'Content-Type': 'application/json' },
    });

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return json({ ok: false, error: 'Richiesta non valida.' }, 400);
  }

  const nome        = formData.get('nome')?.toString().trim() ?? '';
  const email       = formData.get('email')?.toString().trim() ?? '';
  const telefono    = formData.get('telefono')?.toString().trim() ?? '';
  const servizio    = formData.get('servizio')?.toString().trim() ?? '';
  const comune      = formData.get('comune')?.toString().trim() ?? '';
  const descrizione = formData.get('descrizione')?.toString().trim() ?? '';
  const cfToken     = formData.get('cf-turnstile-response')?.toString() ?? '';

  if (!nome || !email || !descrizione) {
    return json({ ok: false, error: 'Compila tutti i campi obbligatori.' }, 400);
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return json({ ok: false, error: 'Indirizzo email non valido.' }, 400);
  }

  // Verifica Turnstile (nessun DNS, solo chiavi dal dashboard CF)
  const turnstileSecret = import.meta.env.TURNSTILE_SECRET_KEY;
  if (turnstileSecret) {
    const tsRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ secret: turnstileSecret, response: cfToken }),
    });
    const tsData = await tsRes.json() as { success: boolean };
    if (!tsData.success) {
      return json({ ok: false, error: 'Verifica CAPTCHA fallita. Riprova.' }, 400);
    }
  }

  // Invio via Web3Forms
  const web3formsKey = import.meta.env.WEB3FORMS_KEY;
  if (!web3formsKey) {
    return json({ ok: false, error: 'Configurazione server mancante.' }, 500);
  }

  const mailRes = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      access_key: web3formsKey,
      subject: `Preventivo: ${nome} — ${servizio || 'N/D'}`,
      replyto: email,
      Nome: nome,
      Email: email,
      Telefono: telefono || '—',
      'Tipo di lavoro': servizio || '—',
      Comune: comune || '—',
      Descrizione: descrizione,
    }),
  });

  const mailData = await mailRes.json() as { success: boolean };
  if (!mailData.success) {
    return json({ ok: false, error: "Errore durante l'invio. Riprova o contattaci direttamente." }, 500);
  }

  return json({ ok: true });
};
