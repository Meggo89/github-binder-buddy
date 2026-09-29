// Manual IndexNow ping, for use if the post-deploy function is not firing:
//   npx tsx scripts/indexnow.ts            submit every URL in the live sitemap
//   npx tsx scripts/indexnow.ts <url> ...  submit specific URLs
import { INDEXNOW_HOST, submitToIndexNow, urlsFromSitemap } from './indexnow-core';

async function run() {
  let urls = process.argv.slice(2);
  if (!urls.length) {
    const xml = await (await fetch(`https://${INDEXNOW_HOST}/sitemap.xml`)).text();
    urls = urlsFromSitemap(xml);
  }
  const status = await submitToIndexNow(urls);
  console.log(`indexnow: submitted ${urls.length} URLs, HTTP ${status} (200 or 202 means accepted)`);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
