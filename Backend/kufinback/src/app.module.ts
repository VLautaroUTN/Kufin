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
      useFactory: (configService: ConfigService) => {
        const databaseUrl = configService.get<string>('DATABASE_URL');
        
        if (databaseUrl) {
          return {
            type: 'postgres',
            url: databaseUrl,
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
            autoLoadEntities: true,
            synchronize: true,
            ssl: {
              rejectUnauthorized: false, // Requerido por Render.com para conexiones externas
            },
          };
        }

        return {
          type: 'postgres',
          host: configService.get<string>('DB_HOST'),
          port: configService.get<number>('DB_PORT'),
          username: configService.get<string>('DB_USER'),
          password: configService.get<string>('DB_PASSWORD'),
          database: configService.get<string>('DB_NAME'),
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          autoLoadEntities: true,
          synchronize: true,
        };
      },
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
