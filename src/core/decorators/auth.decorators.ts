import { applyDecorators, SetMetadata, UseGuards } from "@nestjs/common";
import { UserRoles } from "../db/enum/user_roles";
import { JwtAuthGuards } from "../guards/jwt_auth.guard";
import { ApiBearerAuth, ApiUnauthorizedResponse } from "@nestjs/swagger";

export const Roles_Key = 'roles'

export const Auth = (roles?:UserRoles[])=>{
    return applyDecorators(
        SetMetadata(Roles_Key , roles ?? Object.values(UserRoles)),
        UseGuards(JwtAuthGuards),
        ApiBearerAuth("Authorization"),
        ApiUnauthorizedResponse({description:'No Authorization '})
    )
}