import { Body, Controller, Post } from '@nestjs/common';
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
