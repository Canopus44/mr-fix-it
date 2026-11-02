import { useRef } from 'react';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion.js';

/**
 * Botón/enlace con atracción magnética sutil.
 * Se desactiva con puntero táctil y con prefers-reduced-motion.
 */
export default function MagneticButton({
  as = 'a',
  children,
  className = '',
  strength = 0.18,
  ...rest
}) {
  const ref = useRef(null);
  const reducedMotion = usePrefersReducedMotion();
  const Tag = as;

  const handleMove = (event) => {
    if (reducedMotion || event.pointerType === 'touch') return;
    const element = ref.current;
    if (!element) return;
    const rect = element.getBoundingClientRect();
    const x = (event.clientX - rect.left - rect.width / 2) * strength;
    const y = (event.clientY - rect.top - rect.height / 2) * strength * 0.7;
    element.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
  };

  const handleLeave = () => {
    if (ref.current) ref.current.style.transform = 'translate3d(0, 0, 0)';
  };

  return (
    <Tag
      ref={ref}
      className={`magnetic ${className}`.trim()}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      onPointerCancel={handleLeave}
      {...rest}
    >
      {children}
    </Tag>
  );
}
