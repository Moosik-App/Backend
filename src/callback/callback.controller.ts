import { Controller, Get, HttpCode, HttpStatus, Param, Query, UseGuards} from '@nestjs/common';
import { CallbackService } from './callback.service';
import { AtGuard } from 'src/common/guards/at.guard';
import { getCurrentUserUUID } from 'src/common/decorators/uuid.decorator';
import { GetSpotifyCode } from 'src/common/decorators/spotifycode.decorator';

@Controller('callback')
export class CallbackController {
  constructor(private readonly callbackService: CallbackService) {}

  @Get('')
  @HttpCode(HttpStatus.OK)
  //@UseGuards(AtGuard)
  getCurrentUser(@Query() q: any) {
      console.log(q)
      return `hello`
  }
}
