import { Employer } from "src/employer/entities/employer.entity";
import { AuthRole } from "src/enums/authRole.enum";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Auth{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    email: string;

    @Column()
    password: string;

    @Column({
        type: 'enum',
        enum: AuthRole,
        default: AuthRole.EMPLOYE
    })
    role: AuthRole;

    @OneToOne(()=> Employer, {cascade: true})
    @JoinColumn()
    employer: Employer;

    @CreateDateColumn({type: 'timestamp',default:()=>'CURRENT_TIMESTAMP'})
    created_at: Date;

    @UpdateDateColumn({type: 'timestamp',default:()=>'CURRENT_TIMESTAMP',onUpdate: 'CURRENT_TIMESTAMP'})
    updated_at: Date;

}