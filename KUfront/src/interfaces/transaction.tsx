export interface Transaction {
  id: string; // UUID devuelto por el backend
  type: 'ingreso' | 'egreso';
  amount: number;
  category: string;
  date: string;
  description: string;
  // Campos de cuotas (opcionales)
  grupoCuotaId?: string;
  cuotaNumero?: number;
  cuotasTotales?: number;
  esCuotas?: boolean;
}