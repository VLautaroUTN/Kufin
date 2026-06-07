import { useState, useEffect } from 'react';
import axios from 'axios';

export default function GastoForm({ gastoAEditar, onGastoGuardado, onCancelarEdicion }) {
  const [gasto, setGasto] = useState({
    monto: '',
    descripcion: '',
    categoria: '',
    fecha: new Date().toISOString().split('T')[0]
  });

  // Si nos pasan un gasto para editar, rellenamos el formulario automáticamente
  useEffect(() => {
    if (gastoAEditar) {
      setGasto({
        monto: gastoAEditar.monto,
        descripcion: gastoAEditar.descripcion,
        categoria: gastoAEditar.categoria,
        fecha: gastoAEditar.fecha
      });
    } else {
      // Si es null, reiniciamos el formulario por defecto
      setGasto({
        monto: '',
        descripcion: '',
        categoria: '',
        fecha: new Date().toISOString().split('T')[0]
      });
    }
  }, [gastoAEditar]);

  const handleChange = (e) => {
    setGasto({ ...gasto, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...gasto,
        monto: Number(gasto.monto),
        usuarioId: 'cristian-temporal-id'
      };

      if (gastoAEditar) {
        // MODO EDICIÓN: Hacemos un PATCH a la URL con el ID específico
        await axios.patch(`http://localhost:3000/gastos/${gastoAEditar.id}`, payload);
      } else {
        // MODO CREACIÓN: Hacemos un POST normal
        await axios.post('http://localhost:3000/gastos', payload);
      }
      
      onGastoGuardado(); // Avisamos que terminamos con éxito

    } catch (error) {
      console.error('Error al procesar el gasto:', error);
      alert('Hubo un error. Revisá la consola.');
    }
  };

  return (
    <div className={`p-6 rounded-2xl shadow-xl w-full border transition-colors duration-300 ${gastoAEditar ? 'bg-amber-50/50 border-amber-200' : 'bg-white border-transparent'}`}>
      <h2 className="text-xl font-extrabold text-slate-800 mb-6 text-center">
        {gastoAEditar ? 'Editar Gasto ✏️' : 'Nuevo Gasto 💸'}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Fecha</label>
          <input type="date" name="fecha" value={gasto.fecha} onChange={handleChange} required className="w-full rounded-lg border-slate-300 border p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-slate-700" />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Monto</label>
          <div className="relative">
            <span className="absolute left-3 top-3 text-slate-500 text-lg">$</span>
            <input type="number" name="monto" value={gasto.monto} onChange={handleChange} required step="0.01" className="w-full rounded-lg border-slate-300 border p-3 pl-8 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-lg font-bold" placeholder="0.00" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Descripción</label>
          <input type="text" name="descripcion" value={gasto.descripcion} onChange={handleChange} required className="w-full rounded-lg border-slate-300 border p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" placeholder="Ej: Supermercado" />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Categoría</label>
          <select name="categoria" value={gasto.categoria} onChange={handleChange} required className="w-full rounded-lg border-slate-300 border p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-white">
            <option value="" disabled>Seleccioná una categoría</option>
            <option value="Supermercado">Supermercado</option>
            <option value="Servicios">Servicios (Luz, Internet, etc.)</option>
            <option value="Transporte">Transporte (Uber, DiDi, Colectivo)</option>
            <option value="Salidas">Salidas y Ocio</option>
            <option value="Hogar">Mantenimiento del Hogar</option>
            <option value="Otros">Otros</option>
          </select>
        </div>

        <div className="flex gap-3 mt-6">
          {gastoAEditar && (
            <button 
              type="button" 
              onClick={onCancelarEdicion}
              className="w-1/3 bg-slate-200 text-slate-700 font-bold py-3 px-4 rounded-xl hover:bg-slate-300 active:scale-95 transition-all"
            >
              Cancelar
            </button>
          )}
          <button 
            type="submit" 
            className={`font-bold py-3 px-4 rounded-xl active:scale-95 transition-all shadow-md hover:shadow-lg ${gastoAEditar ? 'w-2/3 bg-amber-500 hover:bg-amber-600 text-white' : 'w-full bg-blue-600 hover:bg-blue-700 text-white'}`}
          >
            {gastoAEditar ? 'Guardar Cambios' : 'Guardar Gasto'}
          </button>
        </div>
      </form>
    </div>
  );
}