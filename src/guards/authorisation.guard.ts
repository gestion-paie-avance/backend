import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { ROLES_KEY } from "src/decorators/roles.decorator";
import { AuthRole } from "src/enums/authRole.enum";

@Injectable()
export class Authorization implements CanActivate{
    constructor(private reflector: Reflector){}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const requiredRoles = this.reflector.getAllAndOverride<AuthRole[]>(ROLES_KEY,[
            context.getClass(),
            context.getHandler()
        ]);

        if (!requiredRoles) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const user = request.user

        if(!user || !requiredRoles.includes(user.role)) {
            throw new ForbiddenException('The Only user has role RH or ADMIN can access here');
        }
        return true;
    }
}