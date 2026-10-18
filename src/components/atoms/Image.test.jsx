import React from 'react';
import { render, screen } from '@testing-library/react';
import Image from './Image';

describe('Pruebas Unitarias - Atom: Image', () => {
  it('1. Asigna la propiedad src correctamente', () => {
    render(<Image src="/kramer.webp" alt="Stefan Kramer" />);
    const img = screen.getByAltText('Stefan Kramer');
    expect(img.getAttribute('src')).toBe('/kramer.webp');
  });

  it('2. Incluye el texto alternativo alt para accesibilidad', () => {
    render(<Image src="/logo.png" alt="Logo Marca" />);
    expect(screen.getByAltText('Logo Marca')).toBeTruthy();
  });

  it('3. Aplica las clases CSS de Bootstrap recibidas', () => {
    render(<Image src="/foto.jpg" alt="Foto" className="img-fluid" />);
    const img = screen.getByAltText('Foto');
    expect(img.classList.contains('img-fluid')).toBeTrue();
  });
});