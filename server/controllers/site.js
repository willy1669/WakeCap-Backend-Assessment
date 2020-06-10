import { authService } from '../services/authService';

/**
 * @class AuthController
 */
export default class AuthController {
  /**
   * @method createClientSite
   * @description registers a new site with their siteName, startingHour, endingHour,  timeZone, lateThreshold, totalInactiveHours
   * @param {*} req
   * @param {*} res
   * @returns {object} registered user
   */
  static async createClientSite(req, res) {
    const {
      body: {
        clientId,
        siteName,
        startingHour,
        endingHour,
        timeZone,
        lateThreshold,
        totalInactiveHours,
      },
    } = req;

    const now = new Date();

    const result = await authService.findOne({ _id: clientId });

    if (!result)
      return res.status(200).json({
        status: false,
        message: 'client does not exist',
      });
    else {
      const site = await authService.create({
        siteName,
        startingHour,
        endingHour,
        timeZone: now.getTimezoneOffset(),
        lateThreshold,
        totalInactiveHours,
      });

      return res.status(200).json({
        status: true,
        message: 'site created successfully',
        site,
      });
    }
  }
}
