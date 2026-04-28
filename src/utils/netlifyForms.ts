// Post a form payload to Netlify's built-in form handler.
// Netlify detects forms at build time from hidden templates in index.html
// (data-netlify="true") and accepts URL-encoded POSTs to any URL on the
// same origin. We POST to the current page so the request fires from the
// same context as the form.
//
// Honeypot: the hidden index.html templates declare netlify-honeypot="bot-field"
// so we always send bot-field as an empty string. If it's filled, Netlify
// silently drops the submission as spam without erroring.

export async function submitNetlifyForm(formName: string, data: Record<string, string>) {
  const body = new URLSearchParams({
    'form-name': formName,
    'bot-field': '',
    ...data,
  }).toString();

  const target = typeof window !== 'undefined' ? window.location.pathname : '/';

  let response: Response;
  try {
    response = await fetch(target, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/x-www-form-urlencoded, text/html',
      },
      body,
    });
  } catch (networkErr) {
    console.error('netlifyForms network error:', networkErr);
    throw new Error('Network error - please try again or email leo@mastellagroup.com directly.');
  }

  if (!response.ok) {
    const text = await response.text().catch(() => '');
    console.error(
      `netlifyForms submission failed (${response.status} ${response.statusText}):`,
      text.slice(0, 300)
    );
    throw new Error(`Form submission failed (${response.status}). Please try again.`);
  }
}
