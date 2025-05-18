/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Body, Controller, Delete, HttpCode, Param, Post } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { EstudianteService } from './estudiante.service';
import { EstudianteDto } from './estudiante.dto';
import { EstudianteEntity } from './estudiante.entity';

@Controller('estudiantes')
export class EstudianteController {
    constructor(private readonly estudianteService: EstudianteService) {}

    @Post()
    async crearEstudiante(@Body() estudianteDto: EstudianteDto) {
        const estudiante: EstudianteEntity = plainToInstance(EstudianteEntity, estudianteDto);
        return await this.estudianteService.crearEstudiante(estudiante);
    }

    @Delete(':id')
    @HttpCode(204)
    async eliminarEstudiante(@Param('id') id: number) {
        return await this.estudianteService.eliminarEstudiante(id);
    }
}
