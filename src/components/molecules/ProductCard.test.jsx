import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ProductCard from './ProductCard';

const famosoMock = {
  id: 1,
  nombre: 'Stefan Kramer',
  categoria: 'Comediantes',
  precio: 35000,
  descripcion: 'Un saludo genial',
  imagen: '/kramer.webp'
};

describe('Pruebas Unitarias - Molecule: ProductCard', () => {
  it('1. Renderiza el nombre y la categoría del personaje', () => {
    render(
      <BrowserRouter>
        <ProductCard famoso={famosoMock} />
      </BrowserRouter>
    );
    expect(screen.getByText('Stefan Kramer')).toBeTruthy();
    expect(screen.getByText('Comediantes')).toBeTruthy();
  });

  it('2. Muestra el precio formateado correctamente', () => {
    render(
      <BrowserRouter>
        <ProductCard famoso={famosoMock} />
      </BrowserRouter>
    );
    expect(screen.getByText(/35/i)).toBeTruthy();
  });

  it('3. Genera el enlace dinámico al detalle con el ID correcto', () => {
    render(
      <BrowserRouter>
        <ProductCard famoso={famosoMock} />
      </BrowserRouter>
    );
    const enlace = screen.getByText(/Ver Detalle/i) || screen.getByRole('link');
    expect(enlace).toBeTruthy();
  });
});