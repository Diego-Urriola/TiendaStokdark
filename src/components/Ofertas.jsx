export default function Ofertas({ productos, onAgregar, onVolver }) {
  const idsOferta = [1, 5, 8];
  const descuento = 20;

  const enOferta = productos.filter((p) => idsOferta.includes(p.id));

  const agregar = (p) => {
    const precioOferta = p.precio - (p.precio * descuento) / 100;
    onAgregar({ ...p, precio: precioOferta });
  };

  return (
    <div className="container my-4">
      <button className="link" onClick={onVolver}>Volver a la tienda</button>

      <h2 className="text-center mt-3">Ofertas</h2>
      <p className="text-center">{descuento}% de descuento en productos seleccionados</p>

      <div className="row g-3">
        {enOferta.map((p) => (
          <div className="col-6 col-md-4" key={p.id}>
            <div className="card h-100 text-center shadow-sm">
              <img src={p.imagen} alt={p.alt} className="card-img-top" />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{p.nombre}</h5>
                <p>
                  <s>${p.precio.toLocaleString('es-CL')}</s>
                </p>
                <p className="fw-bold">
                  ${(p.precio - (p.precio * descuento) / 100).toLocaleString('es-CL')}
                </p>
                <button className="btn btn-dark mt-auto" onClick={() => agregar(p)}>
                  Agregar al carrito
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {enOferta.length === 0 && (
        <p className="text-center mt-4">No hay ofertas por ahora</p>
      )}
    </div>
  );
}