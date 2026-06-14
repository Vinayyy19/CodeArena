import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // React.lazy components take a moment to mount. 
    // A small timeout ensures the DOM has the new page's scrolling containers before we try to reset them.
    const timeoutId = setTimeout(() => {
      // 1. Reset standard window/body scrolls
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      document.documentElement.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      document.body.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      
      // 2. Reset any internal overflow containers (common in this app's layouts)
      const scrollingContainers = document.querySelectorAll('.overflow-y-auto');
      scrollingContainers.forEach(el => el.scrollTo({ top: 0, left: 0, behavior: 'instant' }));
    }, 10);

    return () => clearTimeout(timeoutId);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
