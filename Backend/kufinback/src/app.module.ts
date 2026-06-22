import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GastosModule } from './gastos/gastos.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { GruposModule } from './grupos/grupos.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [GastosModule, TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.DB_HOST, // O la URL que nos dé Neon/Supabase
    port: 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [__dirname + '/**/*.entity{.ts,.js}'], // Le decimos dónde están las entidades
    autoLoadEntities: true, // Magia: carga las entidades automáticamente
    synchronize: true, // Útil para desarrollo: crea las tablas por nosotros
  }),
    AuthModule,
    UsuariosModule, GruposModule,
    ConfigModule.forRoot({
      isGlobal: true, // Esto hace que no tengas que importar ConfigModule en cada módulo
    }),],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
