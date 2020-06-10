import Site from '../db/models/site';

import BaseService from './baseService';

/**
 * @class SiteService
 */
export default class SiteService extends BaseService {
  /**
   * @constructor
   */
  constructor() {
    super(Site);
  }
}

export const siteService = new SiteService();
