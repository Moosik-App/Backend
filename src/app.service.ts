import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello() {
    const data = {
      1: "a",
      2: "b"
    }
    return data
  }
}
