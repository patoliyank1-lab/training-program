import mongoose from 'mongoose';
const { Schema, model } = mongoose;
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,  
    trim: true 
  },
  email: {
    type: String,
    required: true,
    unique: true,  
    trim: true,
    match: [/.+@.+\..+/, 'Please fill a valid email address']
  },
  password: {
    type:String,
    required: true,
    minlength:6,
  },
}, {
  timestamps: true
});
const User = model('User', userSchema);
export default User;