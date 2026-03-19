import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  userId: string;
  socketId: string;
  createdAt: Date;
}

const UserSchema: Schema = new Schema({
  userId: { 
    type: Schema.Types.ObjectId,
     ref: "User",
     require:true,
     },
  socketId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const massUser = mongoose.model<IUser>("massUser", UserSchema);
