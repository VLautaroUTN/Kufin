import { Module } from '@nestjs/common';
import { GruposService } from './grupos.service';
import { GruposController } from './grupos.controller';
import { UsuariosModule } from 'src/usuarios/usuarios.module';

@Module({
  imports: [UsuariosModule],
  controllers: [GruposController],
  providers: [GruposService],
})
export class GruposModule {}
