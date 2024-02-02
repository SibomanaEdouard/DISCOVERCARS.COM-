import express from 'express';
export const messageRoutes=express.Router();
import { messageController } from "../../controllers/messages/messages.controllers";
import { receivedMessages } from '../../controllers/messages/messages.controllers';
import { sentMessages } from '../../controllers/messages/messages.controllers';



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
messageRoutes.post('/sendmessage',messageController);

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
messageRoutes.post('/receivedmessages',receivedMessages);

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
messageRoutes.post('/sentmessages',sentMessages);

