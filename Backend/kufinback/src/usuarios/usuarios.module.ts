import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // <--- 1. Importa esto
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { Usuario } from './entities/usuario.entity'; // <--- 2. Importa tu entidad
import { GruposModule } from '../grupos/grupos.module'; // <--- 3. Importa el módulo de grupos

@Module({
  imports: [
    TypeOrmModule.forFeature([Usuario]),
    GruposModule 
          ], 
  controllers: [UsuariosController],
  providers: [UsuariosService],
  exports: [UsuariosService], // <--- 4. Exportalo para poder usarlo en AuthModule
})
export class UsuariosModule {}