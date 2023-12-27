import {Schema, model} from "mongoose";
import {TUser, UserModel} from "./auth.interface";
import config from "../../config";
import bcrypt from 'bcrypt';

const userSchema = new Schema<TUser, UserModel>({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    select: 0
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  }
}, {timestamps: true});

userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(user.password, Number(config.bcrypt_salt_rounds))

  next()
})

userSchema.post('save', function(doc, next) {
  doc.password = '';
  next()
})

userSchema.statics.isUserExists = async function(id: string){
  return await User.findById(id).select('+password')
}



export const User = model<TUser, UserModel>('User', userSchema)
