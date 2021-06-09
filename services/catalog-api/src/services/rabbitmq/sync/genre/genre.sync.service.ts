import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { pick } from 'lodash';

import { GenreRepository } from '@repositories/genre/genre.repository';
import { BaseModelSyncService } from '../base.model.sync.service';
import { Message } from 'amqplib';

@Injectable()
export class GenreSyncService extends BaseModelSyncService {
  constructor(moduleRef: ModuleRef, private repo: GenreRepository) {
    super(moduleRef);
  }

  // ele ja vai trazer os relacionamentos com categories ou outros. Ver -> catalog backend: GenresSubscriber.ts
  @RabbitSubscribe({
    exchange: 'amq.topic',
    routingKey: 'model.genre.*',
    queue: 'micro-catalog-api/sync-admin/genre',
  })
  public async pubSubHandler({
    data,
    message,
  }: {
    data: any;
    message: Message;
  }) {
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

  // uma solução para receber os attach/detach de relations
  // @RabbitSubscribe({
  //   exchange: 'amq.topic',
  //   routingKey: 'model.genres_categories.*',
  //   queue: 'micro-catalog-api/sync-admin/genre',
  // })
  // public async pubSubHandlerCategories({
  //   data,
  //   message,
  // }: {
  //   data: any;
  //   message: Message;
  // }) {
  //   // console.log(`Received message: ${JSON.stringify(message)}`);
  //   // console.log(`Received data: ${JSON.stringify(data)}`);

  //   await this.syncRelation({
  //     repo: this.repo,
  //     data: {
  //       ...pick(data, this.getModelFields(this.repo)),
  //     },
  //     message,
  //   });
  // }
}
