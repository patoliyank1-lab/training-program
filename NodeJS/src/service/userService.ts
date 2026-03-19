
import { massUser, type IUser } from "../models/UserConnection.js";

const UserService = {
  /**
   * create or delete user by using socketId for track massage.
   * @param userId which user want to join in chat.
   * @param socketId for track connection.
   * @returns new created user or updated user.
   */
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

/**
 * delete user by using socketId when connection end.
 * @param socketId socket's id which connection is end.
 */
deleteUserBySocketId : async (socketId: string): Promise<void> => {
  await massUser.deleteOne({ socketId });
}
};

export default UserService;
