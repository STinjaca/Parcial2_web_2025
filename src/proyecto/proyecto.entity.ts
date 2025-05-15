/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import { EstudianteEntity } from 'src/estudiante/estudiante.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProyectoEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    titulo: string;
    
    @Column()
    area: string;

    @Column()
    presupuesto: number;

    @Column()
    notaFinal: number;

    @Column()
    estado: number;
    
    @Column()
    fechaInicio: string;

    @Column()
    fechaFin: string;

    @ManyToOne(() => EstudianteEntity, estudiante => estudiante.proyectos)
    estudiante: EstudianteEntity;

    }
