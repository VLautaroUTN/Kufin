import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GastosModule } from './gastos/gastos.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [GastosModule, TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost', // O la URL que nos dé Neon/Supabase
      port: 5432,
      username: 'postgres',
      password: '0304',
      database: 'kufin_db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // Le decimos dónde están las entidades
      autoLoadEntities: true, // Magia: carga las entidades automáticamente
      synchronize: true, // Útil para desarrollo: crea las tablas por nosotros
    }), AuthModule,],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
