import { Injectable } from '@nestjs/common';
import { juggler } from '@loopback/repository';

@Injectable()
export class EsDataSourceService extends juggler.DataSource {
  static dataSourceName = 'esv7';

  constructor() {
    super(EsDataSourceService.config());
  }

  static config() {
    return {
      name: 'esv7',
      connector: 'esv6',
      index: 'catalog_api',
      version: 7,
      debug: true,
      defaultSize: 50,
      configuration: {
        node: process.env.ELASTIC_SEARCH_HOST,
        requestTimeout: +process.env.ELASTIC_SEARCH_REQUEST_TIMEOUT,
        pingTimeout: +process.env.ELASTIC_SEARCH_PING_TIMEOUT,
      },
      mappingProperties: {
        docType: {
          type: 'keyword',
        },
        id: {
          type: 'keyword',
        },
        name: {
          type: 'text',
          fields: {
            keyword: {
              type: 'keyword',
              ignore_above: 256,
            },
          },
        },
        description: {
          type: 'text',
        },
        type: {
          type: 'byte',
        },
        // slug: {
        //   type: 'keyword',
        // },
        // count_sales: {
        //   type: 'integer',
        // },
        // image_url: {
        //   type: 'keyword',
        // },
        // join: {
        //   type: 'join',
        //   relations: {
        //     parent_category: 'child_category',
        //   },
        // },
        is_active: {
          type: 'boolean',
        },
        created_at: {
          type: 'date',
        },
        updated_at: {
          type: 'date',
        },
        categories: {
          type: 'nested',
          properties: {
            id: {
              type: 'keyword',
            },
            name: {
              type: 'text',
              fields: {
                keyword: {
                  type: 'keyword',
                  ignore_above: 256,
                },
              },
            },
            is_active: {
              type: 'boolean',
            },
          },
        },
      },
    };
  }
}
