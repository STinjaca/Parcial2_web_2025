/* eslint-disable prettier/prettier */ 
import { Test, TestingModule } from '@nestjs/testing';
import { EstudianteService } from './estudiante.service';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { Repository } from 'typeorm';
import { EstudianteEntity } from './estudiante.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProyectoEntity } from 'src/proyecto/proyecto.entity';

describe('EstudianteService', () => {
  let service: EstudianteService;
  let repository: Repository<EstudianteEntity>;
  let estudiantesList: EstudianteEntity[];

  const seedDatabase = async () => {
    repository.clear();
    estudiantesList = [];
    for (let i = 0; i < 5; i++) {
      const estudiante = await repository.save({
        cedula: 2000000 + i,
        nombre: `Estudiante ${i}`,
        semestre: i + 1,
        programa: `Programa ${i}`,
        promedio: 3.5 + i * 0.1,
      });
      estudiantesList.push(estudiante);
    }
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [EstudianteService],
    }).compile();

    service = module.get<EstudianteService>(EstudianteService);
    repository = module.get<Repository<EstudianteEntity>>(getRepositoryToken(EstudianteEntity));
    await seedDatabase();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('crearEstudiante should create a new student', async () => {
    const estudiante = { nombre: 'Nuevo Estudiante', promedio: 3.8, semestre: 1,cedula: 2000000, programa: `ISIS`} as EstudianteEntity;
    const result = await service.crearEstudiante(estudiante);
    expect(result).not.toBeNull();
    expect(result.nombre).toEqual(estudiante.nombre);
  });

  it('crearEstudiante should throw an exception for low average', async () => {
    const estudiante = { nombre: 'Estudiante Invalido', promedio: 3.0, semestre: 1 } as EstudianteEntity;
    await expect(service.crearEstudiante(estudiante)).rejects.toHaveProperty('message', 'Promedio debe ser mayor a 3.2');
  });

  it('eliminarEstudiante should delete a student', async () => {
    const estudiante = estudiantesList[0];
    await service.eliminarEstudiante(estudiante.id);
    const deletedEstudiante = await repository.findOne({ where: { id: estudiante.id } });
    expect(deletedEstudiante).toBeNull();
  });

  it('eliminarEstudiante should throw an exception for non-existent student', async () => {
    const invalidId = -1;
    await expect(service.eliminarEstudiante(invalidId)).rejects.toHaveProperty('message', `Estudiante con id ${invalidId} no encontrado`);
  });

  it('eliminarEstudiante should throw an exception if the student has active projects', async () => {
    const estudiante = estudiantesList[0];
    const proyecto = await repository.manager.save('ProyectoEntity', {
      titulo: 'Proyecto Activo',
      area: 'Ciencias',
      presupuesto: 10000,
      notaFinal: 4.5,
      estado: 1,
      fechaInicio: '2023-01-01',
      fechaFin: '2023-12-31',
      lider: estudiante,
      mentor: undefined,
      evaluaciones: [],
    } as Partial<ProyectoEntity>) as ProyectoEntity;
    estudiante.proyectos = [proyecto];
    await repository.save(estudiante);

    await expect(service.eliminarEstudiante(estudiante.id)).rejects.toHaveProperty('message', 'Estudiante tiene proyectos activos');
  });

  it('eliminarEstudiante should delete a student without active projects', async () => {
    const estudiante = estudiantesList[0];
    estudiante.proyectos = [];
    await repository.save(estudiante);

    await service.eliminarEstudiante(estudiante.id);
    const deletedEstudiante = await repository.findOne({ where: { id: estudiante.id } });
    expect(deletedEstudiante).toBeNull();
  });
});
