import { Controller, HttpCode, HttpStatus, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from '../common/decorators/public.decorator';
import { RtGuard } from 'src/common/guards/rt.guard';
import { Tokens } from 'src/types';
import { getCurrentUserUUID } from 'src/common/decorators/uuid.decorator';
import { GetCurrentUser } from 'src/common/decorators/user.decorator';
import signUpDto from './dto/signUp.dto';
import signInDto from './dto/signIn.dto';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {};

  @Public()
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  signUp(@Body() r: signUpDto): Promise<Tokens> {
    return this.authService.signUp(r);
  };

  @Public()
  @Post('signin')
  @HttpCode(HttpStatus.OK)
  signinLocal(@Body() r: signInDto): Promise<Tokens> {
    return this.authService.signIn(r);
  };

  @Post('logout')
  @UseGuards(RtGuard)
  @HttpCode(HttpStatus.OK)
  logout(@getCurrentUserUUID() uuid: string): Promise<boolean> {
    return this.authService.logout(uuid);
  };

  @Public()
  @UseGuards(RtGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refreshTokens(@getCurrentUserUUID() uuid: string, @GetCurrentUser('refreshToken') rt: string): Promise<Tokens> {
    return this.authService.refreshTokens(uuid, rt);
  };
};
