/* eslint-disable no-plusplus */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-unused-vars */
import geoip from 'geoip-lite';
import { helmetLocationService } from '../services/helmetLocationService';
import timeChecker from '../helpers/timeChecker';
import ipChecker from '../helpers/getIp';

/**
 * @class HelmetLocationController
 */
export default class HelmetLocationController {
  /**
   * @method updateHelmetLocation
   * @description get coordinate of updated assets
   * @param {*} req
   * @param {*} res
   * @returns {Array} responses
   */
  static async updateHelmetLocation(req, res) {
    /** find all helmet location in database */
    const locationResult = await helmetLocationService.find({
      is_active: true,
    });

    const responses = [];
    let processed = 0;

    for (const helmetlocation of locationResult) {
      /** get time */
      const newTime = timeChecker.getTime();

      /** get hemlmet ip  */
      const getHelmetIp = ipChecker.ipMiddleware(req, res);

      /** get coordinates of helmet from ip */
      const geo = geoip.lookup(getHelmetIp.clientIp);

      const duration = newTime - helmetlocation.starTime;

      /** assign helmet coordinates */
      const newCoordinates = geo.range;

      /** find and update all  */
      const result = helmetLocationService.findOneAndUpdate(
        { _id: helmetlocation._id },
        { coordinates: newCoordinates, duration }
      );
      processed++;

      responses.push(result);

      if (processed === locationResult.length) {
        return res.status(200).json({
          status: true,
          message: 'Helmet locations successfully updated',
          responses,
        });
      }
    }
  }
}
