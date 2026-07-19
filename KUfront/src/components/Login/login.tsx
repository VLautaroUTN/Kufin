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

import { GoogleLogin } from '@react-oauth/google';

export interface LoginViewProps {
    open: boolean;
    onClose: (() => void) | undefined;
    onGoogleSuccess: (response: any) => void;
    onGoogleError: () => void;
    loading: boolean;
}

export default function Login({ open, onClose, onGoogleSuccess, onGoogleError, loading }: LoginViewProps) {
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
                {/* Contenedor de Google Login */}
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        mt: 4,
                        // Limitamos el ancho para que el botón no se expanda innecesariamente
                        width: 'fit-content',
                        mx: 'auto',

                        // Estilos para el fondo blanco y esquinas redondeadas
                        backgroundColor: '#FFFFFF',
                        borderRadius: '25px', // Redondez pronunciada para un look suave
                        padding: '2px',       // Ajuste fino del espacio
                        overflow: 'hidden',   // Asegura que no se salga del redondeo

                        // Sombra suave para que destaque sobre el fondo oscuro del modal
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',

                        // Transición para suavizar el aspecto al interactuar
                        transition: 'transform 0.2s ease',
                        '&:hover': {
                            transform: 'scale(1.02)',
                        }
                    }}
                >
                    <GoogleLogin
                        onSuccess={onGoogleSuccess}
                        onError={onGoogleError}
                        theme="outline" // El tema outline usa fondo blanco
                        size="medium"   // Puedes probar 'medium' o 'small' para reducir el tamaño
                        shape="pill"    // Ayuda a que la forma base sea más redondeada
                    />
                </Box>
            </DialogContent>
        </Dialog>)
}