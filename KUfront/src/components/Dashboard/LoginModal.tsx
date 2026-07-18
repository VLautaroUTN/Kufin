import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  CircularProgress,
  InputAdornment,
} from '@mui/material';
import {
  CloseRounded,
  EmailRounded,
  LockRounded,
  VisibilityRounded,
  VisibilityOffRounded,
} from '@mui/icons-material';

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
    <Dialog
      open={open}
      onClose={loading ? undefined : onClose}
      maxWidth="xs"
      fullWidth
      slotProps={{
        paper: {
          sx: {
            background: 'rgba(21, 28, 44, 0.75)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: 4,
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
            overflow: 'hidden',
          },
        },
      }}
    >
      {/* Decorative top glow */}
      <Box
        sx={{
          height: '4px',
          background: 'linear-gradient(90deg, #6366F1 0%, #8B5CF6 50%, #06B6D4 100%)',
          width: '100%',
        }}
      />

      <Box sx={{ position: 'absolute', top: 12, right: 12, zIndex: 1 }}>
        <IconButton
          onClick={onClose}
          disabled={loading}
          sx={{
            color: 'rgba(255, 255, 255, 0.5)',
            '&:hover': {
              color: '#FFFFFF',
              background: 'rgba(255, 255, 255, 0.05)',
            },
          }}
        >
          <CloseRounded />
        </IconButton>
      </Box>

      <DialogContent sx={{ p: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          {/* SVG Abstract Logo for Modal header */}
          <Box
            sx={{
              width: 50,
              height: 50,
              mx: 'auto',
              mb: 2,
              background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 16px rgba(99, 102, 241, 0.3)',
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2L2 7L12 12L22 7L12 2Z"
                stroke="#FFFFFF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 17L12 22L22 17"
                stroke="#FFFFFF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 12L12 17L22 12"
                stroke="#FFFFFF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Box>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 800,
              letterSpacing: '-0.5px',
              background: 'linear-gradient(90deg, #FFFFFF 0%, #D1D5DB 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Bienvenido a Kufin
          </Typography>
          <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.5)', mt: 0.5 }}>
            Ingresa a tu cuenta para gestionar tus finanzas
          </Typography>
        </Box>

        <Box component="form" onSubmit={handleSubmit}>
          {error && (
            <Box
              sx={{
                mb: 2,
                p: 1.5,
                bgcolor: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.2)',
                borderRadius: 2,
              }}
            >
              <Typography variant="caption" sx={{ color: '#F87171', display: 'block', textAlign: 'center' }}>
                {error}
              </Typography>
            </Box>
          )}

          <TextField
            fullWidth
            label="Correo Electrónico"
            variant="outlined"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            margin="normal"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start" sx={{ color: 'rgba(255, 255, 255, 0.3)' }}>
                    <EmailRounded fontSize="small" />
                  </InputAdornment>
                ),
              },
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                color: '#FFFFFF',
                borderRadius: 2.5,
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                transition: 'all 0.3s ease',
                '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.1)' },
                '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.2)' },
                '&.Mui-focused fieldset': { borderColor: '#6366F1' },
              },
              '& .MuiInputLabel-root': {
                color: 'rgba(255, 255, 255, 0.4)',
                '&.Mui-focused': { color: '#6366F1' },
              },
            }}
          />

          <TextField
            fullWidth
            label="Contraseña"
            variant="outlined"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            margin="normal"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start" sx={{ color: 'rgba(255, 255, 255, 0.3)' }}>
                    <LockRounded fontSize="small" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      sx={{ color: 'rgba(255, 255, 255, 0.4)' }}
                    >
                      {showPassword ? <VisibilityOffRounded fontSize="small" /> : <VisibilityRounded fontSize="small" />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
            sx={{
              mb: 4,
              '& .MuiOutlinedInput-root': {
                color: '#FFFFFF',
                borderRadius: 2.5,
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                transition: 'all 0.3s ease',
                '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.1)' },
                '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.2)' },
                '&.Mui-focused fieldset': { borderColor: '#6366F1' },
              },
              '& .MuiInputLabel-root': {
                color: 'rgba(255, 255, 255, 0.4)',
                '&.Mui-focused': { color: '#6366F1' },
              },
            }}
          />

          <Button
            fullWidth
            type="submit"
            variant="contained"
            disabled={loading}
            sx={{
              py: 1.5,
              borderRadius: 2.5,
              background: 'linear-gradient(90deg, #6366F1 0%, #8B5CF6 100%)',
              fontWeight: 700,
              textTransform: 'none',
              boxShadow: '0 8px 20px rgba(99, 102, 241, 0.25)',
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 12px 24px rgba(99, 102, 241, 0.4)',
                background: 'linear-gradient(90deg, #4F46E5 0%, #7C3AED 100%)',
              },
              '&:disabled': {
                background: 'rgba(255, 255, 255, 0.1)',
                color: 'rgba(255, 255, 255, 0.3)',
              },
            }}
          >
            {loading ? <CircularProgress size={24} sx={{ color: '#FFFFFF' }} /> : 'Iniciar Sesión'}
          </Button>

          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.4)' }}>
              ¿No tienes cuenta? <span style={{ color: '#6366F1', cursor: 'pointer', fontWeight: 600 }}>Regístrate</span>
            </Typography>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
