import { Controller, Get, Param } from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";
import { DepartementService } from "./departement.service";

@Controller('departement')
export class DepartementController{
    constructor(
        private readonly departementService: DepartementService
    ){}
    @Get()
    @ApiOperation({description: "get liste des département"})
    getAllPoste(){
        return this.departementService.findAllDepartement();
    }

    @Get(':id')
    findOne(@Param('id') id: string){
        return this.departementService.findOne(+id);
    }
}