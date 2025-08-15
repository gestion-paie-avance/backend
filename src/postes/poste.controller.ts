import { Controller, Get, Param } from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";
import { PosteService } from "./poste.service";

@Controller('poste')
export class PosteController{
    constructor(
        private readonly posteService: PosteService
    ){}
    @Get()
    @ApiOperation({description: "get liste des postes"})
    getAllDepartement(){
        return this.posteService.findAllPoste();
    }

    @Get(':id')
    findOne(@Param('id') id: string){
        return this.posteService.findOne(+id);
    }
}