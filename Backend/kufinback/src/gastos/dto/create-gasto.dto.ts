import { IsString, IsNumber, IsNotEmpty, IsDateString, IsPositive, IsBoolean, IsOptional, IsIn } from 'class-validator';

export class CreateGastoDto {
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  @IsNotEmpty()
  monto!: number;

  @IsString()
  @IsNotEmpty()
  descripcion!: string;

  @IsString()
  @IsNotEmpty()
  categoria!: string;

  @IsDateString()
  @IsNotEmpty()
  fecha!: string;

  @IsString()
  @IsNotEmpty()
  usuarioId!: string;

  @IsIn(['ingreso', 'egreso'])
  @IsOptional()
  tipo?: 'ingreso' | 'egreso';

  //Compras en cuotas
  @IsBoolean()
  @IsOptional()
  esCuotas?: boolean;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  cuotasTotales?: number;
}