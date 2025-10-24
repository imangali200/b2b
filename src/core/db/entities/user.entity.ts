import { Exclude } from "class-transformer";
import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { UserRoles } from "../enum/user_roles";
import { BaseEntities } from "src/core/services/base.dto";
import { SupplierEntity } from "./supplier.entity";

@Entity('user')

export class UserEntity extends BaseEntities{
    @Column()
    email:string

    @Column()   
    @Exclude()
    password:string

    @Column()
    phoneNumber:string

    @Column()
    fullName:string

    @Column({type:'enum',enum:UserRoles,default:UserRoles.User})
    role:UserRoles

    @OneToOne(()=>SupplierEntity , (supplier)=>supplier.user)
    @JoinColumn()
    supplier:SupplierEntity
}