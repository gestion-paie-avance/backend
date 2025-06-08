import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, ParseFilePipeBuilder, HttpStatus, UseGuards } from '@nestjs/common';
import { EmployerService } from './employer.service';
import { CreateEmployerDto } from './dto/create-employer.dto';
import { UpdateEmployerDto } from './dto/update-employer.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOperation } from '@nestjs/swagger';
import { SituationEnum } from 'src/enums/situation.enum';
import { AuthentificationGuard } from 'src/guards/authentification.guard';
import { Authorization } from 'src/guards/authorisation.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { AuthRole } from 'src/enums/authRole.enum';


@Controller('employer')
export class EmployerController {
  constructor(private readonly employerService: EmployerService) {}

  @Post()
  @ApiOperation({description: "create employer"})
  @UseInterceptors(FileInterceptor('profile_file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        nom: {type: 'string'},
        prenom: {type: 'string'},
        contact: {type: 'string'},
        adresse: {type: 'string'},
        profile_file: {
          type: 'string',
          format: 'binary'
        },
        date_naissance: {type: 'string'},
        date_embauche: {type: 'string'},
        salaire_base: {type: 'number'},
        cnaps: {type: 'number'},
        enfants: {type: 'number'},
        situation_familiale: {
          type: 'string',
          enum: Object.values(SituationEnum)
        },
        licencement: {type : 'boolean',default: false},
        departementId: {type: 'number'},
        posteId: {type: 'number'},
        modePaiementId: {type: 'number'},
      }
    }
  })
  create(@Body() createEmployerDto: CreateEmployerDto, @UploadedFile(
    new ParseFilePipeBuilder().addMaxSizeValidator({maxSize: 1000000})
                              .build({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY})
  ) file: Express.Multer.File) {
    return this.employerService.create(createEmployerDto,file);
  }

  @Get()
  findAll() {
    return this.employerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employerService.findOne(+id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('profile_file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        nom: {type: 'string'},
        prenom: {type: 'string'},
        contact: {type: 'string'},
        adresse: {type: 'string'},
        profile_file: {
          type: 'string',
          format: 'binary'
        },
        date_naissance: {type: 'string'},
        date_embauche: {type: 'string'},
        salaire_base: {type: 'number'},
        cnaps: {type: 'number'},
        enfants: {type: 'number'},
        situation_familiale: {
          type: 'string',
          enum: Object.values(SituationEnum)
        },
        licencement: {type : 'boolean',default: false},
        departement: {type: 'number'},
        poste: {type: 'number'}
      }
    }
  })
  update(@Param('id') id: string, @Body() updateEmployerDto: UpdateEmployerDto, file: Express.Multer.File) {
    return this.employerService.update(+id, updateEmployerDto,file);
  }

}
