import mongoose, { Schema, models } from "mongoose";
import { Document } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
},
    { timestamps: true }
);

export interface User extends Document {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

const Users = models.Users || mongoose.model("Users", userSchema);

export default Users;