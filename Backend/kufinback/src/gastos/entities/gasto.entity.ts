import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

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

  @CreateDateColumn()
  fechaDeCarga!: Date; // Se llena solo para saber en qué momento usaron la app
}