import { forwardRef } from 'react';
import { useInView } from '../hooks/useInView.js';

/** Envuelve contenido y lo revela suavemente al entrar al viewport. */
const Reveal = forwardRef(function Reveal(
  {
    as: Tag = 'div',
    children,
    delay = 0,
    className = '',
    threshold = 0.14,
    ...rest
  },
  forwardedRef,
) {
  const [ref, inView] = useInView({ threshold });

  const setRefs = (node) => {
    ref.current = node;
    if (typeof forwardedRef === 'function') forwardedRef(node);
    else if (forwardedRef) forwardedRef.current = node;
  };

  return (
    <Tag
      ref={setRefs}
      className={`reveal ${inView ? 'is-visible' : ''} ${className}`.trim()}
      style={{ '--reveal-delay': `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  );
});

export default Reveal;
