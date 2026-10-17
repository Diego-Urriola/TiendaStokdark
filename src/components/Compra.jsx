import { useState } from 'react';

const regiones = {
  'Región Metropolitana de Santiago': ['Cerrillos', 'Maipú', 'Padre Hurtado', 'Puente Alto', 'Santiago'],
  'Región de Valparaíso': ['Valparaíso', 'Viña del Mar', 'Quilpué']
  
};

export default function Compra({ items, total, usuario, onPagar, onVolver }) {
  const [nombre, setNombre] = useState(usuario.nombre);
  const [apellidos, setApellidos] = useState('');
  const [correo, setCorreo] = useState(usuario.email);
  const [calle, setCalle] = useState('');
  const [departamento, setDepartamento] = useState('');
  const [region, setRegion] = useState('Región Metropolitana de Santiago');
  const [comuna, setComuna] = useState('Cerrillos');
  const [indicaciones, setIndicaciones] = useState('');
  const [numeroTarjeta, setNumeroTarjeta] = useState('');
  const [nombreTarjeta, setNombreTarjeta] = useState('');
  const [vencimiento, setVencimiento] = useState('');
  const [cvv, setCvv] = useState('');

  const cambiarRegion = (e) => {
    setRegion(e.target.value);
    setComuna(regiones[e.target.value][0]);
  };

  const pagar = (e) => {
    e.preventDefault();
    onPagar({ nombre, apellidos, correo, calle, departamento, region, comuna, indicaciones });
  };

  return (
    <div className="container my-4">
      <div className="card shadow-sm">
        <div className="card-header text-center p-3" style={{ backgroundColor: '#0a2a66', color: '#ff4d4d' }}>
          <h3 className="mb-0">Carrito de compra</h3>
        </div>

        <div className="card-body">
          <div className="row">
            <div className="col-12 col-md-5 mb-4">
              <h5>Resumen del carrito</h5>
              <ul className="list-group mb-3">
                {items.map((item) => (
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
                style={{ backgroundColor: '#0a2a66', color: '#c4b7b7' }}
              >
                <h4 className="mb-0">Total a pagar: ${total.toLocaleString('es-CL')}</h4>
              </div>

              <div className="text-center mt-3">
                <button className="link" onClick={onVolver}>Volver a la tienda</button>
              </div>
            </div>

            <div className="col-12 col-md-7">
              <form onSubmit={pagar}>
                <h5>Información del cliente</h5>

                <div className="row">
                  <div className="col-12 col-md-6 mb-3">
                    <label className="form-label">Nombre*</label>
                    <input
                      className="form-control"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-12 col-md-6 mb-3">
                    <label className="form-label">Apellidos*</label>
                    <input
                      className="form-control"
                      value={apellidos}
                      onChange={(e) => setApellidos(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Correo*</label>
                  <input
                    type="email"
                    className="form-control"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                    required
                  />
                </div>

                <h5>Dirección de entrega d</h5>

                <div className="row">
                  <div className="col-12 col-md-6 mb-3">
                    <label className="form-label">Calle</label>
                    <input
                      className="form-control"
                      value={calle}
                      onChange={(e) => setCalle(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-12 col-md-6 mb-3">
                    <label className="form-label">Departamento opcional</label>
                    <input
                      className="form-control"
                      value={departamento}
                      onChange={(e) => setDepartamento(e.target.value)}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-12 col-md-6 mb-3">
                    <label className="form-label">Región*</label>
                    <select className="form-select" value={region} onChange={cambiarRegion}>
                      {Object.keys(regiones).map((r) => (
                        <option key={r} value={r}>{r}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-12 col-md-6 mb-3">
                    <label className="form-label">Comuna*</label>
                    <select
                      className="form-select"
                      value={comuna}
                      onChange={(e) => setComuna(e.target.value)}
                    >
                      {regiones[region].map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Indicaciones para la entrega opcional</label>
                  <textarea
                    className="form-control"
                    value={indicaciones}
                    onChange={(e) => setIndicaciones(e.target.value)}
                  />
                </div>

                <h5>Datos de la tarjeta</h5>

                <div className="row">
                  <div className="col-12 col-md-6 mb-3">
                    <label className="form-label">Número de tarjeta*</label>
                    <input
                      className="form-control"
                      maxLength="12"
                      pattern="[0-9]{12}"
                      title="Deben ser 12 números"
                      value={numeroTarjeta}
                      onChange={(e) => setNumeroTarjeta(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-12 col-md-6 mb-3">
                    <label className="form-label">Nombre en la tarjeta*</label>
                    <input
                      className="form-control"
                      value={nombreTarjeta}
                      onChange={(e) => setNombreTarjeta(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-6 mb-3">
                    <label className="form-label">Vencimiento MM/AA *</label>
                    <input
                      className="form-control"
                      maxLength="5"
                      pattern="[0-9]{2}/[0-9]{2}"
                      title="Formato MM/AA, por ejemplo 08/28"
                      value={vencimiento}
                      onChange={(e) => setVencimiento(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-6 mb-3">
                    <label className="form-label">CVV*</label>
                    <input
                      type="password"
                      className="form-control"
                      maxLength="3"
                      pattern="[0-9]{3}"
                      title="Deben ser 3 números"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="text-center">
                  <button
                    type="submit"
                    className="btn"
                    style={{ backgroundColor: '#0a2a66', color: '#b6b3b3' }}
                  >
                    Pagar ahora ${total.toLocaleString('es-CL')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}