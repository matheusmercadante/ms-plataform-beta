import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CategoryRepository } from '@repositories/category/category.repository';
import { map } from 'rxjs/operators';

export class CategoriesDefaultInterceptor implements NestInterceptor {
  constructor(
    private reflector: Reflector,
    private categoryRepo: CategoryRepository,
  ) {}

  async intercept(context: ExecutionContext, next: CallHandler) {
    // console.log('asdasdASD XZC');
    // return;
    let categories;
    const hasDecorator = this.hasDecorator(context);

    if (hasDecorator) {
      categories = await this.categoryRepo.find({
        order: ['name.keyword DESC'],
      });
    }

    return next.handle().pipe(
      map((responseData) => {
        if (hasDecorator) {
          return {
            ...responseData,
            ...(categories && { categories }),
          };
        }

        return responseData;
      }),
    );
  }

  hasDecorator(context: ExecutionContext) {
    return this.reflector.get('categories-default', context.getHandler());
  }
}
