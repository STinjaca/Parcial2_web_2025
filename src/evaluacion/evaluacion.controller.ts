/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Body, Controller, Post } from '@nestjs/common';
import { EvaluacionService } from './evaluacion.service';
import { EvaluacionDto } from './evaluacion.dto';

@Controller('evaluaciones')
export class EvaluacionController {
    constructor(private readonly evaluacionService: EvaluacionService) {}

    @Post()
    async crearEvaluacion(@Body() evaluacionDto: EvaluacionDto) {
        return await this.evaluacionService.crearEvaluacion(
            evaluacionDto.profesorId,
            evaluacionDto.proyectoId
        );
    }
}
