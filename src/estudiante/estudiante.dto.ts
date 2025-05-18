/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsNumber, IsString, Min, Max } from 'class-validator';

export class EstudianteDto {
    @IsNumber()
    @IsNotEmpty()
    readonly cedula: number;

    @IsString()
    @IsNotEmpty()
    readonly nombre: string;

    @IsNumber()
    @IsNotEmpty()
    @Min(1)
    @Max(10)
    readonly semestre: number;

    @IsString()
    @IsNotEmpty()
    readonly programa: string;

    @IsNumber()
    @IsNotEmpty()
    @Min(0)
    @Max(5)
    readonly promedio: number;
}
