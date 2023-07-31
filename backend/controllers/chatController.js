const asyncHandler = require('express-async-handler')

const accessChat = asyncHandler(async (req,res) => {

const Chat = require('../models/chatsModel');
const User = require('../models/userModel');
    const {id} = req.body;

    if(!id){
        console.log("no userID sent");
        return res.sendStatus(400);
    }

    var chat = await Chat.find({
        isGroup: false,
        $and: [
            {users : {$elemMatch : {$eq:req.user._id}}},
            {users : {$elemMatch : {$eq:id}}}
        ],
    }).populate('users', '-password').populate('lastMessage')

    chat = await User.populate(chat, {
        path:'lastMessage.sender',
        select: "name email",
    });
    if(chat.length > 0){
        res.send(chat[0]);
    }else{
        var chatMessages = {
            chatName: 'sender',
            isGroup: false,
            users: [req.user._id, id]
        };
        try {
            const newChat = await Chat.create(chatMessages);

            const FullChat = await Chat.findOne({_id: newChat._id}).populate('users', '-password');
            res.status(200).send(FullChat);
        } catch (error) {
            res.status(400);
            throw new Error(error.message);
        }
    }
});

module.exports = {accessChat};