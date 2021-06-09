import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Genre from '@modules/genres/infra/typeorm/entities/Genre';
import IMessageBrokerProvider from '@shared/container/providers/MessageBrokerProvider/models/IMessageBrokerProvider';

@EventSubscriber()
@injectable()
class GenresSubscriber implements EntitySubscriberInterface<Genre> {
  constructor(
    @inject('MessageBrokerProvider')
    private messageBrokerRepository: IMessageBrokerProvider,
  ) {}

  listenTo() {
    return Genre;
  }

  async afterInsert(event: InsertEvent<Genre>) {
    const { id, categories } = event.entity;

    const data = {
      id,
      relation_ids: categories.map(categoryId => categoryId),
    };

    const routingKey = 'model.genres.created';

    try {
      // Arrumar dps
      await this.messageBrokerRepository.start(process.env.RABBITMQ_CONNECTION);
      await this.messageBrokerRepository.publishInExchange(
        'amq.topic',
        routingKey,
        JSON.stringify(data),
      );
    } catch (err) {
      throw new AppError(`Some category does not exist`);
    }
  }
}

export default GenresSubscriber;
