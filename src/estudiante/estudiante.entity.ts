/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { ProyectoEntity } from 'src/proyecto/proyecto.entity';
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

    @OneToMany(() => ProyectoEntity, proyecto => proyecto.estudiante)
    proyectos: ProyectoEntity[];

    }
