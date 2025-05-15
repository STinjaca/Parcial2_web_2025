/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EvaluacionEntity } from './evaluacion.entity';
import { EvaluacionService } from './evaluacion.service';

@Module({
    imports: [TypeOrmModule.forFeature([EvaluacionEntity])],
    providers: [EvaluacionEntity],
    exports: [EvaluacionService], // solo si otro módulo lo necesita
})
export class EvaluacionModule {}
