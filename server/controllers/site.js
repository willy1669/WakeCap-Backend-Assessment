/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-syntax */
/* eslint-disable camelcase */
import { clientService } from '../services/clientService';
import { siteService } from '../services/siteService';
import { workerService } from '../services/workerService';
import { activityService } from '../services/activityService';
/**
 * @class SiteController
 */
export default class SiteController {
  /**
   * @method createClientSite
   * @description registers a new site with the siteName, startingHour, endingHour, timeZone, lateThreshold, totalInactiveHours
   * @param {*} req
   * @param {*} res
   * @returns {object} site
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

    const result = await clientService.findOne({ _id: clientId });

    if (!result) {
      return res.status(200).json({
        status: false,
        message: 'client does not exist',
      });
    }
    const site = await siteService.create({
      siteName,
      startingHour,
      endingHour,
      timeZone,
      lateThreshold,
      totalInactiveHours,
    });

    return res.status(200).json({
      status: true,
      message: 'site created successfully',
      site,
    });
  }

  /**
   * @method registerWorkersForSite
   * @description registers a new worker
   * @param {*} req
   * @param {*} res
   * @returns {object} registered site
   */
  static async registerWorkersForSite(req, res) {
    const {
      params: { worker_id, siteId },
    } = req;

    const result = await siteService.findOne({ _id: siteId });

    if (!result) {
      return res.status(400).json({
        status: false,
        message: 'site does not exist',
      });
    }

    result.workers.push(worker_id);
    await result.save();

    const worker = workerService.findOne({ _id: worker_id });

    if (!worker) {
      return res.status(200).json({
        status: false,
        message: 'worker does not exist',
      });
    }

    worker.siteId = siteId;

    return res.status(200).json({
      status: true,
      message: 'worker added to a site successfully',
    });
  }

  /**
   * @method getAbsentWorkersSummary
   * @description get absent workers.
   * @param {*} req
   * @param {*} res
   * @returns {object} registered client
   */
  static async getAbsentWorkersSummary(req, res) {
    const {
      params: { siteId },
    } = req;

    const site = await siteService.findOne({ siteId });

    if (!site) {
      return res.status(200).json({
        status: true,
        message: 'client name created successfully',
      });
    }

    const siteTimezone = site.timeZone;

    const allWorkers = site.workers;

    const absentWorkers = [];
    let processed = 0;

    for (const everyWorker of allWorkers) {
      const workerId = everyWorker;
      const activityResult = await activityService.findOne(
        {
          date_created: new Date(),
          workerId,
        },
        { date_created: 1 }
      );
      processed++;

      if (!activityResult) {
        const workersResult = await workerService.findOne({ _id: workerId });

        absentWorkers.push(workersResult);

        if (processed === allWorkers.length) {
          return res.status(200).json({
            status: true,
            message:
              'summary of absent workers for today created succussefully',
            site,
            siteTimezone,
          });
        }
      }
    }
  }

  /**
   * @method getWorkersTotalActiveHours
   * @description registers a new client with their name.
   * @param {*} req
   * @param {*} res
   * @returns {object} registered client
   */
  static async getWorkersTotalActiveHours(req, res) {
    const {
      params: { siteId },
    } = req;

    const site = await siteService.findOne({ siteId });

    if (!site) {
      return res.status(200).json({
        status: true,
        message: 'client name created successfully',
      });
    }

    const allWorkers = site.workers;

    const absentWorkers = [];
    let processed = 0;

    for (const everyWorker of allWorkers) {
      const workerId = everyWorker;
      const activityResult = await activityService.findOne(
        {
          date_created: new Date(),
          workerId,
        },
        { date_created: 1 }
      );
      processed++;
    }
  }
}
