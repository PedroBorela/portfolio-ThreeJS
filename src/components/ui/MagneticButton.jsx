import { useMagnetic } from '../../hooks/useMagnetic';

// Link ou botão magnético. `as="button"` para botões; o padrão é <a>.
const MagneticButton = ({ as = 'a', strength = 0.3, children, ...props }) => {
  const Tag = as;
  const ref = useMagnetic(strength);
  return (
    <Tag ref={ref} {...props}>
      {children}
    </Tag>
  );
};

export default MagneticButton;
