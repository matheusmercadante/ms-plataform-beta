import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';
import { CategoryRepository } from '@repositories/category/category.repository';
import { ProductRepository } from '@repositories/product/product.repository';
import { ElasticsearchModule } from '@services/elasticsearch/elasticsearch.module';
import { MessagingService } from './messages/messages.service';
import { CategorySyncService, ProductSyncService } from './sync/';

@Module({
  imports: [
    ElasticsearchModule,
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [
        {
          name: 'amq.topic',
          type: 'topic',
        },
      ],
      uri: 'amqp://guest:guest@localhost:5672',
    }),
    RabbitmqModule,
  ],
  // RabbitMQModule.forRootAsync(RabbitMQModule, {
  //   useFactory: () => ({
  //     exchanges: [
  //       {
  //         name: 'amq.topic',
  //         type: 'topic',
  //       },
  //     ],
  //     uri: 'amqp://guest:guest@localhost:5672',
  //   }),
  // }),
  // RabbitmqModule,
  // ],
  providers: [
    MessagingService,
    ProductSyncService,
    ProductRepository,
    CategorySyncService,
    CategoryRepository,
  ],
  controllers: [],
})
export class RabbitmqModule {}

// {"id": "uuid", "name": "teste", "description": "asdas", "slug": "asdas", "price": 0.0, "featured": true, "count_sales": true, "created_at": "2021-01-01T00:00:00.000Z", "updated_at": "2021-01-01T00:00:00.000Z", "category": { "id": "uuid2", "name": "curso", "slug": "asdas" }}
