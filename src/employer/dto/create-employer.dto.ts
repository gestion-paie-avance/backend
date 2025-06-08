import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsBoolean, IsDate, IsEnum, IsInt, isNumber, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";
import { IsDatePast } from "src/decorators/datePaste.decorator";
import { SituationEnum } from "src/enums/situation.enum";

export class CreateEmployerDto {
    @ApiProperty({
        description: 'nom employer' 
    })
    @IsString()
    nom: string;

    @ApiProperty({
        description: 'prenom employer' 
    })
    @IsString()
    @IsOptional()
    prenom: string;

    @ApiProperty({
        description: 'contact employer' 
    })
    @IsString()
    contact: string;
    
    @ApiProperty({
        description: 'adresse employer' 
    })
    @IsString()
    adresse: string;


    @ApiProperty({
        description: 'profile employer' 
    })
    profile_file: string;

    @ApiProperty({
        description: 'date naissance employer',
    })
    @IsDate()
    @Type(() => Date)
    @IsDatePast({message: "Dont must a date futur"})
    date_naissance: Date;

    @ApiProperty({
        description: 'date d\'embauche employer',
    })
    @IsDate()
    @Type(() => Date)
    date_embauche: Date;

    @ApiProperty({
        description: "salaire de base"
    })
    @IsNumber()
    @Type(() => Number)
    salaire_base: number;

    @ApiProperty({
        description: "organisme sociale"
    })
    @IsNumber()
    @Type(() => Number)
    cnaps: number;

    @ApiProperty({
        description: 'Situation familiale',
        enum: SituationEnum
    })
    @IsEnum(SituationEnum)
    situation_familiale: SituationEnum;

    @ApiProperty({
        description: "nombre d'enfants"
    })
    @IsNumber()
    @Type(() => Number)
    @IsPositive()
    enfants: number;

    @ApiProperty({
        description: "departement employer"
    })
    @IsInt()
    @IsPositive()
    @Type(() => Number)
    departementId: number;

    @ApiProperty({
        description: "poste employer"
    })
    @IsInt()
    @IsPositive()
    @Type(() => Number)
    posteId: number;

    @ApiProperty({
        description: "modePaiement employer"
    })
    @IsInt()
    @IsPositive()
    @Type(() => Number)
    modePaiementId: number;

    @ApiProperty({
        description: "licencement salarie"
    })
    licencement: Boolean;

}
