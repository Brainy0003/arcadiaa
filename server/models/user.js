import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  isChief: Boolean,
  avatar: String,
  joker: Number
});

userSchema.pre('save', function (next) {
  const user = this;

  if (!user.isModified('password')) return next();

  const salt = bcrypt.genSaltSync(10);
  user.password = bcrypt.hashSync(user.password, salt);

  return next();
});

userSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
}

export default mongoose.model('User', userSchema);