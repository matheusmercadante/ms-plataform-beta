import { Entity, model, property } from '@loopback/repository';

export interface SmallCategory {
  id: string;
  name: string;
  is_active: boolean;
}

@model()
export class Category extends Entity {
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
    jsonSchema: {
      minLength: 1,
      maxLength: 255,
    },
  })
  name: string;

  @property({
    type: 'string',
    required: false,
  })
  description: string;

  @property({
    type: 'boolean',
    required: true,
    default: true,
  })
  is_active: boolean;

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

  constructor(data?: Partial<Category>) {
    super(data);
  }
}
