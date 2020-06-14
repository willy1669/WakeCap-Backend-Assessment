import Activity from '../db/models/activity';

import BaseService from './baseService';

/**
 * @class ActivityService
 */
export default class ActivityService extends BaseService {
  /**
   * @constructor
   */
  constructor() {
    super(Activity);
  }
}

export const activityService = new ActivityService();
