const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Plz provide Username"],
    },
    email: {
        type: String,
        required: [true, "Please provide a email"],
        match: [/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/],
    },
    password: {
        type: String,
        required: [true, "Please add a password"],
        minlength: 6,
        select: false,
    },
    resetPasswordToken: String,
    resetPaswordExpire: Date,
});

// we can run some middleware here for presaving and post saving the data
UserSchema.pre("save", async function(next){
    if (!this.isModified("password")) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

UserSchema.methods.matchPassword = async function (password){
    // password is the user's input password at the time of login
    // this.password is the User password which is fetched and then funciton call on this user 
    return await bcrypt.compare(password,this.password);
}
const UserModel = mongoose.model("users", UserSchema);

module.exports = UserModel;