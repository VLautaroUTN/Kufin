import {
    Dialog,
    DialogContent,
    Box,
    Typography,
    IconButton,
} from '@mui/material';
import { CloseRounded } from '@mui/icons-material';
import { GoogleLogin } from '@react-oauth/google';


export interface LoginViewProps {
    open: boolean;
    onClose: (() => void) | undefined;
    loading: boolean;
}

export default function LoginModal({ open, onClose, loading }: LoginViewProps) {
    return (

        // Modal principal
        <Dialog

            // Controla si el modal está visible
            open={open}

            // Si loading=true no dejamos cerrar el modal
            onClose={loading ? undefined : onClose}

            // Ancho máximo del modal ("xs" = extra pequeño)
            maxWidth="xs"

            // Hace que ocupe todo el ancho disponible hasta llegar al maxWidth
            fullWidth

            // Permite personalizar el Paper interno del Dialog
            slotProps={{
                paper: {

                    // sx permite escribir estilos CSS directamente
                    sx: {

                        // Fondo semitransparente
                        background: 'rgba(21, 28, 44, 0.75)',

                        // Efecto vidrio (Glassmorphism)
                        backdropFilter: 'blur(20px)',

                        // Compatibilidad con Safari
                        WebkitBackdropFilter: 'blur(20px)',

                        // Borde blanco muy transparente
                        border: '1px solid rgba(255, 255, 255, 0.08)',

                        // Bordes redondeados
                        borderRadius: 4,

                        // Sombra exterior + brillo interior
                        boxShadow:
                            '0 20px 40px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)',

                        // Evita que los hijos sobresalgan del borde redondeado
                        overflow: 'hidden',
                    },
                },
            }}
        >

            {/* Línea decorativa superior */}
            <Box

                sx={{

                    // Alto de la línea
                    height: '4px',

                    // Gradiente horizontal
                    background:
                        'linear-gradient(90deg, #6366F1 0%, #8B5CF6 50%, #06B6D4 100%)',

                    // Ocupa todo el ancho
                    width: '100%',
                }}
            />

            {/* Botón para cerrar el modal */}
            <Box

                sx={{

                    // Posición absoluta dentro del Dialog
                    position: 'absolute',

                    // Distancia desde arriba
                    top: 12,

                    // Distancia desde la derecha
                    right: 12,

                    // Lo coloca por encima del resto
                    zIndex: 1,
                }}
            >

                <IconButton

                    // Al hacer click ejecuta onClose
                    onClick={onClose}

                    // Si loading=true deshabilita el botón
                    disabled={loading}

                    sx={{

                        // Color del icono
                        color: 'rgba(255, 255, 255, 0.5)',

                        // Estilos cuando el mouse pasa encima
                        '&:hover': {

                            // Icono completamente blanco
                            color: '#FFFFFF',

                            // Fondo semitransparente
                            background: 'rgba(255, 255, 255, 0.05)',
                        },
                    }}
                >

                    {/* Icono de cerrar */}
                    <CloseRounded />

                </IconButton>

            </Box>

            {/* Contenido principal del modal */}
            <DialogContent

                sx={{

                    // Padding interno
                    p: 4,
                }}
            >

                {/* Encabezado */}
                <Box

                    sx={{

                        // Centra horizontalmente
                        textAlign: 'center',

                        // Margen inferior
                        mb: 4,
                    }}
                >

                    {/* Logo */}
                    <Box

                        sx={{

                            width: 50,
                            height: 50,

                            // Centrado horizontal
                            mx: 'auto',

                            // Margen inferior
                            mb: 2,

                            // Fondo degradado
                            background:
                                'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',

                            // Bordes redondeados
                            borderRadius: '12px',

                            // Flex para centrar el SVG
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',

                            // Sombra
                            boxShadow:
                                '0 8px 16px rgba(99, 102, 241, 0.3)',
                        }}
                    >

                        {/* Logo SVG */}
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                        >

                            {/* Primera figura */}
                            <path
                                d="M12 2L2 7L12 12L22 7L12 2Z"
                                stroke="#FFFFFF"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />

                            {/* Segunda figura */}
                            <path
                                d="M2 17L12 22L22 17"
                                stroke="#FFFFFF"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />

                            {/* Tercera figura */}
                            <path
                                d="M2 12L12 17L22 12"
                                stroke="#FFFFFF"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />

                        </svg>

                    </Box>

                    {/* Título */}
                    <Typography

                        variant="h5"

                        sx={{

                            // Grosor de la fuente
                            fontWeight: 800,

                            // Espaciado entre letras
                            letterSpacing: '-0.5px',

                            // Gradiente
                            background:
                                'linear-gradient(90deg, #FFFFFF 0%, #D1D5DB 100%)',

                            // Hace que el gradiente se aplique únicamente al texto
                            WebkitBackgroundClip: 'text',

                            // Oculta el color del texto para mostrar únicamente el gradiente
                            WebkitTextFillColor: 'transparent',
                        }}
                    >

                        Bienvenido a Kufin

                    </Typography>

                    {/* Subtítulo */}
                    <Typography

                        variant="body2"

                        sx={{

                            color: 'rgba(255,255,255,0.5)',

                            mt: 0.5,
                        }}
                    >

                        Ingresa a tu cuenta para gestionar tus finanzas

                    </Typography>

                </Box>

                {/* Contenedor del botón de Google */}
                <Box

                    sx={{

                        display: 'flex',

                        justifyContent: 'center',

                        mt: 4,

                        // El ancho será únicamente el necesario
                        width: 'fit-content',

                        // Centrado horizontal
                        mx: 'auto',

                        // Fondo blanco
                        backgroundColor: '#FFFFFF',

                        // Bordes muy redondeados
                        borderRadius: '25px',

                        // Espacio interno
                        padding: '2px',

                        // Respeta los bordes redondeados
                        overflow: 'hidden',

                        // Sombra
                        boxShadow:
                            '0 4px 12px rgba(0,0,0,0.2)',

                        // Animación suave
                        transition: 'transform 0.2s ease',

                        // Al pasar el mouse aumenta un poco el tamaño
                        '&:hover': {
                            transform: 'scale(1.02)',
                        }
                    }}
                >

                    {/* Botón oficial de Google */}
                    <GoogleLogin

                        // Se ejecuta si el login fue exitoso
                        onSuccess={onGoogleSuccess}

                        // Se ejecuta si ocurre un error
                        onError={onGoogleError}

                        // Tema con fondo blanco
                        theme="outline"

                        // Tamaño del botón
                        size="medium"

                        // Forma tipo píldora
                        shape="pill"
                    />

                </Box>

            </DialogContent>

        </Dialog>
    )
}
