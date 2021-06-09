import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { ProductRepository } from '@repositories/product/product.repository';
import { pick } from 'lodash';
import { BaseModelSyncService } from '../base.model.sync.service';

@Injectable()
export class ProductSyncService extends BaseModelSyncService {
  constructor(moduleRef: ModuleRef, private repo: ProductRepository) {
    super(moduleRef);
  }

  @RabbitSubscribe({
    exchange: 'amq.topic',
    routingKey: 'model.product.*',
    queue: 'micro-catalog-api/sync-admin/product',
  })
  public async pubSubHandler(data, message) {
    console.log(`Received message: ${JSON.stringify(message)}`);
    console.log(`Received data: ${JSON.stringify(data)}`);

    // await this.sync({
    //   repo: this.repo,
    //   data: {
    //     ...pick(data, this.getModelFields(this.repo)),
    //     price: data['sale_price'],
    //     count_sales: 1,
    //   },
    //   message,
    // });
  }
}

// {"id":"e52b7af1-7dcd-4bdd-a2a6-7ec7a9211c39","name":"Curso Topzera 2","description":"qualquer coisa 2", "slug":"curso-topzera-2","sale_price":"944.44","featured":true,"image_url":"https://res.cloudinary.com/practicaldev/image/fetch/s--thEbyjLu--/c_imagga_scale,f_auto,fl_progressive,h_900,q_auto,w_1600/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/4qa1g2dsx1hre7hjjlze.png","count_sales":"1","category":"75f0784c-793c-4798-bbdf-f11e231ec47a","created_at":"2021-01-01T00:00:00.000Z","updated_at":"2021-01-01T00:00:00.000Z"}
