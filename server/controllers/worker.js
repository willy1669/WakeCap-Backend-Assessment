/* eslint-disable camelcase */
import { workerService } from '../services/workerService';
import { helmetService } from '../services/helmetService';

/**
 * @class WorkerController
 */
export default class WorkerController {
  /**
   * @method createWorker
   * @description attach a helmet to a worker
   * @param {*} req
   * @param {*} res
   * @returns {object} worker
   */
  static async createWorker(req, res) {
    const {
      body: { worker_id },
    } = req;

    const worker = await workerService.create({ worker_id });

    return res.status(200).json({
      status: true,
      message: 'worker created sucessfully with worker_id',
      worker,
    });
  }

  /**
   * @method attachHelmetToWorker
   * @description attach a helmet to a worker
   * @param {*} req
   * @param {*} res
   * @returns {object} worker
   */
  static async attachHelmetToWorker(req, res) {
    const {
      params: { worker_id, helmetId },
    } = req;

    const workerResult = await workerService.findOne({ worker_id });

    if (!workerResult) {
      return res.status(400).json({
        status: false,
        message: 'worker does not exist with this id',
      });
    }

    const helmetResult = await helmetService.findOne({ helmetId });

    helmetResult.workerId = worker_id;
    await helmetResult.save();
    workerResult.helmetId = helmetId;
    await workerResult.save();

    return res.status(200).json({
      status: true,
      message: 'helmet successfully attached to a worker',
      workerResult,
    });
  }
}
