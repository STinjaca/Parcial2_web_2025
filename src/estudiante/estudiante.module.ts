/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstudianteEntity } from './estudiante.entity';
import { EstudianteService } from './estudiante.service';
import { EstudianteController } from './estudiante.controller';
@Module({
    imports: [TypeOrmModule.forFeature([EstudianteEntity])],
    providers: [EstudianteService], // Corregido: Añadir EstudianteService aquí
    controllers: [EstudianteController],
    exports: [EstudianteService], // Exportar EstudianteService
})
export class EstudianteModule {}
