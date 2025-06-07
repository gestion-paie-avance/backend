import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Departement{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nom: string;

    @Column()
    description: string;
}