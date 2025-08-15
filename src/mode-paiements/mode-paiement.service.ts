import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ModePaiement } from "./entities/mode-paiements.entity";

@Injectable()
export class ModePaiementService{
    constructor(
        @InjectRepository(ModePaiement)
        private readonly modePaiementRepository: Repository<ModePaiement>
    ){}
    async getAllModePaiement(){
        const listeMode = await this.modePaiementRepository.find();
        return {
            message: "liste des mode de paiement",
            data: listeMode
        };
    }

    async findOne(id: number){
        const modePaiement = await this.modePaiementRepository.findOne({where: {id}});
        return{
            data: modePaiement
        }
    }
}