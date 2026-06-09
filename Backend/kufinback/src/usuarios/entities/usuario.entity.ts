import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Grupo } from '../../grupos/entities/grupo.entity'; // Asegúrate de que esta ruta sea la correcta

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  googleSub!: string;

  @Column()
  email!: string;

  @Column()
  nombre!: string;

  @Column({ default: 'miembro' })
  rol!: string;

  @CreateDateColumn()
  createdAt!: Date;

  // --- Relación con Grupos ---
  
  // 1. Esta columna guarda físicamente el ID en la base de datos
  @Column({ nullable: true })
  grupoId!: string;

  // 2. Esta relación permite a TypeORM navegar entre objetos (Usuario -> Grupo)
  @ManyToOne(() => Grupo, (grupo) => grupo.usuarios, { nullable: true })
  @JoinColumn({ name: 'grupoId' }) // Esto vincula la relación con la columna de arriba
  grupo!: Grupo;
}