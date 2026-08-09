import { useEffect } from 'react';

const SITE_NAME = 'Aurilious & Co.';
const SITE_URL = 'https://www.aurilious.co'; // update once the real production domain is known
const DEFAULT_IMAGE = `${SITE_URL}/aurilious_logo.png`;

const setMeta = (attr, key, content) => {
  if (!content) return;
  let tag = document.querySelector(`meta[${attr}="${key}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attr, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
};

const setLink = (rel, href) => {
  if (!href) return;
  let tag = document.querySelector(`link[rel="${rel}"]`);
  if (!tag) {
    tag = document.createElement('link');
    tag.setAttribute('rel', rel);
    document.head.appendChild(tag);
  }
  tag.setAttribute('href', href);
};

const setJsonLd = (id, data) => {
  let tag = document.getElementById(id);
  if (!data) {
    if (tag) tag.remove();
    return;
  }
  if (!tag) {
    tag = document.createElement('script');
    tag.type = 'application/ld+json';
    tag.id = id;
    document.head.appendChild(tag);
  }
  tag.textContent = JSON.stringify(data);
};

/**
 * Drop this at the top of any page to set its title, meta description,
 * canonical URL, Open Graph / Twitter tags, and optional structured data.
 * No react-helmet dependency -- just direct, cleanup-safe DOM writes.
 *
 * <Seo title="Statutory Audit Services" description="..." path="/services/statutory-audit" />
 */
const Seo = ({ title, description, path = '', image = DEFAULT_IMAGE, schema, breadcrumbSchema }) => {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — Audit & Assurance`;
    const canonical = `${SITE_URL}${path}`;

    document.title = fullTitle;
    setMeta('name', 'description', description);
    setLink('canonical', canonical);

    setMeta('property', 'og:title', fullTitle);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', canonical);
    setMeta('property', 'og:image', image);
    setMeta('property', 'og:type', 'website');
    setMeta('property', 'og:site_name', SITE_NAME);

    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', fullTitle);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', image);

    setJsonLd('seo-page-schema', schema || null);
    setJsonLd('seo-breadcrumb-schema', breadcrumbSchema || null);
  }, [title, description, path, image, schema, breadcrumbSchema]);

  return null;
};

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: SITE_NAME,
  url: SITE_URL,
  logo: DEFAULT_IMAGE,
  description: 'Premium audit, assurance, taxation and compliance services for growing businesses.',
  areaServed: 'IN',
};

export const buildBreadcrumbSchema = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: item.name,
    item: `${SITE_URL}${item.path}`,
  })),
});

export const buildFaqSchema = (faqs) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.question,
    acceptedAnswer: { '@type': 'Answer', text: f.answer },
  })),
});

export default Seo;
