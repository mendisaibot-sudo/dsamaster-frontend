import { useEffect } from 'react';

/**
 * SEO Manager - Updates page title and meta tags dynamically
 */
const SEO = ({ title, description, keywords, path }) => {
  useEffect(() => {
    document.title = title;

    const metaTags = [
      { name: 'description', content: description },
      { name: 'keywords', content: keywords },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'twitter:title', content: title },
      { property: 'twitter:description', content: description },
    ];

    metaTags.forEach(({ name, property, content }) => {
      let tag = name 
        ? document.querySelector(`meta[name="${name}"]`)
        : document.querySelector(`meta[property="${property}"]`);
      
      if (!tag) {
        tag = document.createElement('meta');
        if (name) tag.setAttribute('name', name);
        if (property) tag.setAttribute('property', property);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    });

    const canonicalUrl = `https://dsamaster.de${path || ''}`;
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalUrl);
  }, [title, description, keywords, path]);

  return null;
};

export default SEO;