import { useState } from 'react';

export default function Contacto({ onVolver }) {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [mensaje, setMensaje] = useState('');

  const enviar = (e) => {
    e.preventDefault();
    alert('Gracias por escribirnos ' + nombre);
    setNombre('');
    setEmail('');
    setMensaje('');
  };

  return (
    <div className="auth-caja">
      <h2>Contacto</h2>

      <p>Correo: Stokdark@gmail.com</p>
      <p>Atención al cliente: +56 999191782</p>

      <form onSubmit={enviar}>
        <label>Nombre</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />

        <label>Correo</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Mensaje</label>
        <textarea
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          required
        />

        <button type="submit">Enviar</button>
      </form>

      <button className="link" onClick={onVolver}>Volver a la tienda</button>
    </div>
  );
}