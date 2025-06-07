import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Departement } from "./entities/departement.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Departement])],
    exports: [TypeOrmModule]
})
export class DepartementsModule{}