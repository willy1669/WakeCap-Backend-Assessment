import mongoose from 'mongoose';
import helmetLocationSchema from '../schemas/helmetLocationSchema';

// HELMET LOCATION MODEL
const HelmetLocation = mongoose.model('HelmetLocation', helmetLocationSchema);

export default HelmetLocation;
