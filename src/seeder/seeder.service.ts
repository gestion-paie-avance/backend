import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Departement } from 'src/postes/entities/departement.entity';
import { Poste } from 'src/postes/entities/poste.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SeederService {
    constructor(
        @InjectRepository(Poste)
        private readonly posteRepository: Repository<Poste>,
        @InjectRepository(Departement)
        private readonly departementRepository: Repository<Departement>
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
    }
}
