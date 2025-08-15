import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Departement } from "./entities/departement.entity";
import { DepartementController } from "./departement.controller";
import { DepartementService } from "./departement.service";

@Module({
    imports: [TypeOrmModule.forFeature([Departement])],
    exports: [TypeOrmModule],
    controllers: [DepartementController],
    providers: [DepartementService]
})
export class DepartementsModule{}