import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { dbConnection } from "./database/dbConnection.js";
import errorMiddleware from './middlewares/error.js'; // ✅ default import

import messageRouter from "./router/messageRoutes.js";
import userRouter from "./router/UserRoutes.js";

// Load environment variables
dotenv.config({ path: "./.env" });

const app = express();



// CORS config
app.use(
  cors({
    origin: [process.env.PORTFOLIO_URL, process.env.DASHBOARD_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Cookie parser
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// File uploads

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.use("/api/v1/message", messageRouter);
app.use("/api/v1/user", userRouter);

dbConnection();

app.use(errorMiddleware);

export default app;
