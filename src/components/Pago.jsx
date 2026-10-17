export default function Pago({ orden, onVolver }) {
  return (
    <div className="container my-4">
      <div className="card shadow-sm">
        <div className="card-header bg-success text-white text-center p-3">
          <h3 className="mb-1">¡Compra realizada!</h3>
          <p className="mb-0">Compra nro #{orden.numero} | Código orden: {orden.codigo}</p>
        </div>

        <div className="card-body">
          <div className="row">
            <div className="col-12 col-md-5 mb-4">
              <h5>Datos del cliente</h5>
              <p className="mb-1">{orden.nombre} {orden.apellidos}</p>
              <p>{orden.correo}</p>

              <h5>Dirección de entrega</h5>
              <p className="mb-1">
                {orden.calle}
                {orden.departamento && ', Depto ' + orden.departamento}
              </p>
              <p className="mb-1">{orden.comuna}, {orden.region}</p>
              {orden.indicaciones && (
                <p className="text-muted">Indicaciones: {orden.indicaciones}</p>
              )}
            </div>

            <div className="col-12 col-md-7">
              <h5>Resumen de la compra</h5>
              <ul className="list-group mb-3">
                {orden.items.map((item) => (
                  <li
                    key={item.id}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <span className="d-flex align-items-center">
                      <img
                        src={item.imagen}
                        alt={item.alt}
                        style={{ width: '45px' }}
                        className="me-3 rounded"
                      />
                      {item.nombre} x{item.cantidad}
                    </span>
                    <b>${(item.precio * item.cantidad).toLocaleString('es-CL')}</b>
                  </li>
                ))}
              </ul>

              <div
                className="text-center p-3 rounded"
                style={{ backgroundColor: '#0a2a66', color: '#ff4d4d' }}
              >
                <h4 className="mb-0">Total pagado: ${orden.total.toLocaleString('es-CL')}</h4>
              </div>
            </div>
          </div>

          <div className="text-center mt-4">
            <button
              className="btn btn-success me-2"
              onClick={() => alert('Boleta enviada a ' + orden.correo)}
            >
              Enviar boleta por email
            </button>
            <button className="link" onClick={onVolver}>Volver a la tienda</button>
          </div>
        </div>
      </div>
    </div>
  );
}