import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Departement } from "src/postes/entities/departement.entity";
import { Poste } from "src/postes/entities/poste.entity";
import { SeederService } from "./seeder.service";
import { PostesModule } from "src/postes/poste.module";
import { DepartementsModule } from "src/postes/departement.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Poste, Departement]),
        PostesModule,
        DepartementsModule
    ],
    providers: [SeederService],
    exports: [SeederService]
})
export class SeedModule{}