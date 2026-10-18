import React from 'react';
import { Form } from 'react-bootstrap';

function FormField({ label, error, children, className = 'mb-3' }) {
  return (
    <Form.Group className={className}>
      {label && <Form.Label className="fw-semibold">{label}</Form.Label>}
      {children}
      {error && (
        <Form.Control.Feedback type="invalid" style={{ display: 'block' }}>
          {error}
        </Form.Control.Feedback>
      )}
    </Form.Group>
  );
}
export default FormField;