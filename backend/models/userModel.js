const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
    name: {type:String, required: true},
    email:{type: String, required: true, unique: true},
    password: {type: String, required: true},
},
{  
    timestamps: true,
}
);

userSchema.methods.matchPass=async function(incomingPass){
    return await bcrypt.compare(incomingPass, this.password);
}
userSchema.pre('save', async function (next) {
    if (!this.isModified){
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
});
const User = mongoose.model("User", userSchema);

module.exports = User;