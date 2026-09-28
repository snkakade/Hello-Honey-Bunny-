import { site } from "../config/site";
import type { Product } from "../data/products";
import type { ArticleSummary } from "../data/articles";

const absolute = (path: string) => new URL(path, `${site.url}/`).href;

export function homeSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Organization", "@id": `${site.url}/#organization`, name: site.name, url: `${site.url}/`, logo: absolute("/assets/brand/official-full-logo.svg"), image: absolute("/assets/brand/official-full-logo.png"), telephone: site.phoneDisplay, email: site.email },
      { "@type": "LocalBusiness", "@id": `${site.url}/#business`, name: site.name, url: `${site.url}/`, image: absolute("/assets/brand/official-full-logo.png"), telephone: site.phoneDisplay, email: site.email, address: { "@type": "PostalAddress", addressLocality: site.address.locality, addressRegion: site.address.region, postalCode: site.address.postalCode, addressCountry: site.address.country }, areaServed: site.deliveryAreas.map((name) => ({ "@type": "Place", name: `${name}, Maharashtra, India` })), parentOrganization: { "@id": `${site.url}/#organization` } },
      { "@type": "WebSite", "@id": `${site.url}/#website`, name: site.name, url: `${site.url}/`, publisher: { "@id": `${site.url}/#organization` } }
    ]
  };
}

export function productSchema(product: Product) {
  if (!product.schemaEnabled || product.planned || !product.requestable) return undefined;
  return { "@context": "https://schema.org", "@type": "Product", "@id": `${site.url}${product.slug}#product`, name: product.name, description: product.longDescription, image: product.image ? absolute(product.image.src) : undefined, url: `${site.url}${product.slug}`, brand: { "@type": "Brand", name: site.name } };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: items.map((item, index) => ({ "@type": "ListItem", position: index + 1, name: item.name, item: `${site.url}${item.path}` })) };
}

export function articleSchema(article: ArticleSummary) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${site.url}${article.path}#article`,
    headline: article.title,
    description: article.description,
    datePublished: article.datePublished,
    dateModified: article.dateModified,
    image: absolute(article.image),
    mainEntityOfPage: `${site.url}${article.path}`,
    author: { "@type": "Organization", name: site.name, url: `${site.url}/` },
    publisher: { "@type": "Organization", "@id": `${site.url}/#organization`, name: site.name, logo: { "@type": "ImageObject", url: absolute("/assets/brand/official-full-logo.png") } }
  };
}
