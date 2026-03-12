import { connect } from 'mongoose'
import User from '../models/User.js';
import { hashPassword } from '../utils/password.js';
const uri = process.env.MONGO_URL ?? ''
export const connectDB = async () => {
  try {
    await connect(uri)
    createAdmin();
    console.log('MongoDB Connected successfully!'); 
  } catch (error: any) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};


const createAdmin = async () => {

  try {
     
  const Admin = await User.findOne({role:'admin'});

  if(!Admin){
    const newAdmin = new User({
      name:'Admin',
      email:'admin@post.com',
      username:'admin_123',
      password:await hashPassword('Admin123'),
      role:'admin',  
    })

    await newAdmin.save();
  }
} catch (error) {
   console.log(error) 
  }
}