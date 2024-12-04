const domain =
  process.env.NEXT_PUBLIC_URL || `https://democrachain.soorya-u.dev`;

export default async function sitemap() {
  const routes = [""].map((route) => ({
    url: `${domain}${route}`,
    lastModified: new Date().toISOString(),
  }));

  return [...routes];
}