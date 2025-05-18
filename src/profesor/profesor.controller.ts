/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { ProfesorService } from './profesor.service';
import { ProfesorDto } from './profesor.dto';
import { ProfesorEntity } from './profesor.entity';

@Controller('profesores')
export class ProfesorController {
    constructor(private readonly profesorService: ProfesorService) {}

    @Post()
    async crearProfesor(@Body() profesorDto: ProfesorDto) {
        const profesor: ProfesorEntity = plainToInstance(ProfesorEntity, profesorDto);
        return await this.profesorService.crearProfesor(profesor);
    }

    @Put(':id/asignar-evaluador')
    async asignarEvaluador(@Param('id') id: number) {
        return await this.profesorService.asignarEvaluador(id);
    }
}
