import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import http from 'http';
import { log } from 'console';
import { connectdb } from './lib/db.js';
import userRouter from './routes/userRoutes.js';

// create an express app and an http server

const app = express();
const server = http.createServer(app);

// Middleware setup

app.use(express.json({limit: "4mb"}));
app.use(cors()); 

// Define a simple route

app.use("/api/status", (req, res) => res.send("Server is running"));
app.use("/api/auth", userRouter);

// connect to the database
await connectdb();

// Start the server

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log("Server is Running on Port :" + PORT));