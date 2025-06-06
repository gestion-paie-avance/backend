import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpdto } from './dto/signUp.dto';
import { LoginDto } from './dto/login.dto';
import { ApiOperation, ApiProperty } from '@nestjs/swagger';
import { RefreshTokenDto } from './dto/refreshToken.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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
