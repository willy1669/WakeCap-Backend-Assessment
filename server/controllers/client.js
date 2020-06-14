import { clientService } from '../services/clientService';

/**
 * @class ClientController
 */
export default class ClientController {
  /**
   * @method createClientName
   * @description registers a new client with their name.
   * @param {*} req
   * @param {*} res
   * @returns {object} registered client
   */
  static async createClientName(req, res) {
    const {
      body: { name },
    } = req;

    const client = await clientService.create({ name });

    return res.status(200).json({
      status: true,
      message: 'client name created successfully',
      client,
    });
  }
}
