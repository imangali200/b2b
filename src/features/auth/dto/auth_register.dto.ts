import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
  minLength,
} from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    description: 'write your email',
    example: 'example@gmail.com',
  })
  @IsString()
  email: string;

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
  @IsNumber()
  phoneNumber: string;
}
