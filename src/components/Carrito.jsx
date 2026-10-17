export default function Carrito({ items, total, onVaciar, onComprar }) {
  return (
    <>
      <h2>Carrito</h2>

      <div id="carrito">
        {items.length === 0 && <p>El carrito está vacío</p>}
        {items.map((item) => (
          <p key={item.id}>
            {item.nombre} x{item.cantidad} - $
            {(item.precio * item.cantidad).toLocaleString('es-CL')}
          </p>
        ))}
      </div>

      <p>
        total: $<span id="total">{total.toLocaleString('es-CL')}</span>
      </p>

      <button onClick={onComprar}>Finalizar compra</button>
      <button onClick={onVaciar}>Vaciar Carrito</button>
    </>
  );
}