import Helmet from '../db/models/helmetModel';

import BaseService from './baseService';

/**
 * @class HelmetService
 */
export default class HelmetService extends BaseService {
  /**
   * @constructor
   */
  constructor() {
    super(Helmet);
  }
}

export const helmetService = new HelmetService();
