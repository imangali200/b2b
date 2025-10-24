import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity('suppliers')

export class SupplierEntity{
    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column()
    companyName:string

    @Column()
    specification:string

    @Column()
    productName:string

    @OneToOne(()=> UserEntity , (user)=>user.supplier)
    user:UserEntity
}