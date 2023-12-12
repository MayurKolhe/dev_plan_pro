import mongoose, { Schema, models,Document } from "mongoose";


const boardSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true}, 
    columns: { type: [String], default: ["notstarted", "inprogress", "done", "block", "newcolumn"] },
  },
  { timestamps: true }
);

export interface Boards extends Document {
  name: string;
  email: string;
  columns: string[]; 
}

const Boards = models.Boards || mongoose.model("Boards", boardSchema);

export default Boards;
