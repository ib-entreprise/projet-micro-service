import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Paiement extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
  })
  motif?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Paiement>) {
    super(data);
  }
}

export interface PaiementRelations {
  // describe navigational properties here
}

export type PaiementWithRelations = Paiement & PaiementRelations;
