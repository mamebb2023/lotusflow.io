import { Schema, models, model, Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
}

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
});

const User = models.User || model<IUser>('User', UserSchema);

export default User;
