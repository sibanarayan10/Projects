import mongoose from "mongoose";
const dbconnection=async()=>{

try{
    const connect=await mongoose.connect("mongodb+srv://sibanarayanchoudhury014:UQ1O5XyXKZHLFgmW@cluster0.jkw5uzj.mongodb.net");
    if(!connect){
        throw "can't connect to mongodb database";
    }
    
}catch(error){
    console.log("error occur",error);
}
}
// dbconnection();
export {dbconnection};