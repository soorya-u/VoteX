export default function robots() {
  const domain =
    process.env.NEXT_PUBLIC_URL || `https://votex.soorya-u.dev`;
  return {
    rules: {
      userAgent: "*",
      allow: "*",
    },
    sitemap: `${domain}/sitemap.xml`,
  };
}
