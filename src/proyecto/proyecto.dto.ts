/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsDateString, IsNotEmpty, IsNumber, IsString, Min, Max } from 'class-validator';

export class ProyectoDto {
    @IsString()
    @IsNotEmpty()
    readonly titulo: string;

    @IsString()
    @IsNotEmpty()
    readonly area: string;

    @IsNumber()
    @IsNotEmpty()
    readonly presupuesto: number;

    @IsNumber()
    @IsNotEmpty()
    @Min(0)
    @Max(5)
    readonly notaFinal: number;

    @IsNumber()
    @IsNotEmpty()
    readonly estado: number;

    @IsDateString()
    @IsNotEmpty()
    readonly fechaInicio: string;

    @IsDateString()
    @IsNotEmpty()
    readonly fechaFin: string;

    @IsNotEmpty()
    readonly liderId: number;

    @IsNotEmpty()
    readonly mentorId: number;
}
