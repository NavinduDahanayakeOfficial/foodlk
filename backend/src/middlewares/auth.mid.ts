import { HTTP_STATUS } from "../constants/http_status";
import jwt from "jsonwebtoken";

export default (req:any , res:any, next:any) => {
    let token = req.header('Authorization');

    if(!token){
        return res.status(HTTP_STATUS.UNAUTHORIZED).send();
    }

    if(!token.startsWith('Bearer ')){
        return res.status(HTTP_STATUS.UNAUTHORIZED).send();
    }

    token = token.slice(7, token.length).trimLeft();

    try {
        const decodedUser = jwt.verify(token, process.env.JWT_SECRET as string);
        req.user = decodedUser;
    } catch (error) {
        res.status(HTTP_STATUS.UNAUTHORIZED).send();
    }

    return next();
}

