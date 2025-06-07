import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpdto } from './dto/signUp.dto';
import { LoginDto } from './dto/login.dto';
import { ApiBearerAuth, ApiOperation, ApiProperty } from '@nestjs/swagger';
import { RefreshTokenDto } from './dto/refreshToken.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { AuthRole } from 'src/enums/authRole.enum';
import { AuthentificationGuard } from 'src/guards/authentification.guard';
import { Authorization } from 'src/guards/authorisation.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthentificationGuard,Authorization)
  @Roles(AuthRole.ADMIN,AuthRole.RH)
  @Post('signUp')
  async signUp(@Body() signUpDto: SignUpdto){
    return this.authService.signUp(signUpDto);
  }

  @Post('login')
  async login(@Body() loginDto:  LoginDto){
    return this.authService.login(loginDto);
  }
  
  @Post('refresh')
  @ApiOperation({summary:'refreash_token'})
  async refreshToken(@Body() refreshtokenDto: RefreshTokenDto){
    return this.authService.refreshTokens(refreshtokenDto.token);
  }
}
