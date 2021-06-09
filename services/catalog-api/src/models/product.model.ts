import { Entity, model, property } from '@loopback/repository';
import { Exclude } from 'class-transformer';
import { SmallCategory } from './category.model';

@model()
export class Product extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  id: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  description: string;

  @property({
    type: 'string',
    required: true,
  })
  slug: string;

  @property({
    type: 'number',
    required: true,
  })
  price: number;

  @property({
    type: 'boolean',
    required: true,
    default: false,
  })
  featured: boolean;

  @property({
    type: 'boolean',
    required: true,
  })
  image_url: boolean;

  @Exclude()
  @property({
    type: 'boolean',
    required: true,
  })
  count_sales: boolean;

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
    required: true,
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

  constructor(data?: Partial<Product>) {
    super(data);
  }
}
