import { CreateUserDto, SignInDto, SignInResponseDto } from '@mood-tracker/api-interfaces';
import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto) {
    return await this.authService.createUser(body);
  }
  
  @Post('/signin')
  async signIn(@Body() body: SignInDto): Promise<SignInResponseDto> {
    return this.authService.signIn(body);
  }

  @Post('/test')
  @UseGuards(AuthGuard())
  test(@Req() req) {
    console.log(req.user);
    return { success: true };
  }
}
