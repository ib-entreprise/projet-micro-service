import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Order extends Entity {
  @property({
    type: 'string',
  })
  ref?: string;

  @property({
    type: 'number',
  })
  total?: number;

  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Order>) {
    super(data);
  }
}

export interface OrderRelations {
  // describe navigational properties here
}

export type OrderWithRelations = Order & OrderRelations;
