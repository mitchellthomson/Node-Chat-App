const asyncHandler = require('express-async-handler')
const Chat = require('../models/chatsModel');
const User = require('../models/userModel');

const accessChat = asyncHandler(async (req,res) => {


    const {id} = req.body;

    if(!id){
        console.log("no userID sent");
        return res.sendStatus(400);
    }

    var chats = await Chat.find({
        isGroup: false,
        $and: [
            {users : {$elemMatch : {$eq:req.user._id}}},
            {users : {$elemMatch : {$eq:id}}}
        ],
    }).populate('users', '-password').populate('lastMessage')

    chats = await User.populate(chats, {
        path:'lastMessage.sender',
        select: "name email",
    });
    if(chats.length > 0){
        res.send(chats[0]);
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

const searchChat = asyncHandler(async (req,res) => {
    try {

        Chat.find({users:{$elemMatch: {$eq:req.user._id}}})
        .populate('users', '-password')
        .populate('adminGroup', '-password')
        .populate('lastMessage').sort({updatedAt: -1})
        .then(async (results) =>{
            results = await User.populate(results, {
                path: 'lastMessage.sender',
                select: "name email",
            });
            res.status(200).send(results);
        });
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
});

const createGroupChat= asyncHandler(async (req,res) => {
    if(!req.body.users || !req.body.name){
        return res.status(400).send({ message: 'Not all fields completed'});
    }
    var users = JSON.parse(req.body.users);

    if(users.length <2) {
        return res.status(400).send("More than 2 for group needed");
    }
    users.push(req.user);

    try {
        const groupChat = await Chat.create({
            chatName: req.body.name,
            users: users,
            isGroup: true,
            adminGroup: req.user,
        });
        const fullChat = await Chat.findOne({_id: groupChat._id}).populate('users', '-password').populate('adminGroup','-password');
        res.status(200).json(fullChat);
        
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
});
module.exports = {accessChat, searchChat, createGroupChat};