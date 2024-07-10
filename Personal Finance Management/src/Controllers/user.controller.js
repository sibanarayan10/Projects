import { User } from "../Models /user.model";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";

/**
 * what are the things user control gonna handle 
 *    change password
 *    update profile
 *    logout 
 * 
 */
const generateAccessandRefreshToken=async(userid)=>{
    try{
const user=await User.findById(userid);
const AccessToken=user.generateAccessToken();
const refreshToken=user.generateRefreshToken();
 user.refreshToken=refreshToken;
 await user.save({ validateBeforeSave: false })
 return {AccessToken,refreshToken};


    }catch(error){
        throw new ApiError(500,"something went wrong")
    }
}
const registerUser=asyncHandler(async(req,res)=>{
    /**
     * get user detail
     * check provided correctly or not
     * check if existed 
     * create user if not existed
     * 
     */
    const{name,email,password,PhoneNumber,country}=req.body;


    if (
        [name,email,password,PhoneNumber,country].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }
    const existedUser = await User.findOne({
        $or: [{ name }, { email }]
    })
    if(existedUser){
        throw new ApiError(400,"user already exist")
    }
    const user=await User.create({
        name,
        email,
        password,
        PhoneNumber,
        country
    })
    const createdUser=await User.findById(user._id).select(
        "-password -refreshToken"
    )
    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    )

})
const loginUser=asyncHandler(async(req,res)=>{
    const {name,email,password}=req.body;
    if(!name||!password){
        throw new ApiError(401,"all fields are required")
    }
    const user=User.findOne({
        $or:[name,email]
    })
    if(!user){
        throw new ApiError(503,"user not exist")
    }
    const validPassword=await user.checkPassword(password);
    if(!validPassword){
        throw new ApiError(455,"password is correct")
    }
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")
   const {accessToken, refreshToken} = await generateAccessAndRefereshTokens(user._id)


    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200, 
            {
                user: loggedInUser, accessToken, refreshToken
            },
            "User logged In Successfully"
        )
    )
})
const logoutUser = asyncHandler(async(req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1 // this removes the field from document
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"))
})

const updatePassword=asyncHandler(async(req,res)=>{
   const{oldPassword,newPassword}=req.body;
    const user=await User.findById(req.user?._id)
    const validPassword=await user.checkPassword(oldPassword);
    if(!validPassword){
        throw new ApiError(504,"Enter the correct password")
    }
    user.password=newPassword;
    await user.save({validateBeforeSave: false})

    return res.status(200).send("password changed successfully");
})

const updateProfile=asyncHandler(async(req,res)=>{
  
    const {fullName, email} = req.body

    if (!fullName || !email) {
        throw new ApiError(400, "All fields are required")
    }

 const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
        $set: {
            fullName,
            email: email
        }
    },
    {new: true}
    
).select("-password")
 return res.status(200).send("profile updated successfully");


})
export {registerUser,refreshToken,loginUser,logoutUser,updatePassword,updateProfile}