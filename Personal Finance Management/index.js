import express from "express";
import dotenv from 'dotenv'
import { connectDB } from "./src/Db/dbConnection.js";

dotenv.config({
    path: './.env'
})

const app=express();
app.get('/',(req,res)=>{
    res.send("this route is working")
})
const port =process.env.PORT;
connectDB().then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log(`the server is listening at port no ${port}`)
    })
}).catch((error)=>{
    console.log("found some",error);
})
   

