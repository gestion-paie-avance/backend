import { Employer } from "src/employer/entities/employer.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ModePaiement{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    type: string;

    @Column()
    description: string;

    @OneToMany(()=>Employer,(employer)=>employer.modePaiement)
    employers: Employer[];
}