import { SetMetadata } from "@nestjs/common";
import { AuthRole } from "src/enums/authRole.enum";

export const ROLES_KEY = 'roles';
export const Roles = (...roles: AuthRole[]) => SetMetadata(ROLES_KEY, roles)