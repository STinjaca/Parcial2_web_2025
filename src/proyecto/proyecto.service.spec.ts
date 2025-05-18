/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { ProyectoService } from './proyecto.service';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { Repository } from 'typeorm';
import { ProyectoEntity } from './proyecto.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { EstudianteEntity } from '../estudiante/estudiante.entity';

describe('ProyectoService', () => {
  let service: ProyectoService;
  let repository: Repository<ProyectoEntity>;
  let proyectosList: ProyectoEntity[];

  const seedDatabase = async () => {
    repository.clear();
    proyectosList = [];
    for (let i = 0; i < 5; i++) {
      const proyecto = await repository.save({
        titulo: `Proyecto ${i}`,
        presupuesto: 1000 + i,
        estado: 1,
        area: `Area ${i}`,
        notaFinal: 4,
        fechaInicio: '2023-01-01',
        fechaFin: '2023-12-31',
      });
      proyectosList.push(proyecto);
    }
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [ProyectoService],
    }).compile();

    service = module.get<ProyectoService>(ProyectoService);
    repository = module.get<Repository<ProyectoEntity>>(getRepositoryToken(ProyectoEntity));
    await seedDatabase();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('crearProyecto should create a new project', async () => {
    const proyecto = {
      titulo: 'Nuevo Proyecto',
      presupuesto: 5000,
      estado: 1,
      area: 'Area Nueva',
      notaFinal: 4,
      fechaInicio: '2023-01-01',
      fechaFin: '2023-12-31',
    } as ProyectoEntity;

    const result = await service.crearProyecto(proyecto);
    expect(result).not.toBeNull();
    expect(result.titulo).toEqual(proyecto.titulo);
    expect(result.presupuesto).toEqual(proyecto.presupuesto);
    expect(result.estado).toEqual(proyecto.estado);
    expect(result.area).toEqual(proyecto.area);
  });

  it('crearProyecto should throw an exception for invalid title length', async () => {
    const proyecto = {
      titulo: 'Titulo muy largo para un proyecto',
      presupuesto: 5000,
      estado: 1,
      area: 'Area Invalida',
      notaFinal: 4,
      fechaInicio: '2023-01-01',
      fechaFin: '2023-12-31',
    } as ProyectoEntity;
    await expect(service.crearProyecto(proyecto)).rejects.toHaveProperty('message', 'titulo menos de 15');
  });

  it('avanzarProyecto should advance the project state', async () => {
    const proyecto = proyectosList[0];
    proyecto.estado = 1;
    await repository.save(proyecto);

    const result = await service.avanzarProyecto(proyecto.id);
    expect(result).not.toBeNull();
    expect(result.estado).toBe(2);
  });

  it('avanzarProyecto should throw an exception if the project is already in the maximum state', async () => {
    const proyecto = proyectosList[0];
    proyecto.estado = 4; // Assuming 4 is the maximum state
    await repository.save(proyecto);

    await expect(service.avanzarProyecto(proyecto.id)).rejects.toHaveProperty(
      'message',
      'El proyecto ya está en su estado máximo'
    );
  });

  it('findAllEstudiantes should return the leader of the project', async () => {
    const proyecto = proyectosList[0];
    const lider = await repository.manager.save(
      repository.manager.create(EstudianteEntity, {
        id: 1,
        nombre: 'Estudiante Lider',
        cedula: 2000001,
        semestre: 3,
        programa: 'Ingeniería',
        promedio: 4.0,
      })
    );
    proyecto.lider = lider;
    await repository.save(proyecto);

    const result = await service.findAllEstudiantes(proyecto.id);
    expect(result).not.toBeNull();
    expect(result.nombre).toBe('Estudiante Lider');
    expect(result.cedula).toBe(2000001);
    expect(result.semestre).toBe(3);
    expect(result.programa).toBe('Ingeniería');
    expect(result.promedio).toBe(4.0);
  });

  it('findAllEstudiantes should throw an exception if the project is not found', async () => {
    const invalidProjectId = -1;

    await expect(service.findAllEstudiantes(invalidProjectId)).rejects.toHaveProperty(
      'message',
      'No se encontró el proyecto'
    );
  });
});
