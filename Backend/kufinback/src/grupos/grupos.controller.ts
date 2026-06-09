import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GruposService } from './grupos.service';
import { CreateGrupoDto } from './dto/create-grupo.dto';
import { UpdateGrupoDto } from './dto/update-grupo.dto';

@Controller('grupos')
export class GruposController {
  constructor(private readonly gruposService: GruposService) {}

  // Este método ahora recibe el nombre del grupo y el usuario que lo crea
  @Post('crear')
  async create(@Body() body: { nombre: string; usuarioId: string }) {
    return await this.gruposService.crearGrupo(body.nombre, body.usuarioId);
  }

  @Get()
  findAll() {
    return this.gruposService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gruposService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGrupoDto: UpdateGrupoDto) {
    return this.gruposService.update(id, updateGrupoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gruposService.remove(id);
  }
}
