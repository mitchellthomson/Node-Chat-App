const mongoose = require('mongoose');

const chatsModel = mongoose.Schema(
{
    chatName:{type:String, trim:true},
    isGroup:{type:Boolean, default:false},
    users: [{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    }],
    lastMessage:{
        type:mongoose.Schema.Types.ObjectId,
    }, 
    adminGroup:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
    }
},
    {
        timestamps: true,
    }
);

const Chats = mongoose.model("Chats",chatsModel);
module.exports = Chats;