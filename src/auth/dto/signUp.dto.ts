import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MinLength } from "class-validator";

export class SignUpdto{
    @ApiProperty({
        description: 'email of user',
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        description: 'matricule of user',
    })
    @IsString()
    employe_matricule: string;

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