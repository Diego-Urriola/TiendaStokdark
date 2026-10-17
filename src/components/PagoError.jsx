export default function PagoError({ orden, onReintentar, onVolver }) {
  return (
    <div className="container my-4">
      <div className="row">
        <div className="col-12 col-lg-9 mx-auto">
          <div className="card p-4 shadow-sm">
            <h3>No se pudo realizar el pago. nro #{orden.numero}</h3>
            <p>Detalle de compra</p>

            <div className="text-center mb-3">
              <button className="btn btn-success btn-lg" onClick={onReintentar}>
                VOLVER A REALIZAR EL PAGO
              </button>
            </div>

            <p><b>Nombre:</b> {orden.nombre} {orden.apellidos}</p>
            <p><b>Correo:</b> {orden.correo}</p>

            <h5>Dirección de entrega de los productos</h5>
            <p><b>Calle:</b> {orden.calle}</p>
            {orden.departamento && <p><b>Departamento:</b> {orden.departamento}</p>}
            <p><b>Región:</b> {orden.region}</p>
            <p><b>Comuna:</b> {orden.comuna}</p>
            {orden.indicaciones && <p><b>Indicaciones:</b> {orden.indicaciones}</p>}

            <table className="table">
              <thead>
                <tr>
                  <th>Imagen</th>
                  <th>Nombre</th>
                  <th>Precio</th>
                  <th>Cantidad</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {orden.items.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <img src={item.imagen} alt={item.alt} style={{ width: '50px' }} />
                    </td>
                    <td>{item.nombre}</td>
                    <td>${item.precio.toLocaleString('es-CL')}</td>
                    <td>{item.cantidad}</td>
                    <td>${(item.precio * item.cantidad).toLocaleString('es-CL')}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h4 className="text-center">Total a pagar: ${orden.total.toLocaleString('es-CL')}</h4>

            <div className="text-center mt-3">
              <button className="link" onClick={onVolver}>Volver a la tienda</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}