import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import axios from 'axios';

// material-ui
import { useTheme } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// third party
import Chart from 'react-apexcharts';

// project imports
import useConfig from 'hooks/useConfig';
import SkeletonTotalGrowthBarChart from 'ui-component/cards/Skeleton/TotalGrowthBarChart';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

// chart data
import barChartOptions from './chart-data/total-growth-bar-chart';

const categorias = ['Pendiente de clasificar', 'Alimentos', 'Servicios', 'Transporte', 'Ocio', 'Otros'];

export default function TotalGrowthBarChart({ isLoading }) {
  const theme = useTheme();
  const {
    state: { fontFamily }
  } = useConfig();

  const [gastos, setGastos] = useState([]);
  const [value, setValue] = useState(new Date().getFullYear().toString());
  const [añosOpciones, setAñosOpciones] = useState([
    { value: new Date().getFullYear().toString(), label: new Date().getFullYear().toString() }
  ]);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [series, setSeries] = useState([]);
  const [totalDelAño, setTotalDelAño] = useState(0);
  const [chartOptions, setChartOptions] = useState(barChartOptions);

  const textPrimary = theme.vars.palette.text.primary;
  const divider = theme.vars.palette.divider;
  
  // Colores semánticos para cada una de las 6 categorías
  const grey500 = theme.vars.palette.grey[500] || '#9e9e9e';
  const successMain = theme.vars.palette.success?.main || '#2e7d32';
  const orangeMain = theme.vars.palette.orange?.main || '#ff9800';
  const primaryMain = theme.vars.palette.primary?.main || '#2196f3';
  const secondaryMain = theme.vars.palette.secondary?.main || '#9c27b0';
  const errorMain = theme.vars.palette.error?.main || '#f44336';

  // 1. Cargar todos los gastos desde la API al montar el componente
  useEffect(() => {
    const cargarGastos = async () => {
      try {
        setIsDataLoading(true);
        const respuesta = await axios.get('http://localhost:3000/gastos');
        const listaGastos = respuesta.data;
        setGastos(listaGastos);
        
        // Extraer los años únicos para armar el selector
        const añosUnicos = [...new Set(listaGastos.map(g => g.fecha.split('-')[0]))]
          .filter(Boolean)
          .sort((a, b) => b - a);
        
        const añoActualStr = new Date().getFullYear().toString();
        if (añosUnicos.length === 0) {
          añosUnicos.push(añoActualStr);
        } else if (!añosUnicos.includes(añoActualStr)) {
          añosUnicos.push(añoActualStr);
          añosUnicos.sort((a, b) => b - a);
        }

        setAñosOpciones(añosUnicos.map(a => ({ value: a, label: a })));
        
        // Si el valor actual no está en la lista de años con gastos, seleccionamos el más reciente
        if (!añosUnicos.includes(value)) {
          setValue(añosUnicos[0]);
        }
      } catch (error) {
        console.error("Error al cargar los gastos para el gráfico:", error);
      } finally {
        setIsDataLoading(false);
      }
    };
    cargarGastos();
  }, []);

  // 2. Agrupar gastos por categoría y mes reactivamente cuando cambie el año seleccionado o la lista de gastos
  useEffect(() => {
    const gastosFiltrados = gastos.filter(g => g.fecha.split('-')[0] === value);

    // Calcular la suma de todos los gastos del año seleccionado
    const total = gastosFiltrados.reduce((sum, g) => sum + Number(g.monto), 0);
    setTotalDelAño(total);

    // Estructurar los datos por categoría y mes (0-11) para ApexCharts
    const nuevasSeries = categorias.map(categoria => {
      const data = Array(12).fill(0);
      
      gastosFiltrados
        .filter(g => g.categoria === categoria)
        .forEach(g => {
          const mes = parseInt(g.fecha.split('-')[1], 10) - 1;
          if (mes >= 0 && mes < 12) {
            data[mes] = Number((data[mes] + Number(g.monto)).toFixed(2));
          }
        });

      return {
        name: categoria,
        data: data
      };
    });

    setSeries(nuevasSeries);
  }, [gastos, value]);

  // 3. Actualizar las opciones visuales del gráfico cuando cambien los tokens de diseño
  useEffect(() => {
    setChartOptions({
      ...barChartOptions,
      chart: { ...barChartOptions.chart, fontFamily: fontFamily },
      colors: [grey500, successMain, orangeMain, primaryMain, secondaryMain, errorMain],
      xaxis: { ...barChartOptions.xaxis, labels: { style: { colors: textPrimary } } },
      yaxis: { ...barChartOptions.yaxis, labels: { style: { colors: textPrimary } } },
      grid: { borderColor: divider },
      tooltip: { theme: 'light' },
      legend: { ...(barChartOptions.legend ?? {}), labels: { ...(barChartOptions.legend?.labels ?? {}), colors: grey500 } },
      plotOptions: {
        ...barChartOptions.plotOptions,
        bar: {
          ...barChartOptions.plotOptions?.bar,
          dataLabels: {
            ...barChartOptions.plotOptions?.bar?.dataLabels,
            total: {
              ...barChartOptions.plotOptions?.bar?.dataLabels?.total,
              style: {
                ...barChartOptions.plotOptions?.bar?.dataLabels?.total?.style,
                color: textPrimary
              }
            }
          }
        }
      }
    });
  }, [fontFamily, grey500, successMain, orangeMain, primaryMain, secondaryMain, errorMain, textPrimary, divider]);

  const loading = isLoading || isDataLoading;

  return (
    <>
      {loading ? (
        <SkeletonTotalGrowthBarChart />
      ) : (
        <MainCard>
          <Stack sx={{ gap: gridSpacing }}>
            <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
              <Stack sx={{ gap: 1 }}>
                <Typography variant="subtitle2">Gastos Mensuales</Typography>
                <Typography variant="h3">
                  ${Number(totalDelAño).toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </Typography>
              </Stack>
              <TextField id="select-año-grafico" select value={value} onChange={(e) => setValue(e.target.value)}>
                {añosOpciones.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Stack>
            <Box>
              <Chart options={chartOptions} series={series} type="bar" height={480} />
            </Box>
          </Stack>
        </MainCard>
      )}
    </>
  );
}

TotalGrowthBarChart.propTypes = { isLoading: PropTypes.bool };
