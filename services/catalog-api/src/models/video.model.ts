import { Entity, property } from '@loopback/repository';
import { SmallCategory } from './category.model';

export class Video extends Entity {
  @property({
    type: 'string',
    id: true,
  })
  id: string;

  @property()
  name: string;

  @property()
  description: string;

  @property()
  slug: string;

  @property({
    type: 'date',
    required: true,
  })
  created_at: string;

  @property({
    type: 'date',
    required: true,
  })
  updated_at: string;

  @property({
    type: 'object',
    jsonSchema: {
      relation: true,
      model: 'Category',
      properties: {
        id: {
          type: 'string',
        },
        name: {
          type: 'string',
        },
        slug: {
          type: 'string',
        },
      },
    },
  })
  category: SmallCategory;

  constructor(data?: Partial<Video>) {
    super(data);
  }
}
