const User = require('../models/User');
exports.register = async (req, res, next) => {
    const { username, email, password } = req.body;
    try {
        const user = await User.create({
            username, email, password,
        });
        res.status(201).json({
            sucess: true,
            user
        })
    } catch (err) {
        res.status(500).json({
            sucess: false,
            error: err.message,
        })
    }
}
exports.login = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({
            sucess: false,
            error: "plz provide email and password"
        });
    }
    try {
        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            res.status(404).json({
                sucess: false,
                error: "Invalid credentials"
            });
        }
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            res.status(400).json({
                sucess: false,
                error: "Invalid Credentials"
            })
        }
        console.log('you are logged in');
        res.status(200).json({
            sucess: true,
            msg: "Sucessfully Logged In",
            token: "asddfsir3ew3kdfasf"
        })

    } catch (err) {
        res.status(500).json({
            sucess: false,
            error: err.message
        })
    }
}
exports.forgotPassword = (req, res, next) => {
    res.send("forgotPassword Route");
}
exports.resetPassword = (req, res, next) => {
    res.send("resetPassword Route");
}
