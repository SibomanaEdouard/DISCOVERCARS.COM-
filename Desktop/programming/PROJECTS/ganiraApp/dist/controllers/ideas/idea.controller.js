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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMyIdeas = exports.getAllIdeas = exports.sendIdea = void 0;
const typeorm_1 = require("typeorm");
const idea_entity_1 = __importDefault(require("../../entities/idea.entity"));
const user_entity_1 = __importDefault(require("../../entities/user.entity"));
const leaders_entity_1 = __importDefault(require("../../entities/leaders.entity"));
const sendIdea = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const IdeaRepo = (0, typeorm_1.getRepository)(idea_entity_1.default);
    const userRepo = (0, typeorm_1.getRepository)(user_entity_1.default);
    try {
        if (!req.user)
            return res.status(403).json({
                message: "Login to continue",
            });
        const { urwego, igitekerezo, category, target, location } = req.body;
        // get logged in user
        const eUser = yield userRepo.findOne({ where: { nationalId: req.user.indangamuntu } });
        if (!eUser) {
            return res.status(404).json({ message: 'User not found!' });
        }
        if (!urwego || !igitekerezo || !category || !target)
            return res.status(403).json({
                message: "All credentials are required!",
            });
        if (urwego.toString().toLowerCase() === "akagari" && !location) {
            return res.status(401).json({ message: `Add the sector where ${target} is located!` });
        }
        if (urwego.toString().toLowerCase() === "umurenge" && !location) {
            return res.status(401).json({ message: `Add the district where ${target} is located!` });
        }
        if (urwego.toString().toLowerCase() === "akarere" && !location) {
            return res.status(401).json({ message: `Add the province where ${target} is located!` });
        }
        if (urwego.toString().toLowerCase() === "intara" && !location) {
            return res.status(401).json({ message: `Specify which province is!` });
        }
        const ideaToSave = new idea_entity_1.default(igitekerezo, category, urwego, eUser.nationalId, target, location);
        if (yield IdeaRepo.save(ideaToSave))
            return res.status(201).json({ message: "suggestion sent successfully" });
        return res.status(500).json({
            mesage: "Error while sending your idea",
        });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({
            message: "Internal server error...",
        });
    }
});
exports.sendIdea = sendIdea;
// get ideas
const getAllIdeas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ideasRepo = (0, typeorm_1.getRepository)(idea_entity_1.default);
    const leaderRepo = (0, typeorm_1.getRepository)(leaders_entity_1.default);
    try {
        const eUser = req.user;
        if (!eUser) {
            return res.status(403).json({ message: 'Login to continue' });
        }
        // check if the user is a leader
        const lUser = yield leaderRepo.findOne({ where: {
                nationalId: eUser.nationalId
            } });
        if (!eUser) {
            return res.status(403).json({ message: 'You are not authorised to perform this action!' });
        }
        // get ideas from his location and on his level
        const ideas = yield ideasRepo.find({ where: {
                urwego: lUser === null || lUser === void 0 ? void 0 : lUser.adminLevel.toString().toLowerCase(),
                target: lUser === null || lUser === void 0 ? void 0 : lUser.office.toString().toLowerCase(),
                location: lUser === null || lUser === void 0 ? void 0 : lUser.location.toString().toLowerCase()
            } });
        if (ideas.length == 0) {
            return res.status(404).json({ message: `No ideas found in ${lUser === null || lUser === void 0 ? void 0 : lUser.office}` });
        }
        return res.status(200).json({ ideas: ideas });
    }
    catch (e) {
        return res.status(500).json({ message: 'Internal server error...' });
    }
});
exports.getAllIdeas = getAllIdeas;
// get my ideas
const getMyIdeas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ideasRepo = (0, typeorm_1.getRepository)(idea_entity_1.default);
    try {
        // get user
        if (!req.user) {
            return res.status(403).json({ message: 'Login to continue' });
        }
        // get user's ideas
        const ideas = yield ideasRepo.find({ where: {
                indangamuntu: req.user.indangamuntu
            } });
        if (ideas.length == 0 || !ideas) {
            return res.status(404).json({ message: `No ideas found for user ${req.user.nationalId}...` });
        }
        return res.status(200).json(ideas);
    }
    catch (e) {
        return res.status(500).json({ message: 'Internal server error!' });
    }
});
exports.getMyIdeas = getMyIdeas;
