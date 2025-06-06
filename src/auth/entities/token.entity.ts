import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class RefreshToken{
    @PrimaryGeneratedColumn()
    id: number;

    
    @Column()
    userId: string;
    
    @Column({type: 'uuid'})
    token: string;

    @Column({type: 'date'})
    expirationDate: Date;

    @CreateDateColumn({type: 'timestamp',default:()=>'CURRENT_TIMESTAMP'})
    created_at: Date;
    
    @UpdateDateColumn({type: 'timestamp',default:()=>'CURRENT_TIMESTAMP',onUpdate: 'CURRENT_TIMESTAMP'})
    updated_at: Date;

}