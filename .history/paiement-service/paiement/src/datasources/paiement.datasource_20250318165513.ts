import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'paiement',
  connector: 'mongodb',
  url: '',
  host: 'localhost',
  port: 0,
  user: '',
  password: '',
  database: 'paiement',
  useNewUrlParser: true
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class PaiementDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'paiement';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.paiement', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
