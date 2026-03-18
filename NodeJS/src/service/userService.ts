
import { User, type IUser } from "../models/UserConnection.js";

const UserService = {
  createOrUpdateUser : async (
  name: string,
  socketId: string,
): Promise<IUser> => {
  const existingUser = await User.findOne({ name });

  if (existingUser) {
    existingUser.socketId = socketId;
    return await existingUser.save();
  }

  const newUser = new User({ name, socketId });
  return await newUser.save();
},

deleteUserBySocketId : async (socketId: string): Promise<void> => {
  await User.deleteOne({ socketId });
}
};

export default UserService;
