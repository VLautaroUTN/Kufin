
import {
  Grid,
  Paper,
  Typography,
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import {
  TrendingUpRounded,
  TrendingDownRounded,
  AccountBalanceWalletRounded,
  SavingsRounded,
  ArrowForwardRounded,
} from '@mui/icons-material';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

interface Transaction {
  id: string;
  type: 'ingreso' | 'egreso';
  amount: number;
  category: string;
  date: string;
  description: string;
}

interface DashboardHomeProps {
  transactions: Transaction[];
  username: string | null;
  onLoginClick: () => void;
  setActiveTab: (tab: number) => void;
}

export function DashboardHome({
  transactions,
  username,
  onLoginClick,
  setActiveTab,
}: DashboardHomeProps) {
  // 1. Calculate active statistics from current transactions
  const totalIncome = transactions
    .filter((t) => t.type === 'ingreso')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === 'egreso')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalBalance = totalIncome - totalExpense;

  const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpense) / totalIncome) * 100 : 0;

  // 2. Prepare Historical Chart Data (dynamically integrates current month "Julio" totals)
  const chartData = [
    { name: 'Ene', Ingresos: 3800, Egresos: 2100 },
    { name: 'Feb', Ingresos: 4200, Egresos: 2400 },
    { name: 'Mar', Ingresos: 4500, Egresos: 2800 },
    { name: 'Abr', Ingresos: 4100, Egresos: 2300 },
    { name: 'May', Ingresos: 5300, Egresos: 3100 },
    { name: 'Jun', Ingresos: 4900, Egresos: 2900 },
    { name: 'Jul', Ingresos: totalIncome, Egresos: totalExpense },
  ];

  // 3. Prepare Pie Chart Data for Category Distribution (dynamic)
  const categoryTotals: Record<string, number> = {};
  transactions
    .filter((t) => t.type === 'egreso')
    .forEach((t) => {
      categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount;
    });

  const pieData = Object.keys(categoryTotals).map((cat) => ({
    name: cat,
    value: categoryTotals[cat],
  }));

  const COLORS = ['#6366F1', '#10B981', '#F59E0B', '#EF4444', '#EC4899', '#8B5CF6'];

  // Formatting currency helper
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 2,
    }).format(val);
  };

  // Custom tooltips for Recharts
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <Box
          sx={{
            background: 'rgba(15, 23, 42, 0.9)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '8px',
            p: 1.5,
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: 700, mb: 1, color: '#FFFFFF' }}>
            Mes: {label}
          </Typography>
          {payload.map((pld: any) => (
            <Box key={pld.name} sx={{ display: 'flex', alignItems: 'center', gap: 1, my: 0.5 }}>
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  bgcolor: pld.color,
                }}
              />
              <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                {pld.name}:{' '}
                <span style={{ fontWeight: 600, color: '#FFF' }}>
                  {formatCurrency(pld.value)}
                </span>
              </Typography>
            </Box>
          ))}
        </Box>
      );
    }
    return null;
  };

  return (
    <Box className="animate-fade-in">
      {/* Welcome Heading */}
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800, letterSpacing: '-0.5px', color: '#FFFFFF' }}>
            ¡Hola, {username || 'Invitado'}!
          </Typography>
          <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.5)' }}>
            Aquí tienes un resumen del estado de tus finanzas para el mes en curso.
          </Typography>
        </Box>
        {!username && (
          <Button
            variant="contained"
            onClick={onLoginClick}
            sx={{
              background: 'linear-gradient(90deg, #6366F1 0%, #8B5CF6 100%)',
              textTransform: 'none',
              fontWeight: 700,
              borderRadius: '10px',
              px: 3,
              '&:hover': {
                background: 'linear-gradient(90deg, #4F46E5 0%, #7C3AED 100%)',
              },
            }}
          >
            Iniciar sesión para guardar datos
          </Button>
        )}
      </Box>

      {/* KPI Cards Grid */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* Card 1: Balance */}
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Paper
            className="glass-panel"
            sx={{
              p: 3,
              borderRadius: 4,
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              position: 'relative',
              overflow: 'hidden',
              '&:hover': {
                transform: 'translateY(-5px)',
                borderColor: 'rgba(99, 102, 241, 0.25)',
                boxShadow: '0 12px 30px rgba(99, 102, 241, 0.1)',
              },
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <Box>
                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.45)', fontWeight: 600 }}>
                  Balance Total
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 800, mt: 1, color: totalBalance >= 0 ? '#FFFFFF' : '#EF4444' }}>
                  {formatCurrency(totalBalance)}
                </Typography>
              </Box>
              <Box sx={{ p: 1, borderRadius: 2.5, bgcolor: 'rgba(99, 102, 241, 0.1)', color: '#6366F1' }}>
                <AccountBalanceWalletRounded />
              </Box>
            </Box>
            <Typography variant="caption" sx={{ display: 'block', mt: 2, color: '#10B981', fontWeight: 600 }}>
              +14.8% <span style={{ color: 'rgba(255, 255, 255, 0.3)', fontWeight: 400 }}>vs mes anterior</span>
            </Typography>
          </Paper>
        </Grid>

        {/* Card 2: Ingresos */}
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Paper
            className="glass-panel"
            sx={{
              p: 3,
              borderRadius: 4,
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              '&:hover': {
                transform: 'translateY(-5px)',
                borderColor: 'rgba(16, 185, 129, 0.25)',
                boxShadow: '0 12px 30px rgba(16, 185, 129, 0.1)',
              },
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <Box>
                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.45)', fontWeight: 600 }}>
                  Ingresos del Mes
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 800, mt: 1, color: '#10B981' }}>
                  {formatCurrency(totalIncome)}
                </Typography>
              </Box>
              <Box sx={{ p: 1, borderRadius: 2.5, bgcolor: 'rgba(16, 185, 129, 0.1)', color: '#10B981' }}>
                <TrendingUpRounded />
              </Box>
            </Box>
            <Typography variant="caption" sx={{ display: 'block', mt: 2, color: '#10B981', fontWeight: 600 }}>
              +8.2% <span style={{ color: 'rgba(255, 255, 255, 0.3)', fontWeight: 400 }}>vs mes anterior</span>
            </Typography>
          </Paper>
        </Grid>

        {/* Card 3: Egresos */}
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Paper
            className="glass-panel"
            sx={{
              p: 3,
              borderRadius: 4,
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              '&:hover': {
                transform: 'translateY(-5px)',
                borderColor: 'rgba(239, 68, 68, 0.25)',
                boxShadow: '0 12px 30px rgba(239, 68, 68, 0.1)',
              },
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <Box>
                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.45)', fontWeight: 600 }}>
                  Egresos del Mes
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 800, mt: 1, color: '#EF4444' }}>
                  {formatCurrency(totalExpense)}
                </Typography>
              </Box>
              <Box sx={{ p: 1, borderRadius: 2.5, bgcolor: 'rgba(239, 68, 68, 0.1)', color: '#EF4444' }}>
                <TrendingDownRounded />
              </Box>
            </Box>
            <Typography variant="caption" sx={{ display: 'block', mt: 2, color: '#EF4444', fontWeight: 600 }}>
              -4.3% <span style={{ color: 'rgba(255, 255, 255, 0.3)', fontWeight: 400 }}>vs mes anterior</span>
            </Typography>
          </Paper>
        </Grid>

        {/* Card 4: Savings Rate */}
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Paper
            className="glass-panel"
            sx={{
              p: 3,
              borderRadius: 4,
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              '&:hover': {
                transform: 'translateY(-5px)',
                borderColor: 'rgba(6, 182, 212, 0.25)',
                boxShadow: '0 12px 30px rgba(6, 182, 212, 0.1)',
              },
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <Box>
                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.45)', fontWeight: 600 }}>
                  Tasa de Ahorro
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 800, mt: 1, color: '#06B6D4' }}>
                  {savingsRate.toFixed(1)}%
                </Typography>
              </Box>
              <Box sx={{ p: 1, borderRadius: 2.5, bgcolor: 'rgba(6, 182, 212, 0.1)', color: '#06B6D4' }}>
                <SavingsRounded />
              </Box>
            </Box>
            <Typography variant="caption" sx={{ display: 'block', mt: 2, color: '#06B6D4', fontWeight: 600 }}>
              +3.5% <span style={{ color: 'rgba(255, 255, 255, 0.3)', fontWeight: 400 }}>vs meta recomendada</span>
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Main Charts & Bottom Section */}
      <Grid container spacing={3}>
        {/* Gráfico de Barras Principal: Recharts */}
        <Grid size={{ xs: 12, lg: 8 }}>
          <Paper
            className="glass-panel"
            sx={{
              p: 3,
              borderRadius: 4,
              height: '420px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 3, color: '#FFFFFF' }}>
              Comparativa de Ingresos vs Egresos (Histórico)
            </Typography>
            <Box sx={{ flexGrow: 1, width: '100%', height: '100%' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="incomeColor" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0.15} />
                    </linearGradient>
                    <linearGradient id="expenseColor" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#EF4444" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#EF4444" stopOpacity={0.15} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                  <XAxis
                    dataKey="name"
                    stroke="rgba(255,255,255,0.3)"
                    fontSize={11}
                    tickLine={false}
                  />
                  <YAxis
                    stroke="rgba(255,255,255,0.3)"
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.02)' }} />
                  <Legend
                    verticalAlign="top"
                    height={36}
                    iconType="circle"
                    iconSize={8}
                    wrapperStyle={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.6)' }}
                  />
                  <Bar
                    name="Ingresos"
                    dataKey="Ingresos"
                    fill="url(#incomeColor)"
                    radius={[4, 4, 0, 0]}
                    maxBarSize={45}
                  />
                  <Bar
                    name="Egresos"
                    dataKey="Egresos"
                    fill="url(#expenseColor)"
                    radius={[4, 4, 0, 0]}
                    maxBarSize={45}
                  />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>

        {/* Side Panel: Pie Chart / Recent list */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, height: '100%' }}>
            {/* Pie Chart of Expenses */}
            <Box>
              <Paper
                className="glass-panel"
                sx={{
                  p: 3,
                  borderRadius: 4,
                  height: pieData.length > 0 ? '220px' : '150px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                <Typography variant="body2" sx={{ fontWeight: 700, mb: 1, color: 'rgba(255, 255, 255, 0.8)' }}>
                  Distribución de Gastos
                </Typography>
                {pieData.length > 0 ? (
                  <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                    <Box sx={{ width: '50%', height: '100%' }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={pieData}
                            cx="50%"
                            cy="50%"
                            innerRadius={45}
                            outerRadius={60}
                            paddingAngle={3}
                            dataKey="value"
                          >
                            {pieData.map((_, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                    </Box>
                    <Box sx={{ width: '50%', pl: 1, maxHeight: '140px', overflowY: 'auto' }}>
                      {pieData.slice(0, 4).map((entry, index) => (
                        <Box key={entry.name} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0.75 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, overflow: 'hidden' }}>
                            <Box
                              sx={{
                                width: 6,
                                height: 6,
                                borderRadius: '50%',
                                bgcolor: COLORS[index % COLORS.length],
                                flexShrink: 0,
                              }}
                            />
                            <Typography variant="caption" noWrap sx={{ color: 'rgba(255, 255, 255, 0.55)', fontSize: '0.68rem' }}>
                              {entry.name}
                            </Typography>
                          </Box>
                          <Typography variant="caption" sx={{ fontWeight: 600, color: '#FFFFFF', fontSize: '0.68rem' }}>
                            {((entry.value / totalExpense) * 100).toFixed(0)}%
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                ) : (
                  <Box sx={{ textAlign: 'center', py: 2 }}>
                    <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.3)', fontStyle: 'italic' }}>
                      No hay egresos registrados este mes
                    </Typography>
                  </Box>
                )}
              </Paper>
            </Box>
 
            {/* Mini List of Recent Transactions */}
            <Box>
              <Paper
                className="glass-panel"
                sx={{
                  p: 3,
                  borderRadius: 4,
                  height: pieData.length > 0 ? '170px' : '240px',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
                  <Typography variant="body2" sx={{ fontWeight: 700, color: 'rgba(255, 255, 255, 0.8)' }}>
                    Actividad Reciente
                  </Typography>
                  <Button
                    onClick={() => setActiveTab(1)}
                    size="small"
                    endIcon={<ArrowForwardRounded sx={{ fontSize: '10px !important' }} />}
                    sx={{
                      textTransform: 'none',
                      fontSize: '0.68rem',
                      color: '#6366F1',
                      fontWeight: 600,
                      p: 0,
                      minWidth: 0,
                    }}
                  >
                    Ver Todo
                  </Button>
                </Box>
                <List sx={{ p: 0, overflowY: 'auto', flexGrow: 1 }}>
                  {transactions.slice(0, 3).map((item, idx) => (
                    <Box key={item.id}>
                      <ListItem sx={{ py: 0.75, px: 0 }}>
                        <ListItemText
                          primary={
                            <Typography variant="caption" sx={{ fontWeight: 600, color: '#FFFFFF' }}>
                              {item.description}
                            </Typography>
                          }
                          secondary={
                            <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.35)', fontSize: '0.65rem', display: 'block' }}>
                              {`${item.category} • ${item.date}`}
                            </Typography>
                          }
                        />
                        <Typography
                          variant="caption"
                          sx={{
                            fontWeight: 700,
                            color: item.type === 'ingreso' ? '#10B981' : '#EF4444',
                          }}
                        >
                          {item.type === 'ingreso' ? '+' : '-'}
                          {formatCurrency(item.amount)}
                        </Typography>
                      </ListItem>
                      {idx < Math.min(transactions.length, 3) - 1 && (
                        <Divider sx={{ borderColor: 'rgba(255,255,255,0.04)' }} />
                      )}
                    </Box>
                  ))}
                  {transactions.length === 0 && (
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                      <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.3)' }}>
                        No hay movimientos aún.
                      </Typography>
                    </Box>
                  )}
                </List>
              </Paper>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
