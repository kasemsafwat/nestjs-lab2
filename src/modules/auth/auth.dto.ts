import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty,  MinLength, IsEmail } from 'class-validator';

export class SignUpDto {
  @ApiProperty({ example: 'kasem safwat', description: 'Full Name of the user' })
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({ example: 'kasem@gmail.com', description: 'User email address' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'asd123', description: 'User password' })
  @IsString()
  @MinLength(6)
  password: string;
}

export class SignInDto {
  @ApiProperty({ example: 'kasem@gmail.com', description: 'User email address' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'asd123', description: 'User password' })
  @IsString()
  @MinLength(6)
  password: string;
}
