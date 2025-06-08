import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { SeederService } from './seeder/seeder.service';
import { PostesModule } from './postes/poste.module';
import { DepartementsModule } from './postes/departement.module';
import { EmployerModule } from './employer/employer.module';
import { ModePaiementModule } from './mode-paiements/mode-paiements.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
    TypeOrmModule.forRootAsync({
      imports: [
        ConfigModule,
      ],
      useFactory: (configService : ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        synchronize: configService.get('DB_SYNCHRONIZE') === 'true',
        entities: [__dirname+'/**/*.entity{.ts,.js}'],
      }),
    
      inject: [ConfigService],
    }),
    AuthModule,
    PostesModule,
    DepartementsModule,
    EmployerModule,
    ModePaiementModule
  ],
  controllers: [AppController],
  providers: [AppService, SeederService],
})
export class AppModule {}
