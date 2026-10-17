import { useState } from 'react';

export default function Registro({ onRegistrado, onIrLogin, onVolver }) {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [error, setError] = useState('');

  const manejarEnvio = (e) => {
    e.preventDefault();

    if (password.length < 6) {
      setError('la contraseña debe tener al menos 6 caracteres');
      return;
    }

    if (password !== password2) {
      setError('las contraseñas no coinciden');
      return;
    }

    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    if (usuarios.some((u) => u.email === email)) {
      setError('hay una cuenta con ese correo');
      return;
    }

    const nuevo = { nombre, email, password };
    localStorage.setItem('usuarios', JSON.stringify([...usuarios, nuevo]));

    onRegistrado();
  };

  return (
    <div className="auth-caja">
      <h2>Crear cuenta</h2>

      <form onSubmit={manejarEnvio}>
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

        <label>Contraseña</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <label>Repetir contraseña</label>
        <input
          type="password"
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
          required
        />

        {error && <p className="error">{error}</p>}

        <button type="submit">Registrarme</button>
      </form>

      <p>
        ¿Ya tienes cuenta?{' '}
        <button className="link" onClick={onIrLogin}>Inicia sesión</button>
      </p>
      <button className="link" onClick={onVolver}>Volver a la tienda</button>
    </div>
  );
}