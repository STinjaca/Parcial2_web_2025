/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { ProfesorService } from './profesor.service';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { Repository } from 'typeorm';
import { ProfesorEntity } from './profesor.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { EvaluacionEntity } from '../evaluacion/evaluacion.entity';
import { ProyectoEntity } from '../proyecto/proyecto.entity';

describe('ProfesorService', () => {
    let service: ProfesorService;
    let repository: Repository<ProfesorEntity>;
    let profesoresList: ProfesorEntity[];

    const seedDatabase = async () => {
        repository.clear();
        profesoresList = [];
        for (let i = 0; i < 5; i++) {
            const profesor = await repository.save({
                nombre: `Profesor ${i}`,
                cedula: 1000000 + i,
                departamento: `Departamento ${i}`,
                extencion: 12345 + i,
                esParEvaluado: i % 2 === 0,
            });
            profesoresList.push(profesor);
        }
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [...TypeOrmTestingConfig()],
            providers: [ProfesorService],
        }).compile();

        service = module.get<ProfesorService>(ProfesorService);
        repository = module.get<Repository<ProfesorEntity>>(getRepositoryToken(ProfesorEntity));
        await seedDatabase();
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('crearProfesor should create a new professor', async () => {
        const profesor = { nombre: 'Nuevo Profesor', extencion: 54321, esParEvaluado: false, cedula: 1010110, departamento: `ISIS` } as ProfesorEntity;
        const result = await service.crearProfesor(profesor);
        expect(result).not.toBeNull();
        expect(result.nombre).toEqual(profesor.nombre);
    });

    it('crearProfesor should throw an exception for invalid extension length', async () => {
        const profesor = { nombre: 'Profesor Invalido', extencion: 123456, esParEvaluado: false } as ProfesorEntity;
        await expect(service.crearProfesor(profesor)).rejects.toHaveProperty('message', 'Extencio debe tener exactamente 5 digitos');
    });

    it('asignarEvaluador should assign a professor as an evaluator if they have less than 3 active evaluations', async () => {
        const profesor = profesoresList[0];
        profesor.evaluaciones = [];
        await repository.save(profesor);

        const result = await service.asignarEvaluador(profesor.id);
        expect(result).not.toBeNull();
        expect(result.esParEvaluado).toBe(true);
    });

    it('asignarEvaluador should throw an exception if the profesor has 3 or more active evaluations', async () => {
        const profesor = profesoresList[1];
        const mockProyecto = await repository.manager.save(
            repository.manager.create(ProyectoEntity, {
                titulo: 'Proyecto Mock',
                presupuesto: 1000,
                estado: 1,
                area: 'Area Mock',
                notaFinal: 4,
                fechaInicio: '2023-01-01',
                fechaFin: '2023-12-31',
            })
        );

        const evaluaciones = [
            repository.manager.create(EvaluacionEntity, { titulo: 'Evaluacion 1', profesor: profesor, proyecto: mockProyecto }),
            repository.manager.create(EvaluacionEntity, { titulo: 'Evaluacion 2', profesor: profesor, proyecto: mockProyecto }),
            repository.manager.create(EvaluacionEntity, { titulo: 'Evaluacion 3', profesor: profesor, proyecto: mockProyecto }),
        ];

        for (const evaluacion of evaluaciones) {
            await repository.manager.save(EvaluacionEntity, evaluacion);
        }

        const profesorConEvaluaciones = await repository.findOne({
            where: { id: profesor.id },
            relations: ['evaluaciones'],
        });

        await expect(service.asignarEvaluador(profesorConEvaluaciones!.id)).rejects.toHaveProperty(
            'message',
            'El profesor ya tiene 3 o más evaluaciones activas'
        );
    });
});
