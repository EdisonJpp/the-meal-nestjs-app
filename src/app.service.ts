import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  // constructor(private readonly theMealDB:) {}

  async getHello(): Promise<string> {
    return 'Hello World!';
  }
}
