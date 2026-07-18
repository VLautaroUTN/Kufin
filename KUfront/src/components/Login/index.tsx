import { useState } from 'react';
import Login from './login';

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
  onLoginSuccess: (username: string) => void;
}

export function LoginModal({ open, onClose, onLoginSuccess }: LoginModalProps) {
  const [email, setEmail] = useState('lautaro@kufin.com');
  const [password, setPassword] = useState('kufin2026');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Por favor, completa todos los campos.');
      return;
    }

    setLoading(true);
    setError('');

    // TODO(Backend): Reemplazar el setTimeout por una petición real (ej. fetch('/api/login', { method: 'POST', body: { email, password } }))
    // Si la respuesta es exitosa, se guarda el token y se llama a onLoginSuccess.
    // Si falla, se muestra el error devuelto por la API mediante setError().
    setTimeout(() => {
      setLoading(false);
      onLoginSuccess('Lautaro'); // El nombre debería venir de la respuesta del backend
      onClose();
    }, 1200);
  };

  return (
    <Login
      open={open}
      onClose={loading ? undefined : onClose}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      showPassword={showPassword}
      setShowPassword={setShowPassword}
      loading={loading}
      error={error}
      handleSubmit={handleSubmit}
    />
  );
}
