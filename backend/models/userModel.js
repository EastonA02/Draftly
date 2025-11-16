import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true},
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true },
  },
  { timestamps: trues }
);

//method to compare password when logging in
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
};

//Run when user is saved to database : hash and save password if modified
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

//create user model based on schema and connect to mongoDB collection 'users'
const User = mongoose.model("User", userSchema);
export default User;
