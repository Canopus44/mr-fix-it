import { useCallback, useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from './usePrefersReducedMotion.js';

/**
 * Tilt 3D sutil siguiendo el cursor.
 * Escribe directamente sobre el estilo del nodo para no re-renderizar en cada frame.
 */
export function useMouseTilt({ max = 7, scale = 1.015, perspective = 1100 } = {}) {
  const ref = useRef(null);
  const frame = useRef(0);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(
    () => () => {
      cancelAnimationFrame(frame.current);
    },
    [],
  );

  const onPointerMove = useCallback(
    (event) => {
      if (reducedMotion || event.pointerType === 'touch') return;
      const element = ref.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width;
      const py = (event.clientY - rect.top) / rect.height;
      const rotateY = (px - 0.5) * max * 2;
      const rotateX = (0.5 - py) * max * 2;

      cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(() => {
        element.style.transform = `perspective(${perspective}px) rotateX(${rotateX.toFixed(
          2,
        )}deg) rotateY(${rotateY.toFixed(2)}deg) scale(${scale})`;
        element.style.setProperty('--glow-x', `${(px * 100).toFixed(1)}%`);
        element.style.setProperty('--glow-y', `${(py * 100).toFixed(1)}%`);
      });
    },
    [max, perspective, reducedMotion, scale],
  );

  const onPointerLeave = useCallback(() => {
    const element = ref.current;
    if (!element) return;
    cancelAnimationFrame(frame.current);
    element.style.transform = `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale(1)`;
  }, [perspective]);

  return { ref, tiltProps: { onPointerMove, onPointerLeave, onPointerCancel: onPointerLeave } };
}
