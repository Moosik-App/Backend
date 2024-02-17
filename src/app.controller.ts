import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    const data = this.appService.getHello();
    const obj = {
      data: data,
      message: "Some message"
    }
    return obj
  }
}
