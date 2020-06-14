/* eslint-disable no-unused-vars */
import geoip from 'geoip-lite';
import { helmetLocationService } from '../services/helmetLocationService';
import awsService from '../config/awsConfig';
import { helmetService } from '../services/helmetService';
import { activityService } from '../services/activityService';
import timeChecker from '../helpers/timeChecker';
import ipChecker from '../helpers/getIp';

/**
 * @class HelmetController
 */
export default class HelmetController {
  /**
   * @method on
   * @description Connects to a device, updates the database and returns activity of helmet
   * @param {*} req
   * @param {*} res
   * @returns {object} daily activity
   */
  static async on(req, res) {
    const {
      params: { helmetNumber },
    } = req;
    let clientTokenUpdate;

    awsService.thingShadows.register('USER_HELMET', {}, async () => {
      const userHelmetState = {
        state: {
          desired: {
            status: 'ON',
          },
        },
      };
      clientTokenUpdate = awsService.thingShadows.update(
        'USER_HELMET',
        userHelmetState
      );

      if (clientTokenUpdate === null) {
        return res.status(400).send({
          status: false,
          error: 'update shadow failed, operation still in progress',
        });
      }

      let helmet = await helmetService.findOneAndUpdate(
        { helmetNumber },
        { status: 'ON', is_active: true }
      );

      if (!helmet) {
        return res.status(404).send({
          status: false,
          error: 'Helmet not found.',
        });
      }

      const time = timeChecker.startTime();

      helmet = await helmetService.findOneAndPopulate(
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
      const newCoordinates = geo.range;

      /** create helmet locate in database */
      const locationResult = await helmetLocationService.create({
        coordinates: newCoordinates,
        is_active: helmet.is_active,
        startTime: starTime,
        worker_id: helmet.workerId.worker_id,
      });

      /** creates activity for helmet if it's turned on */
      const result = activityService.create({
        helmetId: helmet._id,
        is_active: true,
        startTime: time,
        workerId: helmet.workerId,
      });

      return res.status(200).json({
        status: true,
        message: 'Helmet successfully connected',
        result,
      });
    });
  }

  /**
   * @method off
   * @description Disconnects a running instance of a device and updates the databse
   * @param {*} req
   * @param {*} res
   * @returns {object} helmet
   */
  static async off(req, res) {
    const {
      params: { helmetNumber },
    } = req;
    awsService.thingShadows.end();

    const helmet = await helmetService.findOneAndUpdate(
      { helmetNumber },
      { status: 'OFF', is_active: false }
    );

    if (!helmet) {
      return res.status(404).send({
        status: false,
        error: 'Helmet not found.',
      });
    }

    return res.status(200).json({
      status: true,
      message: 'Helmet successfully disconnected',
    });
  }
}
