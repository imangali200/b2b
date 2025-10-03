import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({description:"write your email",example:'example@gmail.com'})
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({description:'write your password',example:'qwerty123'})
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(20)
  password: string;
}
