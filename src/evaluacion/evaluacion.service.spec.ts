/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { EvaluacionService } from './evaluacion.service';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProfesorEntity } from '../profesor/profesor.entity';
import { ProyectoEntity } from '../proyecto/proyecto.entity';

describe('EvaluacionService', () => {
  let service: EvaluacionService;
  let profesorRepository: Repository<ProfesorEntity>;
  let proyectoRepository: Repository<ProyectoEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [EvaluacionService],
    }).compile();

    service = module.get<EvaluacionService>(EvaluacionService);
    profesorRepository = module.get<Repository<ProfesorEntity>>(getRepositoryToken(ProfesorEntity));
    proyectoRepository = module.get<Repository<ProyectoEntity>>(getRepositoryToken(ProyectoEntity));
  });

  it('crearEvaluacion should throw an error if the professor is the mentor of the project', async () => {
    const profesor = await profesorRepository.save({
      cedula: 123456,
      nombre: 'Profesor Mentor',
      departamento: 'Departamento X',
      extencion: 12345,
      esParEvaluado: false,
    });

    const proyecto = await proyectoRepository.save({
      titulo: 'Proyecto Test',
      area: 'Area Test',
      presupuesto: 1000,
      notaFinal: 4,
      estado: 1,
      fechaInicio: '2023-01-01',
      fechaFin: '2023-12-31',
      mentor: profesor,
    });

    await expect(service.crearEvaluacion(profesor.id, proyecto.id)).rejects.toHaveProperty(
      'message',
      'El profesor evaluador no puede ser el mentor del proyecto.'
    );
  });

  it('crearEvaluacion should create an evaluation if the professor is not the mentor of the project', async () => {
    const profesor = await profesorRepository.save({
      cedula: 654321,
      nombre: 'Profesor Evaluador',
      departamento: 'Departamento Y',
      extencion: 54321,
      esParEvaluado: true,
    });

    const mentor = await profesorRepository.save({
      cedula: 123456,
      nombre: 'Profesor Mentor',
      departamento: 'Departamento X',
      extencion: 12345,
      esParEvaluado: false,
    });

    const proyecto = await proyectoRepository.save({
      titulo: 'Proyecto Test',
      area: 'Area Test',
      presupuesto: 1000,
      notaFinal: 4,
      estado: 1,
      fechaInicio: '2023-01-01',
      fechaFin: '2023-12-31',
      mentor: mentor,
    });

    const evaluacion = await service.crearEvaluacion(profesor.id, proyecto.id);

    expect(evaluacion).not.toBeNull();
    expect(evaluacion.profesor.id).toEqual(profesor.id);
    expect(evaluacion.proyecto?.id).toEqual(proyecto.id);
  });
});
