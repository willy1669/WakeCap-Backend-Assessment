import { authService } from '../services/authService';

/**
 * @class AuthController
 */
export default class AuthController {
  /**
   * @method register
   * @description registers a new client with their name.
   * @param {*} req
   * @param {*} res
   * @returns {object} registered user
   */
  static async createClientName(req, res) {
    const { name } = req.body;

    const user = await authService.create({ name });

    return res.status(200).json({
      status: true,
      message: 'client name created successfully',
      user,
    });
  }
}