/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { ProyectoService } from './proyecto.service';
import { ProyectoDto } from './proyecto.dto';
import { ProyectoEntity } from './proyecto.entity';

@Controller('proyectos')
export class ProyectoController {
    constructor(private readonly proyectoService: ProyectoService) {}

    @Post()
    async crearProyecto(@Body() proyectoDto: ProyectoDto) {
        // Convertir mentorId a profesor en la entidad
        const { mentorId, ...rest } = proyectoDto;
        const proyecto: ProyectoEntity = plainToInstance(ProyectoEntity, rest);
        if (mentorId) {
            // Asumiendo que ProyectoEntity tiene una propiedad 'profesor'
            proyecto.mentor = { id: mentorId } as any;
        }
        return await this.proyectoService.crearProyecto(proyecto);
    }

    @Put(':id/avanzar')
    async avanzarProyecto(@Param('id') id: number) {
        return await this.proyectoService.avanzarProyecto(id);
    }

    @Get(':id/estudiantes')
    async findAllEstudiantes(@Param('id') id: number) {
        return await this.proyectoService.findAllEstudiantes(id);
    }
}
