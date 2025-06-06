import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class RefreshTokenDto{
    @ApiProperty({
        description: 'token user',
    })
    @IsString()
    token: string;
}