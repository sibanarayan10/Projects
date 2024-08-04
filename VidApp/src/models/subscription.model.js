import mongoose, {Schema} from "mongoose"
import { Channel } from "./channel.model"

const subscriptionSchema = new Schema({
    subscribedBy: [{
        type: Schema.Types.ObjectId, 
        ref: "User"
    }],
    subscribedTo: [{
        type: Schema.Types.ObjectId, 
        ref: "Channel"
    }]
}, {timestamps: true})



export const Subscription = mongoose.model("Subscription", subscriptionSchema)