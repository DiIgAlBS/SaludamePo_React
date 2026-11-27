import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from './Footer';

describe('Pruebas Unitarias - Organism: Footer', () => {
  it('1. Muestra la información del proyecto y copyright', () => {
    render(<Footer />);
    expect(screen.getByText(/Proyecto Frontend/i)).toBeTruthy();
  });

  it('2. Renderiza la marca principal Saludame Po', () => {
    render(<Footer />);
    expect(screen.getByText(/Saludame Po/i)).toBeTruthy();
  });

  it('3. Posee la etiqueta semántica de pie de página', () => {
    render(<Footer />);
    expect(screen.getByRole('contentinfo')).toBeTruthy();
  });
});