"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ideaRouter = void 0;
const auth_user_1 = require("../../middlewares/auth.user");
const idea_controller_1 = require("../../controllers/ideas/idea.controller");
const express_1 = __importDefault(require("express"));
exports.ideaRouter = express_1.default.Router();
//
// //this is to store idea in db
/**
 * @swagger
 * tags:
 *   name: Ideas
 *   description: API endpoints related to Idea management.
 */
/**
 * @swagger
 * /api/v1/ideas/send:
 *   post:
 *     summary: send a new idea.
 *     description: Send a new idea with the provided details.
 *     tags: [Ideas]
 *     parameters:
 *       - in: body
 *         name: ideas
 *         description: The idea object to be sent.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             indangamuntu:
 *               required: true
 *             category:
 *               required: true
 *             igitekerezo:
 *               required: true
 *             urwego:
 *               required: true
 *
 *     responses:
 *       200:
 *         description: Idea sent successfully.
 *       400:
 *         description: Bad request - Invalid input.
 *       500:
 *         description: Internal server error.
 */
exports.ideaRouter.post('/send', auth_user_1.protect, idea_controller_1.sendIdea);
/**
 * @swagger
 * /api/v1/ideas/all:
 *   get:
 *     summary: See all Ideas using indangamuntu posted on your level.
 *     description: See all Ideas using indangamuntu posted on your level there you will need indangamuntu.
 *     tags: [Ideas]
 *     parameters:
 *       - in: body
 *         name: ideas
 *         description: The idea object to be seen.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             indangamuntu:
 *
 *     responses:
 *       200:
 *         description: successfully.
 *       400:
 *         description: Bad request .
 *       500:
 *         description: Internal server error.
 */
exports.ideaRouter.get("/all", auth_user_1.protect, (0, auth_user_1.role)("UMUTURAGE"), idea_controller_1.getAllIdeas);
/**
 * @swagger
 * /api/v1/ideas/mine:
 *   get:
 *     summary: See all my ideas.
 *     description: this is on the side of people means recent ideas.
 *     tags: [Ideas]
 *     parameters:
 *       - in: body
 *         name: ideas
 *         description: The idea object to be seen.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             indangamuntu:
 *
 *     responses:
 *       200:
 *         description: successfully.
 *       400:
 *         description: Bad request .
 *       500:
 *         description: Internal server error.
 */
exports.ideaRouter.get("/mine", auth_user_1.protect, idea_controller_1.getMyIdeas);
