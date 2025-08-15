import { Controller, Get, Param } from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";
import { ModePaiementService } from "./mode-paiement.service";

@Controller('mode-paiement')
export class ModePaiementController{
    constructor(
        private readonly modePaiementService: ModePaiementService
    ){}
    @Get()
    @ApiOperation({description: "get liste des mode paiement"})
    getAllModePaiement(){
        return this.modePaiementService.getAllModePaiement();
    }

    @Get(':id')
    findOne(@Param('id') id: string){
        return this.modePaiementService.findOne(+id);
    }
}