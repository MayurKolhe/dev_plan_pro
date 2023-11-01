import mongoose, { Schema, models,Document } from "mongoose";

const cardSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    columnId: { type: String, required: true },
    assignedTo: { type: String },
  },
  { timestamps: true }
);

export interface Card extends Document {
  title: string;
  description?: string;
  columnId: string;
  assignedTo?: string;
}

const Card = models.Card || mongoose.model("Card", cardSchema);

export default Card;
