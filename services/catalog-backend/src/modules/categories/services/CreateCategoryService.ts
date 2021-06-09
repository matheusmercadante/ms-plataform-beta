import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IMessageBrokerProvider from '@shared/container/providers/MessageBrokerProvider/models/IMessageBrokerProvider';
import Category from '../infra/typeorm/entities/Category';
import ICategoriesRepository from '../repositories/ICategoriesRepository';

interface Request {
  name: string;
  description: string;
  is_active: boolean;
}

@injectable()
class CreateCategoryService {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,

    @inject('MessageBrokerProvider')
    private messageBrokerRepository: IMessageBrokerProvider,
  ) {}

  public async execute({
    name,
    description,
    is_active,
  }: Request): Promise<Category> {
    const findCategoryInSameName = await this.categoriesRepository.findByName(
      name,
    );

    if (findCategoryInSameName) {
      throw new AppError('This category is already named');
    }

    const category = await this.categoriesRepository.create({
      name,
      description,
      is_active,
    });

    // console.log(category);

    // Arrumar dps
    await this.messageBrokerRepository.start(process.env.RABBITMQ_CONNECTION);
    await this.messageBrokerRepository.publishInExchange(
      'amq.topic',
      'model.category.created',
      JSON.stringify(category),
    );

    return category;
  }
}

export default CreateCategoryService;
