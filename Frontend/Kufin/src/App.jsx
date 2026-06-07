import { useState } from 'react';
import GastoForm from './components/GastoForm';
import GastoList from './components/GastoList';

function App() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  // Estado para saber cuál gasto queremos editar
  const [gastoAEditar, setGastoAEditar] = useState(null);
  
  const handleGastoGuardado = () => {
    setRefreshTrigger(prev => prev + 1);
    setGastoAEditar(null); // Limpiamos el estado después de guardar/actualizar
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-extrabold text-slate-800 mb-8 text-center md:text-left">Kufin 📊</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <section>
            {/* Le pasamos el gasto a editar y la función para limpiar */}
            <GastoForm 
              gastoAEditar={gastoAEditar} 
              onGastoGuardado={handleGastoGuardado} 
              onCancelarEdicion={() => setGastoAEditar(null)}
            />
          </section>

          <section className="bg-white p-6 rounded-2xl shadow-xl w-full h-full min-h-[400px]">
            <h2 className="text-xl font-bold text-slate-800 mb-6 border-b border-slate-100 pb-2">
              Movimientos Recientes
            </h2>
            
            {/* Le pasamos la función para capturar el gasto a editar */}
            <GastoList 
              refreshTrigger={refreshTrigger} 
              onEditGasto={setGastoAEditar} 
            />
          </section>

        </div>
      </div>
    </div>
  );
}

export default App;