import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GastosModule } from './gastos/gastos.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { GruposModule } from './grupos/grupos.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GastosModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('DB_HOST'), // Se usa la URL completa
        // port: configService.get<number>('DB_PORT'), // Opcional si usas url
        // username: configService.get<string>('DB_USER'), // Opcional si usas url
        // password: configService.get<string>('DB_PASSWORD'), // Opcional si usas url
        // database: configService.get<string>('DB_NAME'), // Opcional si usas url
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        autoLoadEntities: true,
        synchronize: true,
        ssl: {
          rejectUnauthorized: false, // Requerido por Render.com para conexiones externas
        },
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UsuariosModule,
    GruposModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
