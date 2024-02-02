"use strict";
// src/db/mongodb.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const connectionOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
mongoose_1.default.connect(process.env.MONGO || 'default_connection_string', connectionOptions);
const mongodbConnection = mongoose_1.default.connection;
mongodbConnection.on('error', console.error.bind(console, 'MongoDB connection error:'));
mongodbConnection.once('open', () => {
    console.log('Connected to MongoDB');
});
exports.default = mongodbConnection;
