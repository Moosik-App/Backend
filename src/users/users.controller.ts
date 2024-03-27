import { Controller, Get, Post, HttpCode, HttpStatus, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AtGuard } from 'src/common/guards/at.guard';
import { UserReturn } from 'src/types';
import { getCurrentUserUUID } from 'src/common/decorators/uuid.decorator';
import { PermsGuard } from 'src/common/guards/perm.guard';
import { Perms } from 'src/common/decorators/perms.decorator';
import { PermsEnum } from 'src/utils/perms';
import { AuthGuard } from '@nestjs/passport';

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

  @UseGuards(PermsGuard)
  @Perms(PermsEnum.UPDATE | PermsEnum.ALL | PermsEnum.CREATE | PermsEnum.DELETE)
  @Post(':username')
  @HttpCode(HttpStatus.OK)
  updateUser(@Param() params: any): Promise<boolean> {
    return this.usersService.updateUser(params.username)
  }
}