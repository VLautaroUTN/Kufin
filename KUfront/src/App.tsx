import { useState, useEffect, useCallback } from 'react';
import {
  ThemeProvider,
  CssBaseline,
  Box,
  Snackbar,
  Alert,
  CircularProgress,
} from '@mui/material';
import { Navbar } from './components/Dashboard/Navbar';
import { Sidebar } from './components/Dashboard/Sidebar';
import { DashboardHome } from './components/Dashboard/DashboardHome';
import { Transactions } from './components/Dashboard/Transactions';
import { Reports } from './components/Dashboard/Reports';
import LoginModal from './components/Login/LoginModal';

import { darkTheme } from './themes/themes';
import { useAuth } from './components/Contexts/AuthContext';
import type { Transaction } from './interfaces/transaction.tsx';
import {
  fetchGastos,
  createGasto,
  deleteGasto,
  type GastoBackend,
} from './services/api';


/** Mapea la entidad del backend al modelo del frontend */
function mapGastoToTransaction(g: GastoBackend): Transaction {
  return {
    id: g.id,
    type: g.tipo,              // ahora usamos el campo real del backend
    amount: Number(g.monto),
    category: g.categoria,
    date: g.fecha,
    description: g.descripcion,
    grupoCuotaId: g.grupoCuotaId,
    cuotaNumero: g.cuotaNumero,
    cuotasTotales: g.cuotasTotales,
  };
}


export function App() {
  // Auth state from context
  const { usuario, logout } = useAuth();

  // Navigation state
  const [activeTab, setActiveTab] = useState(0);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  // Transactions (driven by backend)
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loadingTransactions, setLoadingTransactions] = useState(false);

  // Snackbar notifications
  const [notification, setNotification] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'info' | 'warning' | 'error';
  }>({
    open: false,
    message: '',
    severity: 'success',
  });

  // ── Helpers ─────────────────────────────────────────────────────────────────

  const showToast = (
    message: string,
    severity: 'success' | 'info' | 'warning' | 'error' = 'success',
  ) => {
    setNotification({ open: true, message, severity });
  };

  const handleCloseNotification = () => {
    setNotification((prev) => ({ ...prev, open: false }));
  };

  // ── Fetch gastos del backend ─────────────────────────────────────────────────

  const loadTransactions = useCallback(async () => {
    if (!usuario?.usuarioId) {
      setTransactions([]);
      return;
    }
    setLoadingTransactions(true);
    try {
      const gastos = await fetchGastos(usuario.usuarioId);
      setTransactions(gastos.map(mapGastoToTransaction));
    } catch (err) {
      console.error('Error al cargar movimientos:', err);
      showToast('No se pudieron cargar los movimientos.', 'error');
    } finally {
      setLoadingTransactions(false);
    }
  }, [usuario?.usuarioId]);

  // Carga las transacciones cuando el usuario inicia/cierra sesión
  useEffect(() => {
    loadTransactions();
  }, [loadTransactions]);

  // ── Handlers ────────────────────────────────────────────────────────────────

  const handleLogout = () => {
    logout();
    setTransactions([]);
    showToast('Sesión cerrada correctamente.', 'info');
  };

  const handleAddTransaction = async (newTx: Omit<Transaction, 'id'>) => {
    if (!usuario?.usuarioId) {
      showToast('Debés iniciar sesión para registrar movimientos.', 'warning');
      setIsLoginOpen(true);
      return;
    }

    try {
      const created = await createGasto({
        monto: newTx.amount,
        descripcion: newTx.description,
        categoria: newTx.category,
        fecha: newTx.date,
        usuarioId: usuario.usuarioId,
        tipo: newTx.type,
        esCuotas: newTx.esCuotas,
        cuotasTotales: newTx.cuotasTotales,
      });
      if (newTx.esCuotas && (newTx.cuotasTotales || 0) > 1) {
        await loadTransactions();
      } else {
        setTransactions((prev) => [mapGastoToTransaction(created), ...prev]);
      }
      showToast('Movimiento registrado correctamente.', 'success');
    } catch (err) {
      console.error('Error al crear movimiento:', err);
      showToast('No se pudo registrar el movimiento.', 'error');
    }
  };

  const handleDeleteTransaction = async (id: string) => {
    try {
      await deleteGasto(id);
      setTransactions((prev) => prev.filter((tx) => tx.id !== id));
      showToast('Movimiento eliminado.', 'warning');
    } catch (err) {
      console.error('Error al eliminar movimiento:', err);
      showToast('No se pudo eliminar el movimiento.', 'error');
    }
  };

  // ── Render ──────────────────────────────────────────────────────────────────

  const renderMainContent = () => {
    switch (activeTab) {
      case 0:
        return (
          <DashboardHome
            transactions={transactions}
            username={usuario?.nombre || null}
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
            loading={loadingTransactions}
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
            pt: '100px',
            pb: 4,
            px: { xs: 2, sm: 4 },
            width: { sm: `calc(100% - 260px)` },
          }}
        >
          {loadingTransactions && activeTab !== 0 ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
              <CircularProgress sx={{ color: '#6366F1' }} />
            </Box>
          ) : (
            renderMainContent()
          )}
        </Box>

        {/* Auth Dialog Modal */}
        <LoginModal
          open={isLoginOpen}
          onClose={() => setIsLoginOpen(false)}
          loading={false}
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