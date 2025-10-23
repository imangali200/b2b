import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class LoginDto {
  @ApiProperty({description:"write your email",example:'example@gmail.com'})
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({description:'write your password',example:'qwerty123'})
  @IsString()
  @IsNotEmpty()
  @Length(6,20)
  password: string;
}
 