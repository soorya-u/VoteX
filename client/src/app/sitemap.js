const domain =
  process.env.NEXT_PUBLIC_URL || `https://democrachain.soorya-u.dev`;

export default async function sitemap() {
  const routes = [
    "",
    "/about",
    "/all-candidates",
    "/all-voters",
    "/approved-candidates",
    "/approved-voters",
    "/candidate",
    "/candidate-details",
    "/contact",
    "/owner",
    "/roadmap",
    "/update-candidate",
    "/update-voter",
    "/voted-voters",
    "/voter",
    "/voter-details",
  ].map((route) => ({
    url: `${domain}${route}`,
    lastModified: new Date().toISOString(),
  }));

  return [...routes];
}
