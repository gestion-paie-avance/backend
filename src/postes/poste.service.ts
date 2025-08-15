import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Poste } from "./entities/poste.entity";

@Injectable()
export class PosteService{
    constructor(
        @InjectRepository(Poste)
        private readonly posteRepository: Repository<Poste>
    ){}

    async findAllPoste(){
        const listeDepartement = await this.posteRepository.find();
        return{
            message: "liste des poste",
            data: listeDepartement
        };
    }

    async findOne(id: number){
        const departement = await this.posteRepository.findOne({
            where: {id}
        });

        return {
            data: departement
        }
    }
}