"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventRouter = void 0;
const express_1 = __importDefault(require("express"));
const event_controller_1 = require("../../controllers/events/event.controller");
const event_controller_2 = require("../../controllers/events/event.controller");
exports.eventRouter = express_1.default.Router();
const event_controller_3 = require("../../controllers/events/event.controller");
const eventController = require('../../controllers/events/event.controller');
// const displayAllEvents=require('../../controllers/events/displayEvents.controller').displayAllEvents;
// const displayLeaderEvents=require('../../controllers/events/displayEvents.controller').displayLeadersEvents;
//
/**
 * @swagger
 * tags:
 *   name: Events
 *   description: API endpoints related to events management.
 */
/**
 * @swagger
 * /api/v1/events/sendevents:
 *   post:
 *     summary: Post a new event.
 *     description: Post a new user with the provided details.
 *     tags: [Events]
 *     parameters:
 *       - in: body
 *         name: events
 *         description: This is to send or post the new events.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             eventName:
 *               required: true
 *             organizationLevel:
 *               required: true
 *             location:
 *               required: true
 *             category:
 *               required: true
 *             startDate:
 *               required: true
 *             endDate:
 *               required: true
 *             endTime:
 *               required: true
 *             startTime:
 *               required: true
 *             description:
 *               required: true
 *             indangamuntu:
 *               required: true
 *
 *     responses:
 *       200:
 *         description: User registered successfully.
 *       400:
 *         description: Bad request - Invalid input.
 *       500:
 *         description: Internal server error.
 */
exports.eventRouter.post('/sendevents', event_controller_1.EventCreate); // This is the route to send the event
/**
 * @swagger
 * /api/v1/events/myevents:
 *   post:
 *     summary: Get all events written or given by the user.
 *     description: Retrieve all events written or given by the user based on their indangamuntu.
 *     tags: [Events]
 *     parameters:
 *       - in: query
 *         name: indangamuntu
 *         description: The user's indangamuntu.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Events retrieved successfully.
 *       400:
 *         description: Bad request - Invalid input.
 *       500:
 *         description: Internal server error.
 */
exports.eventRouter.post('/myevents', event_controller_2.displayAllEvents);
/**
 * @swagger
 * /api/v1/events/allevents:
 *   get:
 *     summary: Get all events by Admin.
 *     description: Get all posted by user but this is accessed by admin.
 *     tags: [Events]
 *     parameters:
 *       - in: body
 *         name: events
 *         description: This is to get all events.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *
 *     responses:
 *       200:
 *         description: Events gotten successfully.
 *       400:
 *         description: Bad request - Invalid input.
 *       500:
 *         description: Internal server error.
 */
exports.eventRouter.get('/allevents', event_controller_3.allEventsByAdmin); // This is the route to get the event by admin
