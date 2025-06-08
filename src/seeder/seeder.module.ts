import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Departement } from "src/postes/entities/departement.entity";
import { Poste } from "src/postes/entities/poste.entity";
import { SeederService } from "./seeder.service";
import { PostesModule } from "src/postes/poste.module";
import { DepartementsModule } from "src/postes/departement.module";
import { EmployerModule } from "src/employer/employer.module";
import { Employer } from "src/employer/entities/employer.entity";
import { ModePaiement } from "src/mode-paiements/entities/mode-paiements.entity";
import { ModePaiementModule } from "src/mode-paiements/mode-paiements.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Poste, Departement,Employer,ModePaiement]),
        PostesModule,
        DepartementsModule,
        EmployerModule,
        ModePaiementModule
    ],
    providers: [SeederService],
    exports: [SeederService]
})
export class SeedModule{}