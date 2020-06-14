/* eslint-disable camelcase */
import { activityService } from '../services/activityService';

/**
 * @class ActivityController
 */
export default class ActivityController {
  /**
   * @method getAbsentWorkersSummary
   * @description registers a new client with their name.
   * @param {*} req
   * @param {*} res
   * @returns {object} registered client
   */
  static async getAbsentWorkersSummary(req, res) {
    const {
      body: { date_created },
    } = req;

    const client = await activityService.find({ date_created });

    return res.status(200).json({
      status: true,
      message: 'client name created successfully',
      client,
    });
  }
}
