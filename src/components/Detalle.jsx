import { useState } from 'react';

export default function Detalle({ producto, onAgregar, onVolver }) {
  const [agregado, setAgregado] = useState(false);

  const agregar = () => {
    onAgregar(producto);
    setAgregado(true);
  };

  return (
    <div className="container detalle-caja">
      <button className="link" onClick={onVolver}>Volver a la tienda</button>

      <div className="row mt-3">
        <div className="col-12 col-md-6">
          <img src={producto.imagen} alt={producto.alt} className="img-fluid rounded" />
        </div>

        <div className="col-12 col-md-6">
          <h2>{producto.nombre}</h2>
          <h4>${producto.precio.toLocaleString('es-CL')}</h4>
          <p>{producto.descripcion}</p>

          <button className="btn btn-dark" onClick={agregar}>
            Agregar al carrito
          </button>

          {agregado && <p className="mt-3">Producto agregado al carrito</p>}
        </div>
      </div>
    </div>
  );
}