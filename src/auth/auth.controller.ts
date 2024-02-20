import { Controller, HttpCode, HttpStatus, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Tokens } from 'src/types';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post()
  @HttpCode(HttpStatus.CREATED)
  signUp(@Body() CreateUserDto ): Promise<Tokens> {
    return this.authService.signUp(CreateUserDto);
  }
}
