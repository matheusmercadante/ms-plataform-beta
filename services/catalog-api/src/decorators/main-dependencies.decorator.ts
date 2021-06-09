import { applyDecorators } from '@nestjs/common';
import CategoriesDefault from './categories-default.decorator';

function MainDependencies() {
  return applyDecorators(CategoriesDefault());
}

export default MainDependencies;
