import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ModePaiement } from "./entities/mode-paiements.entity";
import { ModePaiementController } from "./mode-paiement.controller";
import { ModePaiementService } from "./mode-paiement.service";

@Module({
    imports: [TypeOrmModule.forFeature([ModePaiement])],
    exports: [TypeOrmModule],
    controllers: [ModePaiementController],
    providers: [ModePaiementService]
})
export class ModePaiementModule{}