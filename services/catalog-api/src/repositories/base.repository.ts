import { DefaultCrudRepository, Entity } from '@loopback/repository';
import { Client } from '@elastic/elasticsearch';
import { pick } from 'lodash';

export abstract class BaseRepository<
  T extends Entity,
  ID,
  // eslint-disable-next-line @typescript-eslint/ban-types
  Relations extends object = {}
> extends DefaultCrudRepository<T, ID, Relations> {
  // eslint-disable-next-line @typescript-eslint/ban-types
  async attachRelation(id: ID, relationName: string, data: object[]) {
    const document = {
      index: this.dataSource.settings.index,
      refresh: true,
      body: {
        query: {
          term: {
            _id: id,
          },
        },
        script: {
          source: `
            if (!ctx._source.containsKey('${relationName}')) {
              ctx._source['${relationName}'] = [];
            }

            for (item in params['${relationName}']) {
              if (ctx._source['${relationName}'].find(i -> i.id == item.id) == null) {
                ctx._source['${relationName}'].add(item);
              }
            }
          `,
          params: {
            [relationName]: data,
          },
        },
      },
    };

    const db: Client = this.dataSource.connector?.db;
    await db.update_by_query(document);
  }

  async updateRelation(
    relationName: string,
    data: { id: any; [key: string]: string },
  ) {
    const fields = Object.keys(
      this.modelClass.definition.properties[relationName].jsonSchema.items
        .properties,
    );
    const relation = pick(data, fields);

    const document = {
      index: this.dataSource.settings.index,
      refresh: true,
      body: {
        query: {
          bool: {
            must: [
              {
                nested: {
                  path: relationName,
                  query: {
                    exists: {
                      field: relationName,
                    },
                  },
                },
              },
              {
                nested: {
                  path: relationName,
                  query: {
                    term: {
                      [`${relationName}.id`]: relation.id,
                    },
                  },
                },
              },
            ],
          },
        },
        script: {
          source: `
            ctx._source[${relationName}].removeIf(i -> i.id == params['relation']['id']);
            ctx._source[${relationName}].add(params['relation'])
          `,
          params: {
            relation,
          },
        },
      },
    };

    const db: Client = this.dataSource.connector?.db;
    await db.update_by_query(document);
  }

  async addMany(
    id,
    // eslint-disable-next-line @typescript-eslint/ban-types
    { relation, data }: { relation: string; data: Array<object> },
  ) {
    const document = {
      index: this.dataSource.settings.index,
      refresh: true,
      body: {
        query: {
          terms: { _id: [id] },
        },
        script: {
          source: `
                  if ( !ctx._source.containsKey('${relation}') ) {
                      ctx._source['${relation}'] = []
                  }
                  for(item in params['${relation}']){
                     if(ctx._source['${relation}'].find( i -> i.id == item.id ) == null ) {
                       ctx._source['${relation}'].add( item )
                     }
                  }
              `,
          params: {
            [relation]: data,
          },
        },
      },
    };

    const db: Client = this.dataSource.connector?.db;
    await db.update_by_query(document);
  }
}
