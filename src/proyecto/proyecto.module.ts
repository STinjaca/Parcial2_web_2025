/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProyectoEntity } from './proyecto.entity';
import { ProyectoService } from './proyecto.service';
import { ProyectoController } from './proyecto.controller';

@Module({
    imports: [TypeOrmModule.forFeature([ProyectoEntity])],
    providers: [ProyectoService],
    controllers: [ProyectoController],
    exports: [ProyectoService], // solo si otro módulo lo necesita
})
export class ProyectoModule {}
