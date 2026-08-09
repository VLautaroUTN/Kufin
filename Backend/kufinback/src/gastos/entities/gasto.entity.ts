import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

export type TipoMovimiento = 'ingreso' | 'egreso';

@Entity('gastos')
export class Gasto {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  // Usamos decimal para manejar la plata exacto (hasta 10 dígitos, 2 decimales)
  @Column('decimal', { precision: 10, scale: 2 })
  monto!: number;

  @Column()
  descripcion!: string;

  @Column()
  categoria!: string;

  @Column({ type: 'date' })
  fecha!: string; // La fecha real en la que ocurrió el gasto

  @Column()
  usuarioId!: string; // Acá guardaremos el ID de Google tuyo o de Belén

  @Column({ type: 'varchar', default: 'egreso' })
  tipo!: TipoMovimiento; // 'ingreso' o 'egreso'

  @CreateDateColumn()
  fechaDeCarga!: Date; // Se llena solo para saber en qué momento usaron la app

  //Compras en cuotas
  @Column({ nullable: true })
  grupoCuotaId?: string;
  @Column({ type: 'int', nullable: true })
  cuotaNumero?: number;
  @Column({ type: 'int', nullable: true })
  cuotasTotales?: number;
}