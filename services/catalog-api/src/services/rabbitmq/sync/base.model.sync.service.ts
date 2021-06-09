import {
  DefaultCrudRepository,
  EntityNotFoundError,
} from '@loopback/repository';
import { Message } from 'amqplib';
import { pick } from 'lodash';
import { ModuleRef } from '@nestjs/core';

export interface SyncOptions {
  repo: DefaultCrudRepository<any, any>;
  data: any;
  message: Message;
}

export interface SyncRelationOptions {
  id: string;
  repo: DefaultCrudRepository<any, any>;
  relationName: string;
  relationIds: string[];
  relationRepo: DefaultCrudRepository<any, any>;
  message: Message;
}

export abstract class BaseModelSyncService {
  constructor(private moduleRef: ModuleRef) {}

  protected async sync({ repo, data, message }: SyncOptions) {
    // return;
    const relationFields = this.getRelationFields(repo);
    // console.log('>>>>> RELATIONS:', relationFields);

    for (const relation of relationFields) {
      // console.log('>>> RELATION IN FOR:', relation);

      const result = await this.findRelation({
        relation,
        repo,
        data: Array.isArray(data[relation]) ? data[relation] : [data[relation]],
      });

      if (result.length) {
        const isMany = this.isRelationMany(repo, relation);
        data[relation] = isMany ? result : result[0];
      }
    }

    const entity = this.createEntity(data, repo);

    // console.log(data);

    const { id } = data || {};
    const action = this.getAction(message);

    switch (action) {
      case 'created':
        await this.updateOrCreate({ repo, id, entity });
        break;
      case 'updated':
        await this.updateOrCreate({ repo, id, entity });
        break;
      case 'deleted':
        await repo.deleteById(id);
        break;
    }
  }

  protected getModelFields(repo) {
    return Object.keys(repo.modelClass.definition.properties);
  }

  protected getRelationFields(repo) {
    const properties = repo.modelClass.definition.properties;

    return Object.keys(properties).filter(
      (p) =>
        properties[p].jsonSchema &&
        properties[p].jsonSchema.model &&
        properties[p].jsonSchema.relation === true,
    );
  }

  async syncRelation({ relation, id, data, repo, message }) {
    const collection = await this.findRelation({ relation, repo, data });

    if (this.getAction(message) === 'attached') {
      await repo.addMany(id, { relation, data: collection });
    }
  }

  protected async findRelation({ relation, repo, data }) {
    if (!data.length) {
      return [];
    }

    const relationField = repo.modelClass.definition.properties[relation];
    const relationRepo = this.moduleRef.get(
      `${relationField.jsonSchema.model}Repository`,
    );

    // console.log('>>>>> RELATION REPO: ', relationField.jsonSchema.model);

    const fields = this.isRelationMany(repo, relation)
      ? Object.keys(
          repo.modelClass.definition.properties[relation].jsonSchema.items
            .properties,
        )
      : Object.keys(
          repo.modelClass.definition.properties[relation].jsonSchema.properties,
        );

    // console.log('>>>>>> RELATION MANY:', fields);

    // console.log('>>>>>> DATA:', data);
    const collection = await relationRepo.find({
      where: {
        or: data.map((idRelation) => ({ id: idRelation })),
      },
      fields,
    });

    if (!collection.length) {
      const error = new EntityNotFoundError(relationRepo.entityClass, data);
      error.name = 'EntityNotFound';
      throw error;
    }

    return collection.map((c) => pick(c, fields));
  }

  protected isRelationMany(repo, relation) {
    return (
      repo.modelClass.definition.properties[relation].jsonSchema.type ===
      'array'
    );
  }

  protected getAction(message: Message) {
    return message.fields.routingKey.split('.')[2];
  }

  protected createEntity(data: any, repo: DefaultCrudRepository<any, any>) {
    return pick(data, Object.keys(repo.entityClass.definition.properties));
  }

  protected async updateOrCreate({
    repo,
    id,
    entity,
  }: {
    repo: DefaultCrudRepository<any, any>;
    id: string;
    entity: any;
  }) {
    const exists = await repo.exists(id);
    return exists ? repo.updateById(id, entity) : repo.create(entity);
  }
}
