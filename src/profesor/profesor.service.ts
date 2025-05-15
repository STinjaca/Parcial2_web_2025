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
    if(profesorNew.extencion.toString().length == 5){
      throw new NotAcceptableException(`Extencio mas de 5 digitos`);
    }

    return await this.ProfesorRepository.save(profesorNew);
  }
  async asignarEvaluador(profesorNew: ProfesorEntity): Promise<ProfesorEntity> {
    if(profesorNew.extencion.toString().length == 5){
      throw new NotAcceptableException(`Extencio mas de 5 digitos`);
    }

    return await this.ProfesorRepository.save(profesorNew);
  }



}
