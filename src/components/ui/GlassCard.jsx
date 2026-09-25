import { useTilt } from '../../hooks/useTilt';

// Card glass com tilt 3D e brilho interno que segue o mouse.
const GlassCard = ({ as = 'div', tilt = 0, glowSize, glowAlpha, className = '', style, children, ...props }) => {
  const Tag = as;
  const ref = useTilt(tilt);
  const glowVars = {
    ...(glowSize ? { '--glow-size': `${glowSize}px` } : null),
    ...(glowAlpha ? { '--glow-alpha': glowAlpha } : null),
  };

  return (
    <Tag ref={ref} className={`glass relative overflow-hidden ${className}`} style={{ ...glowVars, ...style }} {...props}>
      <div className="glass-glow" aria-hidden="true" />
      {children}
    </Tag>
  );
};

export default GlassCard;
