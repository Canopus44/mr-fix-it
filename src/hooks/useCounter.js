import { useEffect, useState } from 'react';
import { usePrefersReducedMotion } from './usePrefersReducedMotion.js';

/**
 * Contador animado con requestAnimationFrame.
 * `start` permite esperar a que el elemento esté visible.
 */
export function useCounter(
  target,
  { start = true, duration = 1600, decimals = 0, locale = 'es-CO' } = {},
) {
  const reducedMotion = usePrefersReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return undefined;

    if (reducedMotion) {
      setValue(target);
      return undefined;
    }

    let frame = 0;
    const startedAt = performance.now();

    const tick = (now) => {
      const progress = Math.min(1, (now - startedAt) / duration);
      // easeOutExpo: arranca rápido y aterriza con suavidad.
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setValue(target * eased);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [start, target, duration, reducedMotion]);

  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}
