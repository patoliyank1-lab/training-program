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
  phone:{
    type:String,
    default:''
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
  isVerify:{
    type:Boolean,
    default:false,
  },
  avatar: {
    type:String,
    require:true,
    default:''
  }
}, {
  timestamps: true
});
const User = model('User', userSchema);
export default User;