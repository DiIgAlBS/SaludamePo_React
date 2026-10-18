import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import PageTemplate from './PageTemplate';

describe('Pruebas Unitarias - Template: PageTemplate', () => {
  it('1. Muestra el Navbar en la parte superior del maquetado', () => {
    render(
      <BrowserRouter>
        <PageTemplate><div>Vista Principal</div></PageTemplate>
      </BrowserRouter>
    );
    expect(screen.getByText('Saludame Po')).toBeTruthy();
  });

  it('2. Renderiza el contenido hijo (children) dentro de la plantilla', () => {
    render(
      <BrowserRouter>
        <PageTemplate><div data-testid="contenido-test">Contenido de la página</div></PageTemplate>
      </BrowserRouter>
    );
    expect(screen.getByTestId('contenido-test')).toBeTruthy();
  });

  it('3. Incluye el Footer en la parte inferior', () => {
    render(
      <BrowserRouter>
        <PageTemplate><div>Vista Principal</div></PageTemplate>
      </BrowserRouter>
    );
    expect(screen.getByRole('contentinfo')).toBeTruthy();
  });
});