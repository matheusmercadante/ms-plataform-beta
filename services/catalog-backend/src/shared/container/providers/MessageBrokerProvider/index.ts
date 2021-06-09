import { container } from 'tsyringe';

import IMessageBrokerProvider from './models/IMessageBrokerProvider';
import RabbitMQProvider from './implementations/RabbitMQProvider';

container.registerSingleton<IMessageBrokerProvider>(
  'MessageBrokerProvider',
  RabbitMQProvider,
);
