import { applyDecorators, SetMetadata, UseGuards } from "@nestjs/common";
import { UserRoles } from "../db/enum/user_roles";
import { JwtAuthGuard } from "../guards/jwt_auth.guard";
import { ApiBearerAuth, ApiUnauthorizedResponse } from "@nestjs/swagger";

export const Roles_Key = 'roles'

export const Auth = (roles?:UserRoles[])=>{
    return applyDecorators(
        SetMetadata(Roles_Key , roles ?? Object.values(UserRoles)),
        UseGuards(JwtAuthGuard),
        ApiBearerAuth("Authorization"),
        ApiUnauthorizedResponse({description:'No Authorization '})
    )
}