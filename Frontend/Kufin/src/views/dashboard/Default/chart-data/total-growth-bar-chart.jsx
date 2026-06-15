// ==============================|| DASHBOARD - TOTAL GROWTH BAR CHART ||============================== //

const chartOptions = {
  chart: {
    type: 'bar',
    height: 480,
    stacked: true,
    toolbar: { show: true },
    zoom: { enabled: true }
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '50%',
      dataLabels: {
        total: {
          enabled: true,
          style: {
            fontSize: '11px',
            fontWeight: 700
          },
          formatter: function (val) {
            if (!val || val === 0) return '';
            return '$' + Number(val).toLocaleString('es-AR', { maximumFractionDigits: 0 });
          }
        }
      }
    }
  },
  dataLabels: { enabled: false },
  xaxis: {
    type: 'category',
    categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
  },
  fill: { type: 'solid' },
  legend: {
    show: true,
    position: 'bottom',
    offsetX: 20,
    labels: { useSeriesColors: false },
    markers: { size: 8, shape: 'square', strokeWidth: 0 },
    itemMargin: { horizontal: 15, vertical: 8 }
  }
};

export default chartOptions;
