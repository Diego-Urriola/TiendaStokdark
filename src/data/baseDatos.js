import { productos } from './productos';

function obtenerProductos() {
  let guardado = localStorage.getItem('productos');

  if (guardado) {
    return JSON.parse(guardado);
  }

  localStorage.setItem('productos', JSON.stringify(productos));
  return productos;
}

function crearProducto(nuevo) {
  let lista = obtenerProductos();

  if (lista.length > 0) {
    nuevo.id = lista[lista.length - 1].id + 1;
  } else {
    nuevo.id = 1;
  }

  lista.push(nuevo);
  localStorage.setItem('productos', JSON.stringify(lista));
}

function actualizarProducto(id, datos) {
  let lista = obtenerProductos();

  for (let i = 0; i < lista.length; i++) {
    if (lista[i].id === id) {
      lista[i].nombre = datos.nombre;
      lista[i].precio = datos.precio;
      lista[i].imagen = datos.imagen;
      lista[i].alt = datos.nombre;
    }
  }

  localStorage.setItem('productos', JSON.stringify(lista));
}

function eliminarProducto(id) {
  let lista = obtenerProductos();
  let nuevaLista = [];

  for (let i = 0; i < lista.length; i++) {
    if (lista[i].id !== id) {
      nuevaLista.push(lista[i]);
    }
  }

  localStorage.setItem('productos', JSON.stringify(nuevaLista));
}

export { obtenerProductos, crearProducto, actualizarProducto, eliminarProducto };