import mongoose, { Schema, models,Document } from "mongoose";

const todoSchema = new Schema(
  {
    title: { type: String, required: true },
    status: { type: String },
    Image: { type: String, required: false }
  },
  { timestamps: true }
);

export interface Todos extends Document {
  title: string;
  status: string;
  Image: string;
}

const Todos = models.Todos || mongoose.model("Todos", todoSchema);

export default Todos;