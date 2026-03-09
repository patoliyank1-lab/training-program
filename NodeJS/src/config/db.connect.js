import {MongoClient} from 'mongodb';
import User from '../models/User.js';

const uri = 'mongodb+srv://patoliyank1_db_user:oqmNCuG0ndr8G57y@cluster0.zeaqfek.mongodb.net/nodejs?retryWrites=true&w=majority'


export const connectDB = async () => {
  try {
    await MongoClient.connect(uri, function(err, db) {
  if (err) throw err;
  let dbo = db.db("nodejs");
  dbo.createCollection("Users", function(err, res) {
    if (err) throw err;
    console.log("Collection created!");
    db.close();
  });
});
console.log('MongoDB Connected successfully!');
  const newUser = new User({
      name: "Sr.",
      username: "test1s23__",
      email: "test@test2sds34.com",
      password: "password123",
    });

    const savedUser = await newUser.save();
    console.log("User saved:", savedUser);   
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    // Exit process with failure
    process.exit(1);
  }
};
