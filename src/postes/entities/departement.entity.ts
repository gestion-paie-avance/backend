import { Employer } from "src/employer/entities/employer.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Departement{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nom: string;

    @Column()
    description: string;

    @OneToMany(() => Employer, (employer) => employer.departement)
    employers: Employer[];
}