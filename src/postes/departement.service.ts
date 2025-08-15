import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Departement } from "./entities/departement.entity";
import { Repository } from "typeorm";

@Injectable()
export class DepartementService{
    constructor(
        @InjectRepository(Departement)
        private readonly departementRepository: Repository<Departement>
    ){}

    async findAllDepartement(){
        const listeDepartement = await this.departementRepository.find();
        return{
            message: "liste des département",
            data: listeDepartement
        };
    }

    async findOne(id: number){
        const departement = await this.departementRepository.findOne({
            where: {id}
        });

        return {
            data: departement
        }
    }
}