import { Message, type IMessage } from "../models/message.js";

const massage = {
  /**
   * Create new massage  
   * @param roomId current roomId - where is chatting on.
   * @param senderId sender id - who send this massage.
   * @param username  receiver user username.
   * @param text massage
   * @returns created new massage.
   */
  createMessage: async (
    roomId: string,
    senderId: string,
    username: string,
    text: string,
  ): Promise<IMessage> => {
    const message = new Message({ roomId, senderId, username, text });
    return await message.save();
  },

  /**
   * give all massage of room by using Room id.
   * @param roomId current roomId - where is chatting on.
   * @returns all massage of that room.
   */
  getMessagesByRoomId: async (roomId: string): Promise<IMessage[]> => {
    return await Message.find({ roomId });
  },
};

export default massage;
