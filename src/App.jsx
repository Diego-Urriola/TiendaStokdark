import { useState, useEffect } from 'react';
import { getProductos, crearBoleta, obtenerUsuario, cerrarSesion as limpiarSesion } from './api/api';
import ProductCard from './components/ProductCard';
import Carrito from './components/Carrito';
import Login from './components/Login';
import Registro from './components/Registro';
import Admin from './components/Admin';
import Vendedor from './components/Vendedor';
import Detalle from './components/Detalle';
import Contacto from './components/Contacto';
import Ofertas from './components/Ofertas';
import Compra from './components/Compra';
import Pago from './components/Pago';
import PagoError from './components/PagoError';

export default function App() {
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [usuario, setUsuario] = useState(() => obtenerUsuario());
  const [vista, setVista] = useState(() =>
    obtenerUsuario()?.rol === 'VENDEDOR' ? 'vendedor' : 'tienda'
  );
  const [productoActual, setProductoActual] = useState(null);
  const [busqueda, setBusqueda] = useState('');
  const [orden, setOrden] = useState('ninguno');
  const [ultimaOrden, setUltimaOrden] = useState(null);

  const actualizarLista = () => {
    getProductos()
      .then(setProductos)
      .catch((err) => console.error('Error cargando productos:', err.message));
  };

  useEffect(() => {
    actualizarLista();
  }, []);

  const agregarCarrito = (producto) => {
    setCarrito((prev) => {
      const existe = prev.find((p) => p.id === producto.id);
      if (existe) {
        return prev.map((p) =>
          p.id === producto.id ? { ...p, cantidad: p.cantidad + 1 } : p
        );
      }
      return [...prev, { ...producto, cantidad: 1 }];
    });
  };

  const vaciarCarrito = () => setCarrito([]);

  const total = carrito.reduce((suma, p) => suma + p.precio * p.cantidad, 0);

  const comprar = () => {
    if (carrito.length === 0) {
      alert('El carrito está vacío');
      return;
    }

    if (!usuario) {
      alert('Debes iniciar sesión o registrarte para pagar');
      setVista('login');
      return;
    }

    setVista('compra');
  };

  const pagar = async (datos) => {
    try {
      const items = carrito.map((p) => ({ productoId: p.id, cantidad: p.cantidad }));
      const boleta = await crearBoleta(datos, items);
      setUltimaOrden(boleta);

      if (boleta.estado === 'RECHAZADO') {
        setVista('pagoError');
        return;
      }

      setCarrito([]);
      actualizarLista();
      setVista('pagoCorrecto');
    } catch (err) {
      alert(err.message);
    }
  };

  const iniciarSesion = (user) => {
    setUsuario(user);
    setVista(user.rol === 'VENDEDOR' ? 'vendedor' : 'tienda');
  };

  const cerrarSesion = () => {
    limpiarSesion();
    setUsuario(null);
    setCarrito([]);
    setVista('tienda');
  };

  const verDetalle = (producto) => {
    setProductoActual(producto);
    setVista('detalle');
  };

  let productosFiltrados = productos.filter((p) =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  if (orden === 'menor') {
    productosFiltrados = [...productosFiltrados].sort((a, b) => a.precio - b.precio);
  }

  if (orden === 'mayor') {
    productosFiltrados = [...productosFiltrados].sort((a, b) => b.precio - a.precio);
  }

  if (usuario?.rol === 'VENDEDOR') {
    return <Vendedor productos={productos} usuario={usuario} onSalir={cerrarSesion} />;
  }

  if (vista === 'login') {
    return (
      <Login
        onLogin={iniciarSesion}
        onIrRegistro={() => setVista('registro')}
        onVolver={() => setVista('tienda')}
      />
    );
  }

  if (vista === 'registro') {
    return (
      <Registro
        onRegistrado={iniciarSesion}
        onIrLogin={() => setVista('login')}
        onVolver={() => setVista('tienda')}
      />
    );
  }

  if (vista === 'admin' && usuario?.rol === 'ADMIN') {
    return (
      <Admin
        productos={productos}
        onCambio={actualizarLista}
        onVolver={() => setVista('tienda')}
      />
    );
  }

  if (vista === 'detalle') {
    return (
      <Detalle
        producto={productoActual}
        onAgregar={agregarCarrito}
        onVolver={() => setVista('tienda')}
      />
    );
  }

  if (vista === 'contacto') {
    return <Contacto onVolver={() => setVista('tienda')} />;
  }

  if (vista === 'ofertas') {
    return (
      <Ofertas
        productos={productos}
        onAgregar={agregarCarrito}
        onVolver={() => setVista('tienda')}
      />
    );
  }

  if (vista === 'compra') {
    return (
      <Compra
        items={carrito}
        total={total}
        usuario={usuario}
        onPagar={pagar}
        onVolver={() => setVista('tienda')}
      />
    );
  }

  if (vista === 'pagoCorrecto') {
    return <Pago orden={ultimaOrden} onVolver={() => setVista('tienda')} />;
  }

  if (vista === 'pagoError') {
    return (
      <PagoError
        orden={ultimaOrden}
        onReintentar={() => setVista('compra')}
        onVolver={() => setVista('tienda')}
      />
    );
  }

  return (
    <>
      <div className="barra-usuario">
        <button onClick={() => setVista('ofertas')}>Ofertas</button>
        <button onClick={() => setVista('contacto')}>Contacto</button>
        {usuario ? (
          <>
            <span>Hola, {usuario.nombre}</span>
            {usuario.rol === 'ADMIN' && (
              <button onClick={() => setVista('admin')}>Administrar</button>
            )}
            <button onClick={cerrarSesion}>Cerrar sesión</button>
          </>
        ) : (
          <>
            <button onClick={() => setVista('login')}>Iniciar sesión</button>
            <button onClick={() => setVista('registro')}>Registrarse</button>
          </>
        )}
      </div>

      <div className="logo">
        <img src="/Imagenes/logo.jpg" alt="Logo de la tienda" />
      </div>

      <div className="container filtros">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar producto..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
        <select
          className="form-select"
          value={orden}
          onChange={(e) => setOrden(e.target.value)}
        >
          <option value="ninguno">Ordenar por</option>
          <option value="menor">Precio: menor a mayor</option>
          <option value="mayor">Precio: mayor a menor</option>
        </select>
      </div>

      <div className="container">
        <div className="row g-3">
          {productosFiltrados.map((p) => (
            <div className="col-6 col-md-4" key={p.id}>
              <ProductCard producto={p} onAgregar={agregarCarrito} onVer={verDetalle} />
            </div>
          ))}
        </div>

        {productosFiltrados.length === 0 && (
          <p className="text-center mt-4">No se encontraron productos</p>
        )}
      </div>

      <div className="carrito-caja">
        <Carrito
          items={carrito}
          total={total}
          onVaciar={vaciarCarrito}
          onComprar={comprar}
        />
      </div>
    </>
  );
}