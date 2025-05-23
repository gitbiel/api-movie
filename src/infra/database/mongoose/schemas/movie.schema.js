import mongoose from 'mongoose';

const MovieSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    releaseYear: { type: Number, required: true },
  },
  { timestamps: true }
);

export const MovieModel = mongoose.model('Movie', MovieSchema);
