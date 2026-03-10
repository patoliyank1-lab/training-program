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
    lowercase: true,
  },
  password: {
    type:String,
    required: true,
    minlength:6,
  },
  role:{
    type:String,
    enum: ['admin', 'user'],
    default: 'user',
    required: true,
  },
  avatar: {
    type:String,
    require:true,
  }
}, {
  timestamps: true
});
const User = model('User', userSchema);
export default User;