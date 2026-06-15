import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGastoDto } from './dto/create-gasto.dto';
import { UpdateGastoDto } from './dto/update-gasto.dto';
import { Gasto } from './entities/gasto.entity';
import { randomUUID } from 'crypto';

@Injectable()
export class GastosService {
  constructor(
    @InjectRepository(Gasto)
    private readonly gastoRepository: Repository<Gasto>,
  ) {}

  // CREAR: Toma los datos del DTO y los guarda en la base de datos (soporta cuotas)
  async create(createGastoDto: CreateGastoDto) {
    const { esCuotas, cuotasTotales, monto, fecha, descripcion, ...resto } = createGastoDto;

    if (esCuotas && cuotasTotales && cuotasTotales > 1) {
      const grupoCuotaId = randomUUID();
      const montoPorCuota = parseFloat((monto / cuotasTotales).toFixed(2));
      const gastosInsertar: Gasto[] = [];

      for (let i = 0; i < cuotasTotales; i++) {
        // Calculamos la fecha para cada cuota (mes en curso + i meses)
        const fechaBase = new Date(fecha + 'T12:00:00'); // Evitamos problemas de zona horaria
        fechaBase.setMonth(fechaBase.getMonth() + i);

        const anio = fechaBase.getFullYear();
        const mes = String(fechaBase.getMonth() + 1).padStart(2, '0');
        const dia = String(fechaBase.getDate()).padStart(2, '0');
        const fechaCuota = `${anio}-${mes}-${dia}`;

        const nuevoGasto = this.gastoRepository.create({
          ...resto,
          monto: montoPorCuota,
          descripcion: `${descripcion} (${i + 1}/${cuotasTotales})`,
          fecha: fechaCuota,
          grupoCuotaId,
          cuotaNumero: i + 1,
          cuotasTotales,
        });

        gastosInsertar.push(nuevoGasto);
      }

      const resultados = await this.gastoRepository.save(gastosInsertar);
      return resultados[0];
    }

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

  // BORRAR: Busca el gasto y lo elimina de la base (soporta borrar todo el grupo de cuotas)
  async remove(id: string, eliminarTodoElGrupo?: boolean) {
    const gasto = await this.findOne(id);
    if (eliminarTodoElGrupo && gasto.grupoCuotaId) {
      const grupoCuotaId = gasto.grupoCuotaId;
      const gastosDelGrupo = await this.gastoRepository.findBy({ grupoCuotaId });
      await this.gastoRepository.remove(gastosDelGrupo);
      return { id, grupoCuotaId, deletedAll: true };
    }
    return await this.gastoRepository.remove(gasto);
  }
}