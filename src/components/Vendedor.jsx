import { useEffect, useState } from 'react';
import { getBoletas, getBoleta } from '../api/api';

export default function Vendedor({ productos, usuario, onSalir }) {
  const [tab, setTab] = useState('productos');
  const [boletas, setBoletas] = useState([]);
  const [productoSel, setProductoSel] = useState(null);
  const [boletaSel, setBoletaSel] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    getBoletas()
      .then(setBoletas)
      .catch((err) => setError(err.message));
  }, []);

  const verBoleta = async (id) => {
    try {
      setBoletaSel(await getBoleta(id));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container">
      <div className="barra-usuario">
        <span>Vendedor: {usuario.nombre}</span>
        <button onClick={() => setTab('productos')}>Productos</button>
        <button onClick={() => setTab('ordenes')}>Órdenes</button>
        <button onClick={onSalir}>Cerrar sesión</button>
      </div>

      {error && <p className="error">{error}</p>}

      {tab === 'productos' && (
        <>
          <h2>Productos</h2>
          <table className="table">
            <thead>
              <tr><th>ID</th><th>Nombre</th><th>Categoría</th><th>Precio</th><th>Stock</th><th></th></tr>
            </thead>
            <tbody>
              {productos.map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.nombre}</td>
                  <td>{p.categoriaNombre}</td>
                  <td>${p.precio.toLocaleString('es-CL')}</td>
                  <td>{p.stock}</td>
                  <td><button onClick={() => setProductoSel(p)}>Ver detalle</button></td>
                </tr>
              ))}
            </tbody>
          </table>

          {productoSel && (
            <div>
              <h3>{productoSel.nombre}</h3>
              <img src={productoSel.imagen} alt={productoSel.alt} width="150" />
              <p>{productoSel.descripcion}</p>
              <p>Precio: ${productoSel.precio.toLocaleString('es-CL')}</p>
              <p>Stock: {productoSel.stock}</p>
              <p>Categoría: {productoSel.categoriaNombre}</p>
            </div>
          )}
        </>
      )}

      {tab === 'ordenes' && (
        <>
          <h2>Órdenes</h2>
          <table className="table">
            <thead>
              <tr><th>Código</th><th>Fecha</th><th>Cliente</th><th>Total</th><th>Estado</th><th></th></tr>
            </thead>
            <tbody>
              {boletas.map((b) => (
                <tr key={b.id}>
                  <td>{b.codigo}</td>
                  <td>{new Date(b.fecha).toLocaleString('es-CL')}</td>
                  <td>{b.nombre} {b.apellidos}</td>
                  <td>${b.total.toLocaleString('es-CL')}</td>
                  <td>{b.estado}</td>
                  <td><button onClick={() => verBoleta(b.id)}>Ver detalle</button></td>
                </tr>
              ))}
            </tbody>
          </table>
          {boletas.length === 0 && <p>No hay órdenes todavía</p>}

          {boletaSel && (
            <div>
              <h3>Orden {boletaSel.codigo}</h3>
              <p>{boletaSel.nombre} {boletaSel.apellidos} · {boletaSel.correo}</p>
              <p>{boletaSel.calle}, {boletaSel.comuna}, {boletaSel.region}</p>
              <ul>
                {boletaSel.items.map((i) => (
                  <li key={i.id}>{i.nombre} x{i.cantidad}: ${i.subtotal.toLocaleString('es-CL')}</li>
                ))}
              </ul>
              <strong>Total: ${boletaSel.total.toLocaleString('es-CL')}</strong>
            </div>
          )}
        </>
      )}
    </div>
  );
}