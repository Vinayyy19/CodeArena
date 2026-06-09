import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop component resets the window scroll position to the top
 * whenever the route (pathname) changes.
 */
const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'instant', // instant scroll to avoid jittery transitions
        });
    }, [pathname]);

    return null;
};

export default ScrollToTop;
