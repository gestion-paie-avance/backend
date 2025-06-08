import { Auth } from "src/auth/entities/auth.entity";
import { SituationEnum } from "src/enums/situation.enum";
import { ModePaiement } from "src/mode-paiements/entities/mode-paiements.entity";
import { Departement } from "src/postes/entities/departement.entity";
import { Poste } from "src/postes/entities/poste.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Employer {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    matricule: string;

    @Column()
    nom: string;

    @Column({nullable: true})
    prenom: string;

    @Column({unique: true})
    contact: string;

    @Column()
    adresse: string;

    @Column()
    profile_file: string;

    @Column({type: 'date'})
    date_naissance: Date;

    @Column({type: 'date'})
    date_embauche: Date;

    @Column()
    salaire_base: number;

    @Column()
    cnaps: number;

    @Column()
    enfants: number;

    @Column({
        type: 'enum',
        enum: SituationEnum,
        default: SituationEnum.MARIE
    })
    situation_familiale: SituationEnum;

    
    @Column({ type: 'boolean', default: false })
    licencement: Boolean;

    @OneToOne(() => Auth , (Auth) => Auth.employer)
    auth: Auth;

    @ManyToOne(() => Departement, (dep) => dep.employers)
    @JoinColumn({name: 'departement_id'})
    departement: Departement;
    
    @ManyToOne(() => Poste ,(poste) => poste.employers)
    @JoinColumn({name: 'poste_id'})
    poste: Poste;

    @ManyToOne(()=>ModePaiement ,(modepaiement) => modepaiement.employers)
    @JoinColumn({name: 'modePaiement_id'})
    modePaiement: ModePaiement;

    @CreateDateColumn({type: 'timestamp',default:()=>'CURRENT_TIMESTAMP'})
    created_at: Date;
        
    @UpdateDateColumn({type: 'timestamp',default:()=>'CURRENT_TIMESTAMP',onUpdate: 'CURRENT_TIMESTAMP'})
    updated_at: Date;

}
