import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UserCredentialsDto } from './dto/user-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  createUser(@Body() userCredentialsDto: UserCredentialsDto): Promise<{ access_token: string }> {
    return this.authService.createUser(userCredentialsDto);
  }

  @Post('/login')
  logIn(@Body() UserCredentialsDto: UserCredentialsDto): Promise<{ access_token: string }> {
    return this.authService.logIn(UserCredentialsDto);
  }
}
