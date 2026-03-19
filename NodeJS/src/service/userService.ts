
import { massUser, type IUser } from "../models/UserConnection.js";

const UserService = {
  createOrUpdateUser : async (
  userId: string,
  socketId: string,
): Promise<IUser> => {
  const existingUser = await massUser.findOne({ userId });

  if (existingUser) {
    existingUser.socketId = socketId;
    return await existingUser.save();
  }

  const newUser = new massUser({ userId , socketId });
  return await newUser.save();
},

deleteUserBySocketId : async (socketId: string): Promise<void> => {
  await massUser.deleteOne({ socketId });
}
};

export default UserService;
