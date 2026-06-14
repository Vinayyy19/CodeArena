import { useEffect } from 'react';

export function useSEO({ title, description, keywords, image, canonical }) {
  useEffect(() => {
    // Disable browser's automatic scroll restoration to prevent history jumps
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    // Force Scroll to Top exactly when the lazy-loaded component mounts.
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.body.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    
    const scrollingContainers = document.querySelectorAll('.overflow-y-auto, .custom-scrollbar');
    scrollingContainers.forEach(el => el.scrollTo({ top: 0, left: 0, behavior: 'instant' }));

    // 1. Update Document Title & Open Graph / Twitter Titles
    if (title) {
      document.title = title;

      const metaTitle = document.querySelector('meta[name="title"]');
      if (metaTitle) metaTitle.setAttribute('content', title);

      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) ogTitle.setAttribute('content', title);

      const twitterTitle = document.querySelector('meta[property="twitter:title"]');
      if (twitterTitle) twitterTitle.setAttribute('content', title);
    }

    // 2. Update Descriptions
    if (description) {
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute('content', description);

      const ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) ogDesc.setAttribute('content', description);

      const twitterDesc = document.querySelector('meta[property="twitter:description"]');
      if (twitterDesc) twitterDesc.setAttribute('content', description);
    }

    // 3. Update Keywords
    if (keywords) {
      const metaKeywords = document.querySelector('meta[name="keywords"]');
      if (metaKeywords) metaKeywords.setAttribute('content', keywords);
    }

    // 4. Update Social Open Graph Image
    if (image) {
      const ogImage = document.querySelector('meta[property="og:image"]');
      if (ogImage) ogImage.setAttribute('content', image);

      const twitterImage = document.querySelector('meta[property="twitter:image"]');
      if (twitterImage) twitterImage.setAttribute('content', image);
    }

    // 5. Update Canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    const finalCanonical = canonical || `https://www.thecodearena.co.in${window.location.pathname}`;
    canonicalLink.setAttribute('href', finalCanonical);
  }, [title, description, keywords, image, canonical]);
}
