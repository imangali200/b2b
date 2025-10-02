import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { UserRoles } from "../db/enum/user_roles";
import { Roles_Key } from "../decorators/auth.decorators";

export class RolesGuard implements CanActivate{
    constructor(private readonly reflectore:Reflector){}
    canActivate(context: ExecutionContext): boolean{
        const requiredUser = this.reflectore.getAllAndOverride<UserRoles>(
            Roles_Key,
            [context.getHandler(),context.getClass()]
        )
        if(!requiredUser || requiredUser.length === 0){
            return true
        }
        const {user} = context.switchToHttp().getRequest()
        return requiredUser.includes(user.role)
    }
}