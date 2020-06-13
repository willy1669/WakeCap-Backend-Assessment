/* eslint-disable no-unused-vars */
import geoip from 'geoip-lite';
import { helmetLocationService } from '../services/helmetLocationService';
import { helmetService } from '../services/helmetService';
import ipChecker from '../helpers/getIp';
import timeChecker from '../helpers/timeChecker';

/**
 * @class HelmetLocationController
 */
export default class HelmetLocationController {
  /**
   * @method createHelmetLocation
   * @description get coordinate of helmet
   * @param {*} req
   * @param {*} res
   * @returns {object} locationResult
   */
  static async createHelmetLocation(req, res) {
    const {
      params: { helmetNumber },
    } = req;

    const helmet = await helmetService.findOneAndPopulate(
      { helmetNumber },
      // eslint-disable-next-line no-undef
      { workerId, worker_id: 'worker_id' }
    );

    /** get time */
    const starTime = timeChecker.getTime();

    /** get hemlmet ip  */
    const getHelmetIp = ipChecker.ipMiddleware(req, res);

    /** get coordinates of helmet from ip */
    const geo = geoip.lookup(getHelmetIp.clientIp);

    /** assign helmet coordinates */
    const coordinates = geo.range;

    /** create helmet locate in database */
    const locationResult = await helmetLocationService.create({
      coordinates,
      is_active: helmet.is_active,
      startTime: starTime,
      worker_id: helmet.workerId.worker_id,
    });

    return res.status(200).json({
      status: true,
      message: 'Helmet location successfully created',
      locationResult,
    });
  }

  /**
   * @method updateHelmetLocation
   * @description get coordinate of helmet
   * @param {*} req
   * @param {*} res
   * @returns {object} result
   */
  static async updateHelmetLocation(req, res) {
    /** find all helmet location in database */
    const locationResult = await helmetLocationService.find({
      is_active: true || false,
    });

    const newTime = Date().getTime();
    const duration = newTime - locationResult.startTime;

    /** find and update all  */
    const result = await helmetLocationService.findAndUpdateMany(
      {},
      { duration }
    );

    return res.status(200).json({
      status: true,
      message: 'Helmet location successfully created',
      result,
    });
  }
}
