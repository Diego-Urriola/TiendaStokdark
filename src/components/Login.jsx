import { useState } from 'react';

export default function Login({ onLogin, onIrRegistro, onVolver }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const manejarEnvio = (e) => {
    e.preventDefault();

    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const encontrado = usuarios.find(
      (u) => u.email === email && u.password === password
    );

    if (!encontrado) {
      setError('Correo o contraseña incorrectos');
      return;
    }

    onLogin(encontrado);
  };

  return (
    <div className="auth-caja">
      <h2>Iniciar sesión</h2>

      <form onSubmit={manejarEnvio}>
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

        {error && <p className="error">{error}</p>}

        <button type="submit">Entrar</button>
      </form>

      <p>
        ¿No tienes cuenta?{' '}
        <button className="link" onClick={onIrRegistro}>Regístrate</button>
      </p>
      <button className="link" onClick={onVolver}>Volver a la tienda</button>
    </div>
  );
}