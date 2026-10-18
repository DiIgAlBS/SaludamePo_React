import { Button as BootstrapButton } from 'react-bootstrap';

export function Button({ children, variant = 'danger', ...props }) {
  return <BootstrapButton variant={variant} {...props}>{children}</BootstrapButton>;
}
export default Button;