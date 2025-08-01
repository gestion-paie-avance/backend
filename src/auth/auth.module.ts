import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from './entities/auth.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RefreshToken } from './entities/token.entity';
import { Employer } from 'src/employer/entities/employer.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Auth,RefreshToken,Employer]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async(configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {expiresIn: configService.get('JWT_EXPIRES_IN')}
      }),
      inject: [ConfigService]
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [JwtModule,TypeOrmModule]
})
export class AuthModule {}
