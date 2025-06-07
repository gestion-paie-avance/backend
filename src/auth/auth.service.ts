import { BadRequestException, ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from './entities/auth.entity';
import { MoreThan, MoreThanOrEqual, Repository } from 'typeorm';
import { SignUpdto } from './dto/signUp.dto';
import * as bcrypt from 'bcrypt'
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { RefreshToken } from './entities/token.entity';
import { v4 as uuid4 } from 'uuid';


@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Auth)
        private readonly authRepository: Repository<Auth>,
        @InjectRepository(RefreshToken)
        private readonly refreshTokenrepository: Repository<RefreshToken>,
        private readonly jwtService: JwtService
    ){}

    async signUp(signUpDto: SignUpdto){
        const {email , password , confirmationPassword , employe_matricule} = signUpDto;
        const existingUser = await this.authRepository.findOne({where: {email}})
        if (existingUser) {
            throw new ConflictException('Email already exists');
        }

        if (confirmationPassword !== password) {
            throw new BadRequestException('Password and confirmation password do not match');
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const auth = this.authRepository.create({
            email,
            password: hashPassword,
            employe_matricule,
        });

        return this.authRepository.save(auth);
    }

    async login(loginDto: LoginDto){
        const {email , password } = loginDto;
        const user = await this.authRepository.findOne({where: {email}});
        if (!user) {
            throw new UnauthorizedException('Wrong connexion');
        }

        const comparePassword = await bcrypt.compare(password, user.password);
        if (!comparePassword) {
            throw new UnauthorizedException('Wrong connexion');
        }

        const tokens = await this.generateToken(user.id)
        return {
            ...tokens,
            user: user.id
        }
    }

    async generateToken(userId){
        const userAuth = await this.authRepository.findOne({where: {id: userId}});
         if (!userAuth) {
            throw new UnauthorizedException('Unauthorize user');
        }
        const payload = {sub: userAuth.id , role: userAuth.role}
        
        const accessToken = this.jwtService.sign(payload)

        const refreshToken = uuid4();
        
        await this.storeRefreshToken(userId,refreshToken);
        return {
            accessToken,
            refreshToken
        };
    }

    async storeRefreshToken(userId, token: string){
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 3);
        await this.refreshTokenrepository.save({userId,token, expirationDate})
    }

    async refreshTokens(refreshToken : string){
        const token = await this.refreshTokenrepository.findOne({ 
            where: {
                token: refreshToken,
                expirationDate: MoreThan(new Date())
            }
        })
        
        if (!token) { 
            throw new UnauthorizedException('Refresh token invalid');
        }

        this.refreshTokenrepository.delete({id : token.id});

        return this.generateToken(token.userId);
    }
}
