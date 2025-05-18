/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ProfesorDto {
    @IsNumber()
    @IsNotEmpty()
    readonly cedula: number;

    @IsString()
    @IsNotEmpty()
    readonly nombre: string;

    @IsString()
    @IsNotEmpty()
    readonly departamento: string;

    @IsNumber()
    @IsNotEmpty()
    readonly extencion: number;

    @IsBoolean()
    @IsNotEmpty()
    readonly esParEvaluado: boolean;
}
