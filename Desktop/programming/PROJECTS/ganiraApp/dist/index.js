"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const dotenv_1 = require("dotenv");
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
// import swaggerUi from 'swagger-ui-express'
const user_routes_1 = require("./routes/userRouters/user.routes");
const ideas_routes_1 = require("./routes/ideaRouters/ideas.routes");
const messages_routes_1 = require("./routes/messagesRouter/messages.routes");
(0, dotenv_1.config)();
const swaggerSpec = require("./utils/swagger");
const swaggerUi = require("swagger-ui-express");
const app = (0, express_1.default)();
process.on("unhandledRejection", (reason, promise) => {
    console.error("Unhandled Rejection at:", promise, "reason:", reason);
    // You can log or handle the rejection here
});
const PORT = process.env.PORT;
const typeorm_1 = require("typeorm");
const leaders_routes_1 = require("./routes/leadersRoutes/leaders.routes");
const search_routes_1 = require("./controllers/search/search.routes");
const event_routes_1 = require("./routes/eventRouter/event.routes");
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
(0, typeorm_1.createConnection)()
    .then((connection) => {
    console.log("Database connected successfully!");
})
    .catch((error) => {
    console.log("Error while connecting to database: ", error);
});
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)({
    credentials: true,
}));
// const io = new Server(server);
app.use(body_parser_1.default.urlencoded({ extended: true }));
/* FILE UPLOAD */
app.use((0, express_fileupload_1.default)({
    useTempFiles: true,
    tempFileDir: "/tmp/",
}));
/* ROUTES */
app.use("/api/v1/users", user_routes_1.userRouter);
// app.use("/api/v1/questions", questionRouter);
app.use("/api/v1/ideas", ideas_routes_1.ideaRouter);
app.use("/api/v1/events", event_routes_1.eventRouter);
app.use("/api/v1/leaders", leaders_routes_1.leaderRouter);
app.use("/api/v1/messages", messages_routes_1.messageRoutes);
// searching
app.use("/api/v1/search", search_routes_1.searchRoute);
// app /* SWAGGER */.app
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec, { explorer: true }));
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${PORT}...`);
});
