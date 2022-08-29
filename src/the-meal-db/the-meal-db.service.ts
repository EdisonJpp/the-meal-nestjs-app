import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs';
import { THE_MEAL_DB_VERSIONS } from '../common/constants';
import { IObservableAxios } from '../common/types';
import { ICategory, IMeal } from 'src/common/types/the-meal-db.types';

/**
 * @helpful api docs: https://www.themealdb.com/api.php
 */
@Injectable()
export class TheMealDbService {
  constructor(private readonly httpService: HttpService) {}

  /**
   *
   * @param value: the parameter s: meal's name value
   * @helpful sample: https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata
   * @returns meals
   */
  getMealsByName(value: string): IObservableAxios<{ meals: IMeal[] }> {
    if (!value) {
      throw new UnprocessableEntityException(
        'the parameter c (meals" name value) is required',
      );
    }

    return this.httpService
      .get(`/${THE_MEAL_DB_VERSIONS.v1}/1/search.php?s=${value}`)
      .pipe(map((response) => response.data));
  }

  /**
   *
   * @param id: meal's id
   * @helpful sample: https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772
   * @returns meal
   */
  getMealDetail(id: string): IObservableAxios<IMeal> {
    if (!id) {
      throw new UnprocessableEntityException(
        'the parameter id (meals" id value) is required',
      );
    }

    return this.httpService
      .get(`/${THE_MEAL_DB_VERSIONS.v1}/1/lookup.php?i=${id}`)
      .pipe(
        map((response) => {
          const { data } = response;
          if (data.meals === null) {
            throw new NotFoundException('Meal not found');
          }
          return data.meals[0];
        }),
      );
  }

  /**
   *
   * @returns categories
   */
  getAllCategories(): IObservableAxios<{ categories: ICategory[] }> {
    return this.httpService
      .get(`/${THE_MEAL_DB_VERSIONS.v1}/1/categories.php`)
      .pipe(map((response) => response.data));
  }

  /**
   *
   * @param strCategory
   * @helpful sample: https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood
   * @returns: IMeal[]
   */
  filterMealsByCategory(
    strCategory: string,
  ): IObservableAxios<{ meals: IMeal[] }> {
    if (!strCategory) {
      throw new UnprocessableEntityException(
        'the parameter c (where it will send the strCategory of the category) is required',
      );
    }

    return this.httpService
      .get(`/${THE_MEAL_DB_VERSIONS.v1}/1/filter.php?c=${strCategory}`)
      .pipe(map((response) => response.data));
  }

  /**
   *
   * @returns one meal
   */
  getMealRandom() {
    return this.httpService
      .get(`/${THE_MEAL_DB_VERSIONS.v1}/1/random.php`)
      .pipe(
        map((response) => {
          if (response.data.meals && response.data.meals.length) {
            return { meal: response.data.meals[0] };
          }

          throw new NotFoundException('Meal Random not found');
        }),
      );
  }
}
