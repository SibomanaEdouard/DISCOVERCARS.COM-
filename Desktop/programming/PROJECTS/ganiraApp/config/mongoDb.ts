// src/db/mongodb.ts

import mongoose from 'mongoose';

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

export default mongodbConnection;
