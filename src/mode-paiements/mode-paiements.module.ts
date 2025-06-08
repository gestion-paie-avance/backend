import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ModePaiement } from "./entities/mode-paiements.entity";

@Module({
    imports: [TypeOrmModule.forFeature([ModePaiement])],
    exports: [TypeOrmModule],
})
export class ModePaiementModule{}