
import {
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
} from '@mui/material';
import {
  LightbulbRounded,
  ShowChartRounded,
  PieChartOutlineRounded,
  CheckCircleOutlineRounded,
  WarningAmberRounded,
} from '@mui/icons-material';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
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

interface ReportsProps {
  transactions: Transaction[];
}

export function Reports({ transactions }: ReportsProps) {
  // 1. Calculate general numbers
  const totalIncome = transactions
    .filter((t) => t.type === 'ingreso')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === 'egreso')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const balance = totalIncome - totalExpense;
  const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpense) / totalIncome) * 100 : 0;

  // 2. Prepare cumulative trend data dynamically based on real transactions
  const MONTH_NAMES = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
  const now = new Date();
  
  // Generar últimos 6 meses
  const monthsMap: Record<string, { month: string; yearMonth: string; net: number }> = {};
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const yearMonth = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    monthsMap[yearMonth] = { month: MONTH_NAMES[d.getMonth()], yearMonth, net: 0 };
  }

  // Agrupar neto por mes
  transactions.forEach((t) => {
    if (!t.date) return;
    const yearMonth = t.date.substring(0, 7);
    if (!monthsMap[yearMonth]) {
      const [y, m] = yearMonth.split('-').map(Number);
      if (y && m) {
        monthsMap[yearMonth] = { month: MONTH_NAMES[m - 1] || yearMonth, yearMonth, net: 0 };
      }
    }
    if (monthsMap[yearMonth]) {
      monthsMap[yearMonth].net += t.type === 'ingreso' ? t.amount : -t.amount;
    }
  });

  // Calcular balance acumulado
  const sortedMonths = Object.values(monthsMap).sort((a, b) => a.yearMonth.localeCompare(b.yearMonth));
  let runningBalance = 0;
  const trendData = sortedMonths.map((m) => {
    runningBalance += m.net;
    return { month: m.month, Balance: runningBalance };
  });

  // 3. Gastos por categoría
  const categoryTotals: Record<string, number> = {};
  transactions
    .filter((t) => t.type === 'egreso')
    .forEach((t) => {
      categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount;
    });

  const barData = Object.keys(categoryTotals).map((cat) => ({
    category: cat,
    Monto: categoryTotals[cat],
  })).sort((a, b) => b.Monto - a.Monto);

  const COLORS = ['#6366F1', '#8B5CF6', '#EC4899', '#EF4444', '#F59E0B', '#10B981'];

  // Currency Formatter
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0,
    }).format(val);
  };

  // Custom tooltips
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <Box
          sx={{
            background: 'rgba(15, 23, 42, 0.95)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '8px',
            p: 1.5,
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
          }}
        >
          <Typography variant="caption" sx={{ fontWeight: 700, mb: 1, color: '#FFFFFF', display: 'block' }}>
            {label}
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 800, color: payload[0].color || '#6366F1' }}>
            {formatCurrency(payload[0].value)}
          </Typography>
        </Box>
      );
    }
    return null;
  };

  // Dynamic recommendations
  const getRecommendation = () => {
    if (totalIncome === 0 && totalExpense === 0) {
      return {
        title: 'Registra tus primeros movimientos',
        desc: 'Comienza a añadir ingresos y egresos en la pestaña "Movimientos" para que el sistema analice tu perfil y te dé consejos financieros.',
        icon: <LightbulbRounded sx={{ color: '#F59E0B' }} />,
        bgColor: 'rgba(245, 158, 11, 0.08)',
        borderColor: 'rgba(245, 158, 11, 0.15)',
      };
    }

    if (savingsRate > 30) {
      return {
        title: '¡Excelente capacidad de ahorro!',
        desc: `Tu tasa de ahorro es del ${savingsRate.toFixed(1)}%, superando con creces la meta recomendada del 20%. Considera colocar el excedente de ${formatCurrency(balance)} en algún fondo de inversión para ganarle a la inflación.`,
        icon: <CheckCircleOutlineRounded sx={{ color: '#10B981' }} />,
        bgColor: 'rgba(16, 185, 129, 0.08)',
        borderColor: 'rgba(16, 185, 129, 0.15)',
      };
    } else if (savingsRate >= 10) {
      return {
        title: 'Buen ritmo de ahorro, puedes mejorar',
        desc: `Estás ahorrando el ${savingsRate.toFixed(1)}% de tus ingresos. Para acercarte al ideal del 20%, intenta identificar pequeños consumos diarios que puedas reducir, sobre todo en categorías como Entretenimiento o Comida fuera de casa.`,
        icon: <LightbulbRounded sx={{ color: '#6366F1' }} />,
        bgColor: 'rgba(99, 102, 241, 0.08)',
        borderColor: 'rgba(99, 102, 241, 0.15)',
      };
    } else {
      return {
        title: 'Atención: Capacidad de ahorro crítica',
        desc: `Tu tasa de ahorro actual es del ${savingsRate.toFixed(1)}%. Tus gastos consumen casi todos tus ingresos. Te sugerimos revisar urgentemente tu lista de egresos y recortar gastos no esenciales hasta estabilizar tu cuenta.`,
        icon: <WarningAmberRounded sx={{ color: '#EF4444' }} />,
        bgColor: 'rgba(239, 68, 68, 0.08)',
        borderColor: 'rgba(239, 68, 68, 0.15)',
      };
    }
  };

  const advice = getRecommendation();

  return (
    <Box className="animate-fade-in">
      <Typography variant="h4" sx={{ fontWeight: 800, mb: 4, letterSpacing: '-0.5px', color: '#FFFFFF' }}>
        Analíticas y Reportes
      </Typography>

      <Grid container spacing={3}>
        {/* Balance Trend Area Chart */}
        <Grid size={{ xs: 12, md: 7 }}>
          <Paper
            className="glass-panel"
            sx={{
              p: 3,
              borderRadius: 4,
              height: '350px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <ShowChartRounded sx={{ color: '#6366F1' }} />
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#FFFFFF' }}>
                Evolución del Patrimonio
              </Typography>
            </Box>
            <Box sx={{ flexGrow: 1, width: '100%', height: '100%' }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="trendColor" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366F1" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#6366F1" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
                  <XAxis dataKey="month" stroke="rgba(255,255,255,0.3)" fontSize={11} tickLine={false} />
                  <YAxis stroke="rgba(255,255,255,0.3)" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(99, 102, 241, 0.2)', strokeWidth: 1 }} />
                  <Area
                    type="monotone"
                    dataKey="Balance"
                    stroke="#6366F1"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#trendColor)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>

        {/* Expenses by Category Horizontal Bar Chart */}
        <Grid size={{ xs: 12, md: 5 }}>
          <Paper
            className="glass-panel"
            sx={{
              p: 3,
              borderRadius: 4,
              height: '350px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <PieChartOutlineRounded sx={{ color: '#8B5CF6' }} />
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#FFFFFF' }}>
                Gastos por Categoría
              </Typography>
            </Box>
            <Box sx={{ flexGrow: 1, width: '100%', height: '100%' }}>
              {barData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    layout="vertical"
                    data={barData}
                    margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" horizontal={false} />
                    <XAxis type="number" stroke="rgba(255,255,255,0.3)" fontSize={10} tickLine={false} />
                    <YAxis
                      dataKey="category"
                      type="category"
                      stroke="rgba(255,255,255,0.5)"
                      fontSize={11}
                      tickLine={false}
                      width={90}
                    />
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.02)' }} />
                    <Bar dataKey="Monto" radius={[0, 4, 4, 0]} maxBarSize={20}>
                      {barData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.3)', fontStyle: 'italic' }}>
                    No hay egresos para graficar.
                  </Typography>
                </Box>
              )}
            </Box>
          </Paper>
        </Grid>

        {/* Financial AI Advice Card */}
        <Grid size={12}>
          <Card
            sx={{
              background: advice.bgColor,
              border: `1px solid ${advice.borderColor}`,
              borderRadius: 4,
              boxShadow: 'none',
              overflow: 'hidden',
            }}
          >
            <CardContent sx={{ p: 4, display: 'flex', gap: 2.5, alignItems: 'flex-start' }}>
              <Box
                sx={{
                  p: 1.5,
                  borderRadius: 3,
                  bgcolor: 'rgba(255, 255, 255, 0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {advice.icon}
              </Box>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#FFFFFF', mb: 1 }}>
                  {advice.title}
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.65)', lineHeight: 1.6 }}>
                  {advice.desc}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
