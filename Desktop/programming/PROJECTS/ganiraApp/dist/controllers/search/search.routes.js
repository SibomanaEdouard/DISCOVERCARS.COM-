"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchRoute = void 0;
const express_1 = __importDefault(require("express"));
const search_controller_1 = require("./search.controller");
const auth_user_1 = require("../../middlewares/auth.user");
exports.searchRoute = express_1.default.Router();
exports.searchRoute.get("/", auth_user_1.protect, search_controller_1.searchEntity);
