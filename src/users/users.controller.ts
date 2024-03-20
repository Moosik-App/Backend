import { Controller, Get, HttpCode, HttpStatus, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AtGuard } from 'src/common/guards/at.guard';
import { UserReturn } from 'src/types';
import { getCurrentUserUUID } from 'src/common/decorators/uuid.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('@me')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AtGuard)
  getCurrentUser(@getCurrentUserUUID() uuid: string): Promise<UserReturn> {
    return this.usersService.getCurrentUser(uuid)
  }

  @Get(':username')
  @HttpCode(HttpStatus.OK)
  getUser(@Param() params: any): Promise<UserReturn> {
    return this.usersService.getUser(params.username)
  }
}
