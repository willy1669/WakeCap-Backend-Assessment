import mongoose from 'mongoose';

const { Schema } = mongoose;

// WORKER SCHEMA
const workerSchema = new Schema({
  helmetId: { type: Schema.Types.ObjectId, ref: 'Helmet' },
  siteId: { type: Schema.Types.ObjectId, ref: 'Site' },
  date_created: { type: Date, default: Date.now },
});

export default workerSchema;
