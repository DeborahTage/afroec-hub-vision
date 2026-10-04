export const SITE_URL = "https://afroec.com";
export const SITE_NAME = "Afroec";
export const SITE_DESCRIPTION =
  "Afroec is an African technology company building practical digital solutions, exploring emerging technologies, and developing the next generation of African tech talent.";
export const SITE_TITLE = "Afroec | Building Africa's Next Generation of Technology";
export const SITE_LOGO = `${SITE_URL}/logo.png`;

export function absoluteUrl(path = "/"): string {
  if (path === "/" || path === "") return `${SITE_URL}/`;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

type PageSeoInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  index?: boolean;
};

export function pageSeo({
  title,
  description,
  path,
  image = SITE_LOGO,
  index = true,
}: PageSeoInput) {
  const url = absoluteUrl(path);
  const robots = index ? "index, follow" : "noindex, follow";

  return {
    meta: [
      { title },
      { name: "description", content: description },
      { name: "robots", content: robots },
      { name: "author", content: SITE_NAME },
      { name: "application-name", content: SITE_NAME },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: SITE_NAME },
      { property: "og:locale", content: "en" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: url },
      { property: "og:image", content: image },
      { property: "og:image:alt", content: "Afroec" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: image },
      { name: "twitter:image:alt", content: "Afroec" },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: SITE_NAME,
        url: `${SITE_URL}/`,
        logo: SITE_LOGO,
        description: SITE_DESCRIPTION,
        email: "support@afroec.com",
        sameAs: [
          "https://www.linkedin.com/company/afroec",
          "https://www.instagram.com/afro_ec",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        name: SITE_NAME,
        url: `${SITE_URL}/`,
        description: SITE_DESCRIPTION,
        publisher: { "@id": `${SITE_URL}/#organization` },
        inLanguage: "en",
      },
    ],
  };
}

export function webPageSchema(input: {
  title: string;
  description: string;
  path: string;
  type?: "WebPage" | "AboutPage" | "ContactPage";
}) {
  return {
    "@context": "https://schema.org",
    "@type": input.type ?? "WebPage",
    name: input.title,
    description: input.description,
    url: absoluteUrl(input.path),
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#organization` },
    publisher: { "@id": `${SITE_URL}/#organization` },
    inLanguage: "en",
  };
}
