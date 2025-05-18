/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import { EvaluacionEntity } from '../evaluacion/evaluacion.entity';
import { ProyectoEntity } from '../proyecto/proyecto.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProfesorEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    cedula: number;

    @Column()
    nombre: string;
    
    @Column()
    departamento: string;

    @Column()
    extencion: number;
    
    @Column()
    esParEvaluado: boolean;

    @OneToMany(() => EvaluacionEntity, evaluacion => evaluacion.profesor)
    evaluaciones: EvaluacionEntity[];

    @OneToMany(() => ProyectoEntity, mentoria => mentoria.mentor)
    mentorias: ProyectoEntity[];


    }
