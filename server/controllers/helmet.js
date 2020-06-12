import awsService from '../config/awsConfig';
import { helmetService } from '../services/helmetService';

/**
 * @class HelmetController
 */
export default class HelmetController {
  /**
   * @method on
   * @description Connects to a device
   * @param {*} req
   * @param {*} res
   * @returns {object} helmet
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

      const helmet = await helmetService.findOneAndUpdate(
        { helmetNumber },
        { state: 'ON' }
      );

      if (!helmet) {
        return res.status(404).send({
          status: false,
          error: 'Helmet not found.',
        });
      }

      return res.status(200).json({
        status: true,
        message: '  Helmet successfully connected',
      });
    });
  }

  /**
   * @method off
   * @description Disconnects a running instance of a device
   * @param {*} req
   * @param {*} res
   * @returns {object} meter
   */
  static async off(req, res) {
    awsService.thingShadows.end();

    return res.status(200).json({
      status: true,
      message: 'Helmet successfully disconnected',
    });
  }
}
