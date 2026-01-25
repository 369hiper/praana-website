import { useEffect } from 'react';

type SeoConfig = {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
};

function upsertMeta(nameOrProp: 'name' | 'property', key: string, content: string) {
  const selector = `meta[${nameOrProp}="${key}"]`;
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(nameOrProp, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

export function useSeo(config: SeoConfig) {
  useEffect(() => {
    document.title = config.title;

    upsertMeta('name', 'description', config.description);
    if (config.keywords?.length) {
      upsertMeta('name', 'keywords', config.keywords.join(', '));
    }

    // Basic Open Graph
    upsertMeta('property', 'og:title', config.title);
    upsertMeta('property', 'og:description', config.description);
    upsertMeta('property', 'og:type', 'website');
    if (config.image) upsertMeta('property', 'og:image', config.image);

    // Basic Twitter cards
    upsertMeta('name', 'twitter:card', config.image ? 'summary_large_image' : 'summary');
    upsertMeta('name', 'twitter:title', config.title);
    upsertMeta('name', 'twitter:description', config.description);
    if (config.image) upsertMeta('name', 'twitter:image', config.image);
  }, [config.title, config.description, config.image, config.keywords]);
}

