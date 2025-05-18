/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfesorEntity } from './profesor.entity';
import { ProfesorService } from './profesor.service';
import { ProfesorController } from './profesor.controller';

@Module({
    imports: [TypeOrmModule.forFeature([ProfesorEntity])],
    providers: [ProfesorService],
    controllers: [ProfesorController],
    exports: [ProfesorService], // solo si otro módulo lo necesita
})
export class ProfesorModule {}
