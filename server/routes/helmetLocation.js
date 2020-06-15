import express from 'express';
import { CronJob } from 'cron';
import controllers from '../controllers';

const helmetLocation = express.Router();

const {
  helmetLocationConroller: { updateHelmetLocation },
} = controllers;

/** Cron that gets new location update from our assets every 3 minutes */
const getAssetLocationUpdate = new CronJob('* 3 * * * *', updateHelmetLocation);
getAssetLocationUpdate.start();

export default helmetLocation;
