import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Paiement} from '../models';
import {PaiementRepository} from '../repositories';

export class PaiementController {
  constructor(
    @repository(PaiementRepository)
    public paiementRepository : PaiementRepository,
  ) {}

  @post('/paiements')
  @response(200, {
    description: 'Paiement model instance',
    content: {'application/json': {schema: getModelSchemaRef(Paiement)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Paiement, {
            title: 'NewPaiement',
            exclude: ['id'],
          }),
        },
      },
    })
    paiement: Omit<Paiement, 'id'>,
  ): Promise<Paiement> {
    return this.paiementRepository.create(paiement);
  }

  @get('/paiements/count')
  @response(200, {
    description: 'Paiement model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Paiement) where?: Where<Paiement>,
  ): Promise<Count> {
    return this.paiementRepository.count(where);
  }

  @get('/paiements')
  @response(200, {
    description: 'Array of Paiement model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Paiement, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Paiement) filter?: Filter<Paiement>,
  ): Promise<Paiement[]> {
    return this.paiementRepository.find(filter);
  }

  @patch('/paiements')
  @response(200, {
    description: 'Paiement PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Paiement, {partial: true}),
        },
      },
    })
    paiement: Paiement,
    @param.where(Paiement) where?: Where<Paiement>,
  ): Promise<Count> {
    return this.paiementRepository.updateAll(paiement, where);
  }

  @get('/paiements/{id}')
  @response(200, {
    description: 'Paiement model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Paiement, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Paiement, {exclude: 'where'}) filter?: FilterExcludingWhere<Paiement>
  ): Promise<Paiement> {
    return this.paiementRepository.findById(id, filter);
  }

  @patch('/paiements/{id}')
  @response(204, {
    description: 'Paiement PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Paiement, {partial: true}),
        },
      },
    })
    paiement: Paiement,
  ): Promise<void> {
    await this.paiementRepository.updateById(id, paiement);
  }

  @put('/paiements/{id}')
  @response(204, {
    description: 'Paiement PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() paiement: Paiement,
  ): Promise<void> {
    await this.paiementRepository.replaceById(id, paiement);
  }

  @del('/paiements/{id}')
  @response(204, {
    description: 'Paiement DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.paiementRepository.deleteById(id);
  }
}
