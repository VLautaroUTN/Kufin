import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

export const api = axios.create({
  baseURL: BASE_URL,
});

// ── Tipos que reflejan la entidad del backend ──────────────────────────────────

export type TipoMovimiento = 'ingreso' | 'egreso';

export interface GastoBackend {
  id: string;
  monto: number;
  descripcion: string;
  categoria: string;
  fecha: string;
  usuarioId: string;
  tipo: TipoMovimiento;
  fechaDeCarga: string;
  grupoCuotaId?: string;
  cuotaNumero?: number;
  cuotasTotales?: number;
}

export interface CreateGastoPayload {
  monto: number;
  descripcion: string;
  categoria: string;
  fecha: string;
  usuarioId: string;
  tipo: TipoMovimiento;
  esCuotas?: boolean;
  cuotasTotales?: number;
}

// ── Funciones de acceso al backend ─────────────────────────────────────────────

/** Trae todos los movimientos (ingresos y egresos) de un usuario */
export async function fetchGastos(usuarioId: string): Promise<GastoBackend[]> {
  const { data } = await api.get<GastoBackend[]>('/gastos', {
    params: { usuarioId },
  });
  return data;
}

/** Crea un nuevo movimiento */
export async function createGasto(payload: CreateGastoPayload): Promise<GastoBackend> {
  const { data } = await api.post<GastoBackend>('/gastos', payload);
  return data;
}

/** Elimina un movimiento por ID */
export async function deleteGasto(
  id: string,
  eliminarTodoElGrupo = false,
): Promise<void> {
  await api.delete(`/gastos/${id}`, {
    params: eliminarTodoElGrupo ? { eliminarTodoElGrupo: 'true' } : {},
  });
}
