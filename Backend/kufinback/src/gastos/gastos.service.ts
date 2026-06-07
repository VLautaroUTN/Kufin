import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGastoDto } from './dto/create-gasto.dto';
import { UpdateGastoDto } from './dto/update-gasto.dto';
import { Gasto } from './entities/gasto.entity';

@Injectable()
export class GastosService {
  constructor(
    @InjectRepository(Gasto)
    private readonly gastoRepository: Repository<Gasto>,
  ) {}

  // CREAR: Toma los datos del DTO y los guarda en la base de datos
  async create(createGastoDto: CreateGastoDto) {
    const nuevoGasto = this.gastoRepository.create(createGastoDto);
    return await this.gastoRepository.save(nuevoGasto);
  }

  // LEER TODOS: Trae todos los gastos ordenados por fecha (los más nuevos primero)
  async findAll() {
    return await this.gastoRepository.find({
      order: { fecha: 'DESC' },
    });
  }

  // LEER UNO: Busca un gasto por su ID exacto
  async findOne(id: string) {
    const gasto = await this.gastoRepository.findOneBy({ id });
    if (!gasto) {
      throw new NotFoundException(`El gasto con id ${id} no existe en Kufin`);
    }
    return gasto;
  }

  // ACTUALIZAR: Busca el gasto, fusiona los datos nuevos y guarda
  async update(id: string, updateGastoDto: UpdateGastoDto) {
    const gasto = await this.findOne(id);
    this.gastoRepository.merge(gasto, updateGastoDto);
    return await this.gastoRepository.save(gasto);
  }

  // BORRAR: Busca el gasto y lo elimina de la base
  async remove(id: string) {
    const gasto = await this.findOne(id);
    return await this.gastoRepository.remove(gasto);
  }
}