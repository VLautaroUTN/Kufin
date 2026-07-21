import { useState } from 'react';
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Box,
  Snackbar,
  Alert,
} from '@mui/material';
import { Navbar } from './components/Dashboard/Navbar';
import { Sidebar } from './components/Dashboard/Sidebar';
import { DashboardHome } from './components/Dashboard/DashboardHome';
import { Transactions } from './components/Dashboard/Transactions';
import { Reports } from './components/Dashboard/Reports';
import { LoginModal } from './components/Login';

import { useAuth } from './components/AuthContext/AuthContext';

// 1. Create a customized premium dark theme matching the design guidelines
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#6366F1', // Indigo
      light: '#818CF8',
      dark: '#4F46E5',
    },
    secondary: {
      main: '#10B981', // Emerald / Green
      light: '#34D399',
      dark: '#059669',
    },
    background: {
      default: '#080B11', // Dark obsidian
      paper: '#111827', // Charcoal
    },
    text: {
      primary: '#F9FAFB',
      secondary: '#9CA3AF',
    },
  },
  typography: {
    fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif",
    h4: {
      fontWeight: 800,
    },
    h5: {
      fontWeight: 700,
    },
    h6: {
      fontWeight: 700,
    },
    body1: {
      fontWeight: 500,
    },
    body2: {
      fontWeight: 500,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#080B11',
          scrollbarColor: 'rgba(99, 102, 241, 0.2) rgba(8, 11, 17, 0.5)',
        },
      },
    },
  },
});

interface Transaction {
  id: number;
  type: 'ingreso' | 'egreso';
  amount: number;
  category: string;
  date: string;
  description: string;
}

export function App() {
  // Navigation & User Session States
  const {usuario, logout} = useAuth();

  const nombreUsuarioNoLogueado = 'feo';

  const [username, setUsername] = useState<string | null>('Lautaro'); // Start logged in to wow the user immediately
  const [activeTab, setActiveTab] = useState(0); // 0 = Resumen, 1 = Movimientos, 2 = Reportes
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  // Snackbar notifications state
  const [notification, setNotification] = useState<{ open: boolean; message: string; severity: 'success' | 'info' | 'warning' }>({
    open: false,
    message: '',
    severity: 'success',
  });

  // TODO(Backend): Reemplazar este estado estático por un fetch al backend al cargar el componente.
  // Ejemplo: useEffect(() => { fetch('/api/transactions').then(...) }, [])
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: 1, type: 'ingreso', amount: 350000, category: 'Sueldo', date: '2026-07-01', description: 'Salario Mensual UTN' },
    { id: 2, type: 'egreso', amount: 120000, category: 'Alquiler', date: '2026-07-05', description: 'Alquiler Departamento' },
    { id: 3, type: 'egreso', amount: 45000, category: 'Servicios', date: '2026-07-08', description: 'Pago de Luz, Internet y Gas' },
    { id: 4, type: 'egreso', amount: 35000, category: 'Alimentos', date: '2026-07-10', description: 'Compra de Supermercado' },
    { id: 5, type: 'ingreso', amount: 85000, category: 'Freelance', date: '2026-07-12', description: 'Proyecto React Web' },
    { id: 6, type: 'egreso', amount: 20000, category: 'Entretenimiento', date: '2026-07-14', description: 'Cine & Suscripción Streaming' },
  ]);

  const handleLoginSuccess = () => {
    console.log('Usuario logueado exitosamente.');
  }

  const handleLogout = () => {
    logout();
    showToast('Sesión cerrada correctamente.', 'info');
  };

  const handleAddTransaction = (newTx: Omit<Transaction, 'id'>) => {
    // TODO(Backend): Enviar `newTx` a la API mediante un POST. 
    // Una vez que el backend responda con éxito (y devuelva el ID real creado en la DB),
    // se actualiza el estado local de transacciones.
    const tx: Transaction = {
      ...newTx,
      id: Date.now(), // Sustituir por el ID que devuelva el backend
    };
    setTransactions((prev) => [tx, ...prev]);
    showToast('Movimiento registrado correctamente.', 'success');
  };

  const handleDeleteTransaction = (id: number) => {
    // TODO(Backend): Llamar al endpoint de eliminación (ej: DELETE /api/transactions/:id).
    // Si la respuesta es exitosa, se elimina del estado local.
    setTransactions((prev) => prev.filter((tx) => tx.id !== id));
    showToast('Movimiento eliminado.', 'warning');
  };

  const showToast = (message: string, severity: 'success' | 'info' | 'warning') => {
    setNotification({ open: true, message, severity });
  };

  const handleCloseNotification = () => {
    setNotification((prev) => ({ ...prev, open: false }));
  };

  // Select view content based on sidebar selection
  const renderMainContent = () => {
    switch (activeTab) {
      case 0:
        return (
          <DashboardHome
            transactions={transactions}
            username={usuario?.nombre || nombreUsuarioNoLogueado}
            onLoginClick={() => setIsLoginOpen(true)}
            setActiveTab={setActiveTab}
          />
        );
      case 1:
        return (
          <Transactions
            transactions={transactions}
            onAddTransaction={handleAddTransaction}
            onDeleteTransaction={handleDeleteTransaction}
          />
        );
      case 2:
        return <Reports transactions={transactions} />;
      default:
        return null;
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#080B11' }}>
        {/* Navbar (Fixed height of 70px) */}
        <Navbar
          username={usuario?.nombre || nombreUsuarioNoLogueado}
          onLoginClick={() => setIsLoginOpen(true)}
          onLogoutClick={handleLogout}
        />

        {/* Sidebar (Width 260px) */}
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Main Content Pane */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            pt: '100px', // margin from navbar
            pb: 4,
            px: { xs: 2, sm: 4 },
            width: { sm: `calc(100% - 260px)` }, // content shifts based on sidebar width
          }}
        >
          {renderMainContent()}
        </Box>

        {/* Auth Dialog Modal */}
        <LoginModal
          open={isLoginOpen}
          onClose={() => setIsLoginOpen(false)}
          onLoginSuccess={handleLoginSuccess}
        />

        {/* Sleek Alert Banner Toast */}
        <Snackbar
          open={notification.open}
          autoHideDuration={4000}
          onClose={handleCloseNotification}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert
            onClose={handleCloseNotification}
            severity={notification.severity}
            variant="filled"
            sx={{
              borderRadius: 3,
              fontWeight: 600,
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
            }}
          >
            {notification.message}
          </Alert>
        </Snackbar>
      </Box>
    </ThemeProvider>
  );
}