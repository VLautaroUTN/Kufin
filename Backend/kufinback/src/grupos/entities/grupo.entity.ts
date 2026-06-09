import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Usuario } from '../../usuarios/entities/usuario.entity';

@Entity()
export class Grupo {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  nombre!: string;

  // Un grupo tiene muchos usuarios
  @OneToMany(() => Usuario, (usuario) => usuario.grupoId)
  usuarios!: Usuario[];
}