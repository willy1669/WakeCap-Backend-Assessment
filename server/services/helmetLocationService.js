import HelmetLocation from '../db/models/helmetLocation';

import BaseService from './baseService';

/**
 * @class HelmetLocationService
 */
export default class HelmetLocationService extends BaseService {
  /**
   * @constructor
   */
  constructor() {
    super(HelmetLocation);
  }
}

export const helmetLocationService = new HelmetLocationService();
