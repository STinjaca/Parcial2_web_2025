/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { Repository } from "typeorm";
import { EvaluacionEntity } from "./evaluacion.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable, NotAcceptableException } from "@nestjs/common";
import { ProfesorEntity } from "../profesor/profesor.entity";
import { ProyectoEntity } from "../proyecto/proyecto.entity";

@Injectable()
export class EvaluacionService {
  constructor(
    @InjectRepository(EvaluacionEntity)
    private readonly EvaluacionRepository: Repository<EvaluacionEntity>
  ) { }

  async crearEvaluacion(profesorId: number, proyectoId: number): Promise<EvaluacionEntity> {
    const profesor = await this.EvaluacionRepository.manager.findOne(ProfesorEntity, { where: { id: profesorId } });
    if (!profesor) {
      throw new NotAcceptableException('El profesor no existe.');
    }

    const proyecto = await this.EvaluacionRepository.manager.findOne(ProyectoEntity, { where: { id: proyectoId }, relations: ['mentor'] });
    if (!proyecto) {
      throw new NotAcceptableException('El proyecto no existe.');
    }

    // Validar que la notaFinal esté entre 0 y 5
    if (proyecto.notaFinal < 0 || proyecto.notaFinal > 5) {
      throw new NotAcceptableException('La nota final del proyecto debe estar entre 0 y 5.');
    }

    // Validar que el mentor no sea el mismo profesor
    if (proyecto.mentor && proyecto.mentor.id === profesor.id) {
      throw new NotAcceptableException('El profesor evaluador no puede ser el mentor del proyecto.');
    }

    const evaluacion = this.EvaluacionRepository.create({
      profesor,
      proyecto,
    });

    return await this.EvaluacionRepository.save(evaluacion);
  }


}
