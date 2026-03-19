import { Message, type IMessage } from "../models/message.js";

const massage = {
  createMessage: async (
    roomId: string,
    senderId: string,
    username: string,
    text: string,
  ): Promise<IMessage> => {
    const message = new Message({ roomId, senderId, username, text });
    return await message.save();
  },

  getMessagesByRoomId: async (roomId: string): Promise<IMessage[]> => {
    return await Message.find({ roomId });
  },
};

export default massage;
