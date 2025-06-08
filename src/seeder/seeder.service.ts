import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from 'src/auth/entities/auth.entity';
import { Employer } from 'src/employer/entities/employer.entity';
import { AuthRole } from 'src/enums/authRole.enum';
import { SituationEnum } from 'src/enums/situation.enum';
import { ModePaiement } from 'src/mode-paiements/entities/mode-paiements.entity';
import { Departement } from 'src/postes/entities/departement.entity';
import { Poste } from 'src/postes/entities/poste.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SeederService {
    constructor(
        @InjectRepository(Poste)
        private readonly posteRepository: Repository<Poste>,
        @InjectRepository(Departement)
        private readonly departementRepository: Repository<Departement>,
        @InjectRepository(Employer)
        private readonly employerRepository: Repository<Employer>,
        @InjectRepository(Auth)
        private readonly authRepository: Repository<Auth>,
        @InjectRepository(ModePaiement)
        private readonly modeRepository: Repository<ModePaiement>
    ){}

    async run(){
        
        const postes = [
            {titre: 'Directeur Général', niveau: 1},
            {titre: 'Chef de projet', niveau: 2},
            {titre: 'Designer ', niveau: 3},
            {titre: 'Développeur', niveau: 3}
        ];

        for(const poste of postes){
            const exists = await this.posteRepository.findOne({where: {titre: poste.titre}});
            if(!exists){
                await this.posteRepository.save(poste);
            }
        }

        const departements = [
            {nom: 'Informatique' , description: 'Service Informatique'},
            {nom: 'RH', description: 'Ressource humaines'}
        ];

        for(const departement of departements){
            const exists = await this.departementRepository.findOne({where: {nom: departement.nom}});
            if(!exists){
                await this.departementRepository.save(departement);
            }
        }

        const poste = await this.posteRepository.findOne({ where: { titre: 'Directeur Général' } });
        const departement = await this.departementRepository.findOne({ where: { nom: 'Informatique' } });

        if (poste && departement) {
            const existAuth = await this.authRepository.findOne({where: {email: "admin@paie.com"}})
            if(!existAuth){
                const employer = this.employerRepository.create({
                    nom: 'Jean',
                    prenom: 'Hermance',
                    matricule: 'M-0001',
                    contact: '0601020304',
                    adresse: 'Anjoma',
                    profile_file: 'default.png',
                    date_naissance: new Date('1980-01-01'),
                    date_embauche: new Date('2020-01-01'),
                    salaire_base: 500000,
                    cnaps: 123456,
                    enfants: 2,
                    situation_familiale: SituationEnum.MARIE,
                    licencement: false,
                    poste,
                    departement,
                });

                await this.employerRepository.save(employer);

                const hashedPassword = await import('bcrypt').then(bcrypt => bcrypt.hash('admin123',10));
                const auth = this.authRepository.create({
                    email: 'admin@paie.com',
                    password: hashedPassword,
                    role: AuthRole.ADMIN,
                    employer
                });

                await this.authRepository.save(auth);
            }
        }

        const modePaiements = [
            { type: 'virement', description: 'Virement bancaire'},
            { type: 'cheque', description: 'Chèque bancaire'},
            { type: 'mobile_money', description: 'Paiement mobile money'}
        ];

        for(const modePaiement of modePaiements){
            const exists = await this.modeRepository.findOne({where: {type: modePaiement.type}});
            if(!exists){
                await this.modeRepository.save(modePaiement);
            }
        }

    }
}