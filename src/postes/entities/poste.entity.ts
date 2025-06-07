import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Poste{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    titre: string;

    @Column()
    niveau: number;

}