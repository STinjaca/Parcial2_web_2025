/* eslint-disable prettier/prettier */

import { ProyectoEntity } from '../proyecto/proyecto.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class EstudianteEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    cedula: number;

    @Column()
    nombre: string;

    @Column()
    semestre: number;
    
    @Column()
    programa: string;
    
    @Column()
    promedio: number;

    @OneToMany(() => ProyectoEntity, proyecto => proyecto.lider)
    proyectos: ProyectoEntity[];

    }
