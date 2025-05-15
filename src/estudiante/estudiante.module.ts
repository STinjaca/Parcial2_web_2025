/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstudianteEntity } from './estudiante.entity';
import { EstudianteService } from './estudiante.service';

@Module({
    imports: [TypeOrmModule.forFeature([EstudianteEntity])],
    providers: [EstudianteEntity],
    exports: [EstudianteService], // solo si otro módulo lo necesita
})
export class EstudianteModule {}
