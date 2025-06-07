import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

@Injectable()
export class AuthentificationGuard implements CanActivate{
    constructor(
        private jwtService: JwtService,
        private reflector: Reflector 
    ){}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        try {
            const authHeader = request.headers.authorization
            if (!authHeader) {
                throw new UnauthorizedException('User not authorize');
            }
            const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;
            
            if (!token) {
                throw new UnauthorizedException('User not authorize');
            }
            const payload = this.jwtService.verify(token);
            request.user = payload;
            return true;
        } catch (error) {
            console.log(error.message)
        }
        return true;
    }
}