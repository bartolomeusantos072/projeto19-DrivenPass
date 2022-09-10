import cors from 'cors';
import express from 'express';
import "express-async-errors";
import {errorHandlerMiddleware} from "./middlewares/errorHandlerMiddleware";
import router from "./routes/index";
import dotenv from "dotenv";
dotenv.config({path:".env"});

const app = express();
app.use(express.json());
app.use(cors());
app.use(router);
app.use(errorHandlerMiddleware);

const PORT = Number(process.env.PORT)|| 4000;
app.listen(PORT,()=>{
    console.log(`Running on port ${PORT}`);
})
