import mongoose from 'mongoose';
import workerSchema from '../schemas/workerSchema';

// WORKER MODEL
const Worker = mongoose.model('Worker', workerSchema);

export default Worker;
