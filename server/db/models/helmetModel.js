import mongoose from 'mongoose';
import helmetSchema from '../schemas/helmetSchema';

// HELMET MODEL
const Helmet = mongoose.model('Helmet', helmetSchema);

export default Helmet;
