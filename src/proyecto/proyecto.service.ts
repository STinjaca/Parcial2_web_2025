/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { Repository } from "typeorm";
import { ProyectoEntity } from "./proyecto.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable, NotAcceptableException } from "@nestjs/common";
import { EstudianteEntity } from "../estudiante/estudiante.entity";

@Injectable()
export class ProyectoService {
  constructor(
    @InjectRepository(ProyectoEntity)
    private readonly ProyectoRepository: Repository<ProyectoEntity>
  ) {}

  async crearProyecto(proyectoNew: ProyectoEntity): Promise<ProyectoEntity> {
    if(proyectoNew.titulo.toString().length > 15){
      throw new NotAcceptableException(`titulo menos de 15`);
    }
    if(proyectoNew.presupuesto <= 0){
      throw new NotAcceptableException(`Proyecto no puede tener presupuesto menor o igual a 0`);
    }

    return await this.ProyectoRepository.save(proyectoNew);
  }

  async avanzarProyecto(id: number): Promise<ProyectoEntity> {
    const proyecto = await this.ProyectoRepository.findOne({ where: { id } });

    if (!proyecto) {
      throw new NotAcceptableException("No se encontró");
    }

    if (proyecto.estado >= 4) {
      throw new NotAcceptableException("El proyecto ya está en su estado máximo");
    }

    proyecto.estado += 1;

    return await this.ProyectoRepository.save(proyecto);
  }

  async findAllEstudiantes(id: number): Promise<EstudianteEntity> {
    const proyecto = await this.ProyectoRepository.findOne({
      where: { id },
      relations: ['lider'],
    });

    if (!proyecto) {
      throw new NotAcceptableException('No se encontró el proyecto');
    }

    return proyecto.lider;
  }

}
