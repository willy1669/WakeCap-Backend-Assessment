import express from 'express';
import controllers from '../controllers';

const helmetRoute = express.Router();

const {
  helmetConroller: { on, off },
} = controllers;

helmetRoute.patch('/helmet/on', on);

helmetRoute.patch('/helmet/off', off);

export default helmetRoute;
