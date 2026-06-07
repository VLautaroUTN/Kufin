import { IsString, IsNumber, IsNotEmpty, IsDateString, IsPositive } from 'class-validator';

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
}