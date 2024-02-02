"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sentMessages = exports.receivedMessages = exports.messageController = void 0;
// import ChatController from './controllers/chatController';
const messages_entity_1 = require("../../entities/messages.entity");
const activeUsers = new Map();
// const chatController = new ChatController();
const messageController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { senderId, recipientId, message } = req.body;
    try {
        if (!senderId || !recipientId || !message) {
            res.status(403).json({ message: "Type the content then send " });
        }
        else {
            const sendMessage = yield messages_entity_1.Message.create({
                senderId, recipientId, message
            });
            if (sendMessage) {
                res.status(200).json({ message: "Message sent successfully!" });
            }
            else {
                res.status(403).json({ message: "Failed to send message." });
            }
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error ..." });
    }
});
exports.messageController = messageController;
//this is to get the received messages
const receivedMessages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { senderId } = req.body;
    try {
        if (!senderId) {
            res.status(400).json({ message: "Login to continue ..." });
        }
        else {
            const received = yield messages_entity_1.Message.find({ recipientId: senderId });
            if (received.length == 0) {
                res.status(400).json({ message: "No message received" });
            }
            else {
                res.status(200).json(received);
            }
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error ... " });
    }
});
exports.receivedMessages = receivedMessages;
// This is to get the sent messages
const sentMessages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { senderId } = req.body;
        console.log("Request body:", req.body);
        if (!senderId) {
            console.log("No senderId provided in the request body.");
            return res.status(400).json({ message: "Login to continue ..." });
        }
        console.log("Searching for messages with senderId:", senderId);
        const sent = yield messages_entity_1.Message.find({ senderId });
        console.log("Found messages:", sent);
        if (sent.length === 0) {
            console.log("No messages found for senderId:", senderId);
            return res.status(404).json({ message: "No message sent!" });
        }
        console.log("Returning messages:", sent);
        res.status(200).json(sent);
    }
    catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal server error ... " });
    }
});
exports.sentMessages = sentMessages;
