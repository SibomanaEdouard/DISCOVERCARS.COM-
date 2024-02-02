"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageRoutes = void 0;
const express_1 = __importDefault(require("express"));
exports.messageRoutes = express_1.default.Router();
const messages_controllers_1 = require("../../controllers/messages/messages.controllers");
const messages_controllers_2 = require("../../controllers/messages/messages.controllers");
const messages_controllers_3 = require("../../controllers/messages/messages.controllers");
/**
 * @swagger
 * tags:
 *   name: Messages
 *   description: This is the APIs about messages.
 */
/**
 * @swagger
 * /api/v1/message/sendmessage:
 *   post:
 *     summary: Send a new message.
 *     description: Send a new message with the provided details.
 *     tags: [Messages]
 *     parameters:
 *       - in: body
 *         name: message
 *         description: The message object to be sent.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             senderId:
 *               required: true
 *             receiverId:
 *               required: true
 *             message:
 *               required: true
 *
 *     responses:
 *       200:
 *         description: Message sent successfully.
 *       400:
 *         description: Bad request - Invalid input.
 *       500:
 *         description: Internal server error.
 */
exports.messageRoutes.post('/sendmessage', messages_controllers_1.messageController);
/**
 * @swagger
 * /api/v1/message/receivedmessages:
 *   post:
 *     summary: get received messages.
 *     description: Get messages which sent to me.
 *     tags: [Messages]
 *     parameters:
 *       - in: body
 *         name: message
 *         description: The messages sent from difference users to me.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             senderId:
 *               required: true
 *
 *     responses:
 *       200:
 *         description: Message received succefully.
 *       400:
 *         description: Bad request - Invalid input.
 *       500:
 *         description: Internal server error.
 */
exports.messageRoutes.post('/receivedmessages', messages_controllers_2.receivedMessages);
/**
 * @swagger
 * /api/v1/message/sentmessages:
 *   post:
 *     summary: Get messages I sent to others.
 *     description: Get messages which sent to me.
 *     tags: [Messages]
 *     parameters:
 *       - in: body
 *         name: message
 *         description: The messages sent from difference users to me.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             senderId:
 *               required: true
 *
 *     responses:
 *       200:
 *         description: Message received succefully.
 *       400:
 *         description: Bad request - Invalid input.
 *       500:
 *         description: Internal server error.
 */
exports.messageRoutes.post('/sentmessages', messages_controllers_3.sentMessages);
