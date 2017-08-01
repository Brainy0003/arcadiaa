import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
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
  joker: Number,
  googleId: String
});

userSchema.pre('save', function (next) {
  const user = this;
  if (!user.isModified('password')) return next();
  user.password = bcrypt.hashSync(user.password, 10);
  next();
});

userSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
}

export default mongoose.model('User', userSchema);