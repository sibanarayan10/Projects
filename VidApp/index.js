import express from "express";
import dotenv from "dotenv"
import { dbconnection } from "./src/DB/dbConnection.js";
import {app} from './app.js'

dotenv.config({
    path: './.env'
})

const port=process.env.PORT
dbconnection().then(()=>{
    app.listen(port,()=>{
        console.log("app listening at port",port);
    })
}).catch((error)=>{
    console.log(error);
})

