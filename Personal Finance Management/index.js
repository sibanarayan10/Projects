import express from "express";
import dotenv from 'dotenv'
const app=express();
const port =3000;
app.listen(process.env.PORT,()=>{
    console.log(`the server is listening at port no ${port}`)
})