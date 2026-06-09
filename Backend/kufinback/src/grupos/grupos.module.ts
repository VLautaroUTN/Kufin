import { forwardRef, Module } from '@nestjs/common';
import { GruposService } from './grupos.service';
import { GruposController } from './grupos.controller';
import { UsuariosModule } from 'src/usuarios/usuarios.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Grupo } from './entities/grupo.entity';
import { Usuario } from '../usuarios/entities/usuario.entity';

@Module({
  imports: [forwardRef(() => UsuariosModule),
     TypeOrmModule.forFeature([Grupo, Usuario])],
  controllers: [GruposController],
  providers: [GruposService],
  exports: [GruposService],
})
export class GruposModule {}
