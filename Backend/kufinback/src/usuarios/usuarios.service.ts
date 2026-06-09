import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  // Lógica principal: Login con Google
  async findOrCreate(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    let usuario = await this.usuarioRepository.findOne({
      where: { googleSub: createUsuarioDto.googleSub },
    });

    if (!usuario) {
      usuario = this.usuarioRepository.create(createUsuarioDto);
      await this.usuarioRepository.save(usuario);
    }

    return usuario;
  }

  async findAll() {
    return await this.usuarioRepository.find();
  }

  async findOne(id: string) {
    const usuario = await this.usuarioRepository.findOne({ where: { id } });
    if (!usuario) throw new NotFoundException(`Usuario #${id} no encontrado`);
    return usuario;
  }

  async update(id: string, updateUsuarioDto: UpdateUsuarioDto) {
    const usuario = await this.findOne(id);
    const updated = Object.assign(usuario, updateUsuarioDto);
    return await this.usuarioRepository.save(updated);
  }

  async remove(id: string) {
    const usuario = await this.findOne(id);
    return await this.usuarioRepository.remove(usuario);
  }
}