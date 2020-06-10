import Worker from '../db/models/worker';

import BaseService from './baseService';

/**
 * @class WorkerService 
 */
export default class WorkerService extends BaseService {
  /**
   * @constructor
   */
  constructor() {
    super(Worker);
  }
}

export const workerService = new WorkerService();
