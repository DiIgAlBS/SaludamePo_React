import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './Navbar';

describe('Pruebas Unitarias - Organism: Navbar', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('1. Renderiza el título de la marca principal', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
    expect(screen.getByText('Saludame Po')).toBeTruthy();
  });

  it('2. Muestra el botón de Iniciar Sesión sin usuario activo', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
    expect(screen.getByText('Iniciar Sesión')).toBeTruthy();
  });

  it('3. Despliega el nombre del usuario al haber sesión en localStorage', () => {
    localStorage.setItem('usuarioLogueado', JSON.stringify({ nombre: 'Diego', rol: 'user' }));
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
    expect(screen.getByText(/Diego/i)).toBeTruthy();
  });
});