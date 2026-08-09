import {
    Dialog,
    DialogContent,
    Box,
    Typography,
    IconButton,
} from '@mui/material';
import { CloseRounded } from '@mui/icons-material';
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../Contexts/AuthContext';


export interface LoginViewProps {
    open: boolean;
    onClose: (() => void) | undefined;
    loading: boolean;
}

export default function LoginModal({ open, onClose, loading }: LoginViewProps) {
    const { login } = useAuth();

    return (
        // Modal principal
        <Dialog open={open} onClose={loading ? undefined : onClose} maxWidth="xs" fullWidth slotProps={{
                paper: {
                    sx: {
                        background: 'rgba(21, 28, 44, 0.75)',
                        backdropFilter: 'blur(20px)',
                        WebkitBackdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        borderRadius: 4,
                        boxShadow:
                            '0 20px 40px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                        overflow: 'hidden',
                    },
                },
            }}>

            <Box sx={{height: '4px', background: 'linear-gradient(90deg, #6366F1 0%, #8B5CF6 50%, #06B6D4 100%)', width: '100%'}}/>
            <Box sx={{position: 'absolute', top: 12, right: 12, zIndex: 1}}>

                <IconButton onClick={onClose} disabled={loading} sx={{
                        color: 'rgba(255, 255, 255, 0.5)',
                        '&:hover': {
                            color: '#FFFFFF',
                            background: 'rgba(255, 255, 255, 0.05)',
                        },
                    }}>
                    <CloseRounded />
                </IconButton>
            </Box>

            <DialogContent sx={{p: 4,}}>
                <Box
                    sx={{
                        textAlign: 'center',
                        mb: 4,
                    }}>
                    <Box
                        sx={{
                            width: 50,
                            height: 50,
                            mx: 'auto',
                            mb: 2,
                            background:
                                'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow:
                                '0 8px 16px rgba(99, 102, 241, 0.3)',
                        }}
                    >
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                        >

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
                            background:
                                'linear-gradient(90deg, #FFFFFF 0%, #D1D5DB 100%)',

                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}>
                        Bienvenido a Kufin
                    </Typography>

                    <Typography
                        variant="body2"
                        sx={{
                            color: 'rgba(255,255,255,0.5)',
                            mt: 0.5,
                        }}>
                        Ingresa a tu cuenta para gestionar tus finanzas
                    </Typography>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        mt: 4,
                        width: 'fit-content',
                        mx: 'auto',
                        backgroundColor: '#FFFFFF',
                        borderRadius: '25px',
                        padding: '2px',
                        overflow: 'hidden',
                        boxShadow:
                            '0 4px 12px rgba(0,0,0,0.2)',
                        transition: 'transform 0.2s ease',
                        '&:hover': {
                            transform: 'scale(1.02)',
                        }
                    }}>

                    <GoogleLogin
                        onSuccess={ login }
                        onError={() => console.error("Error en Google")}
                        theme="outline"
                        size="medium"
                        shape="pill"
                    />
                </Box>
            </DialogContent>
        </Dialog>
    )
}
