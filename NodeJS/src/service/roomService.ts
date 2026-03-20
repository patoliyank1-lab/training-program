import { Room } from "../models/room.js";

const room = {
  /**
   * create new room base on name.
   * @param roomName name of room which is you want for new room 
   * @returns return then new crated room
   */
  createRoom: async (roomName: string) => {
    const room = new Room({ name: roomName });
    await room.save();
    return room;
  },

  /**
   * use to get all rooms.
   * @returns return all room which is exist in database.
   */
  getAllRooms: async () => {
    return await Room.find();
  },

  /**
   * Add user in chat using roomId and userId
   * @param roomId  room id which chat room want to be join.
   * @param userId login user id which is want to connection in chat
   */
  addUserToRoom: async (roomId: string, userId: string) => {
    const room = await Room.findById(roomId);
    if (room) {
      room.participants.push(userId);
      await room.save();
    }
  },
};

export default room;
