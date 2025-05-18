/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsNotEmpty } from 'class-validator';

export class EvaluacionDto {
    @IsNotEmpty()
    readonly profesorId: number;

    @IsNotEmpty()
    readonly proyectoId: number;
}
