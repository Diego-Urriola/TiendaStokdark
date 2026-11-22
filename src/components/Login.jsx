import { useState } from 'react';
import { login } from '../api/api';

export default function Login({ onLogin, onIrRegistro, onVolver }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);

  const manejarEnvio = async (e) => {
    e.preventDefault();
    setError('');
    setCargando(true);

    try {
      // login() llama al backend y guarda el token y el usuario en localStorage
      const datos = await login(email, password);
      onLogin(datos); // datos = { token, id, nombre, email, rol }
    } catch (err) {
      setError(err.message || 'Correo o contraseña incorrectos');
    } finally {
      setCargando(false);
    }
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

        <button type="submit" disabled={cargando}>
          {cargando ? 'Entrando...' : 'Entrar'}
        </button>
      </form>

      <p>
        ¿No tienes cuenta?{' '}
        <button className="link" onClick={onIrRegistro}>Regístrate</button>
      </p>
      <button className="link" onClick={onVolver}>Volver a la tienda</button>
    </div>
  );
}