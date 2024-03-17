import { Controller, Get, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AtGuard } from 'src/common/guards/at.guard';
import { getCurrentUserUUID } from 'src/common/decorators/uuid.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('@me')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AtGuard)
  getCurrentUser(@getCurrentUserUUID() uuid: string) {
    return this.usersService.getCurrentUser(uuid)
  }
  
}
