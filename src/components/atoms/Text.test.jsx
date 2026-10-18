import React from 'react';
import { render, screen } from '@testing-library/react';
import Text from './Text';

describe('Pruebas Unitarias - Atom: Text', () => {
  it('1. Renderiza el contenido de texto correctamente', () => {
    render(<Text>Hola Saludame Po</Text>);
    expect(screen.getByText('Hola Saludame Po')).toBeTruthy();
  });

  it('2. Aplica la clase CSS recibida por props', () => {
    render(<Text className="text-muted">Texto Secundario</Text>);
    const elemento = screen.getByText('Texto Secundario');
    expect(elemento.classList.contains('text-muted')).toBeTrue();
  });

  it('3. Monta el componente sin fallar cuando no hay texto', () => {
    const { container } = render(<Text />);
    expect(container).toBeTruthy();
  });
});