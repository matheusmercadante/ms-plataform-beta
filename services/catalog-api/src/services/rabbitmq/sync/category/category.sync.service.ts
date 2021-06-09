import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';

import { CategoryRepository } from '@repositories/category/category.repository';
import { pick } from 'lodash';
import { BaseModelSyncService } from '../base.model.sync.service';

@Injectable()
export class CategorySyncService extends BaseModelSyncService {
  constructor(moduleRef: ModuleRef, private repo: CategoryRepository) {
    super(moduleRef);
  }

  @RabbitSubscribe({
    exchange: 'amq.topic',
    routingKey: 'model.category.*',
    queue: 'micro-catalog-api/sync-admin/category',
  })
  public async pubSubHandler(data, message) {
    // console.log(`Received message: ${JSON.stringify(message)}`);
    // console.log(`Received data: ${JSON.stringify(data)}`);

    await this.sync({
      repo: this.repo,
      data: {
        ...pick(data, this.getModelFields(this.repo)),
      },
      message,
    });
  }
}
