/* eslint-disable prettier/prettier */

import { Repository } from "typeorm";
import { EstudianteEntity } from "../estudiante/estudiante.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable, NotFoundException, NotAcceptableException } from "@nestjs/common";

@Injectable()
export class EstudianteService {
  constructor(
    @InjectRepository(EstudianteEntity)
    private readonly estudianteRepository: Repository<EstudianteEntity>
  ) {}

  async crearEstudiante(estudianteNew: EstudianteEntity): Promise<EstudianteEntity> {
    if (estudianteNew.promedio < 3.2) {
      throw new NotAcceptableException(`Promedio debe ser mayor a 3.2`);
    }
    if (estudianteNew.semestre >= 4) {
      throw new NotAcceptableException(`semestre debe ser menor a 4`);
    }

    return await this.estudianteRepository.save(estudianteNew);
  }


async eliminarEstudiante(id: number): Promise<void> {
  const estudiante = await this.estudianteRepository.findOne({ where: { id }, relations: ['proyectos'] });
  if (!estudiante) {
    throw new NotFoundException(`Estudiante con id ${id} no encontrado`);
  }
  if ((estudiante.proyectos?.length || 0) > 0) {
    throw new NotAcceptableException(`Estudiante tiene proyectos activos`);
  }
  await this.estudianteRepository.remove(estudiante);
}

}
