//check for jwt token in headers
import jwt from 'jsonwebtoken';
import User from '../models/User';
import ErrorResponse from '../utils/errorResponse';
export const Protect = async (req, res, next) => {
    let token;
    console.log(req.headers);
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        //Bearer <JWT>
        console.log('trying to get token');
        token = req.headers.authorization.split(" ")[1]
    }
    if (!token) {
        // console.log("don't have token");
        return next(new ErrorResponse("NOT Authorized to Access(NO Token)", 401));
    }

    try {
        // decode token
        console.log("decoding token => ", token);
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        // console.log(decode);
        const user = await User.findById(decode.id);
        if (!user) {
            // console.log('user is not exists');
            return next(new ErrorResponse("NO User Found with this ID ", 404));
        }
        req.user = user; // used in other routes to do things
        next();
    } catch (err) {
        console.log('Token Not valid or may be some error in findByID');
        return next(new ErrorResponse("Not authorized to access this route(Token Not valid, Login Again)", 401));
    }
}
