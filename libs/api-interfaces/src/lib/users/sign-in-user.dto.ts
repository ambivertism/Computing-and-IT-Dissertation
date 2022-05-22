import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

// create data transfer object 
// ensure input values match input type expected.
export class SignInDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
