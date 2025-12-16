import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateTokenDto } from './dto/google-login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('google-login')
  async googleLogin(@Body() body: CreateTokenDto) {
    return this.authService.loginWithGoogle(body);
  }
}
