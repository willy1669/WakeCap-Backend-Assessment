import express from 'express';
import { CronJob } from 'cron';
import controllers from '../controllers/helmetLocation';

const helmetLocation = express.Router();

const {
  helmetLocationController: { createHelmetLocation, updateHelmetLocation },
} = controllers;

/** create helmet location update from ip of helmet */
helmetLocation.post('/register', createHelmetLocation);

/** Cron that gets new location update from our assets every 3 minutes */
const getAssetLocationUpdate = new CronJob('* 3 * * * *', updateHelmetLocation);
getAssetLocationUpdate.start();

export default helmetLocation;
