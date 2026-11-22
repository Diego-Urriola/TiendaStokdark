import { useState, useEffect } from 'react';
import {
  crearProducto,
  actualizarProducto,
  eliminarProducto,
  getCategorias,
  getUsuarios,
} from '../api/api';

const azul = '#0a2a66';

export default function Admin({ productos, onCambio, onVolver }) {
  const [seccion, setSeccion] = useState('dashboard');
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [imagen, setImagen] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [stock, setStock] = useState('');
  const [categoriaId, setCategoriaId] = useState('');
  const [editandoId, setEditandoId] = useState(null);
  const [categorias, setCategorias] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    getCategorias()
      .then((lista) => {
        setCategorias(lista);
        if (lista.length > 0) setCategoriaId(String(lista[0].id));
      })
      .catch((err) => setError(err.message));

    getUsuarios()
      .then(setUsuarios)
      .catch((err) => setError(err.message));
  }, []);

  let masCaro = null;
  for (let i = 0; i < productos.length; i++) {
    if (masCaro === null || productos[i].precio > masCaro.precio) {
      masCaro = productos[i];
    }
  }

  const limpiarFormulario = () => {
    setNombre('');
    setPrecio('');
    setImagen('');
    setDescripcion('');
    setStock('');
    setCategoriaId(categorias.length > 0 ? String(categorias[0].id) : '');
    setEditandoId(null);
  };

  const guardar = async (e) => {
    e.preventDefault();
    setError('');

    const producto = {
      nombre: nombre,
      precio: Number(precio),
      imagen: imagen,
      descripcion: descripcion,
      stock: Number(stock),
      categoriaId: Number(categoriaId),
    };

    try {
      if (editandoId === null) {
        await crearProducto(producto);
      } else {
        await actualizarProducto(editandoId, producto);
      }
      onCambio();
      limpiarFormulario();
    } catch (err) {
      setError(err.message);
    }
  };

  const editar = (p) => {
    setEditandoId(p.id);
    setNombre(p.nombre);
    setPrecio(p.precio);
    setImagen(p.imagen);
    setDescripcion(p.descripcion || '');
    setStock(p.stock);
    setCategoriaId(String(p.categoriaId));
  };

  const borrar = async (id) => {
    if (window.confirm('¿Eliminar este producto?')) {
      try {
        await eliminarProducto(id);
        onCambio();
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const estiloBoton = (nombreSeccion) => ({
    backgroundColor: seccion === nombreSeccion ? azul : 'transparent',
    color: seccion === nombreSeccion ? 'white' : azul,
    border: '1px solid ' + azul,
    borderRadius: '8px',
  });

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 col-md-3 col-lg-2 p-3 border-end bg-white">
          <h5 style={{ color: azul }}>Panel administrador</h5>
          <hr />

          <button className="w-100 mb-2 text-start" style={estiloBoton('dashboard')} onClick={() => setSeccion('dashboard')}>
            Dashboard
          </button>
          <button className="w-100 mb-2 text-start" style={estiloBoton('productos')} onClick={() => setSeccion('productos')}>
            Productos
          </button>
          <button className="w-100 mb-2 text-start" style={estiloBoton('usuarios')} onClick={() => setSeccion('usuarios')}>
            Usuarios
          </button>

          <hr />
          <button
            className="w-100"
            style={{ backgroundColor: azul, color: 'white', borderRadius: '8px' }}
            onClick={onVolver}
          >
            Volver a la tienda
          </button>
        </div>

        <div className="col-12 col-md-9 col-lg-10 p-4">
          {error && <p className="error">{error}</p>}

          {seccion === 'dashboard' && (
            <>
              <h2 style={{ color: azul }}>Dashboard</h2>
              <p>Resumen de la tienda</p>

              <div className="row g-3 mb-4">
                <div className="col-12 col-md-4">
                  <div className="p-3 rounded text-white" style={{ backgroundColor: azul }}>
                    <p className="mb-1">Productos</p>
                    <h2 className="mb-0">{productos.length}</h2>
                  </div>
                </div>
                <div className="col-12 col-md-4">
                  <div className="p-3 rounded text-white" style={{ backgroundColor: azul }}>
                    <p className="mb-1">Usuarios registrados</p>
                    <h2 className="mb-0">{usuarios.length}</h2>
                  </div>
                </div>
                <div className="col-12 col-md-4">
                  <div className="p-3 rounded text-white" style={{ backgroundColor: azul }}>
                    <p className="mb-1">Producto más caro</p>
                    <h5 className="mb-0">
                      {masCaro ? masCaro.nombre : 'Sin productos'}
                    </h5>
                    {masCaro && <p className="mb-0">${masCaro.precio.toLocaleString('es-CL')}</p>}
                  </div>
                </div>
              </div>

              <div className="row g-3">
                <div className="col-12 col-md-6">
                  <div className="card h-100 text-center p-3 shadow-sm">
                    <h5 style={{ color: azul }}>Productos</h5>
                    <p>Agregar, editar y eliminar los productos de la tienda.</p>
                    <button
                      className="mt-auto"
                      style={{ backgroundColor: azul, color: 'white' }}
                      onClick={() => setSeccion('productos')}
                    >
                      Ir a productos
                    </button>
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="card h-100 text-center p-3 shadow-sm">
                    <h5 style={{ color: azul }}>Usuarios</h5>
                    <p>Ver las personas que se registraron en la tienda.</p>
                    <button
                      className="mt-auto"
                      style={{ backgroundColor: azul, color: 'white' }}
                      onClick={() => setSeccion('usuarios')}
                    >
                      Ir a usuarios
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}

          {seccion === 'productos' && (
            <>
              <h2 style={{ color: azul }}>Productos</h2>

              <form onSubmit={guardar} className="admin-form mb-3">
                <input
                  placeholder="Nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                />
                <input
                  type="number"
                  placeholder="Precio"
                  value={precio}
                  onChange={(e) => setPrecio(e.target.value)}
                  required
                />
                <input
                  placeholder="/Imagenes/archivo.jpg"
                  value={imagen}
                  onChange={(e) => setImagen(e.target.value)}
                  required
                />
                <input
                  placeholder="Descripción"
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                />
                <input
                  type="number"
                  placeholder="Stock"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  required
                />
                <select
                  value={categoriaId}
                  onChange={(e) => setCategoriaId(e.target.value)}
                  required
                >
                  {categorias.map((c) => (
                    <option key={c.id} value={c.id}>{c.nombre}</option>
                  ))}
                </select>
                <button type="submit" style={{ backgroundColor: azul, color: 'white' }}>
                  {editandoId === null ? 'Agregar producto' : 'Guardar cambios'}
                </button>
                {editandoId !== null && (
                  <button type="button" className="link" onClick={limpiarFormulario}>
                    Cancelar
                  </button>
                )}
              </form>

              <ul className="admin-lista">
                {productos.map((p) => (
                  <li key={p.id}>
                    <span>{p.nombre} - ${p.precio} - Stock: {p.stock}</span>
                    <span>
                      <button className="link" onClick={() => editar(p)}>Editar</button>
                      <button className="link" onClick={() => borrar(p.id)}>Eliminar</button>
                    </span>
                  </li>
                ))}
              </ul>
            </>
          )}

          {seccion === 'usuarios' && (
            <>
              <h2 style={{ color: azul }}>Usuarios</h2>

              {usuarios.length === 0 && <p>Todavía no hay usuarios registrados</p>}

              {usuarios.length > 0 && (
                <table className="table">
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Correo</th>
                      <th>Rol</th>
                    </tr>
                  </thead>
                  <tbody>
                    {usuarios.map((u) => (
                      <tr key={u.id}>
                        <td>{u.nombre}</td>
                        <td>{u.email}</td>
                        <td>{u.rol}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}