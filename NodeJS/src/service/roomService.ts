import { Room } from "../models/room.js";

const room = {
  createRoom: async (roomName: string) => {
    const room = new Room({ name: roomName });
    await room.save();
    return room;
  },

  getAllRooms: async () => {
    return await Room.find();
  },

  addUserToRoom: async (roomId: string, userId: string) => {
    const room = await Room.findById(roomId);
    if (room) {
      room.participants.push(userId);
      await room.save();
    }
  },
};

export default room;
