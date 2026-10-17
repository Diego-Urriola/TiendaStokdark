 it('ejecuta la función onClick al hacer clic', () => {
   const funcion = jasmine.createSpy('funcion');
   render(<Button onClick={funcion}>Haz click</Button>);

   fireEvent.click(screen.getByText('Haz click'));

   expect(funcion).toHaveBeenCalled();
 });