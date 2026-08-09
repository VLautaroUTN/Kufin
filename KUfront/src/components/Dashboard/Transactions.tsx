import { useState } from 'react';
import {
  Grid,
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  InputAdornment,
  CircularProgress,
  FormControlLabel,
  Switch,
} from '@mui/material';
import {
  DeleteOutlineRounded,
  AddRounded,
  SearchRounded,
} from '@mui/icons-material';

interface Transaction {
  id: string;
  type: 'ingreso' | 'egreso';
  amount: number;
  category: string;
  date: string;
  description: string;
  grupoCuotaId?: string;
  cuotaNumero?: number;
  cuotasTotales?: number;
  esCuotas?: boolean;
}

interface TransactionsProps {
  transactions: Transaction[];
  onAddTransaction: (t: Omit<Transaction, 'id'>) => void;
  onDeleteTransaction: (id: string) => void;
  loading?: boolean;
}

export function Transactions({
  transactions,
  onAddTransaction,
  onDeleteTransaction,
  loading = false,
}: TransactionsProps) {
  // Search and filter states
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'ingreso' | 'egreso'>('all');

  // Form states
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<'ingreso' | 'egreso'>('egreso');
  const [category, setCategory] = useState('Alimentos');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [esCuotas, setEsCuotas] = useState(false);
  const [cuotasTotales, setCuotasTotales] = useState('3');

  const categories = {
    ingreso: ['Sueldo', 'Freelance', 'Inversiones', 'Otros'],
    egreso: ['Alimentos', 'Alquiler', 'Servicios', 'Entretenimiento', 'Transporte', 'Otros'],
  };

  const handleTypeChange = (newType: 'ingreso' | 'egreso') => {
    setType(newType);
    setCategory(categories[newType][0]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || !amount || parseFloat(amount) <= 0) {
      alert('Por favor, completa los campos correctamente.');
      return;
    }

    onAddTransaction({
      description,
      amount: parseFloat(amount),
      type,
      category,
      date,
      esCuotas: type === 'egreso' ? esCuotas : false,
      cuotasTotales: type === 'egreso' && esCuotas ? parseInt(cuotasTotales, 10) : undefined,
    });

    // Reset form
    setDescription('');
    setAmount('');
    setEsCuotas(false);
  };

  // Filter transactions
  const filteredTransactions = transactions.filter((t) => {
    const matchesSearch =
      t.description.toLowerCase().includes(search.toLowerCase()) ||
      t.category.toLowerCase().includes(search.toLowerCase());
    const matchesType = filterType === 'all' || t.type === filterType;
    return matchesSearch && matchesType;
  });

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 2,
    }).format(val);
  };

  return (
    <Box className="animate-fade-in">
      <Typography variant="h4" sx={{ fontWeight: 800, mb: 4, letterSpacing: '-0.5px', color: '#FFFFFF' }}>
        Movimientos
      </Typography>

      <Grid container spacing={3}>
        {/* Form to Add Transaction (Left Card) */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <Paper
            className="glass-panel"
            sx={{
              p: 3,
              borderRadius: 4,
              position: 'sticky',
              top: '90px',
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 3, color: '#FFFFFF' }}>
              Registrar Movimiento
            </Typography>

            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
              {/* Type Switcher */}
              <Box
                sx={{
                  display: 'flex',
                  p: 0.5,
                  borderRadius: 2.5,
                  bgcolor: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                }}
              >
                <Button
                  fullWidth
                  onClick={() => handleTypeChange('egreso')}
                  sx={{
                    borderRadius: 2,
                    textTransform: 'none',
                    fontWeight: 700,
                    fontSize: '0.8rem',
                    py: 1,
                    color: type === 'egreso' ? '#FFFFFF' : 'rgba(255, 255, 255, 0.45)',
                    background: type === 'egreso' ? 'rgba(239, 68, 68, 0.15)' : 'transparent',
                    border: type === 'egreso' ? '1px solid rgba(239, 68, 68, 0.3)' : '1px solid transparent',
                    '&:hover': {
                      background: type === 'egreso' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(255,255,255,0.03)',
                    },
                  }}
                >
                  Egreso (-)
                </Button>
                <Button
                  fullWidth
                  onClick={() => handleTypeChange('ingreso')}
                  sx={{
                    borderRadius: 2,
                    textTransform: 'none',
                    fontWeight: 700,
                    fontSize: '0.8rem',
                    py: 1,
                    color: type === 'ingreso' ? '#FFFFFF' : 'rgba(255, 255, 255, 0.45)',
                    background: type === 'ingreso' ? 'rgba(16, 185, 129, 0.15)' : 'transparent',
                    border: type === 'ingreso' ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid transparent',
                    '&:hover': {
                      background: type === 'ingreso' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255,255,255,0.03)',
                    },
                  }}
                >
                  Ingreso (+)
                </Button>
              </Box>

              {/* Description field */}
              <TextField
                fullWidth
                label="Descripción"
                size="small"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                placeholder="Ej. Supermercado, Honorarios, Alquiler..."
                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: '#FFFFFF',
                    borderRadius: 2.5,
                    backgroundColor: 'rgba(255, 255, 255, 0.02)',
                    '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.08)' },
                    '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.15)' },
                    '&.Mui-focused fieldset': { borderColor: '#6366F1' },
                  },
                  '& .MuiInputLabel-root': { color: 'rgba(255, 255, 255, 0.4)' },
                }}
              />

              {/* Amount field */}
              <TextField
                fullWidth
                label="Monto ($)"
                size="small"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                slotProps={{ htmlInput: { step: 'any', min: '0.01' } }}
                placeholder="0.00"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: '#FFFFFF',
                    borderRadius: 2.5,
                    backgroundColor: 'rgba(255, 255, 255, 0.02)',
                    '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.08)' },
                    '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.15)' },
                    '&.Mui-focused fieldset': { borderColor: '#6366F1' },
                  },
                  '& .MuiInputLabel-root': { color: 'rgba(255, 255, 255, 0.4)' },
                }}
              />

              {/* Category Select */}
              <FormControl fullWidth size="small">
                <InputLabel sx={{ color: 'rgba(255, 255, 255, 0.4)' }}>Categoría</InputLabel>
                <Select
                  value={category}
                  label="Categoría"
                  onChange={(e) => setCategory(e.target.value)}
                  sx={{
                    color: '#FFFFFF',
                    borderRadius: 2.5,
                    backgroundColor: 'rgba(255, 255, 255, 0.02)',
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255, 255, 255, 0.08)' },
                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255, 255, 255, 0.15)' },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#6366F1' },
                    '& .MuiSvgIcon-root': { color: 'rgba(255, 255, 255, 0.4)' },
                  }}
                  MenuProps={{
                    slotProps: {
                      paper: {
                        sx: {
                          bgcolor: '#151C2C',
                          border: '1px solid rgba(255, 255, 255, 0.08)',
                          borderRadius: 2,
                          '& .MuiMenuItem-root': {
                            color: 'rgba(255, 255, 255, 0.8)',
                            '&:hover': { bgcolor: 'rgba(99, 102, 241, 0.1)' },
                            '&.Mui-selected': { bgcolor: 'rgba(99, 102, 241, 0.2)', color: '#FFFFFF' },
                          },
                        },
                      },
                    },
                  }}
                >
                  {categories[type].map((cat) => (
                    <MenuItem key={cat} value={cat}>
                      {cat}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* Date Field */}
              <TextField
                fullWidth
                label="Fecha"
                type="date"
                size="small"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                slotProps={{ inputLabel: { shrink: true } }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: '#FFFFFF',
                    borderRadius: 2.5,
                    backgroundColor: 'rgba(255, 255, 255, 0.02)',
                    '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.08)' },
                    '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.15)' },
                    '&.Mui-focused fieldset': { borderColor: '#6366F1' },
                  },
                  '& .MuiInputLabel-root': { color: 'rgba(255, 255, 255, 0.4)' },
                }}
              />

              {/* Cuotas controls (solo para egresos) */}
              {type === 'egreso' && (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={esCuotas}
                        onChange={(e) => setEsCuotas(e.target.checked)}
                        sx={{
                          '& .MuiSwitch-switchBase.Mui-checked': {
                            color: '#8B5CF6',
                            '& + .MuiSwitch-track': { backgroundColor: '#6366F1' },
                          },
                        }}
                      />
                    }
                    label={
                      <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.85rem' }}>
                        Compra en cuotas
                      </Typography>
                    }
                  />

                  {esCuotas && (
                    <TextField
                      fullWidth
                      label="Cantidad de cuotas"
                      size="small"
                      type="number"
                      value={cuotasTotales}
                      onChange={(e) => setCuotasTotales(e.target.value)}
                      slotProps={{ htmlInput: { min: 2, max: 60 } }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          color: '#FFFFFF',
                          borderRadius: 2.5,
                          backgroundColor: 'rgba(255, 255, 255, 0.02)',
                          '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.08)' },
                          '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.15)' },
                          '&.Mui-focused fieldset': { borderColor: '#6366F1' },
                        },
                        '& .MuiInputLabel-root': { color: 'rgba(255, 255, 255, 0.4)' },
                      }}
                    />
                  )}
                </Box>
              )}

              <Button
                type="submit"
                variant="contained"
                startIcon={<AddRounded />}
                sx={{
                  py: 1.25,
                  borderRadius: 2.5,
                  fontWeight: 700,
                  textTransform: 'none',
                  background: 'linear-gradient(90deg, #6366F1 0%, #8B5CF6 100%)',
                  boxShadow: '0 4px 15px rgba(99, 102, 241, 0.2)',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  '&:hover': {
                    transform: 'translateY(-1px)',
                    boxShadow: '0 8px 20px rgba(99, 102, 241, 0.35)',
                    background: 'linear-gradient(90deg, #4F46E5 0%, #7C3AED 100%)',
                  },
                }}
              >
                Añadir Movimiento
              </Button>
            </Box>
          </Paper>
        </Grid>

        {/* Transactions List Table (Right Card) */}
        <Grid size={{ xs: 12, lg: 8 }}>
          <Paper
            className="glass-panel"
            sx={{
              p: 3,
              borderRadius: 4,
              display: 'flex',
              flexDirection: 'column',
              minHeight: '520px',
            }}
          >
            {/* Filters bar */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 2,
                mb: 3,
                flexWrap: 'wrap',
              }}
            >
              {/* Search Field */}
              <TextField
                placeholder="Buscar descripción o categoría..."
                size="small"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start" sx={{ color: 'rgba(255,255,255,0.3)' }}>
                        <SearchRounded fontSize="small" />
                      </InputAdornment>
                    ),
                  },
                }}
                sx={{
                  width: { xs: '100%', sm: '280px' },
                  '& .MuiOutlinedInput-root': {
                    color: '#FFFFFF',
                    borderRadius: 2.5,
                    backgroundColor: 'rgba(255, 255, 255, 0.02)',
                    '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.08)' },
                    '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.15)' },
                    '&.Mui-focused fieldset': { borderColor: '#6366F1' },
                  },
                }}
              />

              {/* Filter Type Buttons */}
              <Box
                sx={{
                  display: 'flex',
                  borderRadius: 2,
                  bgcolor: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  p: 0.5,
                }}
              >
                {(['all', 'ingreso', 'egreso'] as const).map((t) => (
                  <Button
                    key={t}
                    size="small"
                    onClick={() => setFilterType(t)}
                    sx={{
                      borderRadius: 1.5,
                      textTransform: 'none',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      px: 2,
                      py: 0.5,
                      color: filterType === t ? '#FFFFFF' : 'rgba(255,255,255,0.4)',
                      background: filterType === t ? 'rgba(255,255,255,0.06)' : 'transparent',
                      '&:hover': {
                        background: filterType === t ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.02)',
                      },
                    }}
                  >
                    {t === 'all' ? 'Todos' : t === 'ingreso' ? 'Ingresos' : 'Egresos'}
                  </Button>
                ))}
              </Box>
            </Box>

            {/* Table Container */}
            <TableContainer sx={{ flexGrow: 1, overflowY: 'auto', maxHeight: '420px' }}>
              <Table stickyHeader sx={{ '& .MuiTableCell-stickyHeader': { bgcolor: '#0D1322', borderBottom: '1px solid rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.4)', fontWeight: 700 } } }>
                <TableHead>
                  <TableRow>
                    <TableCell>Descripción</TableCell>
                    <TableCell>Categoría</TableCell>
                    <TableCell>Fecha</TableCell>
                    <TableCell align="right">Monto</TableCell>
                    <TableCell align="center">Acción</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredTransactions.map((row) => (
                    <TableRow
                      key={row.id}
                      sx={{
                        transition: 'all 0.2s ease',
                        '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.01)' },
                        '& td': { borderBottom: '1px solid rgba(255,255,255,0.03)', color: 'rgba(255,255,255,0.85)', py: 1.5 },
                      }}
                    >
                      <TableCell sx={{ fontWeight: 600, color: '#FFFFFF !important' }}>
                        {row.description}
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={row.category}
                          size="small"
                          sx={{
                            bgcolor: row.type === 'ingreso' ? 'rgba(16, 185, 129, 0.08)' : 'rgba(99, 102, 241, 0.08)',
                            color: row.type === 'ingreso' ? '#34D399' : '#818CF8',
                            border: `1px solid ${row.type === 'ingreso' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(99, 102, 241, 0.15)'}`,
                            fontWeight: 600,
                            fontSize: '0.7rem',
                          }}
                        />
                      </TableCell>
                      <TableCell sx={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5) !important' }}>
                        {row.date}
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{
                          fontWeight: 700,
                          color: `${row.type === 'ingreso' ? '#10B981' : '#EF4444'} !important`,
                        }}
                      >
                        {row.type === 'ingreso' ? '+' : '-'}
                        {formatCurrency(row.amount)}
                      </TableCell>
                      <TableCell align="center">
                        <IconButton
                          onClick={() => onDeleteTransaction(row.id)}
                          size="small"
                          sx={{
                            color: 'rgba(255,255,255,0.25)',
                            '&:hover': {
                              color: '#EF4444',
                              bgcolor: 'rgba(239, 68, 68, 0.08)',
                            },
                          }}
                        >
                          <DeleteOutlineRounded fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={5} align="center" sx={{ py: 6 }}>
                        <CircularProgress size={28} sx={{ color: '#6366F1' }} />
                      </TableCell>
                    </TableRow>
                  ) : filteredTransactions.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} align="center" sx={{ py: 6, color: 'rgba(255,255,255,0.3) !important', fontStyle: 'italic' }}>
                        No se encontraron movimientos registrados.
                      </TableCell>
                    </TableRow>
                  ) : null}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
