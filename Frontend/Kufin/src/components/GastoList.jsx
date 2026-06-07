import { useState, useEffect } from 'react';
import axios from 'axios';

export default function GastoList({ refreshTrigger, onEditGasto }) {
  const [gastos, setGastos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [localTrigger, setLocalTrigger] = useState(0);

  useEffect(() => {
    const fetchGastos = async () => {
      try {
        const respuesta = await axios.get('http://localhost:3000/gastos');
        setGastos(respuesta.data);
      } catch (error) {
        console.error('Error al traer los gastos:', error);
      } finally {
        setCargando(false);
      }
    };
    fetchGastos();
  }, [refreshTrigger, localTrigger]);

  const handleDelete = async (id, descripcion) => {
    const confirmar = window.confirm(`¿Estás seguro de que querés eliminar el gasto: "${descripcion}"?`);
    if (!confirmar) return;

    try {
      await axios.delete(`http://localhost:3000/gastos/${id}`);
      setLocalTrigger(prev => prev + 1);
    } catch (error) {
      console.error('Error al eliminar el gasto:', error);
    }
  };

  if (cargando) return <div className="text-center text-slate-500 py-8 animate-pulse">Cargando movimientos...</div>;
  if (gastos.length === 0) return <div className="text-center text-slate-500 py-8">No hay gastos registrados todavía.</div>;

  return (
    <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
      {gastos.map((gasto) => (
        <div key={gasto.id} className="flex justify-between items-center p-4 bg-slate-50 rounded-xl border border-slate-100 hover:shadow-md transition-all">
          
          <div className="flex flex-col">
            <span className="font-bold text-slate-800">{gasto.descripcion}</span>
            <span className="text-xs text-slate-500 font-medium mt-1">
              {gasto.categoria} • {new Date(gasto.fecha).toLocaleDateString('es-AR')}
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-red-500 text-lg mr-2">
              ${Number(gasto.monto).toLocaleString('es-AR', { minimumFractionDigits: 2 })}
            </span>
            
            {/* Botón de Editar */}
            <button 
              onClick={() => onEditGasto(gasto)}
              className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors active:scale-90"
              title="Editar gasto"
            >
              ✏️
            </button>

            <button 
              onClick={() => handleDelete(gasto.id, gasto.descripcion)}
              className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors active:scale-90"
              title="Eliminar gasto"
            >
              🗑️
            </button>
          </div>

        </div>
      ))}
    </div>
  );
}