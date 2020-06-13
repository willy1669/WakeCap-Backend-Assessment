import mongoose from 'mongoose';

const { Schema } = mongoose;

// SITE SCHEMA
const siteSchema = new Schema(
  {
    clientName: { type: Schema.Types.ObjectId, ref: 'Client' },
    siteName: { type: String },
    workers: [{ type: Schema.Types.ObjectId, ref: 'Worker' }],
    startingHour: { type: Date },
    endingHour: { type: Date },
    totalInactiveHours: { type: Date },
    timeZone: { type: Date.UTC },
    lateThreshold: { type: Date },
    date_created: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

export default siteSchema;
