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
exports.searchEntity = void 0;
require("dotenv").config();
const typeorm_1 = require("typeorm");
const user_entity_1 = __importDefault(require("../../entities/user.entity"));
const leaders_entity_1 = __importDefault(require("../../entities/leaders.entity"));
const question_entity_1 = __importDefault(require("../../entities/question.entity"));
const idea_entity_1 = __importDefault(require("../../entities/idea.entity"));
const event_entity_1 = __importDefault(require("../../entities/event.entity"));
const algoliasearch = require("algoliasearch");
/* INDICES */
const client = algoliasearch(process.env.APP_ID, process.env.ADMIN_KEY);
const userIndex = client.initIndex("users");
const ideaIndex = client.initIndex("ideas");
const eventIndex = client.initIndex("events");
const leadersIndex = client.initIndex("leaders");
const qnIndex = client.initIndex("problems");
const getUserFromDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    const userRepo = (0, typeorm_1.getRepository)(user_entity_1.default);
    const users = yield userRepo.find();
    return users;
});
const getLeaders = () => __awaiter(void 0, void 0, void 0, function* () {
    const leaderRepo = (0, typeorm_1.getRepository)(leaders_entity_1.default);
    const userRepo = (0, typeorm_1.getRepository)(user_entity_1.default);
    let users = [];
    const leaders = yield leaderRepo.find();
    for (const ld of leaders) {
        // get the user account of the leader
        const user = yield userRepo.findOneBy({
            nationalId: ld.nationalId,
        });
        if (!user)
            return null;
        users.push(user);
    }
    return users;
});
const getQuestion = () => __awaiter(void 0, void 0, void 0, function* () {
    const questionRepo = (0, typeorm_1.getRepository)(question_entity_1.default);
    const qns = yield questionRepo.find();
    return qns;
});
const getEvents = () => __awaiter(void 0, void 0, void 0, function* () {
    const eventRepo = (0, typeorm_1.getRepository)(event_entity_1.default);
    const events = yield eventRepo.find();
    return events;
});
const getIdeas = () => __awaiter(void 0, void 0, void 0, function* () {
    const ideaRepo = (0, typeorm_1.getRepository)(idea_entity_1.default);
    const ideas = yield ideaRepo.find();
    return ideas;
});
// sync data with algoria
const syncDataToAlgolia = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield getUserFromDatabase();
    const ideas = yield getIdeas();
    const events = yield getEvents();
    const leaders = yield getLeaders();
    const qns = yield getQuestion();
    const userObject = users === null || users === void 0 ? void 0 : users.map((u) => ({
        objectId: u.id,
        name: u.username,
        province: u.province,
        district: u.district,
        sector: u.sector,
        cell: u.cell,
        village: u.village,
        number: u.phoneNumber,
        idNumber: u.nationalId,
    }));
    const ideaObject = ideas.map((i) => ({
        objectId: i.id,
        urwego: i.urwego,
        igitekerezo: i.igitekerezo,
        category: i.category,
        location: i.location,
        target: i.target,
    }));
    const eventObject = events.map((e) => ({
        objectId: e.id,
        name: e.eventName,
        desc: e.description,
        level: e.organizationLevel,
        location: e.location,
        category: e.category,
        startDate: e.startDate,
        endDate: e.endDate,
        startTime: e.startTime,
        endTime: e.endTime,
    }));
    const qnObject = qns.map((q) => ({
        objectId: q.id,
        category: q.category,
        problem: q.problem,
        proof: q.proof,
        level: q.adminLevel,
    }));
    const leadersObject = leaders === null || leaders === void 0 ? void 0 : leaders.map((l) => ({
        objectId: l.id,
        nationalId: l.nationalId,
        name: l.username,
        number: l.phoneNumber,
        role: l.role,
    }));
    yield userIndex.saveObjects(userObject, {
        autoGenerateObjectIDIfNotExist: true,
    });
    yield leadersIndex.saveObjects(leadersObject, {
        autoGenerateObjectIDIfNotExist: true,
    });
    yield eventIndex.saveObjects(eventObject, {
        autoGenerateObjectIDIfNotExist: true,
    });
    yield qnIndex.saveObjects(qnObject, { autoGenerateObjectIDIfNotExist: true });
    yield ideaIndex.saveObjects(ideaObject, {
        autoGenerateObjectIDIfNotExist: true,
    });
});
// make a search accross the all indices
const searchAllEntities = (query) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [users, probs, ideas, events, leaders] = yield Promise.all([
            userIndex.search(query),
            qnIndex.search(query),
            ideaIndex.search(query),
            eventIndex.search(query),
            leadersIndex.search(query),
        ]);
        const res = {
            users: users.hits,
            qns: probs.hits,
            ideas: ideas.hits,
            events: events.hits,
            leaders: leaders.hits,
        };
        return res;
    }
    catch (e) {
        throw e;
    }
});
// now a controller
const searchEntity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { query } = req.query;
        if (!query)
            return res.status(401).json({ message: "Query is required!" });
        syncDataToAlgolia().then(() => __awaiter(void 0, void 0, void 0, function* () {
            return res.status(201).json({
                message: "Data fetched successfully",
                data: yield searchAllEntities(query),
            });
        }));
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ message: "Sorry Something went Wrong!" });
    }
});
exports.searchEntity = searchEntity;
