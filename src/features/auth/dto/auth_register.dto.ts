import { IsNumber, IsString, MaxLength, MinLength, minLength } from "class-validator";

export class RegisterDto{
    @IsString()
    email:string

    @IsString()
    @MinLength(7)
    @MaxLength(20)
    password:string

    @IsNumber()
    phoneNumber:string
    
}