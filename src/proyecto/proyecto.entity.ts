/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import { EstudianteEntity } from '../estudiante/estudiante.entity';
import { EvaluacionEntity } from '../evaluacion/evaluacion.entity';
import { ProfesorEntity } from '../profesor/profesor.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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

    @ManyToOne(() => EstudianteEntity, lider => lider.proyectos)
    lider: EstudianteEntity;

    @ManyToOne(() => ProfesorEntity, mentor => mentor.mentorias)
    mentor: ProfesorEntity;

    @OneToMany(() => EvaluacionEntity, evalucaion => evalucaion.proyecto)
    evaluaciones: EvaluacionEntity[];

    }
