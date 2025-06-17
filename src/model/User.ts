import { Mongoose, Schema, Document } from "mongoose";

export interface IUser extends Document {
    name: string;
    email: string;
    emailVerified: boolean;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}
export const UserSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    emailVerified: { type: Boolean, default: false },
    password: { type: String, required: true },
}, {
    timestamps: true,
});
export const UserModel = (mongoose: Mongoose) => mongoose.model<IUser>("User", UserSchema);