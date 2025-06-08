import { Employer } from "src/employer/entities/employer.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Poste{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    titre: string;

    @Column()
    niveau: number;

    @OneToMany(() => Employer, (employer) => employer.poste)
    employers: Employer[];

}