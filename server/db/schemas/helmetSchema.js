import mongoose from 'mongoose';

const { Schema } = mongoose;

// HELMET SCHEMA
const helmetSchema = new Schema(
  {
    helmetNumber: {
      type: Number,
      required: true,
      lowercase: true,
      unique: true,
    },
    status: {
      type: String,
      enum: ['ON', 'OFF'],
      default: 'OFF',
    },
    is_active: {
      type: String,
      enum: [true, false],
      default: false,
    },
    workerId: { type: Schema.Types.ObjectId, ref: 'Worker' },
  },
  {
    timestamps: true,
  }
);

export default helmetSchema;
