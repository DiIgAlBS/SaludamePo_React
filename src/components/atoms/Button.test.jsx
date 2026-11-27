import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Pruebas Unitarias - Atom: Button', () => {
  it('1. Renderiza el texto del botón correctamente', () => {
    render(<Button>Agregar al Carrito</Button>);
    expect(screen.getByText('Agregar al Carrito')).toBeTruthy();
  });

  it('2. Aplica la clase de variante Bootstrap requerida', () => {
    render(<Button variant="danger">Eliminar</Button>);
    const btn = screen.getByText('Eliminar');
    expect(btn.classList.contains('btn-danger')).toBeTrue();
  });

  it('3. Dispara la función onClick al hacer clic', () => {
    const handleClick = jasmine.createSpy('handleClick');
    render(<Button onClick={handleClick}>Hacer Clic</Button>);
    fireEvent.click(screen.getByText('Hacer Clic'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});