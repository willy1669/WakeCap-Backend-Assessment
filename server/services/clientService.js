import Client from '../db/models/client';

import BaseService from './baseService';

/**
 * @class ClientService
 */
export default class ClientService extends BaseService {
  /**
   * @constructor
   */
  constructor() {
    super(Client);
  }
}

export const clientService = new ClientService();
