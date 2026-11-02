import { useEffect, useState } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

/** Devuelve true si la persona pidió reducir el movimiento en su sistema. */
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia?.(QUERY).matches ?? false;
  });

  useEffect(() => {
    const media = window.matchMedia?.(QUERY);
    if (!media) return undefined;

    const onChange = (event) => setReduced(event.matches);
    media.addEventListener?.('change', onChange);
    return () => media.removeEventListener?.('change', onChange);
  }, []);

  return reduced;
}
