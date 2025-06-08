import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEmail, IsInt, IsPositive, IsString, MinLength } from "class-validator";

export class SignUpdto{
    @ApiProperty({
        description: 'email of user',
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        description: 'matricule of user',
    })
    @IsInt()
    @IsPositive()
    @Type(()=> Number)
    employe_id: number;

    @ApiProperty({
        description: 'password of user',
    })
    @IsString()
    @MinLength(6)
    password: string;

    @ApiProperty({
        description: 'confirmation password of user',
    })
    @IsString()
    @MinLength(6)
    confirmationPassword: string;
}