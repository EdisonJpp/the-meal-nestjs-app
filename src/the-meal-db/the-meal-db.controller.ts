import { Controller, Get, Param, Query } from '@nestjs/common';
import { TheMealDbService } from './the-meal-db.service';

@Controller('the-meal-db')
export class TheMealDbController {
  constructor(private readonly theMealDbService: TheMealDbService) {}

  @Get('meal-detail/:id')
  getMeal(@Param('id') value: string) {
    return this.theMealDbService.getMealDetail(value);
  }

  @Get('search')
  getMealByName(@Query('s') value: string) {
    return this.theMealDbService.getMealsByName(value);
  }

  @Get('categories')
  getAllCategories() {
    return this.theMealDbService.getAllCategories();
  }

  @Get('meals-by-category')
  filterMealsBy(@Query('c') category: string) {
    return this.theMealDbService.filterMealsByCategory(category);
  }

  @Get('meal-random')
  getMealRandom() {
    return this.theMealDbService.getMealRandom();
  }
}
