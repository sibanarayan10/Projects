import mongoose  from  'mongoose'
import { DBname } from '../../constant.js'

const connectDB=async()=>{
    try{
        const connection=await mongoose.connect("mongodb+srv://shivv:mshivv01@cluster0.n9rmhcs.mongodb.net/?retryWrites=true&w=majority");
        console.log(mongoose.connection.host)
      
    }catch(error){
        console.log("Error occur while connecting with database");
        process.exit(1);
    }
}
connectDB();
export {connectDB}