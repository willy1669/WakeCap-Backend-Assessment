import express from 'express';
// import { CronJob } from 'cron';
import controllers from '../controllers';

const siteRoute = express.Router();

const {
  siteController: {
    createClientSite,
    registerWorkersForSite,
    // getAbsentWorkersSummary,
  },
} = controllers;

/** route to register a new site */
siteRoute.post('/client/create', createClientSite);

/** route to register a new worker for a site */
siteRoute.patch('/:worker_id/:siteId', registerWorkersForSite);

/** Cron that gets all absent from our assets every 12midnight depending on site's timezone */
// const getAbsentWorker = new CronJob({
//   cronTime: '* * 12 * * *',
//   onTick: () => {
//     getAbsentWorkersSummary();
//   },
//   start: false,
//   timeZone: 'Asia/Singapore',
// });
// getAbsentWorker.start();

export default siteRoute;
