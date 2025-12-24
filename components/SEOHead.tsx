import React, { useEffect } from 'react';
import { SEOMetadata } from '../types';

interface SEOHeadProps {
  seo: SEOMetadata;
  overrideTitle?: string;
}

export const SEOHead: React.FC<SEOHeadProps> = ({ seo, overrideTitle }) => {
  useEffect(() => {
    // Title
    document.title = overrideTitle || seo.title;

    // Meta Description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', seo.description);

    // Canonical
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', seo.canonicalUrl || window.location.href);

    // Robots
    let metaRobots = document.querySelector('meta[name="robots"]');
    if (!metaRobots) {
      metaRobots = document.createElement('meta');
      metaRobots.setAttribute('name', 'robots');
      document.head.appendChild(metaRobots);
    }
    metaRobots.setAttribute('content', seo.robots);

    // Open Graph
    const setMeta = (property: string, content: string) => {
      let element = document.querySelector(`meta[property="${property}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('property', property);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    setMeta('og:title', overrideTitle || seo.title);
    setMeta('og:description', seo.description);
    setMeta('og:url', window.location.href);
    if (seo.ogImage) {
      setMeta('og:image', seo.ogImage);
    }

    // JSON-LD
    if (seo.jsonLd) {
      let scriptJsonLd = document.querySelector('script[type="application/ld+json"]');
      if (!scriptJsonLd) {
        scriptJsonLd = document.createElement('script');
        scriptJsonLd.setAttribute('type', 'application/ld+json');
        document.head.appendChild(scriptJsonLd);
      }
      scriptJsonLd.textContent = seo.jsonLd;
    }

  }, [seo, overrideTitle]);

  return null; // This component does not render visual DOM
};