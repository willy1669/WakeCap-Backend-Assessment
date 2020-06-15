import express from 'express';

/** client route */
import clientRoute from './clientRoute';

/** helmet route */
import helmetRoute from './helmetRoute';

/** site route */
import siteRoute from './siteRoute';

/** worker route */
import workerRoute from './workerRoute';

/** helmet Location route */
import helmetLocationRoute from './helmetLocation';

/** index route */
import indexRoute from './index.routes';

// express router
const router = express.Router();

/** All Routes with base URl */
router.use('/client', clientRoute);

router.use('/helmet', helmetRoute);

router.use('/site', siteRoute);

router.use('/worker', workerRoute);

router.use('/helmetLocation', helmetLocationRoute);

router.use(indexRoute);

export default router;
