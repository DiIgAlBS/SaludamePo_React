import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FormField from './FormField';

describe('Pruebas Unitarias - Molecule: FormField', () => {
  it('1. Renderiza la etiqueta (label) del campo', () => {
    render(<FormField label="Correo Electrónico" />);
    expect(screen.getByText('Correo Electrónico')).toBeTruthy();
  });

  it('2. Dispara la función onChange al escribir un valor', () => {
    const handleChange = jasmine.createSpy('handleChange');
    const { container } = render(
      <FormField label="Nombre">
        <input type="text" onChange={handleChange} />
      </FormField>
    );
    const input = container.querySelector('input');
    if (input) {
      fireEvent.change(input, { target: { value: 'Diego' } });
      expect(handleChange).toHaveBeenCalled();
    }
  });

  it('3. Muestra el mensaje de validación de error cuando existe', () => {
    render(<FormField label="Clave" error="Clave requerida" />);
    expect(screen.getByText('Clave requerida')).toBeTruthy();
  });
});