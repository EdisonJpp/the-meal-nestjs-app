import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TheMealDbModule } from './the-meal-db/the-meal-db.module';

@Module({
  imports: [TheMealDbModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
