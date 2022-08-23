import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHelloHi(): string {
    return 'Hello Worldddd ok!';
  }
}
