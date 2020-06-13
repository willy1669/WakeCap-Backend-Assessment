import mongoose from 'mongoose';

const { Schema } = mongoose;

// HELMET LOCATION SCHEMA
const helmetLocationSchema = new Schema(
  {
    coordinates: {
      coordinates: {
        type: [Number],
        required: true,
      },
      type: {
        type: String,
        enum: ['Point'],
        required: true,
      },
    },
    is_active: {
      type: String,
      enum: [true, false],
      default: false,
    },
    startTime: { type: Date },
    endTime: { type: Date },
    duration: { type: Number, Default: 0 },
    worker_id: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

export default helmetLocationSchema;
