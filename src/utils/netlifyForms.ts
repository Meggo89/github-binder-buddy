// Post a form payload to Netlify's built-in form handler.
// Netlify detects forms at build time from hidden templates in index.html
// and accepts URL-encoded POSTs to /.

export async function submitNetlifyForm(formName: string, data: Record<string, string>) {
  const body = new URLSearchParams({ 'form-name': formName, ...data }).toString();

  const response = await fetch('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  });

  if (!response.ok) {
    throw new Error(`Form submission failed (${response.status})`);
  }
}
