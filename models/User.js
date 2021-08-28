import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

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
        required: [false, "Please add a password"],
        minlength: 6,
        select: false,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
});

// we can run some middleware here for presaving and post saving the data
UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

UserSchema.methods.matchPassword = async function (password) {
    // password is the user's input password at the time of login
    // this.password is the User password which is fetched and then funciton call on this user 
    return await bcrypt.compare(password, this.password);
}

UserSchema.methods.getSignedtoken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    })
}

UserSchema.methods.getResetToken = function () {
    const resetToken = crypto.randomBytes(20).toString('hex');

    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    this.resetPasswordExpire = Date.now() + 10 * 1000 * 60;
    // console.log(this.resetPasswordToken);
    return resetToken;
}

const UserModel = mongoose.model("users", UserSchema);

export default UserModel;