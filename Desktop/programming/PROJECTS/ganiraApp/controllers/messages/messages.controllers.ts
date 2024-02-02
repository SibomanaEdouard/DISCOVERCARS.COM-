import { Request, Response } from 'express';
import { Socket } from 'socket.io';
import mongoose from 'mongoose';
// import ChatController from './controllers/chatController';
import { Message } from '../../entities/messages.entity';

const activeUsers = new Map<string, Socket>();
// const chatController = new ChatController();

export const messageController=async(req:Request,res:Response)=>{
    const {senderId,recipientId,message}=req.body;
    
    try {
        if(!senderId || !recipientId || !message){
            res.status(403).json({message:"Type the content then send "});
        }else{
            const sendMessage=await Message.create({
                senderId,recipientId,message
            })
            if(sendMessage){
                res.status(200).json({message:"Message sent successfully!"});
            }else{
                res.status(403).json({message:"Failed to send message."});
            }
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Internal server error ..."});
        
    }
}

//this is to get the received messages
export const receivedMessages=async(req:Request,res:Response)=>{
    const {senderId}=req.body;
    try {
        if(!senderId){
            res.status(400).json({message:"Login to continue ..."});

        }else{
            const received=await Message.find({recipientId:senderId});
            if(received.length==0){
                res.status(400).json({message:"No message received"});
            }else{
                res.status(200).json(received);
            }
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Internal server error ... "});
        
    }
 

}

// This is to get the sent messages
export const sentMessages = async (req: Request, res: Response) => {
    try {
      const { senderId } = req.body;
  
      console.log("Request body:", req.body);
  
      if (!senderId) {
        console.log("No senderId provided in the request body.");
        return res.status(400).json({ message: "Login to continue ..." });
      }
  
      console.log("Searching for messages with senderId:", senderId);
  
      const sent = await Message.find({ senderId });
  
      console.log("Found messages:", sent);
  
      if (sent.length === 0) {
        console.log("No messages found for senderId:", senderId);
        return res.status(404).json({ message: "No message sent!" });
      }
  
      console.log("Returning messages:", sent);
  
      res.status(200).json(sent);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal server error ... " });
    }
  };


  
