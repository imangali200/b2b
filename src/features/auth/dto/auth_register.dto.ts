import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  isString,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    description: 'write your email',
    example: 'example@gmail.com',
  })
  @IsString()
  email: string;


  @ApiProperty({
    description:'write your full name',
    example:"palenshe palenshe"
  })
  @IsString()
  fullName:string

  @ApiProperty({
    description: 'write your password',
    example: 'qwerty123',
  })
  @IsString()
  @MinLength(7)
  @MaxLength(20)
  password: string;

  @ApiProperty({
    description: 'write your phonenumber',
    example: '+77777777777',
  })
  @IsString()
  phoneNumber: string;


  @IsString()
  @ApiProperty({
    description:'write company is name'
  })
  companyName:string
  @IsString()
  @ApiProperty({
    description:'write a specification'
  })
  specification:string
  @IsString()
  @ApiProperty({
    description:'write a product name'
  })
  product:string
}
