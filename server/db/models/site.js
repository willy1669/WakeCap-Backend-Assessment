import mongoose from 'mongoose';
import siteSchema from '../schemas/siteSchema';

// SITE MODEL
const Site = mongoose.model('Site', siteSchema);

export default Site;
