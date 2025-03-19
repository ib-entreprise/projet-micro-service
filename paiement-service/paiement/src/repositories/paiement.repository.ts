import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PaiementDataSource} from '../datasources';
import {Paiement, PaiementRelations} from '../models';

export class PaiementRepository extends DefaultCrudRepository<
  Paiement,
  typeof Paiement.prototype.id,
  PaiementRelations
> {
  constructor(
    @inject('datasources.paiement') dataSource: PaiementDataSource,
  ) {
    super(Paiement, dataSource);
  }
}
