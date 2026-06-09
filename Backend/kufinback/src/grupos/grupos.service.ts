import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Grupo } from './entities/grupo.entity';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { CreateGrupoDto } from './dto/create-grupo.dto';
import { UpdateGrupoDto } from './dto/update-grupo.dto';

@Injectable()
export class GruposService {
  constructor(
    @InjectRepository(Grupo) private grupoRepository: Repository<Grupo>,
    @InjectRepository(Usuario) private usuarioRepository: Repository<Usuario>,
  ) {}

  // Lógica principal: Crear grupo y vincular al creador
  async crearGrupo(nombre: string, usuarioId: string) {
    const nuevoGrupo = this.grupoRepository.create({ nombre });
    const grupoGuardado = await this.grupoRepository.save(nuevoGrupo);

    await this.usuarioRepository.update(usuarioId, { grupoId: grupoGuardado.id });

    return grupoGuardado;
  }

  async findAll() {
    return await this.grupoRepository.find();
  }

  async findOne(id: string) {
    const grupo = await this.grupoRepository.findOne({ where: { id } });
    if (!grupo) throw new NotFoundException(`Grupo #${id} no encontrado`);
    return grupo;
  }

  async update(id: string, updateGrupoDto: UpdateGrupoDto) {
    const grupo = await this.findOne(id);
    const updated = Object.assign(grupo, updateGrupoDto);
    return await this.grupoRepository.save(updated);
  }

  async remove(id: string) {
    const grupo = await this.findOne(id);
    return await this.grupoRepository.remove(grupo);
  }
}