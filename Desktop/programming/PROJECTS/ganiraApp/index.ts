import "reflect-metadata";
import { config } from "dotenv";
import express from "express";
import mongoose from "mongoose";


import bodyParser from "body-parser";

import cors from "cors";



config();


// const swaggerSpec = require("./utils/swagger");
// const swaggerUi = require("swagger-ui-express");
const app = express();

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  // You can log or handle the rejection here
});

const PORT = process.env.PORT;

import { createConnection } from "typeorm";



const connectionOptions: any = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(process.env.MONGO || 'default_connection_string', connectionOptions);

const mongodbConnection = mongoose.connection;

mongodbConnection.on('error', console.error.bind(console, 'MongoDB connection error:'));
mongodbConnection.once('open', () => {
  console.log('Connected to MongoDB');
});
console.log("PORT:", process.env.PORT);
console.log("MONGO:", process.env.MONGO);


createConnection()
  .then((connection) => {
    console.log("Database connected successfully!");
  })
  .catch((error) => {
    console.log("Error while connecting to database: ", error);
  });

app.use(bodyParser.json());
app.use(
  cors({
    credentials: true,
  })
);

// const io = new Server(server);
app.use(bodyParser.urlencoded({ extended: true }));




app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});



