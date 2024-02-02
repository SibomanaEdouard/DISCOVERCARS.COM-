"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.leaderRouter = void 0;
const express_1 = __importDefault(require("express"));
exports.leaderRouter = express_1.default.Router();
const auth_user_1 = require("../../middlewares/auth.user");
const leaders_controller_1 = require("../../controllers/leaders/leaders.controller");
const leaders_controller_2 = require("../../controllers/leaders/leaders.controller");
/**
 * @swagger
 * /api/v1/leaders/add:
 *   post:
 *     summary: Register a new leader
 *     description: Register a new leader to the Rangurura system.
 *     tags:
 *       - Leaders
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - indangamuntu
 *               - organizationLevel
 *               - location
 *               - category
 *               - role
 *             properties:
 *               indangamuntu:
 *                 type: string
 *               organizationLevel:
 *                 type: string
 *               location:
 *                 type: string
 *               category:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful registration
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
exports.leaderRouter.post('/add', auth_user_1.protect, (0, auth_user_1.role)("UMUTURAGE"), leaders_controller_1.createALeader);
/**
 * @swagger
 * /api/v1/leaders/leaders:
 *   get:
 *     summary: Get details of leaders
 *     description: This is the api to get all details of leaders.
 *     tags:
 *       - Leaders
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *     responses:
 *       200:
 *         description: Successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
exports.leaderRouter.get('/leaders', leaders_controller_2.allLeader);
