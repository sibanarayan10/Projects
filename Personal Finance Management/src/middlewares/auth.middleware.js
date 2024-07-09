import jsonwebtoken from 'jwt'
import { User } from '../Models /user.model';
import { asyncHandler } from '../utils/asyncHandler';


const verifyJWT=asyncHandler(async(req,_,next)=>{
try{
    const token=req.cookie["access_token"]
    if(!token){
        throw new Error("user not verified");
    }
    const decodedToken=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);

    
    const user = await User.findById(decodedToken?._id).select("-password -refreshToken")

    if (!user) {
        
        throw new Error(401, "Invalid Access Token")
    }

    req.user = user;
    next();

}catch(error){
    console.log("not authorized")
}

})
export {verifyJWT}