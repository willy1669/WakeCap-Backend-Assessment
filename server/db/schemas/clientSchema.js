import mongoose from 'mongoose';

const { Schema } = mongoose;

// CLIENT SCHEMA
const clientSchema = new Schema(
  {
    clientName: { type: String, required: true },
    sites: [{ type: Schema.Types.ObjectId, ref: 'Site' }],
    date_created: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

export default clientSchema;
