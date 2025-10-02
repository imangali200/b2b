import { Exclude } from "class-transformer";
import { Column, Entity } from "typeorm";
import { UserRoles } from "../enum/user_roles";
import { BaseEntities } from "src/core/services/base.dto";

@Entity('user')

export class UserEntity extends BaseEntities{
    @Column()
    email:string

    @Column()   
    @Exclude()
    password:string

    @Column()
    phoneNumber:string

    @Column({type:'enum',enum:UserRoles,default:UserRoles.User})
    role:UserRoles
    
}