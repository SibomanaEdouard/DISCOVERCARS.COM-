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
exports.allEventsByAdmin = exports.displayAllEvents = exports.EventCreate = void 0;
const event_entity_1 = __importDefault(require("../../entities/event.entity"));
const typeorm_1 = require("typeorm");
const typeorm_2 = require("typeorm");
const EventCreate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { eventName, organizationLevel, location, category, startDate, endDate, endTime, startTime, description, indangamuntu } = req.body;
    try {
        if (!eventName ||
            !organizationLevel ||
            !location ||
            !category ||
            !startDate ||
            !endDate ||
            !endTime ||
            !startTime ||
            !description ||
            !indangamuntu) {
            return res
                .status(400)
                .json({ message: "Uzuza ibisabwa byose maze wohereze!" });
        }
        else {
            let eventRepo = (0, typeorm_1.getRepository)(event_entity_1.default);
            const newEvent = new event_entity_1.default(eventName, indangamuntu, organizationLevel, location, category, description, startDate, endDate, endTime, startTime);
            if (!(yield eventRepo.save(newEvent))) {
                res.status(400).json({ error: "Hari ibitagenze neza ongera ugerageze!" });
            }
            else {
                res.status(200).json({ message: "Event sent successfully!" });
            }
        }
    }
    catch (error) {
        console.log("Something went wrong please try again later" + error);
        res.status(500).json({ error: "Hari ibitagenda neza ongera ugera geze mukanya!" });
    }
});
exports.EventCreate = EventCreate;
const displayAllEvents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { indangamuntu } = req.body;
    try {
        const eventRepo = (0, typeorm_1.getRepository)(event_entity_1.default);
        if (!indangamuntu) {
            res.status(404).json({ message: "Enter indangamuntu" });
        }
        else {
            // Using ILike for case-insensitive search with a parameter
            const events = yield eventRepo.find({ where: { indangamuntu: (0, typeorm_2.ILike)(`%${indangamuntu}%`) } });
            if (!events || events.length === 0) {
                res.status(404).json({ message: "No events found" });
            }
            else {
                res.status(200).json(events);
            }
        }
    }
    catch (error) {
        res.status(500).json({ error: "Hari ibitagenda neza ongera ugerageze mukanya!" });
        console.log("Something went wrong: ", error);
    }
});
exports.displayAllEvents = displayAllEvents;
//this is to get all events by admin
const allEventsByAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const eventRepo = (0, typeorm_1.getRepository)(event_entity_1.default);
        const events = yield eventRepo.find();
        if (events.length == 0) {
            res.status(404).json({ message: "No event found" });
        }
        else {
            res.status(200).json(events);
        }
    }
    catch (error) {
        res;
    }
});
exports.allEventsByAdmin = allEventsByAdmin;
