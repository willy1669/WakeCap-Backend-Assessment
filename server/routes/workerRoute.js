import express from 'express';
import controllers from '../controllers';

const workerRoute = express.Router();

const {
  workerController: { createWorker },
} = controllers;

/** route to register a new worker */
workerRoute.post('/register', createWorker);

export default workerRoute;
