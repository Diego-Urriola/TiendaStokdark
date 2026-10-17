import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../components/atoms/Button';


describe('Button Component', () => {
 it('renderiza el botón correctamente', () => {
   const { getByText } = render(<Button>Haz click</Button>);
   expect(getByText('Haz click')).toBeTruthy(); // Matcher básico: verifica que el elemento existe
 });


 it('aplica los props correctamente', () => {
   render(<Button variant="primary">Haz click</Button>);
   const button = screen.getByText('Haz click');
   expect(button).toHaveClass('btn-primary');
 });


 it('ejecuta la función onClick al hacer clic', () => {
   const funcion = jasmine.createSpy('funcion');
   render(<Button onClick={funcion}>Haz click</Button>);

   fireEvent.click(screen.getByText('Haz click'));

   expect(funcion).toHaveBeenCalled();
 });
});