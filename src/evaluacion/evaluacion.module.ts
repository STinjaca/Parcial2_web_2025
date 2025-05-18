/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EvaluacionEntity } from './evaluacion.entity';
import { EvaluacionService } from './evaluacion.service';
import { EvaluacionController } from './evaluacion.controller';

@Module({
    imports: [TypeOrmModule.forFeature([EvaluacionEntity])],
    providers: [EvaluacionService],
    controllers: [EvaluacionController],
    exports: [EvaluacionService], // solo si otro módulo lo necesita
})
export class EvaluacionModule {}
