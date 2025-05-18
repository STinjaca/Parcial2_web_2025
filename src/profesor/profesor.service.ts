/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { Repository } from "typeorm";
import { ProfesorEntity } from "./profesor.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable, NotAcceptableException } from "@nestjs/common";

@Injectable()
export class ProfesorService {
  constructor(
    @InjectRepository(ProfesorEntity)
    private readonly ProfesorRepository: Repository<ProfesorEntity>
  ) {}

  async crearProfesor(profesorNew: ProfesorEntity): Promise<ProfesorEntity> {
    if (profesorNew.extencion.toString().length !== 5) {
      throw new NotAcceptableException(`Extencio debe tener exactamente 5 digitos`);
    }

    return await this.ProfesorRepository.save(profesorNew);
  }
  async asignarEvaluador(id: number): Promise<ProfesorEntity> {
    const profesor = await this.ProfesorRepository.findOne({
      where: { id },
      relations: ['evaluaciones'],
    });

    if (!profesor) {
      throw new NotAcceptableException('Profesor no encontrado');
    }

    const evaluacionesActivas = profesor.evaluaciones;

    if (evaluacionesActivas.length >= 3) {
      throw new NotAcceptableException('El profesor ya tiene 3 o más evaluaciones activas');
    }

    profesor.esParEvaluado = true;

    return await this.ProfesorRepository.save(profesor);
  }



}
