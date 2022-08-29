import { Module } from '@nestjs/common';
import { TheMealDbController } from './the-meal-db.controller';
import { TheMealDbService } from './the-meal-db.service';
import { HttpModule } from '@nestjs/axios';

export const URL_BASE_THE_MEAL_DB = 'https://www.themealdb.com/api/json';

@Module({
  imports: [
    HttpModule.register({
      baseURL: URL_BASE_THE_MEAL_DB,
    }),
  ],
  controllers: [TheMealDbController],
  providers: [TheMealDbService],
})
export class TheMealDbModule {}
