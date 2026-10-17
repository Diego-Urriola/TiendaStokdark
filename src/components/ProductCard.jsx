export default function ProductCard({ producto, onAgregar, onVer }) {
  return (
    <div className="card h-100 text-center shadow-sm">
      <div className="imagen-caja" onClick={() => onVer(producto)}>
        <img src={producto.imagen} alt={producto.alt} className="card-img-top" />
        <div className="resena">
          <p>{producto.descripcion}</p>
        </div>
      </div>

      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{producto.nombre}</h5>
        <p className="fw-bold">${producto.precio.toLocaleString('es-CL')}</p>
        <button className="btn btn-outline-dark mb-2 mt-auto" onClick={() => onVer(producto)}>
          Ver detalle
        </button>
        <button className="btn btn-dark" onClick={() => onAgregar(producto)}>
          Agregar al carrito
        </button>
      </div>
    </div>
  );
}