// IndexNow submission, shared by the post-deploy Netlify function and the manual script.
// Bing (which ChatGPT search draws on), Yandex, Seznam and others share IndexNow submissions.
// The key file public/4e8872b468253304b7f665bfa357b407.txt must stay deployed at the site root.

export const INDEXNOW_KEY = '4e8872b468253304b7f665bfa357b407';
export const INDEXNOW_HOST = 'mastellagroup.com';

export function urlsFromSitemap(xml: string): string[] {
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)]
    .map((m) => m[1].trim())
    .filter((u) => u.startsWith(`https://${INDEXNOW_HOST}/`));
}

export async function submitToIndexNow(urls: string[]): Promise<number> {
  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({
      host: INDEXNOW_HOST,
      key: INDEXNOW_KEY,
      keyLocation: `https://${INDEXNOW_HOST}/${INDEXNOW_KEY}.txt`,
      urlList: urls.slice(0, 10000),
    }),
  });
  return res.status;
}
