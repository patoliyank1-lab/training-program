import type { Request, Response } from "express";
import UserService from "../service/userService.js";
import roomService from "../service/roomService.js";
import messageService from "../service/messageService.js";
import { BadRequestError } from "../utils/error.js";

export const joinChat = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.userId as (string | undefined)

    if(!userId) throw new BadRequestError('This user not found.')

    const { socketId , roomId } = req.body;
    if ( !socketId || !roomId) {
      res
        .status(400)
        .json({ message: "Name, socketId, and roomId are required" });
      return;
    }

    const user = await UserService.createOrUpdateUser(userId, socketId);
    await roomService.addUserToRoom(roomId, String(user._id));
    res.status(201).json({ message: "User joined", user });
  } catch (error) {
    console.error("Error in joinChat:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const sendMessage = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const senderId = req.user?.userId
    const { roomId, username, text } = req.body;
    if (!senderId || !roomId || !username || !text) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }

    const message = await messageService.createMessage(
      roomId,
      senderId,
      username,
      text,
    );
    res.status(201).json({ message: "Message sent", data: message });
  } catch (error) {
    console.error("Error in sendMessage:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getRoomMessages = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { roomId } = req.params;
    const messages = await messageService.getMessagesByRoomId(roomId as string);
    res.status(200).json(messages);
  } catch (error) {
    console.error("Error in getRoomMessages:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const getRooms = async (req: Request, res: Response): Promise<void> => {
  try {
    const rooms = await roomService.getAllRooms();
    res.status(200).json(rooms);
  } catch (error) {
    console.error('Error in getRooms:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const createRoom = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { roomName } = req.body;
    
    
    if (!roomName) {
      res.status(400).json({ message: 'All fields are required' });
      return;
    }

    const message = await roomService.createRoom(roomName);
    res.status(201).json({ message: 'Message sent', data: message });
  } catch (error) {
    console.error('Error in createRoom:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};