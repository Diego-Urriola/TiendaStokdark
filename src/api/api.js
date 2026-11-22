const API_URL = "http://localhost:8080/api/v1";


async function apiFetch(ruta, opciones = {}) {
  const token = localStorage.getItem("token");

  const respuesta = await fetch(`${API_URL}${ruta}`, {
    ...opciones,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...opciones.headers,
    },
  });

  if (!respuesta.ok) {
    let mensaje = `Error ${respuesta.status}`;
    try {
      const err = await respuesta.json();
      if (err.message) mensaje = err.message;
    } catch (e) {
      
    }
    throw new Error(mensaje);
  }

  return respuesta.status === 204 ? null : respuesta.json();
}


export function guardarSesion(datos) {
  localStorage.setItem("token", datos.token);
  localStorage.setItem(
    "usuario",
    JSON.stringify({
      id: datos.id,
      nombre: datos.nombre,
      email: datos.email,
      rol: datos.rol,
    })
  );
}

export function obtenerUsuario() {
  try {
    return JSON.parse(localStorage.getItem("usuario"));
  } catch (e) {
    return null;
  }
}

export function cerrarSesion() {
  localStorage.removeItem("token");
  localStorage.removeItem("usuario");
}


export async function login(email, password) {
  const datos = await apiFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  guardarSesion(datos);
  return datos;
}

export async function registro(nombre, email, password) {
  const datos = await apiFetch("/auth/registro", {
    method: "POST",
    body: JSON.stringify({ nombre, email, password }),
  });
  guardarSesion(datos);
  return datos;
}


export const getProductos = () => apiFetch("/productos");
export const getProducto = (id) => apiFetch(`/productos/${id}`);
export const crearProducto = (producto) =>
  apiFetch("/productos", { method: "POST", body: JSON.stringify(producto) });
export const actualizarProducto = (id, producto) =>
  apiFetch(`/productos/${id}`, { method: "PUT", body: JSON.stringify(producto) });
export const eliminarProducto = (id) =>
  apiFetch(`/productos/${id}`, { method: "DELETE" });


export const getCategorias = () => apiFetch("/categorias");
export const getUsuarios = () => apiFetch("/usuarios");


export const getBoletas = () => apiFetch("/boletas");
export const getBoleta = (id) => apiFetch(`/boletas/${id}`);

// datosEnvio: { nombre, apellidos, correo, calle, departamento, region, comuna, indicaciones }
// items: [{ productoId, cantidad }]
export const crearBoleta = (datosEnvio, items) =>
  apiFetch("/boletas", {
    method: "POST",
    body: JSON.stringify({ ...datosEnvio, items }),
  });