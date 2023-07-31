const asyncHandler = require('express-async-handler')
const User = require("../models/userModel");
const generateToken = require("../config/generateToken")

const registerUser = asyncHandler(async(req, res) => {
    const {name, email, password} = req.body;

    if(!name||!email||!password){
        res.status(400);
        throw new error("All fields not entered");
    }
    const userExists = await User.findOne({email});
    if(userExists){
        res.status(400);
        throw new error("User already exists");
    }

    const user = await User.create({
        name,email,password,
    });

    if(user)
    {
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            token:generateToken(user._id),
        });
    } else{
        res.status(400);
        throw new error("User could not be created");
    }
});

const authUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;

    const user = await User.findOne({email});

    if (user && (await user.matchPass(password))) {
        res.json({
        _id:user._id,
        name:user.name,
        email:user.email,
        token:generateToken(user._id),
    });
    }else{
        res.status(401);
        throw new Error("Invalid Login Credentials");
    }

});



module.exports = {registerUser, authUser};